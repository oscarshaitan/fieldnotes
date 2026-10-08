# Hackathon submission material

## Links

- Repo: https://github.com/oscarshaitan/fieldnotes
- Live web app: https://sync-draft.serverpod.space

## Project description (paste into BuilderBase)

**FieldNotes** is an offline-first notes app with photos for mobile and web, built with Flutter and Serverpod 4.

People who work in the field (inspections, surveys, deliveries) often have no signal exactly when they need to write something down. FieldNotes lets you create and edit notes and attach photos with no connection at all; everything is saved to an on-device SQLite database first. When the device is back online, a sync engine pushes the changes, uploads the photos and pulls whatever changed elsewhere, so the same account shows the notes on the web app.

The hard part is the same user editing the same note on two devices while one is offline. Every edit carries the revision and text it was based on. The Serverpod server compares it with the current note and does a three-way, line-level merge: changes to different lines are merged automatically; if both sides changed the same lines, nothing is overwritten - the app shows a conflict banner and a GitHub-style diff of the local and remote versions (red and green lines, changed words highlighted). The user starts from **Use local**, **Use remote** or **Combine both**, can edit the result freely, and resolves with one button. Edit-versus-delete is also surfaced rather than silently resolved.

**How it uses Serverpod:** YAML models generate the server tables, the typed client and the on-device SQLite tables (`database: client`); a login-protected `SyncEndpoint` handles push/merge, cursor-based pull and photo uploads with Serverpod file-upload descriptions and verification; the ORM with transactions and row locks keeps concurrent pushes consistent; Serverpod auth (email + JWT) keeps the session usable offline; the server also serves the Flutter web build; and `withServerpod` integration tests (embedded Postgres) cover the merge and conflict rules.

**How it was built (AI disclosure):** the app was built by Oscar with Claude Code (Anthropic's AI coding assistant) as a pair-programming and agentic tool, including the Serverpod models, the sync and merge logic, the Flutter UI and the tests. Design decisions, testing on devices and the submission were directed and reviewed by the author. The Serverpod, Flutter and open-source packages used keep their own licences.

**Built with:** Flutter 3.47, Serverpod 4.0.4, SQLite (on-device), PostgreSQL, Serverpod file storage.

**Testing instructions:** open https://sync-draft.serverpod.space and sign up with any email (a verification code is emailed; no payment, free to use). Create a note, attach a photo, then sign in with the same account on a second device or browser to see it sync. To try offline editing and conflicts, run the app from the repo (README, "Running it") and follow "Try the offline + conflict scenario". Build and run instructions are in the README.

## Demo video (rules checklist)

Official rules (https://tinyurl.com/SP-rules): the video must be **less than 2 minutes** (judges need not watch past 2:00 - the "3 minutes" in the announcement is superseded), show the project **working on the device it was built for**, and be **uploaded as a public video on YouTube or Vimeo** with the link in the submission form. No third-party trademarks or copyrighted music. Narration, captions and polish are **not required** (presentation quality is not scored), so a silent screen recording is fine.

Suggested video (about 100 s, two iPhone simulators side by side, same account):
1. **0:00** - Both phones show the same note, chips "Synced".
2. **0:10** - Server off: both chips turn **Offline**.
3. **0:20** - Phone A: add a line and a photo (Pending badge). Phone B: edit a *different* line.
4. **0:45** - Server on: both go Syncing -> Synced and both show the merged note and the photo.
5. **1:05** - Offline again: edit the **same line** on both, reconnect. The second phone shows the red banner; **Resolve** opens the red/green Local vs Remote diff; **Combine both**, edit the result if you like, **Resolve conflict**. Both phones end up identical.
6. **1:45** - Hold on the final state; end.

A scheduled run records this automatically into `~/Projects/fieldnotes-demo/fieldnotes-demo.mp4`; review it, then upload it publicly to YouTube/Vimeo.

## Submission checklist (all required items)
- [ ] Demo video < 2 min, public on YouTube or Vimeo (link in the form)
- [ ] Text description incl. features, how it was built, **AI disclosure** (above)
- [ ] Repository URL: https://github.com/oscarshaitan/fieldnotes (public; build/run instructions in README)
- [ ] Working project to test: https://sync-draft.serverpod.space (free, no restriction until judging ends on 20 Oct 2026)
- [ ] Submit before **14 Oct 2026, 23:59 CEST** (no extensions; drafts can be saved in the BuilderBase account)
- Optional: Best Hackathon Post (public post tagging the hackathon/Serverpod, posted before the deadline) and the Most Valuable Feedback form (actionable feedback on Serverpod/App Studio/docs).
