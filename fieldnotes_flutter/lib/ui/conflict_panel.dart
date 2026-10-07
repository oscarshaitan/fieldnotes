import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/material.dart';

import '../data/notes_repository.dart';

/// Banner shown on a note that the server could not merge automatically.
class ConflictBanner extends StatelessWidget {
  const ConflictBanner({
    super.key,
    required this.repository,
    required this.note,
  });

  final NotesRepository repository;
  final LocalNote note;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Material(
      color: scheme.errorContainer,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 8, 12),
        child: Row(
          children: [
            Icon(Icons.merge_type, color: scheme.onErrorContainer),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                (note.remoteDeleted ?? false)
                    ? 'This note was deleted on another device, but you edited it.'
                    : 'This note was changed on another device while you were '
                          'editing it. Both versions touch the same lines.',
                style: TextStyle(color: scheme.onErrorContainer),
              ),
            ),
            TextButton(
              onPressed: () => showConflictDialog(context, repository, note),
              child: const Text('Resolve'),
            ),
          ],
        ),
      ),
    );
  }
}

Future<void> showConflictDialog(
  BuildContext context,
  NotesRepository repository,
  LocalNote note,
) {
  return showDialog<void>(
    context: context,
    builder: (context) => _ConflictDialog(repository: repository, note: note),
  );
}

class _ConflictDialog extends StatelessWidget {
  const _ConflictDialog({required this.repository, required this.note});

  final NotesRepository repository;
  final LocalNote note;

  void _choose(BuildContext context, ConflictChoice choice) {
    repository.resolveConflict(note.id, choice);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final remoteDeleted = note.remoteDeleted ?? false;
    final wide = MediaQuery.sizeOf(context).width > 640;
    final mine = _VersionCard(
      heading: note.deleted ? 'Your version (deleted)' : 'Your version',
      title: note.title,
      body: note.body,
    );
    final theirs = _VersionCard(
      heading: remoteDeleted ? 'Other device (deleted)' : 'Other device',
      title: note.remoteTitle ?? '',
      body: note.remoteBody ?? '',
    );
    return AlertDialog(
      title: const Text('Resolve conflict'),
      content: SizedBox(
        width: 720,
        child: SingleChildScrollView(
          child: wide
              ? Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: mine),
                    const SizedBox(width: 12),
                    Expanded(child: theirs),
                  ],
                )
              : Column(children: [mine, const SizedBox(height: 12), theirs]),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Decide later'),
        ),
        TextButton(
          onPressed: () => _choose(context, ConflictChoice.theirs),
          child: const Text('Keep other device'),
        ),
        if (!note.deleted && !remoteDeleted)
          OutlinedButton(
            onPressed: () => _choose(context, ConflictChoice.both),
            child: const Text('Keep both'),
          ),
        FilledButton(
          onPressed: () => _choose(context, ConflictChoice.mine),
          child: Text(note.deleted ? 'Delete anyway' : 'Keep mine'),
        ),
      ],
    );
  }
}

class _VersionCard extends StatelessWidget {
  const _VersionCard({
    required this.heading,
    required this.title,
    required this.body,
  });

  final String heading;
  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      margin: EdgeInsets.zero,
      color: theme.colorScheme.surfaceContainerHighest,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(heading, style: theme.textTheme.labelLarge),
            const SizedBox(height: 8),
            Text(
              title.isEmpty ? 'Untitled' : title,
              style: theme.textTheme.titleMedium,
            ),
            const SizedBox(height: 6),
            Text(body.isEmpty ? 'No text' : body),
          ],
        ),
      ),
    );
  }
}
