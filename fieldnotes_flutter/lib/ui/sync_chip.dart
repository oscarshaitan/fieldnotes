import 'package:flutter/material.dart';

import '../data/notes_repository.dart';
import '../data/sync_engine.dart';

/// Shows whether local changes have reached the server. Tap to sync now, or
/// to see the details when something went wrong.
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
          SyncStatus.syncing => (Icons.sync, 'Syncing', scheme.primary),
          SyncStatus.offline => (
            Icons.cloud_off_outlined,
            pending > 0 ? 'Offline · $pending' : 'Offline',
            scheme.tertiary,
          ),
          SyncStatus.signedOut => (
            Icons.lock_outline,
            'Signed out',
            scheme.error,
          ),
          SyncStatus.error => (
            Icons.error_outline,
            repository.photoFailures > 0 ? 'Photo failed' : 'Sync problem',
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
          child: Material(
            color: color.withValues(alpha: 0.12),
            shape: const StadiumBorder(),
            child: InkWell(
              customBorder: const StadiumBorder(),
              onTap: () {
                repository.syncNow();
                final error = repository.lastSyncError;
                if (repository.status.value == SyncStatus.error &&
                    error != null) {
                  showDialog<void>(
                    context: context,
                    builder: (context) => AlertDialog(
                      title: const Text('Sync problem'),
                      content: SelectableText(error),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.pop(context),
                          child: const Text('Close'),
                        ),
                      ],
                    ),
                  );
                }
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 7,
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(icon, size: 16, color: color),
                    const SizedBox(width: 6),
                    Text(
                      label,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: color,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
