import 'dart:typed_data';

import 'package:serverpod/serverpod.dart';
import 'package:serverpod_auth_idp_server/core.dart';

import '../generated/protocol.dart';
import 'merge.dart';

const _storageId = 'private';
const _maxTitleLength = 500;
const _maxBodyLength = 200000;
const _maxPhotoBytes = 12 * 1024 * 1024;
const _allowedMimeTypes = {
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
};

/// Offline-first sync API: devices push their local edits, and pull everything
/// that changed since their cursor.
///
/// Conflict handling is optimistic: every edit carries the revision (and
/// content) it was based on. If the note moved on in the meantime the server
/// merges the two edits field by field, line by line; if both touched the same
/// lines the client gets a `conflict` and lets the user decide.
class SyncEndpoint extends Endpoint {
  @override
  bool get requireLogin => true;

  UuidValue _userId(Session session) => session.authenticated!.authUserId;

  /// Applies one local edit to the server copy of a note.
  Future<NoteChangeResult> pushNote(Session session, NoteChange change) async {
    final userId = _userId(session);
    _validate(change);

    return session.db.transaction((tx) async {
      final counter = await _lockCounter(session, userId, tx);
      final existing = await Note.db.findById(
        session,
        change.noteId,
        transaction: tx,
      );

      // Brand new note.
      if (existing == null) {
        final now = DateTime.now().toUtc();
        final note = await Note.db.insertRow(
          session,
          Note(
            id: change.noteId,
            userId: userId,
            title: change.title,
            body: change.body,
            deleted: change.deleted,
            revision: 1,
            seq: await _nextSeq(session, counter, tx),
            createdAt: change.createdAt.toUtc(),
            updatedAt: now,
          ),
          transaction: tx,
        );
        return NoteChangeResult(status: NoteSyncStatus.applied, note: note);
      }

      if (existing.userId != userId) {
        throw ArgumentError('Note belongs to another user.');
      }

      // Retried request that was already applied: nothing to do.
      if (existing.title == change.title &&
          existing.body == change.body &&
          existing.deleted == change.deleted) {
        return NoteChangeResult(status: NoteSyncStatus.applied, note: existing);
      }

      // Editor was up to date: plain fast-forward.
      if (change.baseRevision == existing.revision) {
        final note = await _save(
          session,
          tx,
          counter,
          existing,
          title: change.title,
          body: change.body,
          deleted: change.deleted,
        );
        return NoteChangeResult(status: NoteSyncStatus.applied, note: note);
      }

      // Somebody else changed the note since this edit's base. Deleting on
      // one side while editing on the other is never merged silently.
      if (existing.deleted || change.deleted) {
        if (existing.deleted && change.deleted) {
          return NoteChangeResult(
            status: NoteSyncStatus.applied,
            note: existing,
          );
        }
        return NoteChangeResult(
          status: NoteSyncStatus.conflict,
          note: existing,
        );
      }

      final title = merge3(change.baseTitle, change.title, existing.title);
      final body = merge3(change.baseBody, change.body, existing.body);
      if (title == null || body == null) {
        return NoteChangeResult(
          status: NoteSyncStatus.conflict,
          note: existing,
        );
      }

      if (title == existing.title && body == existing.body) {
        return NoteChangeResult(status: NoteSyncStatus.merged, note: existing);
      }
      final note = await _save(
        session,
        tx,
        counter,
        existing,
        title: title,
        body: body,
        deleted: false,
      );
      return NoteChangeResult(status: NoteSyncStatus.merged, note: note);
    });
  }

  /// Returns changes after [cursor], oldest first, at most [limit] per kind.
  Future<SyncPullResult> pull(
    Session session,
    int cursor, {
    int limit = 200,
  }) async {
    final userId = _userId(session);
    limit = limit.clamp(1, 500);

    final notes = await Note.db.find(
      session,
      where: (t) => t.userId.equals(userId) & (t.seq > cursor),
      orderBy: (t) => t.seq,
      limit: limit,
    );
    final photos = await Photo.db.find(
      session,
      where: (t) => t.userId.equals(userId) & (t.seq > cursor),
      orderBy: (t) => t.seq,
      limit: limit,
    );

    // When a list was truncated, only advance as far as the shortest
    // truncated list so nothing in between is skipped.
    final truncated = <int>[
      if (notes.length == limit) notes.last.seq,
      if (photos.length == limit) photos.last.seq!,
    ];
    final int newCursor;
    if (truncated.isEmpty) {
      final current = await SyncCounter.db.findFirstRow(
        session,
        where: (t) => t.userId.equals(userId),
      );
      newCursor = current == null || current.value < cursor
          ? cursor
          : current.value;
    } else {
      newCursor = truncated.reduce((a, b) => a < b ? a : b);
    }

    return SyncPullResult(
      notes: notes.where((n) => n.seq <= newCursor).toList(),
      photos: photos.where((p) => p.seq! <= newCursor).toList(),
      cursor: newCursor,
      hasMore: truncated.isNotEmpty,
    );
  }

  // --- Photos --------------------------------------------------------------

