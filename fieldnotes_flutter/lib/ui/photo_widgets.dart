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
    _loadedVersion = widget.repository.photosVersion;
    final photos = await widget.repository.photosFor(widget.noteId);
    if (!mounted) return;
    setState(() => _photos = photos);
  }

  @override
  Widget build(BuildContext context) => widget.builder(context, _photos);
}

/// Wide cover image for a note card; nothing when the note has no photos.
class PhotoCover extends StatelessWidget {
  const PhotoCover({
    super.key,
    required this.repository,
    required this.noteId,
    this.height = 132,
  });

  final NotesRepository repository;
  final UuidValue noteId;
  final double height;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return _NotePhotos(
      repository: repository,
      noteId: noteId,
      builder: (context, photos) {
        if (photos.isEmpty) return const SizedBox.shrink();
        final withData = photos.where((p) => p.data != null).toList();
        return SizedBox(
          height: height,
          width: double.infinity,
          child: Stack(
            fit: StackFit.expand,
            children: [
              if (withData.isEmpty)
                ColoredBox(
                  color: scheme.surfaceContainerLow,
                  child: Icon(
                    Icons.image_outlined,
                    color: scheme.onSurfaceVariant,
                  ),
                )
              else
                Image.memory(
                  _bytesOf(withData.first),
                  fit: BoxFit.cover,
                  cacheWidth: 700,
                  gaplessPlayback: true,
                ),
              if (photos.length > 1)
                Positioned(
                  right: 10,
                  bottom: 10,
                  child: _Pill(
                    icon: Icons.photo_library_outlined,
                    label: '${photos.length}',
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.55),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 14, color: Colors.white),
            const SizedBox(width: 4),
            Text(
              label,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

bool get canUseCamera =>
    !kIsWeb &&
    (defaultTargetPlatform == TargetPlatform.iOS ||
        defaultTargetPlatform == TargetPlatform.android);

String _mimeType(XFile file) {
  const supported = {'image/jpeg', 'image/png', 'image/webp', 'image/gif'};
  final declared = file.mimeType;
  if (declared != null && supported.contains(declared)) return declared;
  final name = file.name.toLowerCase();
  if (name.endsWith('.png')) return 'image/png';
  if (name.endsWith('.webp')) return 'image/webp';
  if (name.endsWith('.gif')) return 'image/gif';
  return 'image/jpeg';
}

/// Picks an image from the camera or gallery and attaches it to the note.
Future<void> pickPhoto(
  BuildContext context,
  NotesRepository repository,
  UuidValue noteId,
  ImageSource source,
) async {
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
    await repository.addPhoto(
      noteId,
      await file.readAsBytes(),
      _mimeType(file),
    );
  } catch (e) {
    messenger.showSnackBar(SnackBar(content: Text('Could not add photo: $e')));
  }
}

/// A note's photos as a horizontal gallery; hidden when there are none.
class PhotoGallery extends StatelessWidget {
  const PhotoGallery({
    super.key,
    required this.repository,
    required this.noteId,
    this.enabled = true,
  });

  final NotesRepository repository;
  final UuidValue noteId;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    return _NotePhotos(
      repository: repository,
      noteId: noteId,
      builder: (context, photos) {
        if (photos.isEmpty) return const SizedBox.shrink();
        final viewable = photos.where((p) => p.data != null).toList();
        return SizedBox(
          height: 148,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 24),
            itemCount: photos.length,
            separatorBuilder: (_, _) => const SizedBox(width: 10),
            itemBuilder: (context, i) => _PhotoTile(
              key: ValueKey(photos[i].id),
              repository: repository,
              photo: photos[i],
              enabled: enabled,
              onOpen: () => Navigator.of(context).push(
                PageRouteBuilder<void>(
                  opaque: false,
                  barrierColor: Colors.black87,
                  pageBuilder: (_, _, _) => _PhotoViewer(
                    photos: viewable,
                    initial: viewable.indexWhere((p) => p.id == photos[i].id),
                  ),
                  transitionsBuilder: (_, animation, _, child) =>
                      FadeTransition(opacity: animation, child: child),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

class _PhotoTile extends StatelessWidget {
  const _PhotoTile({
    super.key,
    required this.repository,
    required this.photo,
    required this.enabled,
    required this.onOpen,
  });

  final NotesRepository repository;
  final LocalPhoto photo;
  final bool enabled;
  final VoidCallback onOpen;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final data = photo.data;
    return SizedBox(
      width: 148,
      height: 148,
      child: Stack(
        fit: StackFit.expand,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: data == null
                // Taken on another device, bytes still downloading.
                ? ColoredBox(
                    color: scheme.surfaceContainerLow,
                    child: const Center(
                      child: SizedBox.square(
                        dimension: 22,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      ),
                    ),
                  )
                : InkWell(
                    onTap: onOpen,
                    child: Image.memory(
                      _bytesOf(photo),
                      fit: BoxFit.cover,
                      cacheWidth: 400,
                      gaplessPlayback: true,
                    ),
                  ),
          ),
          if (!photo.uploaded)
            const Positioned(
              left: 8,
              bottom: 8,
              child: _Pill(
                icon: Icons.cloud_upload_outlined,
                label: 'Pending',
              ),
            ),
          if (enabled)
            Positioned(
              right: 6,
              top: 6,
              child: Material(
                color: Colors.black.withValues(alpha: 0.55),
                shape: const CircleBorder(),
                child: InkWell(
                  customBorder: const CircleBorder(),
                  onTap: () => repository.removePhoto(photo),
                  child: const Padding(
                    padding: EdgeInsets.all(5),
                    child: Icon(Icons.close, size: 15, color: Colors.white),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

/// Full-screen, swipeable photo viewer.
class _PhotoViewer extends StatefulWidget {
  const _PhotoViewer({required this.photos, required this.initial});

  final List<LocalPhoto> photos;
  final int initial;

  @override
  State<_PhotoViewer> createState() => _PhotoViewerState();
}

class _PhotoViewerState extends State<_PhotoViewer> {
  late final PageController _controller = PageController(
    initialPage: widget.initial < 0 ? 0 : widget.initial,
  );
  late int _page = widget.initial < 0 ? 0 : widget.initial;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          PageView.builder(
            controller: _controller,
            itemCount: widget.photos.length,
            onPageChanged: (i) => setState(() => _page = i),
            itemBuilder: (context, i) => InteractiveViewer(
              child: Center(
                child: Image.memory(
                  _bytesOf(widget.photos[i]),
                  fit: BoxFit.contain,
                ),
              ),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.close, color: Colors.white),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  const Spacer(),
                  if (widget.photos.length > 1)
                    _Pill(
                      icon: Icons.photo_library_outlined,
                      label: '${_page + 1} / ${widget.photos.length}',
                    ),
                  const SizedBox(width: 8),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
