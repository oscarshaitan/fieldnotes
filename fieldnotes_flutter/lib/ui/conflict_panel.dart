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
    final remoteDeleted = note.remoteDeleted ?? false;
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 4, 16, 8),
      padding: const EdgeInsets.fromLTRB(14, 12, 10, 12),
      decoration: BoxDecoration(
        color: scheme.errorContainer,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Icon(Icons.merge_type, color: scheme.onErrorContainer),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              remoteDeleted
                  ? 'This note was deleted remotely, but you edited it locally.'
                  : 'This note was changed remotely while you edited it '
                        'locally, and both touch the same lines.',
              style: TextStyle(color: scheme.onErrorContainer, height: 1.3),
            ),
          ),
          const SizedBox(width: 6),
          FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: scheme.error,
              foregroundColor: scheme.onError,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            ),
            onPressed: () => showConflictDialog(context, repository, note),
            child: const Text('Resolve'),
          ),
        ],
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

enum _Preset { local, remote, combined, custom }

class _ConflictDialog extends StatefulWidget {
  const _ConflictDialog({required this.repository, required this.note});

  final NotesRepository repository;
  final LocalNote note;

  @override
  State<_ConflictDialog> createState() => _ConflictDialogState();
}

class _ConflictDialogState extends State<_ConflictDialog> {
  bool? _split; // null = choose by screen width
  _Preset _preset = _Preset.local;
  bool _applying = false;

  late final _title = TextEditingController(text: note.title);
  late final _body = TextEditingController(text: note.body);

  LocalNote get note => widget.note;
  String get _remoteTitle => note.remoteTitle ?? '';
  String get _remoteBody => note.remoteBody ?? '';

  @override
  void initState() {
    super.initState();
    _title.addListener(_edited);
    _body.addListener(_edited);
  }

  @override
  void dispose() {
    _title.dispose();
    _body.dispose();
    super.dispose();
  }

  void _edited() {
    if (_applying || _preset == _Preset.custom) return;
    setState(() => _preset = _Preset.custom);
  }

  /// Fills the result editor with one of the ready-made outcomes.
  void _apply(_Preset preset) {
    final (title, body) = switch (preset) {
      _Preset.local => (note.title, note.body),
      _Preset.remote => (_remoteTitle, _remoteBody),
      // A single-line title cannot sensibly hold both, so it keeps the local
      // one; the text keeps both sides.
      _Preset.combined => (note.title, combineBoth(_remoteBody, note.body)),
      _Preset.custom => (_title.text, _body.text),
    };
    _applying = true;
    _title.text = title;
    _body.text = body;
    _applying = false;
    setState(() => _preset = preset);
  }

  void _resolve() {
    widget.repository.resolveWithContent(
      note.id,
      title: _title.text,
      body: _body.text,
    );
    Navigator.of(context).pop();
  }

