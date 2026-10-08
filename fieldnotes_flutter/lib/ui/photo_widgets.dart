import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../data/notes_repository.dart';

/// Photo bytes as a [Uint8List]. The same list is reused for the same photo so
/// Flutter's image cache recognises it and does not decode (and flash) again.
final _bytesCache = <String, Uint8List>{};

Uint8List _bytesOf(LocalPhoto photo) {
  final cached = _bytesCache[photo.id.toString()];
  if (cached != null) return cached;
  final data = photo.data!;
  final bytes = data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);
  if (_bytesCache.length > 60) _bytesCache.remove(_bytesCache.keys.first);
  return _bytesCache[photo.id.toString()] = bytes;
}

/// Loads a note's photos and reloads only when photos actually changed. The
/// previous photos stay on screen while reloading, so nothing blinks.
class _NotePhotos extends StatefulWidget {
  const _NotePhotos({
    required this.repository,
    required this.noteId,
    required this.builder,
  });

  final NotesRepository repository;
  final UuidValue noteId;
  final Widget Function(BuildContext context, List<LocalPhoto> photos) builder;

  @override
  State<_NotePhotos> createState() => _NotePhotosState();
}

class _NotePhotosState extends State<_NotePhotos> {
  List<LocalPhoto> _photos = const [];
  int _loadedVersion = -1;

  @override
  void initState() {
    super.initState();
    widget.repository.addListener(_maybeReload);
    _reload();
  }

  @override
  void dispose() {
    widget.repository.removeListener(_maybeReload);
    super.dispose();
  }

  void _maybeReload() {
    if (widget.repository.photosVersion != _loadedVersion) _reload();
  }

  Future<void> _reload() async {
    final version = widget.repository.photosVersion;
    _loadedVersion = version;
    final photos = await widget.repository.photosFor(widget.noteId);
    if (!mounted) return;
    setState(() => _photos = photos);
  }

  @override
  Widget build(BuildContext context) => widget.builder(context, _photos);
}

/// Small preview of a note's first photo, or a note icon when it has none.
class PhotoThumb extends StatelessWidget {
  const PhotoThumb({super.key, required this.repository, required this.noteId});

  final NotesRepository repository;
  final UuidValue noteId;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return SizedBox.square(
      dimension: 52,
      child: _NotePhotos(
        repository: repository,
        noteId: noteId,
        builder: (context, photos) {
          final withData = photos.where((p) => p.data != null);
          return ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: withData.isEmpty
                ? ColoredBox(
                    color: scheme.surfaceContainerHighest,
                    child: Icon(
                      photos.isEmpty ? Icons.notes : Icons.image_outlined,
                      color: scheme.onSurfaceVariant,
                    ),
                  )
                : Image.memory(
                    _bytesOf(withData.first),
                    fit: BoxFit.cover,
                    cacheWidth: 160,
                    gaplessPlayback: true,
                  ),
          );
        },
      ),
    );
  }
}

/// Horizontal strip of a note's photos with add / remove actions.
class PhotoStrip extends StatelessWidget {
  const PhotoStrip({
    super.key,
    required this.repository,
    required this.noteId,
    this.enabled = true,
  });

  final NotesRepository repository;
  final UuidValue noteId;
  final bool enabled;

  bool get _canUseCamera =>
      !kIsWeb &&
      (defaultTargetPlatform == TargetPlatform.iOS ||
          defaultTargetPlatform == TargetPlatform.android);