  /// Step 1 of a photo upload. The note must already exist on the server.
  /// Returns the upload description for [FileUploader].
  Future<String> beginPhotoUpload(
    Session session, {
    required UuidValue photoId,
    required UuidValue noteId,
    required String mimeType,
    required int byteSize,
  }) async {
    final userId = _userId(session);
    if (!_allowedMimeTypes.contains(mimeType)) {
      throw ArgumentError('Unsupported image type.');
    }
    if (byteSize <= 0 || byteSize > _maxPhotoBytes) {
      throw ArgumentError('Photo is too large.');
    }
    final note = await Note.db.findById(session, noteId);
    if (note == null || note.userId != userId) {
      throw ArgumentError('Unknown note.');
    }

    final path = 'photos/$userId/$photoId';
    final existing = await Photo.db.findById(session, photoId);
    if (existing == null) {
      await Photo.db.insertRow(
        session,
        Photo(
          id: photoId,
          userId: userId,
          noteId: noteId,
          mimeType: mimeType,
          byteSize: byteSize,
          storagePath: path,
          createdAt: DateTime.now().toUtc(),
        ),
      );
    } else if (existing.userId != userId) {
      throw ArgumentError('Photo belongs to another user.');
    }

    final description = await session.storage.createUploadDescription(
      storageId: _storageId,
      path: path,
    );
    return description;
  }

  /// Step 2: after the bytes are uploaded, verify them and publish the photo
  /// to the user's other devices.
  Future<Photo> completePhotoUpload(Session session, UuidValue photoId) async {
    final userId = _userId(session);
    return session.db.transaction((tx) async {
      final counter = await _lockCounter(session, userId, tx);
      final photo = await Photo.db.findById(session, photoId, transaction: tx);
      if (photo == null || photo.userId != userId) {
        throw ArgumentError('Unknown photo.');
      }
      if (photo.uploaded) return photo;

      final ok = await session.storage.verifyUpload(
        storageId: _storageId,
        path: photo.storagePath,
      );
      if (!ok) throw StateError('Upload could not be verified.');

      return Photo.db.updateRow(
        session,
        photo.copyWith(
          uploaded: true,
          seq: await _nextSeq(session, counter, tx),
        ),
        transaction: tx,
      );
    });
  }

  /// Removes a photo; the deletion propagates to other devices on pull.
  Future<void> deletePhoto(Session session, UuidValue photoId) async {
    final userId = _userId(session);
    await session.db.transaction((tx) async {
      final counter = await _lockCounter(session, userId, tx);
      final photo = await Photo.db.findById(session, photoId, transaction: tx);
      if (photo == null || photo.userId != userId || photo.deleted) return;
      await Photo.db.updateRow(
        session,
        photo.copyWith(
          deleted: true,
          seq: await _nextSeq(session, counter, tx),
        ),
        transaction: tx,
      );
    });
    final photo = await Photo.db.findById(session, photoId);
    if (photo != null &&
        photo.deleted &&
        await session.storage.fileExists(
          storageId: _storageId,
          path: photo.storagePath,
        )) {
      await session.storage.deleteFile(
        storageId: _storageId,
        path: photo.storagePath,
      );
    }
  }

  /// Downloads the bytes of a photo.
  Future<ByteData> getPhotoData(Session session, UuidValue photoId) async {
    final userId = _userId(session);
    final photo = await Photo.db.findById(session, photoId);
    if (photo == null ||
        photo.userId != userId ||
        !photo.uploaded ||
        photo.deleted) {
      throw ArgumentError('Unknown photo.');
    }
    final data = await session.storage.retrieveFile(
      storageId: _storageId,
      path: photo.storagePath,
    );
    return data;
  }

  // --- Helpers -------------------------------------------------------------

  void _validate(NoteChange change) {
    if (change.title.length > _maxTitleLength ||
        change.baseTitle.length > _maxTitleLength ||
        change.body.length > _maxBodyLength ||
        change.baseBody.length > _maxBodyLength) {
      throw ArgumentError('Note is too long.');
    }
  }

  Future<Note> _save(
    Session session,
    Transaction tx,
    SyncCounter counter,
    Note existing, {
    required String title,
    required String body,
    required bool deleted,
  }) {
    return _nextSeq(session, counter, tx).then(
      (seq) => Note.db.updateRow(
        session,
        existing.copyWith(
          title: title,
          body: body,
          deleted: deleted,
          revision: existing.revision + 1,
          seq: seq,
          updatedAt: DateTime.now().toUtc(),
        ),
        transaction: tx,
      ),
    );
  }

  /// Locks the user's counter row for the rest of the transaction. This also
  /// serializes concurrent pushes from the same user, so the revision check
  /// and the write cannot interleave.
  Future<SyncCounter> _lockCounter(
    Session session,
    UuidValue userId,
    Transaction tx,
  ) async {
    Future<SyncCounter?> lookup() => SyncCounter.db.findFirstRow(
      session,
      where: (t) => t.userId.equals(userId),
      transaction: tx,
      lockMode: LockMode.forUpdate,
    );

    final counter = await lookup();
    if (counter != null) return counter;

    // First change of this user. Create the row in its own short transaction
    // so that a concurrent creator only costs us a retry.
    try {
      await SyncCounter.db.insertRow(
        session,
        SyncCounter(userId: userId, value: 0),
      );
    } catch (_) {
      // Lost the race; the row exists now.
    }
    return (await lookup())!;
  }

  Future<int> _nextSeq(
    Session session,
    SyncCounter counter,
    Transaction tx,
  ) async {
    counter.value += 1;
    await SyncCounter.db.updateRow(session, counter, transaction: tx);
    return counter.value;
  }
}
