import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/material.dart';

import '../data/line_diff.dart';
import '../data/notes_repository.dart';
import 'diff_view.dart';

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

class _ConflictDialog extends StatefulWidget {
  const _ConflictDialog({required this.repository, required this.note});

  final NotesRepository repository;
  final LocalNote note;

  @override
  State<_ConflictDialog> createState() => _ConflictDialogState();
}

class _ConflictDialogState extends State<_ConflictDialog> {
  bool? _split; // null = choose by screen width

  LocalNote get note => widget.note;

  void _choose(ConflictChoice choice) {
    widget.repository.resolveConflict(note.id, choice);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.sizeOf(context);
    final wide = size.width >= 720;
    final split = _split ?? wide;
    final remoteDeleted = note.remoteDeleted ?? false;
    final bothEdited = !note.deleted && !remoteDeleted;

    final remoteTitle = note.remoteTitle ?? '';
    final remoteBody = note.remoteBody ?? '';
    final bodyDiff = diffText(remoteBody, note.body);
    final titleDiff = diffText(remoteTitle, note.title);
    final titleChanged = remoteTitle != note.title;
    final bodyChanged = remoteBody != note.body;
    final added = titleDiff.added + bodyDiff.added;
    final removed = titleDiff.removed + bodyDiff.removed;

    return Dialog(
      insetPadding: const EdgeInsets.all(16),
      child: ConstrainedBox(
        constraints: BoxConstraints(
          maxWidth: 980,
          maxHeight: size.height * 0.9,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 20, 24, 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Resolve conflict', style: theme.textTheme.titleLarge),
                  const SizedBox(height: 4),
                  Text(
                    remoteDeleted
                        ? 'You edited this note, but it was deleted on another device.'
                        : note.deleted
                        ? 'You deleted this note, but it was edited on another device.'
                        : 'Both devices changed the ${titleChanged && bodyChanged
                              ? 'title and the text'
                              : titleChanged
                              ? 'title'
                              : 'text'} of this note differently. Compare them below.',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            if (bothEdited)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Wrap(
                  spacing: 12,
                  runSpacing: 8,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    _Legend(
                      color: const Color(0xFFF85149),
                      label: 'Only on the other device',
                    ),
                    _Legend(
                      color: const Color(0xFF2EA043),
                      label: 'Only in your version',
                    ),
                    Text(
                      '+$added  −$removed lines',
                      style: theme.textTheme.labelMedium,
                    ),
                    SegmentedButton<bool>(
                      showSelectedIcon: false,
                      style: const ButtonStyle(
                        visualDensity: VisualDensity.compact,
                      ),
                      segments: const [
                        ButtonSegment(value: true, label: Text('Side by side')),
                        ButtonSegment(value: false, label: Text('Unified')),
                      ],
                      selected: {split},
                      onSelectionChanged: (v) =>
                          setState(() => _split = v.first),
                    ),
                  ],
                ),
              ),
            const SizedBox(height: 12),
            Flexible(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (bothEdited) ...[
                      if (titleChanged) ...[
                        Text('Title', style: theme.textTheme.titleSmall),
                        const SizedBox(height: 6),
                        DiffView(
                          oldText: remoteTitle,
                          newText: note.title,
                          oldLabel: 'Other device',
                          newLabel: 'Your version',
                          split: split,
                        ),
                        const SizedBox(height: 16),
                      ],
                      if (bodyChanged) ...[
                        Text('Note text', style: theme.textTheme.titleSmall),
                        const SizedBox(height: 6),
                        DiffView(
                          oldText: remoteBody,
                          newText: note.body,
                          oldLabel: 'Other device',
                          newLabel: 'Your version',
                          split: split,
                        ),
                      ],
                    ] else
                      _DeletionSummary(note: note),
                    const SizedBox(height: 16),
                  ],
                ),
              ),
            ),
            const Divider(height: 1),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
              child: Wrap(
                alignment: WrapAlignment.end,
                spacing: 8,
                runSpacing: 4,
                children: [
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: const Text('Decide later'),
                  ),
                  OutlinedButton(
                    onPressed: () => _choose(ConflictChoice.theirs),
                    child: const Text('Keep other device'),
                  ),
                  if (bothEdited)
                    OutlinedButton(
                      onPressed: () => _choose(ConflictChoice.both),
                      child: const Text('Keep both'),
                    ),
                  FilledButton(
                    onPressed: () => _choose(ConflictChoice.mine),
                    child: Text(note.deleted ? 'Delete anyway' : 'Keep mine'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Legend extends StatelessWidget {
  const _Legend({required this.color, required this.label});

  final Color color;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.35),
            border: Border.all(color: color),
            borderRadius: BorderRadius.circular(3),
          ),
        ),
        const SizedBox(width: 6),
        Text(label, style: Theme.of(context).textTheme.labelMedium),
      ],
    );
  }
}

/// Shown when one side deleted the note: there is nothing to diff, so show
/// the surviving version.
class _DeletionSummary extends StatelessWidget {
  const _DeletionSummary({required this.note});

  final LocalNote note;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final remoteDeleted = note.remoteDeleted ?? false;
    final title = remoteDeleted ? note.title : (note.remoteTitle ?? '');
    final body = remoteDeleted ? note.body : (note.remoteBody ?? '');
    return Card(
      margin: EdgeInsets.zero,
      color: theme.colorScheme.surfaceContainerHighest,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              remoteDeleted
                  ? 'Your version (deleted on the other device)'
                  : 'Other device version (you deleted this note)',
              style: theme.textTheme.labelLarge,
            ),
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
