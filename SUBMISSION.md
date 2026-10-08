# Hackathon submission material

## Links

- Repo: https://github.com/oscarshaitan/fieldnotes
- Live web app: https://sync-draft.serverpod.space

## Project description (paste into BuilderBase)

**FieldNotes** is an offline-first notes app with photos for mobile and web, built with Flutter and Serverpod 4.

People who work in the field (inspections, surveys, deliveries) often have no signal exactly when they need to write something down. FieldNotes lets you create and edit notes and attach photos with no connection at all; everything is saved to an on-device SQLite database first. When the device is back online, a sync engine pushes the changes, uploads the photos and pulls whatever changed elsewhere, so the same account shows the notes on the web app.

The hard part is the same user editing the same note on two devices while one is offline. Every edit carries the revision and text it was based on. The Serverpod server compares it with the current note and does a three-way, line-level merge: changes to different lines are merged automatically; if both sides changed the same lines, nothing is overwritten - the app shows a conflict banner and a GitHub-style diff of the local and remote versions (red and green lines, changed words highlighted). The user starts from **Use local**, **Use remote** or **Combine both**, can edit the result freely, and resolves with one button. Edit-versus-delete is also surfaced rather than silently resolved.

**How it uses Serverpod:** YAML models generate the server tables, the typed client and the on-device SQLite tables (`database: client`); a login-protected `SyncEndpoint` handles push/merge, cursor-based pull and photo uploads with Serverpod file-upload descriptions and verification; the ORM with transactions and row locks keeps concurrent pushes consistent; Serverpod auth (email + JWT) keeps the session usable offline; the server also serves the Flutter web build; and `withServerpod` integration tests (embedded Postgres) cover the merge and conflict rules.

**Built with:** Flutter 3.47, Serverpod 4.0.4, SQLite (on-device), PostgreSQL, Serverpod file storage.

## Demo video script (about 2 minutes - the form says 2 min max, the announcement says 3)

Setup: server running; web app open on the left (http://localhost:8082), iOS simulator on the right, same account signed in on both, one note ("Site visit - Bridge 12") already synced.

1. **0:00** - One line: "Notes with photos that work with no signal, and sync without losing anyone's edits." Show both clients, both "Synced".
2. **0:15** - Stop the server (or toggle offline). Both chips turn to **Offline**.
3. **0:25** - On the phone: add a line and a photo from the gallery. Chip shows "Offline · 1 pending", photo has the upload badge. "All saved on the device."
4. **0:45** - On the web: add a different line to the *same* note.
5. **0:55** - Start the server. Both chips go Syncing → Synced. Show the web note now has **both** lines and the phone's photo, and the phone shows the web's line. "Merged automatically, no data lost."
6. **1:15** - Go offline again and edit the **same line** on both. Reconnect: the second device shows the red conflict banner. Open **Resolve**: the red/green diff of Local vs Remote. Tap **Combine both**, tweak the text in the Result box, press **Resolve conflict** - both devices end up with the same text.
7. **1:50** - Close: "Flutter + Serverpod: models generate the server tables, the client and the on-device database; the merge lives in one tested server function." Show the test run / repo link.

Social bonus: post the clip with a short thread and tag Serverpod (LinkedIn, X @ServerpodDev, or Bluesky @serverpod.dev).
