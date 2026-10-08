import 'package:flutter/material.dart';

import '../data/line_diff.dart';

/// A GitHub-style diff of two texts: line numbers, red/green lines, the
/// changed words highlighted inside modified lines, and long runs of
/// unchanged lines folded away.
class DiffView extends StatefulWidget {
  const DiffView({
    super.key,
    required this.oldText,
    required this.newText,
    required this.oldLabel,
    required this.newLabel,
    this.split = true,
  });

  final String oldText;
  final String newText;

  /// Headings of the two sides (shown in side-by-side mode).
  final String oldLabel;
  final String newLabel;
  final bool split;

  @override
  State<DiffView> createState() => _DiffViewState();
}

class _DiffViewState extends State<DiffView> {
  /// Fold groups the user expanded, by the index of their first row.
  final _expanded = <int>{};

  static const _context = 2;

  @override
  Widget build(BuildContext context) {
    final diff = diffText(widget.oldText, widget.newText);
    final palette = _DiffPalette.of(context);
    final rows = widget.split
        ? diff.rows
        : [for (final l in diff.unified) DiffRow(left: l)];

    final changed = [
      for (final r in rows) !(r.isSame || (!widget.split && _isSame(r.left))),
    ];
    final children = <Widget>[];
    var i = 0;
    while (i < rows.length) {
      if (changed[i] || _nearChange(changed, i)) {
        children.add(_buildRow(rows[i], palette));
        i++;
        continue;
      }
      // Fold a run of unchanged lines that are not next to a change.
      final start = i;
      while (i < rows.length && !changed[i] && !_nearChange(changed, i)) {
        i++;
      }
      if (_expanded.contains(start)) {
        for (var k = start; k < i; k++) {
          children.add(_buildRow(rows[k], palette));
        }
      } else {
        children.add(
          _FoldRow(
            count: i - start,
            palette: palette,
            onTap: () => setState(() => _expanded.add(start)),
          ),
        );
      }
    }

    if (!diff.hasChanges) {
      children.clear();
      children.add(
        Padding(
          padding: const EdgeInsets.all(12),
          child: Text(
            'Identical text.',
            style: TextStyle(color: palette.muted),
          ),
        ),
      );
    }

    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border.all(color: palette.border),
        borderRadius: BorderRadius.circular(8),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (widget.split)
              _SplitHeader(
                oldLabel: widget.oldLabel,
                newLabel: widget.newLabel,
                palette: palette,
              ),
            ...children,
          ],
        ),
      ),
    );
  }

  static bool _isSame(DiffLine? line) => line?.kind == DiffKind.same;

  /// Whether row [i] is within [_context] rows of a changed row.
  static bool _nearChange(List<bool> changed, int i) {
    final from = i - _context < 0 ? 0 : i - _context;
    final to = i + _context >= changed.length
        ? changed.length - 1
        : i + _context;
    for (var k = from; k <= to; k++) {
      if (changed[k]) return true;
    }
    return false;
  }

  Widget _buildRow(DiffRow row, _DiffPalette palette) {
    if (!widget.split) return _UnifiedLine(line: row.left!, palette: palette);
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            child: _Cell(line: row.left, isOld: true, palette: palette),
          ),
          Container(width: 1, color: palette.border),
          Expanded(
            child: _Cell(line: row.right, isOld: false, palette: palette),
          ),
        ],
      ),
    );
  }
}

class _DiffPalette {
  const _DiffPalette({
    required this.removedLine,
    required this.removedWord,
    required this.addedLine,
    required this.addedWord,
    required this.gutter,
    required this.border,
    required this.muted,
    required this.text,
    required this.empty,
  });

  final Color removedLine;
  final Color removedWord;
  final Color addedLine;
  final Color addedWord;
  final Color gutter;
  final Color border;
  final Color muted;
  final Color text;
  final Color empty;

  factory _DiffPalette.of(BuildContext context) {
    final theme = Theme.of(context);
    final dark = theme.brightness == Brightness.dark;
    final surface = theme.colorScheme.surface;
    Color mix(Color c, double a) =>
        Color.alphaBlend(c.withValues(alpha: a), surface);
    const red = Color(0xFFF85149);
    const green = Color(0xFF2EA043);
    return _DiffPalette(
      removedLine: dark ? mix(red, 0.16) : const Color(0xFFFFEBE9),
      removedWord: dark ? mix(red, 0.42) : const Color(0xFFFFC1C0),
      addedLine: dark ? mix(green, 0.18) : const Color(0xFFDAFBE1),
      addedWord: dark ? mix(green, 0.45) : const Color(0xFFABF2BC),
      gutter: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
      border: theme.colorScheme.outlineVariant,
      muted: theme.colorScheme.onSurfaceVariant,
      text: theme.colorScheme.onSurface,
      empty: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
    );
  }
}

