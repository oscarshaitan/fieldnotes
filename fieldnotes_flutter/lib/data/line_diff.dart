/// Line and word diffing used to show conflicts the way a pull request does.
library;

enum DiffKind { same, removed, added }

/// A piece of a line, flagged when it differs from the paired line.
class DiffSegment {
  const DiffSegment(this.text, {this.changed = false});

  final String text;
  final bool changed;

  @override
  bool operator ==(Object other) =>
      other is DiffSegment && other.text == text && other.changed == changed;

  @override
  int get hashCode => Object.hash(text, changed);

  @override
  String toString() => changed ? '[$text]' : text;
}

class DiffLine {
  const DiffLine(this.kind, this.text, {this.oldNo, this.newNo, this.segments});

  final DiffKind kind;
  final String text;

  /// 1-based line numbers in the old and new text (null when absent).
  final int? oldNo;
  final int? newNo;

  /// Word-level highlighting, when the line has a modified counterpart.
  final List<DiffSegment>? segments;
}

/// A left/right pair in a side-by-side view.
class DiffRow {
  const DiffRow({this.left, this.right});

  final DiffLine? left;
  final DiffLine? right;

  bool get isSame => left?.kind == DiffKind.same;
}

class DiffResult {
  const DiffResult({
    required this.unified,
    required this.rows,
    required this.added,
    required this.removed,
  });

  /// Lines in unified order: within a change, removals come before additions.
  final List<DiffLine> unified;

  /// Lines paired for a side-by-side view.
  final List<DiffRow> rows;

  /// Number of added and removed lines.
  final int added;
  final int removed;

  bool get hasChanges => added > 0 || removed > 0;
}

List<String> _lines(String text) => text.isEmpty ? const [] : text.split('\n');

/// Diffs [oldText] against [newText] line by line, with word-level
/// highlighting for lines that were modified rather than replaced outright.
DiffResult diffText(String oldText, String newText) {
  final a = _lines(oldText);
  final b = _lines(newText);
  final ops = _diff<String>(a, b);

  final unified = <DiffLine>[];
  final rows = <DiffRow>[];
  var added = 0;
  var removed = 0;

  var i = 0;
  while (i < ops.length) {
    final op = ops[i];
    if (op.kind == DiffKind.same) {
      final line = DiffLine(
        DiffKind.same,
        a[op.aIndex!],
        oldNo: op.aIndex! + 1,
        newNo: op.bIndex! + 1,
      );
      unified.add(line);
      rows.add(DiffRow(left: line, right: line));
      i++;
      continue;
    }

    // Collect one block of consecutive removals and additions.
    final removedIdx = <int>[];
    final addedIdx = <int>[];
    while (i < ops.length && ops[i].kind != DiffKind.same) {
      if (ops[i].kind == DiffKind.removed) {
        removedIdx.add(ops[i].aIndex!);
      } else {
        addedIdx.add(ops[i].bIndex!);
      }
      i++;
    }

    final paired = removedIdx.length < addedIdx.length
        ? removedIdx.length
        : addedIdx.length;
    final removedLines = <DiffLine>[];
    final addedLines = <DiffLine>[];
    for (var k = 0; k < removedIdx.length; k++) {
      removedLines.add(
        k < paired
            ? DiffLine(
                DiffKind.removed,
                a[removedIdx[k]],
                oldNo: removedIdx[k] + 1,
                segments: _wordDiff(a[removedIdx[k]], b[addedIdx[k]]).$1,
              )
            : DiffLine(
                DiffKind.removed,
                a[removedIdx[k]],
                oldNo: removedIdx[k] + 1,
              ),
      );
    }
    for (var k = 0; k < addedIdx.length; k++) {
      addedLines.add(
        k < paired
            ? DiffLine(
                DiffKind.added,
                b[addedIdx[k]],
                newNo: addedIdx[k] + 1,
                segments: _wordDiff(a[removedIdx[k]], b[addedIdx[k]]).$2,
              )
            : DiffLine(
                DiffKind.added,
                b[addedIdx[k]],
                newNo: addedIdx[k] + 1,
              ),
      );
    }
    removed += removedLines.length;
    added += addedLines.length;
    unified
      ..addAll(removedLines)
      ..addAll(addedLines);
    final count = removedLines.length > addedLines.length
        ? removedLines.length
        : addedLines.length;
    for (var k = 0; k < count; k++) {
      rows.add(
        DiffRow(
          left: k < removedLines.length ? removedLines[k] : null,
          right: k < addedLines.length ? addedLines[k] : null,
        ),
      );
    }
  }

  return DiffResult(
    unified: unified,
    rows: rows,
    added: added,
    removed: removed,
  );
}

