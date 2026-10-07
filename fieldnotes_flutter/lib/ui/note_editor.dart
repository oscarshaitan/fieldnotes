import 'dart:async';

import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/material.dart';

import '../data/notes_repository.dart';
import 'conflict_panel.dart';
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
    final locked = note?.conflict ?? false;
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: widget.showBack,
        title: Text(
          note == null || note.dirty ? 'Saved on this device' : 'Synced',
          style: theme.textTheme.labelLarge?.copyWith(
            color: theme.colorScheme.outline,
          ),
        ),
        actions: [
          IconButton(
            tooltip: 'Delete note',
            icon: const Icon(Icons.delete_outline),
            onPressed: _confirmDelete,
          ),
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
                    padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        TextField(
                          controller: _title,
                          readOnly: locked,
                          style: theme.textTheme.headlineSmall,
                          textCapitalization: TextCapitalization.sentences,
                          decoration: const InputDecoration(hintText: 'Title'),
                        ),
                        TextField(
                          controller: _body,
                          readOnly: locked,
                          minLines: 10,
                          maxLines: null,
                          keyboardType: TextInputType.multiline,
                          textCapitalization: TextCapitalization.sentences,
                          style: theme.textTheme.bodyLarge,
                          decoration: const InputDecoration(
                            hintText: 'Write your note…',
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const Divider(height: 1),
                SafeArea(
                  top: false,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: PhotoStrip(
                      repository: _repo,
                      noteId: widget.noteId,
                      enabled: !locked,
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}
