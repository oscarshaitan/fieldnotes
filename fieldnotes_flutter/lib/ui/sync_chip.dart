import 'package:flutter/material.dart';

import '../data/notes_repository.dart';
import '../data/sync_engine.dart';

/// Shows whether local changes have reached the server. Tap to sync now.
class SyncChip extends StatelessWidget {
  const SyncChip({super.key, required this.repository});

  final NotesRepository repository;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return ListenableBuilder(
      listenable: Listenable.merge([repository, repository.status]),
      builder: (context, _) {
        final pending = repository.pending;
        final (icon, label, color) = switch (repository.status.value) {
          SyncStatus.syncing => (Icons.sync, 'Syncing…', scheme.primary),
          SyncStatus.offline => (
            Icons.cloud_off,
            pending > 0 ? 'Offline · $pending pending' : 'Offline',
            scheme.tertiary,
          ),
          SyncStatus.signedOut => (
            Icons.lock_outline,
            'Signed out',
            scheme.error,
          ),
          SyncStatus.error => (
            Icons.error_outline,
            'Sync problem',
            scheme.error,
          ),
          SyncStatus.synced =>
            pending > 0
                ? (
                    Icons.cloud_upload_outlined,
                    '$pending pending',
                    scheme.tertiary,
                  )
                : (Icons.cloud_done_outlined, 'Synced', scheme.primary),
        };
        return Tooltip(
          message: repository.lastSyncError ?? 'Tap to sync now',
          child: ActionChip(
            avatar: Icon(icon, size: 18, color: color),
            label: Text(label),
            side: BorderSide(color: color.withValues(alpha: 0.4)),
            onPressed: repository.syncNow,
          ),
        );
      },
    );
  }
}