final _tokenPattern = RegExp(r'\s+|\w+|[^\w\s]');

/// Word-level diff of two lines. Returns the segments of the old and of the
/// new line. If the lines share almost nothing, highlighting every word would
/// be noise, so the whole line is reported as one changed segment instead.
(List<DiffSegment>, List<DiffSegment>) _wordDiff(String a, String b) {
  final ta = _tokenPattern.allMatches(a).map((m) => m[0]!).toList();
  final tb = _tokenPattern.allMatches(b).map((m) => m[0]!).toList();
  final ops = _diff<String>(ta, tb);

  bool isWord(String t) => t.trim().isNotEmpty;
  final shared = ops
      .where((o) => o.kind == DiffKind.same && isWord(ta[o.aIndex!]))
      .length;
  final wordsA = ta.where(isWord).length;
  final wordsB = tb.where(isWord).length;
  final longest = wordsA > wordsB ? wordsA : wordsB;
  if (longest == 0 || shared / longest < 0.3) {
    return (
      [if (a.isNotEmpty) DiffSegment(a, changed: true)],
      [if (b.isNotEmpty) DiffSegment(b, changed: true)],
    );
  }

  final left = <DiffSegment>[];
  final right = <DiffSegment>[];
  void add(List<DiffSegment> into, String text, bool changed) {
    if (into.isNotEmpty && into.last.changed == changed) {
      into[into.length - 1] = DiffSegment(
        into.last.text + text,
        changed: changed,
      );
    } else {
      into.add(DiffSegment(text, changed: changed));
    }
  }

  for (final op in ops) {
    switch (op.kind) {
      case DiffKind.same:
        add(left, ta[op.aIndex!], false);
        add(right, tb[op.bIndex!], false);
      case DiffKind.removed:
        add(left, ta[op.aIndex!], true);
      case DiffKind.added:
        add(right, tb[op.bIndex!], true);
    }
  }
  return (left, right);
}

class _Op {
  const _Op(this.kind, {this.aIndex, this.bIndex});

  final DiffKind kind;
  final int? aIndex;
  final int? bIndex;
}

/// Longest-common-subsequence diff of two sequences.
List<_Op> _diff<T>(List<T> a, List<T> b) {
  final n = a.length;
  final m = b.length;

  var prefix = 0;
  while (prefix < n && prefix < m && a[prefix] == b[prefix]) {
    prefix++;
  }
  var suffix = 0;
  while (suffix < n - prefix &&
      suffix < m - prefix &&
      a[n - 1 - suffix] == b[m - 1 - suffix]) {
    suffix++;
  }
  final an = n - prefix - suffix;
  final bm = m - prefix - suffix;

  final ops = <_Op>[
    for (var k = 0; k < prefix; k++) _Op(DiffKind.same, aIndex: k, bIndex: k),
  ];

  if (an * bm > 4000000) {
    // Huge input: treat the middle as one replaced block.
    for (var k = 0; k < an; k++) {
      ops.add(_Op(DiffKind.removed, aIndex: prefix + k));
    }
    for (var k = 0; k < bm; k++) {
      ops.add(_Op(DiffKind.added, bIndex: prefix + k));
    }
  } else {
    final lcs = List.generate(an + 1, (_) => List<int>.filled(bm + 1, 0));
    for (var x = an - 1; x >= 0; x--) {
      for (var y = bm - 1; y >= 0; y--) {
        lcs[x][y] = a[prefix + x] == b[prefix + y]
            ? lcs[x + 1][y + 1] + 1
            : (lcs[x + 1][y] >= lcs[x][y + 1] ? lcs[x + 1][y] : lcs[x][y + 1]);
      }
    }
    var x = 0;
    var y = 0;
    while (x < an || y < bm) {
      if (x < an && y < bm && a[prefix + x] == b[prefix + y]) {
        ops.add(_Op(DiffKind.same, aIndex: prefix + x, bIndex: prefix + y));
        x++;
        y++;
      } else if (x < an && (y >= bm || lcs[x + 1][y] >= lcs[x][y + 1])) {
        ops.add(_Op(DiffKind.removed, aIndex: prefix + x));
        x++;
      } else {
        ops.add(_Op(DiffKind.added, bIndex: prefix + y));
        y++;
      }
    }
  }

  for (var k = 0; k < suffix; k++) {
    ops.add(
      _Op(DiffKind.same, aIndex: n - suffix + k, bIndex: m - suffix + k),
    );
  }
  return ops;
}
