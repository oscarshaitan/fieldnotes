import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/material.dart';

import '../data/notes_repository.dart';
import 'brand.dart';
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
  String _query = '';

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
    final scheme = Theme.of(context).colorScheme;
    return ListenableBuilder(
      listenable: _repo,
      builder: (context, _) {
        final list = Column(
          children: [
            _SearchField(onChanged: (v) => setState(() => _query = v)),
            Expanded(
              child: NoteList(
                repository: _repo,
                selectedId: wide ? _selected : null,
                onSelect: (id) => _open(id, wide),
                onCreate: () => _newNote(wide),
                query: _query,
              ),
            ),
          ],
        );
        return Scaffold(
          appBar: AppBar(
            toolbarHeight: 64,
            titleSpacing: 16,
            title: const Row(
              children: [
                BrandMark(size: 34),
                SizedBox(width: 10),
                Text('FieldNotes'),
              ],
            ),
            actions: [
              SyncChip(repository: _repo),
              const SizedBox(width: 6),
              PopupMenuButton<void>(
                tooltip: 'Account',
                offset: const Offset(0, 44),
                icon: CircleAvatar(
                  radius: 17,
                  backgroundColor: scheme.primaryContainer,
                  child: Icon(
                    Icons.person_outline,
                    size: 20,
                    color: scheme.onPrimaryContainer,
                  ),
                ),
                itemBuilder: (context) => [
                  PopupMenuItem(
                    onTap: _signOut,
                    child: const Row(
                      children: [
                        Icon(Icons.logout, size: 20),
                        SizedBox(width: 12),
                        Text('Sign out'),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 12),
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
                    SizedBox(width: 400, child: list),
                    VerticalDivider(color: scheme.outlineVariant),
                    Expanded(child: _detailPane(context)),
                  ],
                )
              : list,
        );
      },
    );
  }

  Widget _detailPane(BuildContext context) {
    final id = _selected;
    final scheme = Theme.of(context).colorScheme;
    if (id == null) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.article_outlined, size: 56, color: scheme.outline),
            const SizedBox(height: 12),
            Text(
              'Select a note or create a new one',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: scheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      );
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

class _SearchField extends StatelessWidget {
  const _SearchField({required this.onChanged});

  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 4, 16, 12),
      child: TextField(
        onChanged: onChanged,
        textInputAction: TextInputAction.search,
        decoration: InputDecoration(
          hintText: 'Search notes',
          prefixIcon: const Icon(Icons.search),
          filled: true,
          fillColor: scheme.surfaceContainerLowest,
          contentPadding: const EdgeInsets.symmetric(vertical: 14),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: BorderSide(color: scheme.outlineVariant),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: BorderSide(color: scheme.outlineVariant),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: BorderSide(color: scheme.primary, width: 1.6),
          ),
        ),
      ),
    );
  }
}
