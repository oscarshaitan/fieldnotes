import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/material.dart';

import '../data/notes_repository.dart';
import 'format.dart';
import 'photo_widgets.dart';

/// Cards for all notes matching [query], newest first.
class NoteList extends StatelessWidget {
  const NoteList({
    super.key,
    required this.repository,
    required this.selectedId,
    required this.onSelect,
    required this.onCreate,
    this.query = '',
  });

  final NotesRepository repository;
  final UuidValue? selectedId;
  final ValueChanged<UuidValue> onSelect;
  final VoidCallback onCreate;
  final String query;

  @override
  Widget build(BuildContext context) {
    final q = query.trim().toLowerCase();
    final notes = q.isEmpty
        ? repository.notes
        : repository.notes
              .where(
                (n) =>
                    n.title.toLowerCase().contains(q) ||
                    n.body.toLowerCase().contains(q),
              )
              .toList();

    if (repository.notes.isEmpty) {
      return _EmptyState(onCreate: onCreate);
    }
    if (notes.isEmpty) {
      return _Message(
        icon: Icons.search_off,
        title: 'No matches',
        text: 'Nothing found for "${query.trim()}".',
      );
    }
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(16, 4, 16, 110),
      itemCount: notes.length,
      separatorBuilder: (_, _) => const SizedBox(height: 12),
      itemBuilder: (context, i) {
        final note = notes[i];
        return _NoteCard(
          key: ValueKey(note.id),
          repository: repository,
          note: note,
          selected: note.id == selectedId,
          onTap: () => onSelect(note.id),
        );
      },
    );
  }
}

class _NoteCard extends StatelessWidget {
  const _NoteCard({
    super.key,
    required this.repository,
    required this.note,
    required this.selected,
    required this.onTap,
  });

  final NotesRepository repository;
  final LocalNote note;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;
    final title = note.title.trim().isEmpty ? 'Untitled' : note.title.trim();
    final preview = note.body.trim();
    return Card(
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: BorderSide(
          color: note.conflict
              ? scheme.error
              : selected
              ? scheme.primary
              : scheme.outlineVariant,
          width: selected || note.conflict ? 1.6 : 1,
        ),
      ),
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            PhotoCover(repository: repository, noteId: note.id),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.titleMedium,
                  ),
                  if (preview.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(
                      preview,
                      maxLines: 3,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: scheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Text(
                        timeAgo(note.updatedAt),
                        style: theme.textTheme.labelMedium?.copyWith(
                          color: scheme.outline,
                        ),
                      ),
                      const Spacer(),
                      if (note.conflict)
                        _Badge(
                          icon: Icons.merge_type,
                          label: 'Conflict',
                          color: scheme.error,
                        )
                      else if (note.dirty)
                        _Badge(
                          icon: Icons.cloud_upload_outlined,
                          label: 'Pending',
                          color: scheme.tertiary,
                        ),
                    ],
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

class _Badge extends StatelessWidget {
  const _Badge({required this.icon, required this.label, required this.color});

  final IconData icon;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 14, color: color),
            const SizedBox(width: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  const _EmptyState({required this.onCreate});

  final VoidCallback onCreate;

  @override
  Widget build(BuildContext context) {
    return _Message(
      icon: Icons.edit_note_rounded,
      title: 'Capture your first note',
      text:
          'Write and attach photos anywhere, even with no signal. Everything '
          'syncs when you are back online.',
      action: FilledButton.icon(
        onPressed: onCreate,
        icon: const Icon(Icons.add),
        label: const Text('New note'),
      ),
    );
  }
}

class _Message extends StatelessWidget {
  const _Message({
    required this.icon,
    required this.title,
    required this.text,
    this.action,
  });

  final IconData icon;
  final String title;
  final String text;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 340),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 84,
                height: 84,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      scheme.primaryContainer,
                      scheme.primary.withValues(alpha: 0.35),
                    ],
                  ),
                ),
                child: Icon(icon, size: 40, color: scheme.onPrimaryContainer),
              ),
              const SizedBox(height: 20),
              Text(
                title,
                textAlign: TextAlign.center,
                style: theme.textTheme.titleLarge,
              ),
              const SizedBox(height: 8),
              Text(
                text,
                textAlign: TextAlign.center,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: scheme.onSurfaceVariant,
                ),
              ),
              if (action != null) ...[const SizedBox(height: 20), action!],
            ],
          ),
        ),
      ),
    );
  }
}
