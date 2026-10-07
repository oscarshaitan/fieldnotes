import 'package:fieldnotes_server/src/generated/protocol.dart';
import 'package:serverpod/serverpod.dart';
import 'package:test/test.dart';

import 'test_tools/serverpod_test_tools.dart';

const _alice = '550e8400-e29b-41d4-a716-446655440000';
const _bob = '660e8400-e29b-41d4-a716-446655440001';

NoteChange _change(
  UuidValue id, {
  int baseRevision = 0,
  String baseTitle = '',
  String baseBody = '',
  String title = '',
  String body = '',
  bool deleted = false,
}) => NoteChange(
  noteId: id,
  baseRevision: baseRevision,
  baseTitle: baseTitle,
  baseBody: baseBody,
  title: title,
  body: body,
  deleted: deleted,
  createdAt: DateTime.now(),
);

void main() {
  withServerpod('Given the sync endpoint', (sessionBuilder, endpoints) {
    final alice = sessionBuilder.copyWith(
      authentication: AuthenticationOverride.authenticationInfo(_alice, {}),
    );
    final bob = sessionBuilder.copyWith(
      authentication: AuthenticationOverride.authenticationInfo(_bob, {}),
    );
    final unauthenticated = sessionBuilder.copyWith(
      authentication: AuthenticationOverride.unauthenticated(),
    );

    Future<Note> create(
      UuidValue id,
      String title,
      String body, {
      TestSessionBuilder? as,
    }) async {
      final result = await endpoints.sync.pushNote(
        as ?? alice,
        _change(id, title: title, body: body),
      );
      expect(result.status, NoteSyncStatus.applied);
      return result.note;
    }

    test('when unauthenticated then push is rejected', () async {
      await expectLater(
        endpoints.sync.pushNote(
          unauthenticated,
          _change(const Uuid().v7obj(), title: 'x'),
        ),
        throwsA(isA<ServerpodUnauthenticatedException>()),
      );
    });

    group('when a device creates a note offline and syncs', () {
      test(
        'then it starts at revision 1 and another device pulls it',
        () async {
          final id = const Uuid().v7obj();
          final note = await create(
            id,
            'Site visit',
            'Cracked wall on level 2',
          );
          expect(note.revision, 1);

          final pulled = await endpoints.sync.pull(alice, 0, 200);
          expect(pulled.notes.map((n) => n.id), [id]);
          expect(pulled.notes.single.title, 'Site visit');
          expect(pulled.hasMore, isFalse);
          expect(pulled.cursor, note.seq);
        },
      );

      test('then pulling with the new cursor returns nothing', () async {
        final id = const Uuid().v7obj();
        await create(id, 'a', 'b');
        final first = await endpoints.sync.pull(alice, 0, 200);
        final second = await endpoints.sync.pull(alice, first.cursor, 200);
        expect(second.notes, isEmpty);
        expect(second.cursor, first.cursor);
      });

      test('then another user never sees it', () async {
        await create(const Uuid().v7obj(), 'secret', 'body');
        final pulled = await endpoints.sync.pull(bob, 0, 200);
        expect(pulled.notes, isEmpty);
      });
    });

    group('when a retried push was already applied', () {
      test('then it is idempotent and does not bump the revision', () async {
        final id = const Uuid().v7obj();
        final first = await create(id, 'Title', 'Body');
        final retry = await endpoints.sync.pushNote(
          alice,
          _change(id, title: 'Title', body: 'Body'),
        );
        expect(retry.note.revision, first.revision);
        expect(retry.note.seq, first.seq);
      });
    });

    group('when one device is offline and both edit the same note', () {
      late UuidValue id;
      const body = 'Line one\nLine two\nLine three\nLine four';

      setUp(() async {
        id = const Uuid().v7obj();
        await create(id, 'Shopping', body);
      });

      test('then edits to different lines are merged automatically', () async {
        // Device A (online) edits line one and syncs.
        final a = await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: 'Line ONE\nLine two\nLine three\nLine four',
          ),
        );
        expect(a.status, NoteSyncStatus.applied);
        expect(a.note.revision, 2);

        // Device B (was offline) edits line four from the old revision 1.
        final b = await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: 'Line one\nLine two\nLine three\nLine FOUR',
          ),
        );
        expect(b.status, NoteSyncStatus.merged);
        expect(b.note.revision, 3);
        expect(b.note.body, 'Line ONE\nLine two\nLine three\nLine FOUR');
      });

      test('then a title edit and a body edit are both kept', () async {
        await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Weekly shopping',
            body: body,
          ),
        );
        final b = await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: '$body\nLine five',
          ),
        );
        expect(b.status, NoteSyncStatus.merged);
        expect(b.note.title, 'Weekly shopping');
        expect(b.note.body, '$body\nLine five');
      });

      test('then the same line edited on both is reported as conflict '
          'and the server copy is untouched', () async {
        final a = await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: 'Line one\nFROM A\nLine three\nLine four',
          ),
        );
        final b = await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: 'Line one\nFROM B\nLine three\nLine four',
          ),
        );
        expect(b.status, NoteSyncStatus.conflict);
        expect(b.note.body, contains('FROM A'));
        expect(b.note.revision, a.note.revision);
      });

      test(
        'then resolving by re-pushing on the new revision succeeds',
        () async {
          final a = await endpoints.sync.pushNote(
            alice,
            _change(
              id,
              baseRevision: 1,
              baseTitle: 'Shopping',
              baseBody: body,
              title: 'Shopping',
              body: 'Line one\nFROM A\nLine three\nLine four',
            ),
          );
          // "Keep mine": device B rebases onto the server version.
          final b = await endpoints.sync.pushNote(
            alice,
            _change(
              id,
              baseRevision: a.note.revision,
              baseTitle: a.note.title,
              baseBody: a.note.body,
              title: 'Shopping',
              body: 'Line one\nFROM B\nLine three\nLine four',
            ),
          );
          expect(b.status, NoteSyncStatus.applied);
          expect(b.note.body, contains('FROM B'));
        },
      );

      test('then editing a note deleted elsewhere is a conflict', () async {
        await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: body,
            deleted: true,
          ),
        );
        final b = await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: '$body\nmore',
          ),
        );
        expect(b.status, NoteSyncStatus.conflict);
        expect(b.note.deleted, isTrue);
      });

      test('then deleting a note edited elsewhere is a conflict', () async {
        await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: '$body\nmore',
          ),
        );
        final b = await endpoints.sync.pushNote(
          alice,
          _change(
            id,
            baseRevision: 1,
            baseTitle: 'Shopping',
            baseBody: body,
            title: 'Shopping',
            body: body,
            deleted: true,
          ),
        );
        expect(b.status, NoteSyncStatus.conflict);
        expect(b.note.deleted, isFalse);
      });
    });

    group('when another user targets a note they do not own', () {
      test('then the push is rejected', () async {
        final id = const Uuid().v7obj();
        await create(id, 'mine', 'private');
        await expectLater(
          endpoints.sync.pushNote(
            bob,
            _change(id, baseRevision: 1, title: 'hacked'),
          ),
          throwsA(anything),
        );
      });
    });

    group('when there are more changes than the page size', () {
      test('then pull pages through all of them without gaps', () async {
        final ids = <UuidValue>[];
        for (var i = 0; i < 5; i++) {
          final id = const Uuid().v7obj();
          ids.add(id);
          await create(id, 'n$i', '');
        }
        final seen = <UuidValue>[];
        var cursor = 0;
        var hasMore = true;
        while (hasMore) {
          final page = await endpoints.sync.pull(alice, cursor, 2);
          seen.addAll(page.notes.map((n) => n.id));
          cursor = page.cursor;
          hasMore = page.hasMore;
        }
        expect(seen, ids);
      });
    });

    group('when starting a photo upload', () {
      test('then an unsupported type is rejected', () async {
        final id = const Uuid().v7obj();
        await create(id, 't', 'b');
        await expectLater(
          endpoints.sync.beginPhotoUpload(
            alice,
            photoId: const Uuid().v7obj(),
            noteId: id,
            mimeType: 'application/pdf',
            byteSize: 100,
          ),
          throwsA(isA<ArgumentError>()),
        );
      });

      test('then a note that does not exist is rejected', () async {
        await expectLater(
          endpoints.sync.beginPhotoUpload(
            alice,
            photoId: const Uuid().v7obj(),
            noteId: const Uuid().v7obj(),
            mimeType: 'image/jpeg',
            byteSize: 100,
          ),
          throwsA(isA<ArgumentError>()),
        );
      });
    });
  });
}
