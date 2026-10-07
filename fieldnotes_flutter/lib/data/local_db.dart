import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/foundation.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:serverpod_database/serverpod_database.dart';

/// Thin data-access layer over the on-device SQLite database that Serverpod
/// generates from the `database: client` models.
class LocalDb {
  LocalDb._(this._session);

  final ClientDatabaseSession _session;

  static Future<LocalDb> open(Client client) async {
    final path = await _resolvePath('fieldnotes.db');
    final session = await client.createSession(path, isDebugMode: kDebugMode);
    return LocalDb._(session);
  }

  static Future<String> _resolvePath(String fileName) async {
    if (kIsWeb) return fileName;
    final dir = await getApplicationSupportDirectory();
    return p.join(dir.path, fileName);
  }

  // --- Notes ---------------------------------------------------------------

  /// Notes the user can see, most recently edited first.
  Future<List<LocalNote>> visibleNotes() => LocalNote.db.find(
    _session,
    where: (t) => t.deleted.equals(false),
    orderBy: (t) => t.updatedAt.desc(),
  );

  Future<LocalNote?> note(UuidValue id) => LocalNote.db.findById(_session, id);

  Future<List<LocalNote>> dirtyNotes() => LocalNote.db.find(
    _session,
    where: (t) => t.dirty.equals(true) & t.conflict.equals(false),
    orderBy: (t) => t.updatedAt,
  );

  Future<LocalNote> saveNote(LocalNote note) async {
    final existing = await LocalNote.db.findById(_session, note.id);
    return existing == null
        ? LocalNote.db.insertRow(_session, note)
        : LocalNote.db.updateRow(_session, note);
  }

  /// Removes a note and its photos from this device only.
  Future<void> removeNote(UuidValue id) async {
    await LocalPhoto.db.deleteWhere(
      _session,
      where: (t) => t.noteId.equals(id),
    );
    await LocalNote.db.deleteWhere(_session, where: (t) => t.id.equals(id));
  }

  // --- Photos --------------------------------------------------------------

  Future<List<LocalPhoto>> photosFor(UuidValue noteId) => LocalPhoto.db.find(
    _session,
    where: (t) => t.noteId.equals(noteId) & t.deleted.equals(false),
    orderBy: (t) => t.createdAt,
  );

  Future<int> photoCount(UuidValue noteId) => LocalPhoto.db.count(
    _session,
    where: (t) => t.noteId.equals(noteId) & t.deleted.equals(false),
  );

  Future<LocalPhoto?> photo(UuidValue id) =>
      LocalPhoto.db.findById(_session, id);

  Future<LocalPhoto> savePhoto(LocalPhoto photo) async {
    final existing = await LocalPhoto.db.findById(_session, photo.id);
    return existing == null
        ? LocalPhoto.db.insertRow(_session, photo)
        : LocalPhoto.db.updateRow(_session, photo);
  }

  Future<void> removePhoto(UuidValue id) =>
      LocalPhoto.db.deleteWhere(_session, where: (t) => t.id.equals(id));

  Future<List<LocalPhoto>> photosToUpload() => LocalPhoto.db.find(
    _session,
    where: (t) => t.uploaded.equals(false) & t.deleted.equals(false),
    orderBy: (t) => t.createdAt,
  );

  Future<List<LocalPhoto>> photosToDelete() => LocalPhoto.db.find(
    _session,
    where: (t) => t.deleted.equals(true),
  );

  Future<List<LocalPhoto>> photosToDownload() => LocalPhoto.db
      .find(
        _session,
        where: (t) => t.uploaded.equals(true) & t.deleted.equals(false),
      )
      .then((all) => all.where((p) => p.data == null).toList());

  // --- Sync bookkeeping ----------------------------------------------------

  Future<int> cursor() async {
    final row = await LocalSyncState.db.findFirstRow(_session);
    return row?.cursor ?? 0;
  }

  Future<String?> owner() async {
    final row = await LocalSyncState.db.findFirstRow(_session);
    return row?.owner;
  }

  /// Whether anything (notes, photos, a cursor) is stored on this device.
  Future<bool> hasData() async {
    final row = await LocalSyncState.db.findFirstRow(_session);
    if ((row?.cursor ?? 0) > 0) return true;
    return await LocalNote.db.count(_session) > 0 ||
        await LocalPhoto.db.count(_session) > 0;
  }

  Future<void> saveOwner(String owner) async {
    final row = await LocalSyncState.db.findFirstRow(_session);
    if (row == null) {
      await LocalSyncState.db.insertRow(
        _session,
        LocalSyncState(cursor: 0, owner: owner),
      );
    } else {
      await LocalSyncState.db.updateRow(_session, row.copyWith(owner: owner));
    }
  }

  Future<void> saveCursor(int cursor) async {
    final row = await LocalSyncState.db.findFirstRow(_session);
    if (row == null) {
      await LocalSyncState.db.insertRow(
        _session,
        LocalSyncState(cursor: cursor),
      );
    } else {
      await LocalSyncState.db.updateRow(_session, row.copyWith(cursor: cursor));
    }
  }

  /// Local changes the server has not seen yet.
  Future<int> pendingCount() async {
    final notes = await LocalNote.db.count(
      _session,
      where: (t) => t.dirty.equals(true) | t.conflict.equals(true),
    );
    final photos = await LocalPhoto.db.count(
      _session,
      where: (t) => t.uploaded.equals(false) | t.deleted.equals(true),
    );
    return notes + photos;
  }

  /// Forgets everything stored on this device (used on sign out).
  Future<void> wipe() async {
    await LocalPhoto.db.delete(_session, await LocalPhoto.db.find(_session));
    await LocalNote.db.delete(_session, await LocalNote.db.find(_session));
    await LocalSyncState.db.delete(
      _session,
      await LocalSyncState.db.find(_session),
    );
  }
}
