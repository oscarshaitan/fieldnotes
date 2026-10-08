import 'dart:async';

import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/foundation.dart';
import 'package:serverpod_auth_idp_flutter/serverpod_auth_idp_flutter.dart';

import 'local_db.dart';
import 'photo_uploader.dart';

enum SyncStatus {
  /// Everything local has reached the server.
  synced,

  /// A sync round is running.
  syncing,

  /// The server cannot be reached; changes stay on the device.
  offline,

  /// Signed out, so nothing can be synced.
  signedOut,

  /// The server rejected something unexpectedly.
  error,
}

/// Moves local changes to the server and server changes to the device.
///
/// One round: push edited notes (the server merges concurrent edits or
/// reports a conflict) -> propagate photo deletions -> upload new photos ->
/// pull everything after the cursor -> download missing photo bytes.
class SyncEngine {
  SyncEngine(this._db, this._client, {required this.onChanged});

  final LocalDb _db;
  final Client _client;

  /// Called whenever local data changed during a sync round.
  final VoidCallback onChanged;

  final status = ValueNotifier<SyncStatus>(SyncStatus.synced);
  String? lastError;

  /// Photos that could not be uploaded in the last round. They are retried,
  /// but never block syncing of notes.
  int photoFailures = 0;

  bool _running = false;
  bool _again = false;

  /// Runs a sync round. Calls made while one is running are coalesced into a
  /// single follow-up round.
  Future<void> sync() async {
    if (_running) {
      _again = true;
      return;
    }
    _running = true;
    try {
      do {
        _again = false;
        await _round();
      } while (_again);
    } finally {
      _running = false;
    }
  }

  Future<void> _round() async {
    if (!_client.auth.isAuthenticated) {
      status.value = SyncStatus.signedOut;
      return;
    }
    status.value = SyncStatus.syncing;
    photoFailures = 0;
    try {
      await _bindToAccount();
      await _pushNotes();
      await _pushPhotoDeletes();
      await _pushPhotoUploads();
      await _pull();
      await _downloadPhotos();
      if (photoFailures == 0) lastError = null;
      status.value = photoFailures == 0 ? SyncStatus.synced : SyncStatus.error;
    } on ServerpodClientUnauthorized {
      status.value = SyncStatus.signedOut;
    } on ServerpodClientHttpException catch (e) {
      lastError = e.toString();
      status.value = SyncStatus.error;
    } catch (e) {
      // Socket errors, timeouts, DNS failures: we are simply offline.
      lastError = e.toString();
      status.value = SyncStatus.offline;
    }
    onChanged();
  }

  /// Local data and the pull cursor only make sense for one account on one
  /// server. If a different account or server signs in, start from scratch
  /// instead of mixing data (or skipping changes the new cursor never sees).
  Future<void> _bindToAccount() async {
    final user = _client.auth.authInfoListenable.value?.authUserId;
    if (user == null) return;
    final owner = '${_client.host}|$user';
    final stored = await _db.owner();
    if (stored == owner) return;
    if (await _db.hasData()) {
      debugPrint('Local data belongs to another account/server; resetting.');
      await _db.wipe();
    }
    await _db.saveOwner(owner);
    onChanged();
  }

  // --- Push ----------------------------------------------------------------

  Future<void> _pushNotes() async {
    for (final note in await _db.dirtyNotes()) {
      if (note.deleted && note.revision == 0) {
        // Created and deleted without ever reaching the server.
        await _db.removeNote(note.id);
        continue;
      }
      final result = await _client.sync.pushNote(
        NoteChange(
          noteId: note.id,
          baseRevision: note.revision,
          baseTitle: note.baseTitle,
          baseBody: note.baseBody,
          title: note.title,
          body: note.body,
          deleted: note.deleted,
          createdAt: note.createdAt,
        ),
      );
      await _applyPushResult(note, result);
      onChanged();
    }
  }

  Future<void> _applyPushResult(
    LocalNote pushed,
    NoteChangeResult result,
  ) async {
    final server = result.note;
    // The user may have kept typing while the request was in flight.
    final current = await _db.note(pushed.id);
    if (current == null) return;
    final editedMeanwhile =
        current.title != pushed.title ||
        current.body != pushed.body ||
        current.deleted != pushed.deleted;

    switch (result.status) {
      case NoteSyncStatus.applied:
      case NoteSyncStatus.merged:
        if (server.deleted && !editedMeanwhile) {
          await _db.removeNote(current.id);
        } else if (!editedMeanwhile) {
          await _db.saveNote(_cleanCopyOf(current, server));
        } else if (result.status == NoteSyncStatus.applied) {
          // The server now holds exactly what we pushed; later edits are
          // relative to that.
          await _db.saveNote(
            current.copyWith(
              revision: server.revision,
              baseTitle: pushed.title,
              baseBody: pushed.body,
              dirty: true,
            ),
          );
        }
      // else: merged + edited meanwhile -> keep the old base; the next push
      // lets the server merge again.
      case NoteSyncStatus.conflict:
        await _db.saveNote(
          current.copyWith(
            conflict: true,
            remoteRevision: server.revision,
            remoteTitle: server.title,
            remoteBody: server.body,
            remoteDeleted: server.deleted,
          ),
        );
    }
  }

