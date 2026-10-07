# FieldNotes

Offline-first notes with photos. Capture notes on mobile with no connection, sync when you're back online, and read/edit them on the web. Built with **Flutter** and **Serverpod 4** for the [Build Something Real Serverpod hackathon](https://builderbase.com/event/build-something-real-the-serverpod-hackathon).

## Goals

- **Mobile + web** from one Flutter codebase, one Serverpod backend.
- **Offline notes with photos** on mobile: local DB + local photo files, an outbox of pending changes.
- **Sync** to the server so the same notes appear on web.
- **Conflict resolution** when the same user edits the same note on two devices and one was offline (per-note version vector / base revision, three-way merge on fields, conflict copy fallback).

## Layout

| Package | Purpose |
| --- | --- |
| `fieldnotes_server` | Serverpod backend (endpoints, models, Postgres) |
| `fieldnotes_client` | Generated client (do not edit) |
| `fieldnotes_flutter` | Flutter app (mobile + web) |

## Running

Requires Flutter >= 3.44.4 (developed on 3.47.6) and the Serverpod CLI (`dart install serverpod_cli`).

```bash
serverpod start
```
