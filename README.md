# FieldNotes

**Offline-first notes with photos, built with Flutter and Serverpod 4.**

Write notes on your phone with no signal - text and photos - and they sync when you're back online. Open the same account on the web (or another phone) and the notes are there. If two devices edit the same note while one is offline, the server merges the changes automatically, and when it can't, you get to choose.

Built for the [Build Something Real Serverpod hackathon](https://builderbase.com/event/build-something-real-the-serverpod-hackathon).

## What it does

| | |
| --- | --- |
| **Offline notes + photos** | Everything is written to an on-device SQLite database first. No network needed to create, edit, delete or attach photos. |
| **Sync** | A background engine pushes local changes, uploads photos, and pulls everything new using a per-user cursor. Runs on connectivity changes, after edits and every few seconds. |
| **Conflict resolution** | Edits carry the revision (and content) they were based on. If the note moved on, the server does a **three-way, line-level merge**. Non-overlapping edits are merged silently; real conflicts are shown side by side so you can *keep mine*, *keep the other device's*, or *keep both*. |
| **Mobile + web** | One Flutter codebase. Phones get a list/detail flow with camera and gallery; wide screens (web, tablets) get a two-pane layout. |
| **Auth** | Serverpod email authentication. Your notes are private to your account. |

## How the Serverpod stack is used

- **Models** (`*.spy.yaml`) generate the server tables, the typed client, **and the on-device SQLite tables** (`database: client`).
- **Endpoint** `SyncEndpoint` - `pushNote`, `pull`, photo upload/download. Requires login; every row is scoped to the authenticated user.
- **File uploads** - photos use Serverpod's upload descriptions + `verifyUpload`, and are only published to other devices after verification.
- **Database + migrations** - Postgres via the ORM, with transactions and a row lock per user so concurrent pushes can't interleave.
- **Auth** - `serverpod_auth_idp` email sign-in with JWT sessions that persist, so the app opens and works offline.
- **Web hosting** - the Flutter web build is served by the Serverpod web server.
- **Tests** - `withServerpod` integration tests (embedded Postgres, no Docker) cover the sync and conflict rules.

## How sync and conflicts work

```
device A (offline)               server                  device B (online)
 base: rev 3 "…"                                          edits → rev 4
 edits note locally                                       
 ── reconnects ──▶ pushNote(base rev 3, base text, new text)
                      rev is 4, not 3 → three-way merge:
                      base = A's snapshot, mine = A's text, theirs = rev 4
                      ├─ different lines  → merged, rev 5, returned to A
                      └─ same lines       → status: conflict, nothing changed
                                              A shows "Resolve" with both versions
```

- Every note has a server `revision`; every client edit includes the **base revision and base text** it started from.
- Fast-forward (base == current) is applied directly. Otherwise `merge3` (`fieldnotes_server/lib/src/notes/merge.dart`) merges title and body line by line; overlapping hunks that differ are a conflict.
- Edit-vs-delete is never merged silently: it is always surfaced as a conflict.
- Pushes are idempotent (a retried request that already applied is a no-op), so flaky connections are safe.
- Photos are immutable and merged as a set: additions from different devices are all kept.

## Repository layout

| Package | Purpose |
| --- | --- |
| `fieldnotes_server` | Serverpod backend: models, sync endpoint, merge, migrations, tests |
| `fieldnotes_client` | Generated client **and generated on-device database tables** (do not edit) |
| `fieldnotes_flutter` | Flutter app (iOS, Android, web, desktop) |

Key files: [`merge.dart`](fieldnotes_server/lib/src/notes/merge.dart), [`sync_endpoint.dart`](fieldnotes_server/lib/src/notes/sync_endpoint.dart), [`sync_engine.dart`](fieldnotes_flutter/lib/data/sync_engine.dart), [`notes_repository.dart`](fieldnotes_flutter/lib/data/notes_repository.dart).

## Running it

Requirements: Flutter **3.44.4+** (developed on 3.47.6) and the Serverpod CLI.

```bash
dart install serverpod_cli
git clone https://github.com/oscarshaitan/fieldnotes && cd fieldnotes
serverpod start            # starts Postgres (embedded), the server, and the Flutter app
```

No Docker is needed: in development Serverpod runs an embedded PostgreSQL.

- **Sign up**: in development the verification code is printed in the server log (`Registration code for …`).
- **Web app served by the server**: `cd fieldnotes_server && serverpod run flutter_build`, restart the server, open http://localhost:8082.
- **Phone / simulator**: `cd fieldnotes_flutter && flutter run -d <device>`. On a physical device pass `--dart-define=SERVER_URL=http://<your-computer-ip>:8080/`.
- **Tests**: `cd fieldnotes_server && dart test`.

### Try the offline + conflict scenario

1. Sign in with the same account on two clients (e.g. web and a simulator) and create a note.
2. Stop the server (or go offline) and edit the note on both clients - different lines on each, and add a photo on one.
3. Start the server again. Both edits are merged and the photo appears on the other client.
4. Repeat, but edit the *same line* on both. The second device to sync shows a conflict banner; open it and choose.

### Web: on-device database assets

The browser runs SQLite in a web worker. `fieldnotes_flutter/web/db_worker.js` and `sqlite3.wasm` are committed; rebuild them with `fieldnotes_flutter/tool/build_web_db_assets.sh` when upgrading Serverpod.

## Limitations (honest list)

- Merge is line-based, so two people editing different words of the *same line* is treated as a conflict.
- Photos taken on one device are compressed to 1600 px / JPEG 80% to sync quickly; there is no photo editing.
- Deleting a note keeps its photos on the server (tombstone only).
- Email verification codes are logged to the server console in development; configure an email provider for production.