  void _resolveDeletion(ConflictChoice choice) {
    widget.repository.resolveConflict(note.id, choice);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.sizeOf(context);
    final split = _split ?? size.width >= 720;
    final remoteDeleted = note.remoteDeleted ?? false;
    final bothEdited = !note.deleted && !remoteDeleted;

    final titleChanged = _remoteTitle != note.title;
    final bodyChanged = _remoteBody != note.body;
    final titleDiff = diffText(_remoteTitle, note.title);
    final bodyDiff = diffText(_remoteBody, note.body);
    final added = titleDiff.added + bodyDiff.added;
    final removed = titleDiff.removed + bodyDiff.removed;

    return Dialog(
      insetPadding: const EdgeInsets.all(16),
      child: ConstrainedBox(
        constraints: BoxConstraints(
          maxWidth: 980,
          maxHeight: size.height * 0.92,
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
                        ? 'You edited this note locally, but it was deleted remotely.'
                        : note.deleted
                        ? 'You deleted this note locally, but it was edited remotely.'
                        : 'Local and remote both changed the '
                              '${titleChanged && bodyChanged
                                  ? 'title and the text'
                                  : titleChanged
                                  ? 'title'
                                  : 'text'}. '
                              'Pick a starting point, adjust it if you like, then resolve.',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            if (bothEdited) ...[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Wrap(
                  spacing: 14,
                  runSpacing: 8,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    const _Legend(color: Color(0xFFF85149), label: 'Remote'),
                    const _Legend(color: Color(0xFF2EA043), label: 'Local'),
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
            ],
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
                          oldText: _remoteTitle,
                          newText: note.title,
                          oldLabel: 'Remote',
                          newLabel: 'Local',
                          split: split,
                        ),
                        const SizedBox(height: 16),
                      ],
                      if (bodyChanged) ...[
                        Text('Note text', style: theme.textTheme.titleSmall),
                        const SizedBox(height: 6),
                        DiffView(
                          oldText: _remoteBody,
                          newText: note.body,
                          oldLabel: 'Remote',
                          newLabel: 'Local',
                          split: split,
                        ),
                        const SizedBox(height: 20),
                      ],
                      _ResultEditor(
                        preset: _preset,
                        onPreset: _apply,
                        title: _title,
                        body: _body,
                        showTitle: titleChanged,
                        showBody: bodyChanged,
                      ),
                    ] else
                      _DeletionSummary(note: note),
                    const SizedBox(height: 16),
                  ],
                ),
              ),
            ),
            const Divider(),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 14),
              child: Wrap(
                alignment: WrapAlignment.end,
                spacing: 8,
                runSpacing: 6,
                children: [
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: const Text('Decide later'),
                  ),
                  if (bothEdited)
                    FilledButton.icon(
                      onPressed: _resolve,
                      icon: const Icon(Icons.check),
                      label: const Text('Resolve conflict'),
                    )
                  else ...[
                    OutlinedButton(
                      onPressed: () => _resolveDeletion(ConflictChoice.remote),
                      child: Text(
                        remoteDeleted
                            ? 'Accept deletion'
                            : 'Restore remote version',
                      ),
                    ),
                    FilledButton(
                      onPressed: () => _resolveDeletion(ConflictChoice.local),
                      child: Text(
                        remoteDeleted ? 'Keep my note' : 'Delete anyway',
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// The editable outcome: ready-made choices on top, free editing below.
class _ResultEditor extends StatelessWidget {
  const _ResultEditor({
    required this.preset,
    required this.onPreset,
    required this.title,
    required this.body,
    required this.showTitle,
    required this.showBody,
  });

  final _Preset preset;
  final ValueChanged<_Preset> onPreset;
  final TextEditingController title;
  final TextEditingController body;
  final bool showTitle;
  final bool showBody;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;

    Widget chip(_Preset p, IconData icon, String label) => ChoiceChip(
      avatar: Icon(icon, size: 18),
      label: Text(label),
      selected: preset == p,
      showCheckmark: false,
      onSelected: (_) => onPreset(p),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Result', style: theme.textTheme.titleSmall),
        const SizedBox(height: 4),
        Text(
          'This is what both devices will end up with. Start from one side, '
          'or edit it freely.',
          style: theme.textTheme.bodySmall?.copyWith(
            color: scheme.onSurfaceVariant,
          ),
        ),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            chip(_Preset.local, Icons.smartphone, 'Use local'),
            chip(_Preset.remote, Icons.cloud_outlined, 'Use remote'),
            chip(_Preset.combined, Icons.call_merge, 'Combine both'),
            if (preset == _Preset.custom)
              Chip(
                avatar: const Icon(Icons.edit, size: 16),
                label: const Text('Edited by you'),
                backgroundColor: scheme.primaryContainer,
              ),
          ],
        ),
        const SizedBox(height: 12),
        DecoratedBox(
          decoration: BoxDecoration(
            color: scheme.surfaceContainerLow,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: scheme.outlineVariant),
          ),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(14, 6, 14, 6),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (showTitle)
                  TextField(
                    controller: title,
                    style: theme.textTheme.titleMedium,
                    decoration: const InputDecoration(
                      labelText: 'Title',
                      border: InputBorder.none,
                    ),
                  ),
                if (showTitle && showBody)
                  Divider(color: scheme.outlineVariant),
                if (showBody)
                  TextField(
                    controller: body,
                    minLines: 4,
                    maxLines: 14,
                    keyboardType: TextInputType.multiline,
                    style: const TextStyle(
                      fontFamily: 'Menlo',
                      fontFamilyFallback: [
                        'Consolas',
                        'Roboto Mono',
                        'monospace',
                      ],
                      fontSize: 13,
                      height: 1.5,
                    ),
                    decoration: const InputDecoration(
                      labelText: 'Note text',
                      alignLabelWithHint: true,
                      border: InputBorder.none,
                    ),
                  ),
              ],
            ),
          ),
        ),
      ],
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
      color: theme.colorScheme.surfaceContainerLow,
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              remoteDeleted
                  ? 'Local version (deleted remotely)'
                  : 'Remote version (you deleted this note locally)',
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