  LocalNote _cleanCopyOf(LocalNote local, Note server) => local.copyWith(
    title: server.title,
    body: server.body,
    revision: server.revision,
    baseTitle: server.title,
    baseBody: server.body,
    dirty: false,
    conflict: false,
    remoteRevision: null,
    remoteTitle: null,
    remoteBody: null,
    remoteDeleted: null,
  );

  Future<void> _pushPhotoDeletes() async {
    for (final photo in await _db.photosToDelete()) {
      if (photo.uploaded) {
        await _client.sync.deletePhoto(photo.id);
      }
      await _db.removePhoto(photo.id);
    }
  }

  Future<void> _pushPhotoUploads() async {
    for (final photo in await _db.photosToUpload()) {
      final data = photo.data;
      final note = await _db.note(photo.noteId);
      // The note must exist on the server first; it will after the next round.
      if (data == null || note == null || note.revision == 0) continue;

      try {
        if (kIsWeb) {
          // Browsers cannot always upload straight to the storage bucket
          // (CORS), so the bytes go through the API instead.
          await _client.sync.uploadPhotoData(
            photoId: photo.id,
            noteId: photo.noteId,
            mimeType: photo.mimeType,
            data: data,
          );
        } else {
          await _uploadDirectly(photo, data);
        }
        await _db.savePhoto(photo.copyWith(uploaded: true));
        onChanged();
      } on ServerpodClientUnauthorized {
        rethrow;
      } on ServerpodClientNetworkException {
        rethrow; // offline: stop the round
      } on ServerpodClientHttpException catch (e) {
        // The server refused this photo (unsupported type, too large...).
        // Drop it instead of retrying forever.
        debugPrint('Dropping photo ${photo.id}: $e');
        lastError = 'Photo rejected by the server: ${e.message}';
        photoFailures++;
        await _db.removePhoto(photo.id);
      } catch (e) {
        // Moving the bytes failed. Keep the photo and report it, but carry on
        // with the rest of the sync so one bad upload never blocks notes.
        debugPrint('Photo upload failed for ${photo.id}: $e');
        lastError = 'Photo upload failed: $e';
        photoFailures++;
      }
    }
  }

  /// Mobile/desktop path: the server issues an upload description, the app
  /// sends the bytes straight to file storage, then the server verifies them.
  Future<void> _uploadDirectly(LocalPhoto photo, ByteData data) async {
    final description = await _client.sync.beginPhotoUpload(
      photoId: photo.id,
      noteId: photo.noteId,
      mimeType: photo.mimeType,
      byteSize: data.lengthInBytes,
    );
    final result = await uploadWithDescription(
      description,
      Uint8List.sublistView(data),
      photo.mimeType,
    );
    if (!result.ok) {
      throw StateError('storage rejected the upload ($result)');
    }
    await _client.sync.completePhotoUpload(photo.id);
  }

  // --- Pull ----------------------------------------------------------------

  Future<void> _pull() async {
    var cursor = await _db.cursor();
    while (true) {
      final page = await _client.sync.pull(cursor, 200);
      for (final note in page.notes) {
        await _applyRemoteNote(note);
      }
      for (final photo in page.photos) {
        await _applyRemotePhoto(photo);
      }
      cursor = page.cursor;
      await _db.saveCursor(cursor);
      onChanged();
      if (!page.hasMore) break;
    }
  }

  Future<void> _applyRemoteNote(Note remote) async {
    final id = remote.id;
    final local = await _db.note(id);

    if (local == null) {
      if (remote.deleted) return;
      await _db.saveNote(
        LocalNote(
          id: id,
          title: remote.title,
          body: remote.body,
          revision: remote.revision,
          baseTitle: remote.title,
          baseBody: remote.body,
          createdAt: remote.createdAt,
          updatedAt: remote.updatedAt,
        ),
      );
      return;
    }

    if (remote.revision <= local.revision && !local.conflict) return;

    if (local.dirty || local.conflict) {
      // Local edits pending. The push will merge, or flag a conflict. For an
      // already flagged conflict, keep the shown server version fresh.
      if (local.conflict) {
        await _db.saveNote(
          local.copyWith(
            remoteRevision: remote.revision,
            remoteTitle: remote.title,
            remoteBody: remote.body,
            remoteDeleted: remote.deleted,
          ),
        );
      }
      return;
    }

    if (remote.deleted) {
      await _db.removeNote(id);
    } else {
      await _db.saveNote(
        _cleanCopyOf(local, remote).copyWith(updatedAt: remote.updatedAt),
      );
    }
  }

  Future<void> _applyRemotePhoto(Photo remote) async {
    final local = await _db.photo(remote.id);
    if (remote.deleted) {
      if (local != null) await _db.removePhoto(remote.id);
      return;
    }
    if (local == null) {
      await _db.savePhoto(
        LocalPhoto(
          id: remote.id,
          noteId: remote.noteId,
          mimeType: remote.mimeType,
          uploaded: true,
          createdAt: remote.createdAt,
        ),
      );
    } else if (!local.uploaded) {
      await _db.savePhoto(local.copyWith(uploaded: true));
    }
  }

  Future<void> _downloadPhotos() async {
    for (final photo in await _db.photosToDownload()) {
      final data = await _client.sync.getPhotoData(photo.id);
      final current = await _db.photo(photo.id);
      if (current == null) continue; // deleted meanwhile
      await _db.savePhoto(current.copyWith(data: data));
      onChanged();
    }
  }

  void dispose() => status.dispose();
}