const _mono = TextStyle(
  fontFamily: 'Menlo',
  fontFamilyFallback: ['Consolas', 'Roboto Mono', 'Courier', 'monospace'],
  fontSize: 13,
  height: 1.45,
);

/// The text of a line, with changed words highlighted.
Widget _lineText(DiffLine line, _DiffPalette p) {
  final wordColor = line.kind == DiffKind.removed ? p.removedWord : p.addedWord;
  final segments = line.segments;
  final base = _mono.copyWith(color: p.text);
  if (line.text.isEmpty) return Text(' ', style: base);
  if (segments == null || line.kind == DiffKind.same) {
    return Text(line.text, style: base);
  }
  return Text.rich(
    TextSpan(
      style: base,
      children: [
        for (final s in segments)
          TextSpan(
            text: s.text,
            style: s.changed
                ? TextStyle(
                    backgroundColor: wordColor,
                    fontWeight: FontWeight.w600,
                  )
                : null,
          ),
      ],
    ),
  );
}

Widget _lineNo(int? n, _DiffPalette p, {Color? color}) => Container(
  width: 36,
  color: color ?? p.gutter,
  padding: const EdgeInsets.only(right: 6, top: 2, bottom: 2),
  alignment: Alignment.topRight,
  child: Text(
    n?.toString() ?? '',
    style: _mono.copyWith(color: p.muted, fontSize: 11),
  ),
);

class _UnifiedLine extends StatelessWidget {
  const _UnifiedLine({required this.line, required this.palette});

  final DiffLine line;
  final _DiffPalette palette;

  @override
  Widget build(BuildContext context) {
    final bg = switch (line.kind) {
      DiffKind.removed => palette.removedLine,
      DiffKind.added => palette.addedLine,
      DiffKind.same => null,
    };
    final marker = switch (line.kind) {
      DiffKind.removed => '-',
      DiffKind.added => '+',
      DiffKind.same => ' ',
    };
    return Container(
      color: bg,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _lineNo(line.oldNo, palette, color: bg?.withValues(alpha: 1)),
            _lineNo(line.newNo, palette, color: bg?.withValues(alpha: 1)),
            SizedBox(
              width: 18,
              child: Padding(
                padding: const EdgeInsets.only(top: 2, left: 4),
                child: Text(
                  marker,
                  style: _mono.copyWith(color: palette.muted),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 2, horizontal: 4),
                child: _lineText(line, palette),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Cell extends StatelessWidget {
  const _Cell({required this.line, required this.isOld, required this.palette});

  final DiffLine? line;
  final bool isOld;
  final _DiffPalette palette;

  @override
  Widget build(BuildContext context) {
    final l = line;
    if (l == null) return ColoredBox(color: palette.empty);
    final bg = l.kind == DiffKind.same
        ? null
        : (isOld ? palette.removedLine : palette.addedLine);
    return Container(
      color: bg,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _lineNo(isOld ? l.oldNo : l.newNo, palette),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 2, horizontal: 6),
              child: _lineText(l, palette),
            ),
          ),
        ],
      ),
    );
  }
}

class _SplitHeader extends StatelessWidget {
  const _SplitHeader({
    required this.oldLabel,
    required this.newLabel,
    required this.palette,
  });

  final String oldLabel;
  final String newLabel;
  final _DiffPalette palette;

  @override
  Widget build(BuildContext context) {
    Widget cell(String label, Color color) => Expanded(
      child: Container(
        color: color,
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        child: Text(label, style: Theme.of(context).textTheme.labelLarge),
      ),
    );
    return Row(
      children: [
        cell(oldLabel, palette.removedLine),
        Container(width: 1, height: 30, color: palette.border),
        cell(newLabel, palette.addedLine),
      ],
    );
  }
}

class _FoldRow extends StatelessWidget {
  const _FoldRow({
    required this.count,
    required this.palette,
    required this.onTap,
  });

  final int count;
  final _DiffPalette palette;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        color: palette.gutter,
        padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
        child: Row(
          children: [
            Icon(Icons.unfold_more, size: 16, color: palette.muted),
            const SizedBox(width: 8),
            Text(
              'Show $count unchanged ${count == 1 ? 'line' : 'lines'}',
              style: TextStyle(color: palette.muted, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}
