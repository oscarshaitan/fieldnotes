import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/material.dart';

import '../data/notes_repository.dart';
import 'photo_widgets.dart';

class NoteList extends StatelessWidget {
  const NoteList({
    super.key,
    required this.repository,
    required this.selectedId,
    required this.onSelect,
  });

  final NotesRepository repository;
  final UuidValue? selectedId;
  final ValueChanged<UuidValue> onSelect;

  @override
  Widget build(BuildContext context) {
    final notes = repository.notes;
    if (notes.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.edit_note,
                size: 64,
                color: Theme.of(context).colorScheme.outline,
              ),
              const SizedBox(height: 12),
              Text(
                'No notes yet',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 4),
              const Text(
                'Notes you write offline are saved on this device and synced '
                'when you are back online.',
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      );
    }
    return ListView.separated(
      padding: const EdgeInsets.only(bottom: 96),
      itemCount: notes.length,
      separatorBuilder: (_, _) => const Divider(height: 1),
      itemBuilder: (context, i) {
        final note = notes[i];
        return _NoteTile(
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

class _NoteTile extends StatelessWidget {
  const _NoteTile({
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
    final scheme = Theme.of(context).colorScheme;
    final title = note.title.trim().isEmpty ? 'Untitled' : note.title.trim();
    final preview = note.body.trim().replaceAll('\n', ' ');
    return ListTile(
      selected: selected,
      selectedTileColor: scheme.secondaryContainer.withValues(alpha: 0.5),
      onTap: onTap,
      title: Text(title, maxLines: 1, overflow: TextOverflow.ellipsis),
      subtitle: Text(
        preview.isEmpty ? 'No text' : preview,
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
      ),
      leading: PhotoThumb(repository: repository, noteId: note.id),
      trailing: note.conflict
          ? Tooltip(
              message: 'Needs your decision',
              child: Icon(Icons.merge_type, color: scheme.error),
            )
          : note.dirty
          ? Tooltip(
              message: 'Waiting to sync',
              child: Icon(Icons.cloud_upload_outlined, color: scheme.tertiary),
            )
          : null,
    );
  }
}
