import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/material.dart';

import '../data/notes_repository.dart';
import 'note_editor.dart';
import 'note_list.dart';
import 'sync_chip.dart';

/// Phones show the list and push the editor; wide screens (web, tablets) show
/// both side by side.
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key, required this.repository});

  final NotesRepository repository;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  static const _wideBreakpoint = 840.0;

  UuidValue? _selected;

  NotesRepository get _repo => widget.repository;

  Future<void> _newNote(bool wide) async {
    final note = await _repo.createNote();
    if (!mounted) return;
    _open(note.id, wide);
  }

  void _open(UuidValue id, bool wide) {
    if (wide) {
      setState(() => _selected = id);
    } else {
      Navigator.of(context).push(
        MaterialPageRoute<void>(
          builder: (context) => NoteEditor(
            repository: _repo,
            noteId: id,
            onClosed: () => Navigator.of(context).maybePop(),
          ),
        ),
      );
    }
  }

  Future<void> _signOut() async {
    if (_repo.pending > 0) {
      final ok = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Sign out with unsynced changes?'),
          content: Text(
            '${_repo.pending} change(s) have not reached the server yet and '
            'will be lost. Connect to the internet first to keep them.',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: const Text('Cancel'),
            ),
            FilledButton(
              onPressed: () => Navigator.pop(context, true),
              child: const Text('Sign out anyway'),
            ),
          ],
        ),
      );
      if (!(ok ?? false)) return;
    }
    await _repo.signOut();
  }

  @override
  Widget build(BuildContext context) {
    final wide = MediaQuery.sizeOf(context).width >= _wideBreakpoint;
    return ListenableBuilder(
      listenable: _repo,
      builder: (context, _) {
        final list = NoteList(
          repository: _repo,
          selectedId: wide ? _selected : null,
          onSelect: (id) => _open(id, wide),
        );
        return Scaffold(
          appBar: AppBar(
            title: const Row(
              children: [
                Icon(Icons.edit_note),
                SizedBox(width: 8),
                Text('FieldNotes'),
              ],
            ),
            actions: [
              SyncChip(repository: _repo),
              PopupMenuButton<void>(
                tooltip: 'Account',
                icon: const Icon(Icons.account_circle_outlined),
                itemBuilder: (context) => [
                  PopupMenuItem(onTap: _signOut, child: const Text('Sign out')),
                ],
              ),
              const SizedBox(width: 8),
            ],
          ),
          floatingActionButton: FloatingActionButton.extended(
            onPressed: () => _newNote(wide),
            icon: const Icon(Icons.add),
            label: const Text('New note'),
          ),
          body: wide
              ? Row(
                  children: [
                    SizedBox(width: 380, child: list),
                    const VerticalDivider(width: 1),
                    Expanded(child: _detailPane()),
                  ],
                )
              : list,
        );
      },
    );
  }

  Widget _detailPane() {
    final id = _selected;
    if (id == null) {
      return const Center(child: Text('Select or create a note'));
    }
    return NoteEditor(
      key: ValueKey(id),
      repository: _repo,
      noteId: id,
      showBack: false,
      onClosed: () {
        if (mounted && _selected == id) setState(() => _selected = null);
      },
    );
  }
}
