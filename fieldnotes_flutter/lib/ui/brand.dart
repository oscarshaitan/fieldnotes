import 'package:flutter/material.dart';

/// The FieldNotes logo mark: a rounded gradient tile with a pencil-note icon.
class BrandMark extends StatelessWidget {
  const BrandMark({super.key, this.size = 36});

  final double size;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(size * 0.3),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color.lerp(scheme.primary, Colors.white, 0.18)!,
            Color.lerp(scheme.primary, Colors.black, 0.25)!,
          ],
        ),
        boxShadow: [
          BoxShadow(
            color: scheme.primary.withValues(alpha: 0.30),
            blurRadius: size * 0.35,
            offset: Offset(0, size * 0.12),
          ),
        ],
      ),
      child: Icon(
        Icons.edit_note_rounded,
        color: Colors.white,
        size: size * 0.64,
      ),
    );
  }
}
