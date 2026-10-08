import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/foundation.dart';
import 'package:serverpod_auth_idp_flutter/serverpod_auth_idp_flutter.dart';

import 'local_db.dart';
import 'sync_engine.dart';

enum ConflictChoice {
  /// Keep the local version and overwrite the remote one.
  local,

  /// Discard the local edits and take the remote version.
  remote,

  /// Take the remote version and keep the local one as a separate note.
  both,
}

/// Everything the UI needs: local notes and photos (always available, even
/// offline), plus sync state. All edits go to the local database first and
/// are synced in the background.
class NotesRepository extends ChangeNotifier {
  NotesRepository._(this._db, this._client) {
    _engine = SyncEngine(_db, _client, onChanged: _refresh);
  }

  static Future<NotesRepository> open(Client client) async {
    final repo = NotesRepository._(await LocalDb.open(client), client);
    await repo._refresh();
    return repo;
  }

  final LocalDb _db;
  final Client _client;
  late final SyncEngine _engine;

  List<LocalNote> notes = const [];

  /// Local changes not yet on the server.
  int pending = 0;

  /// Bumped only when photos change, so photo widgets reload only then.
  int photosVersion = 0;

  ValueListenable<SyncStatus> get status => _engine.status;
  String? get lastSyncError => _engine.lastError;
  int get photoFailures => _engine.photoFailures;

  Object? _signature;
  bool _localPhotosChanged = false;

  Timer? _debounce;
  Timer? _poll;
  StreamSubscription<List<ConnectivityResult>>? _connectivity;
  bool _disposed = false;

  /// Starts background syncing: on connectivity changes, periodically, and
  /// after sign-in.
  void start() {
    _connectivity = Connectivity().onConnectivityChanged.listen((results) {
      if (results.any((r) => r != ConnectivityResult.none)) syncNow();
    });
    _poll = Timer.periodic(const Duration(seconds: 6), (_) => syncNow());
    _client.auth.authInfoListenable.addListener(syncNow);
    syncNow();
  }

  Future<void> syncNow() => _engine.sync();