  Future<void> _pick(BuildContext context, ImageSource source) async {
    final messenger = ScaffoldMessenger.of(context);
    try {
      final file = await ImagePicker().pickImage(
        source: source,
        // Keep photos small enough to sync quickly on a bad connection.
        maxWidth: 1600,
        maxHeight: 1600,
        imageQuality: 80,
      );
      if (file == null) return;
      final bytes = await file.readAsBytes();
      await repository.addPhoto(noteId, bytes, _mimeType(file));
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(content: Text('Could not add photo: $e')),
      );
    }
  }

  String _mimeType(XFile file) {
    final declared = file.mimeType;
    if (declared != null && declared.startsWith('image/')) {
      const supported = {'image/jpeg', 'image/png', 'image/webp', 'image/gif'};
      if (supported.contains(declared)) return declared;
    }
    final name = file.name.toLowerCase();
    if (name.endsWith('.png')) return 'image/png';
    if (name.endsWith('.webp')) return 'image/webp';
    if (name.endsWith('.gif')) return 'image/gif';
    return 'image/jpeg';
  }

  @override
  Widget build(BuildContext context) {
    return _NotePhotos(
      repository: repository,
      noteId: noteId,
      builder: (context, photos) {
        return SizedBox(
          height: 104,
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            children: [
              if (_canUseCamera)
                _AddTile(
                  icon: Icons.photo_camera_outlined,
                  label: 'Camera',
                  onTap: enabled
                      ? () => _pick(context, ImageSource.camera)
                      : null,
                ),
              _AddTile(
                icon: Icons.add_photo_alternate_outlined,
                label: _canUseCamera ? 'Gallery' : 'Add photo',
                onTap: enabled
                    ? () => _pick(context, ImageSource.gallery)
                    : null,
              ),
              for (final photo in photos)
                _PhotoTile(
                  key: ValueKey(photo.id),
                  repository: repository,
                  photo: photo,
                  enabled: enabled,
                ),
            ],
          ),
        );
      },
    );
  }
}

class _AddTile extends StatelessWidget {
  const _AddTile({required this.icon, required this.label, this.onTap});

  final IconData icon;
  final String label;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Padding(
      padding: const EdgeInsets.only(right: 8, top: 4, bottom: 4),
      child: Material(
        color: scheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(14),
        child: InkWell(
          borderRadius: BorderRadius.circular(14),
          onTap: onTap,
          child: SizedBox(
            width: 88,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon),
                const SizedBox(height: 4),
                Text(label, style: Theme.of(context).textTheme.labelSmall),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _PhotoTile extends StatelessWidget {
  const _PhotoTile({
    super.key,
    required this.repository,
    required this.photo,
    required this.enabled,
  });

  final NotesRepository repository;
  final LocalPhoto photo;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final data = photo.data;
    return Padding(
      padding: const EdgeInsets.only(right: 8, top: 4, bottom: 4),
      child: Stack(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(14),
            child: SizedBox(
              width: 96,
              height: 96,
              child: data == null
                  // Taken on another device, bytes still downloading.
                  ? ColoredBox(
                      color: scheme.surfaceContainerHighest,
                      child: const Center(
                        child: SizedBox.square(
                          dimension: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        ),
                      ),
                    )
                  : InkWell(
                      onTap: () => showDialog<void>(
                        context: context,
                        builder: (_) => _PhotoViewer(bytes: _bytesOf(photo)),
                      ),
                      child: Image.memory(
                        _bytesOf(photo),
                        fit: BoxFit.cover,
                        cacheWidth: 300,
                        gaplessPlayback: true,
                      ),
                    ),
            ),
          ),
          if (!photo.uploaded)
            Positioned(
              left: 6,
              bottom: 6,
              child: Tooltip(
                message: 'Waiting to upload',
                child: CircleAvatar(
                  radius: 10,
                  backgroundColor: scheme.tertiaryContainer,
                  child: Icon(
                    Icons.cloud_upload_outlined,
                    size: 13,
                    color: scheme.onTertiaryContainer,
                  ),
                ),
              ),
            ),
          if (enabled)
            Positioned(
              right: 2,
              top: 2,
              child: InkWell(
                onTap: () => repository.removePhoto(photo),
                child: CircleAvatar(
                  radius: 11,
                  backgroundColor: Colors.black54,
                  child: const Icon(Icons.close, size: 14, color: Colors.white),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _PhotoViewer extends StatelessWidget {
  const _PhotoViewer({required this.bytes});

  final Uint8List bytes;

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.black,
      insetPadding: const EdgeInsets.all(12),
      child: Stack(
        children: [
          InteractiveViewer(child: Image.memory(bytes, fit: BoxFit.contain)),
          Positioned(
            right: 4,
            top: 4,
            child: IconButton(
              icon: const Icon(Icons.close, color: Colors.white),
              onPressed: () => Navigator.of(context).pop(),
            ),
          ),
        ],
      ),
    );
  }
}
