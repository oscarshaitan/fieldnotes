import 'dart:async';

import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../data/notes_repository.dart';
import 'conflict_panel.dart';
import 'format.dart';
import 'photo_widgets.dart';

/// Edits one note. Every keystroke batch is written to the local database;
/// syncing happens in the background, so this works the same offline.
class NoteEditor extends StatefulWidget {
  const NoteEditor({
    super.key,
    required this.repository,
    required this.noteId,
    required this.onClosed,
    this.showBack = true,
  });

  final NotesRepository repository;
  final UuidValue noteId;

  /// Called when the note is deleted or no longer exists.
  final VoidCallback onClosed;
  final bool showBack;

  @override
  State<NoteEditor> createState() => _NoteEditorState();
}

class _NoteEditorState extends State<NoteEditor> {
  final _title = TextEditingController();
  final _body = TextEditingController();
  LocalNote? _note;
  Timer? _saveTimer;
  bool _applyingRemote = false;

  NotesRepository get _repo => widget.repository;

  @override
  void initState() {
    super.initState();
    _title.addListener(_onTyped);
    _body.addListener(_onTyped);
    _repo.addListener(_onRepositoryChanged);
    _onRepositoryChanged();
  }

  @override
  void dispose() {
    _repo.removeListener(_onRepositoryChanged);
    if (_saveTimer?.isActive ?? false) _flush();
    _saveTimer?.cancel();
    _title.dispose();
    _body.dispose();
    _repo.discardIfEmpty(widget.noteId);
    super.dispose();
  }

  void _onTyped() {
    if (_applyingRemote || _note == null) return;
    _saveTimer?.cancel();
    _saveTimer = Timer(const Duration(milliseconds: 250), _flush);
  }

  void _flush() {
    _saveTimer?.cancel();
    _repo.updateNote(widget.noteId, title: _title.text, body: _body.text);
  }

  Future<void> _onRepositoryChanged() async {
    final note = await _repo.note(widget.noteId);
    if (!mounted) return;
    if (note == null || note.deleted) {
      widget.onClosed();
      return;
    }
    setState(() => _note = note);
    // Pick up changes that arrived from another device, unless the user is
    // in the middle of typing.
    if (_saveTimer?.isActive ?? false) return;
    _setText(_title, note.title);
    _setText(_body, note.body);
  }

  void _setText(TextEditingController c, String text) {
    if (c.text == text) return;
    _applyingRemote = true;
    final offset = c.selection.baseOffset.clamp(0, text.length);
    c.value = TextEditingValue(
      text: text,
      selection: TextSelection.collapsed(offset: offset),
    );
    _applyingRemote = false;
  }

  Future<void> _confirmDelete() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete note?'),
        content: const Text('It will be removed from all your devices.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
    if (ok ?? false) {
      _saveTimer?.cancel();
      await _repo.deleteNote(widget.noteId);
    }
  }

  @override
  Widget build(BuildContext context) {
    final note = _note;
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;
    final locked = note?.conflict ?? false;
    final words = wordCount(_body.text);
    return Scaffold(
      backgroundColor: scheme.surfaceContainerLowest,
      appBar: AppBar(
        automaticallyImplyLeading: widget.showBack,
        title: _StatusPill(note: note),
        actions: [
          IconButton(
            tooltip: 'Delete note',
            icon: const Icon(Icons.delete_outline),
            onPressed: _confirmDelete,
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: note == null
          ? const SizedBox.shrink()
          : Column(
              children: [
                if (note.conflict)
                  ConflictBanner(repository: _repo, note: note),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.only(bottom: 24),
                    child: Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 760),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.fromLTRB(24, 8, 24, 0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  TextField(
                                    controller: _title,
                                    readOnly: locked,
                                    style: theme.textTheme.headlineMedium,
                                    textCapitalization:
                                        TextCapitalization.sentences,
                                    maxLines: null,
                                    decoration: InputDecoration(
                                      hintText: 'Title',
                                      hintStyle: theme.textTheme.headlineMedium
                                          ?.copyWith(color: scheme.outline),
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(
                                      top: 2,
                                      bottom: 14,
                                    ),
                                    child: Text(
                                      'Edited ${timeAgo(note.updatedAt)}'
                                      '  ·  $words ${words == 1 ? 'word' : 'words'}',
                                      style: theme.textTheme.labelMedium
                                          ?.copyWith(color: scheme.outline),
                                    ),
                                  ),
                                  TextField(
                                    controller: _body,
                                    readOnly: locked,
                                    minLines: 8,
                                    maxLines: null,
                                    keyboardType: TextInputType.multiline,
                                    textCapitalization:
                                        TextCapitalization.sentences,
                                    style: theme.textTheme.bodyLarge,
                                    decoration: InputDecoration(
                                      hintText: 'Start writing…',
                                      hintStyle: theme.textTheme.bodyLarge
                                          ?.copyWith(color: scheme.outline),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 16),
                            PhotoGallery(
                              repository: _repo,
                              noteId: widget.noteId,
                              enabled: !locked,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                _ActionBar(
                  enabled: !locked,
                  onCamera: () => pickPhoto(
                    context,
                    _repo,
                    widget.noteId,
                    ImageSource.camera,
                  ),
                  onGallery: () => pickPhoto(
                    context,
                    _repo,
                    widget.noteId,
                    ImageSource.gallery,
                  ),
                ),
              ],
            ),
    );
  }
}

/// "Saved on this device" / "Synced" pill in the app bar.
class _StatusPill extends StatelessWidget {
  const _StatusPill({required this.note});

  final LocalNote? note;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final n = note;
    final (icon, label, color) = n == null
        ? (Icons.hourglass_empty, '', scheme.outline)
        : n.conflict
        ? (Icons.merge_type, 'Conflict', scheme.error)
        : n.dirty
        ? (Icons.cloud_upload_outlined, 'Saved on this device', scheme.tertiary)
        : (Icons.cloud_done_outlined, 'Synced', scheme.primary);
    if (n == null) return const SizedBox.shrink();
    return DecoratedBox(
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 15, color: color),
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
    );
  }
}

class _ActionBar extends StatelessWidget {
  const _ActionBar({
    required this.enabled,
    required this.onCamera,
    required this.onGallery,
  });

  final bool enabled;
  final VoidCallback onCamera;
  final VoidCallback onGallery;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return DecoratedBox(
      decoration: BoxDecoration(
        color: scheme.surfaceContainerLowest,
        border: Border(top: BorderSide(color: scheme.outlineVariant)),
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Row(
            children: [
              if (canUseCamera) ...[
                FilledButton.tonalIcon(
                  onPressed: enabled ? onCamera : null,
                  icon: const Icon(Icons.photo_camera_outlined),
                  label: const Text('Camera'),
                ),
                const SizedBox(width: 8),
              ],
              FilledButton.tonalIcon(
                onPressed: enabled ? onGallery : null,
                icon: const Icon(Icons.add_photo_alternate_outlined),
                label: Text(canUseCamera ? 'Gallery' : 'Add photo'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