  void _scheduleSync() {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 800), syncNow);
  }

  /// Reloads the lists from the local database. Listeners are only notified
  /// when something visible changed, so the periodic background sync does not
  /// make the UI flicker.
  Future<void> _refresh() async {
    if (_disposed) return;
    final latest = await _db.visibleNotes();
    final latestPending = await _db.pendingCount();
    final photosChanged = _engine.takePhotosChanged() || _localPhotosChanged;
    _localPhotosChanged = false;

    final signature = Object.hashAll([
      for (final n in latest)
        Object.hash(
          n.id,
          n.revision,
          n.dirty,
          n.conflict,
          n.title,
          n.body,
          n.updatedAt,
        ),
      latestPending,
    ]);
    if (signature == _signature && !photosChanged) return;

    _signature = signature;
    notes = latest;
    pending = latestPending;
    if (photosChanged) photosVersion++;
    if (!_disposed) notifyListeners();
  }

  // --- Notes ---------------------------------------------------------------

  Future<LocalNote> createNote() async {
    final now = DateTime.now().toUtc();
    final note = await _db.saveNote(
      LocalNote(id: const Uuid().v7obj(), createdAt: now, updatedAt: now),
    );
    await _refresh();
    return note;
  }

  Future<LocalNote?> note(UuidValue id) => _db.note(id);

  Future<void> updateNote(UuidValue id, {String? title, String? body}) async {
    final note = await _db.note(id);
    if (note == null) return;
    if ((title ?? note.title) == note.title &&
        (body ?? note.body) == note.body) {
      return;
    }
    await _db.saveNote(
      note.copyWith(
        title: title,
        body: body,
        dirty: true,
        updatedAt: DateTime.now().toUtc(),
      ),
    );
    await _refresh();
    _scheduleSync();
  }

  Future<void> deleteNote(UuidValue id) async {
    final note = await _db.note(id);
    if (note == null) return;
    if (note.revision == 0) {
      await _db.removeNote(id); // never reached the server
      _localPhotosChanged = true;
    } else {
      await _db.saveNote(
        note.copyWith(
          deleted: true,
          dirty: true,
          updatedAt: DateTime.now().toUtc(),
        ),
      );
    }
    await _refresh();
    _scheduleSync();
  }

  /// Drops a note the user opened but never typed into.
  Future<void> discardIfEmpty(UuidValue id) async {
    final note = await _db.note(id);
    if (note == null || note.revision != 0) return;
    if (note.title.trim().isEmpty &&
        note.body.trim().isEmpty &&
        await _db.photoCount(id) == 0) {
      await _db.removeNote(id);
      await _refresh();
    }
  }

  // --- Photos --------------------------------------------------------------

  Future<List<LocalPhoto>> photosFor(UuidValue noteId) => _db.photosFor(noteId);

  Future<void> addPhoto(
    UuidValue noteId,
    Uint8List bytes,
    String mimeType,
  ) async {
    await _db.savePhoto(
      LocalPhoto(
        id: const Uuid().v7obj(),
        noteId: noteId,
        mimeType: mimeType,
        data: ByteData.sublistView(bytes),
        createdAt: DateTime.now().toUtc(),
      ),
    );
    _localPhotosChanged = true;
    await _refresh();
    _scheduleSync();
  }

  Future<void> removePhoto(LocalPhoto photo) async {
    if (photo.uploaded) {
      await _db.savePhoto(photo.copyWith(deleted: true));
    } else {
      await _db.removePhoto(photo.id);
    }
    _localPhotosChanged = true;
    await _refresh();
    _scheduleSync();
  }

  // --- Conflicts -----------------------------------------------------------

  Future<void> resolveConflict(UuidValue id, ConflictChoice choice) async {
    final note = await _db.note(id);
    if (note == null || !note.conflict) return;

    final remoteTitle = note.remoteTitle ?? '';
    final remoteBody = note.remoteBody ?? '';
    final remoteRevision = note.remoteRevision ?? note.revision;
    final remoteDeleted = note.remoteDeleted ?? false;
    final now = DateTime.now().toUtc();

    if (choice == ConflictChoice.local) {
      // Rebase onto the server version; the next push is then a plain
      // fast-forward that overwrites it with ours.
      await _db.saveNote(
        note.copyWith(
          revision: remoteRevision,
          baseTitle: remoteTitle,
          baseBody: remoteBody,
          conflict: false,
          remoteRevision: null,
          remoteTitle: null,
          remoteBody: null,
          remoteDeleted: null,
          dirty: true,
          updatedAt: now,
        ),
      );
    } else {
      if (choice == ConflictChoice.both && !note.deleted) {
        await _db.saveNote(
          LocalNote(
            id: const Uuid().v7obj(),
            title: note.title.isEmpty
                ? 'Local version'
                : '${note.title} (local)',
            body: note.body,
            dirty: true,
            createdAt: now,
            updatedAt: now,
          ),
        );
      }
      if (remoteDeleted) {
        await _db.removeNote(id);
      } else {
        await _db.saveNote(
          note.copyWith(
            title: remoteTitle,
            body: remoteBody,
            revision: remoteRevision,
            baseTitle: remoteTitle,
            baseBody: remoteBody,
            deleted: false,
            dirty: false,
            conflict: false,
            remoteRevision: null,
            remoteTitle: null,
            remoteBody: null,
            remoteDeleted: null,
          ),
        );
      }
    }
    await _refresh();
    _scheduleSync();
  }

  // --- Account -------------------------------------------------------------

  /// Signs out and removes this account's data from the device.
  Future<void> signOut() async {
    await _client.auth.signOutDevice();
    await _db.wipe();
    await _refresh();
  }

  @override
  void dispose() {
    _disposed = true;
    _debounce?.cancel();
    _poll?.cancel();
    _connectivity?.cancel();
    _client.auth.authInfoListenable.removeListener(syncNow);
    _engine.dispose();
    super.dispose();
  }
}
