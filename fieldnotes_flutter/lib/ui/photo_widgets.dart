
import 'package:fieldnotes_client/fieldnotes_client.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../data/notes_repository.dart';

Uint8List _bytesOf(ByteData data) =>
    data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);

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
      child: FutureBuilder<List<LocalPhoto>>(
        // `version` changes whenever photos may have changed.
        key: ValueKey((noteId, repository.version)),
        future: repository.photosFor(noteId),
        builder: (context, snapshot) {
          final photos = snapshot.data ?? const <LocalPhoto>[];
          final data = photos.map((p) => p.data).whereType<ByteData>();
          return ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: data.isEmpty
                ? ColoredBox(
                    color: scheme.surfaceContainerHighest,
                    child: Icon(
                      photos.isEmpty ? Icons.notes : Icons.image_outlined,
                      color: scheme.onSurfaceVariant,
                    ),
                  )
                : Image.memory(
                    _bytesOf(data.first),
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
    return ListenableBuilder(
      listenable: repository,
      builder: (context, _) {
        return FutureBuilder<List<LocalPhoto>>(
          key: ValueKey((noteId, repository.version)),
          future: repository.photosFor(noteId),
          builder: (context, snapshot) {
            final photos = snapshot.data ?? const <LocalPhoto>[];
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
                      repository: repository,
                      photo: photo,
                      enabled: enabled,
                    ),
                ],
              ),
            );
          },
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
                        builder: (_) => _PhotoViewer(bytes: _bytesOf(data)),
                      ),
                      child: Image.memory(
                        _bytesOf(data),
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
