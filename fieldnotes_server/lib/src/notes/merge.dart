/// Three-way text merge (diff3 style) used to reconcile concurrent edits.
///
/// Given the common ancestor [base] and two divergent versions, [mine] and
/// [theirs], returns the merged text, or `null` if both sides changed the
/// same region differently and a human has to decide.
String? merge3(String base, String mine, String theirs) {
  if (mine == theirs) return mine;
  if (mine == base) return theirs;
  if (theirs == base) return mine;

  final baseLines = base.split('\n');
  final a = _diff(baseLines, mine.split('\n'));
  final b = _diff(baseLines, theirs.split('\n'));

  final out = <String>[];
  var pos = 0;
  var i = 0;
  var j = 0;
  while (i < a.length || j < b.length) {
    final ha = i < a.length ? a[i] : null;
    final hb = j < b.length ? b[j] : null;

    if (ha != null && hb != null && _overlap(ha, hb)) {
      // Both sides made the exact same change: take it once.
      if (ha.start == hb.start &&
          ha.end == hb.end &&
          _sameLines(ha.lines, hb.lines)) {
        out.addAll(baseLines.sublist(pos, ha.start));
        out.addAll(ha.lines);
        pos = ha.end;
        i++;
        j++;
        continue;
      }
      return null;
    }

    final bool takeA;
    final _Hunk h;
    if (hb == null) {
      takeA = true;
      h = ha!;
    } else if (ha == null || !_before(ha, hb)) {
      takeA = false;
      h = hb;
    } else {
      takeA = true;
      h = ha;
    }
    out.addAll(baseLines.sublist(pos, h.start));
    out.addAll(h.lines);
    pos = h.end;
    takeA ? i++ : j++;
  }
  out.addAll(baseLines.sublist(pos));
  return out.join('\n');
}

/// A change to a range of base lines `[start, end)` replaced by [lines].
class _Hunk {
  final int start;
  final int end;
  final List<String> lines;
  const _Hunk(this.start, this.end, this.lines);
}

bool _sameLines(List<String> x, List<String> y) {
  if (x.length != y.length) return false;
  for (var k = 0; k < x.length; k++) {
    if (x[k] != y[k]) return false;
  }
  return true;
}

/// Whether [x] must be applied before [y] (they do not overlap).
bool _before(_Hunk x, _Hunk y) =>
    x.start < y.start || (x.start == y.start && x.end <= y.end);

/// Two hunks overlap when their interiors intersect, or when both insert at
/// the same position (the order would be ambiguous). Hunks that merely touch
/// (one ends where the next starts) are independent.
bool _overlap(_Hunk x, _Hunk y) {
  if (x.start == x.end && y.start == y.end) return x.start == y.start;
  return x.start < y.end && y.start < x.end;
}

/// Longest-common-subsequence diff of [base] to [other] as base-line hunks.
List<_Hunk> _diff(List<String> base, List<String> other) {
  final n = base.length;
  final m = other.length;

  // Trim the common prefix and suffix to keep the table small.
  var prefix = 0;
  while (prefix < n && prefix < m && base[prefix] == other[prefix]) {
    prefix++;
  }
  var suffix = 0;
  while (suffix < n - prefix &&
      suffix < m - prefix &&
      base[n - 1 - suffix] == other[m - 1 - suffix]) {
    suffix++;
  }
  final bn = n - prefix - suffix;
  final om = m - prefix - suffix;
  if (bn == 0 && om == 0) return const [];

  // Pathologically large inputs: treat the middle as one replaced block.
  if (bn * om > 4000000) {
    return [_Hunk(prefix, prefix + bn, other.sublist(prefix, prefix + om))];
  }

  // lcs[x][y] = LCS length of base[prefix+x..] and other[prefix+y..].
  final lcs = List.generate(bn + 1, (_) => List<int>.filled(om + 1, 0));
  for (var x = bn - 1; x >= 0; x--) {
    for (var y = om - 1; y >= 0; y--) {
      lcs[x][y] = base[prefix + x] == other[prefix + y]
          ? lcs[x + 1][y + 1] + 1
          : (lcs[x + 1][y] >= lcs[x][y + 1] ? lcs[x + 1][y] : lcs[x][y + 1]);
    }
  }

  final hunks = <_Hunk>[];
  var x = 0;
  var y = 0;
  int? hunkBaseStart;
  int hunkOtherStart = 0;

  void closeHunk() {
    if (hunkBaseStart == null) return;
    hunks.add(
      _Hunk(
        prefix + hunkBaseStart!,
        prefix + x,
        other.sublist(prefix + hunkOtherStart, prefix + y),
      ),
    );
    hunkBaseStart = null;
  }

  while (x < bn || y < om) {
    if (x < bn && y < om && base[prefix + x] == other[prefix + y]) {
      closeHunk();
      x++;
      y++;
    } else {
      if (hunkBaseStart == null) {
        hunkBaseStart = x;
        hunkOtherStart = y;
      }
      if (x < bn && (y >= om || lcs[x + 1][y] >= lcs[x][y + 1])) {
        x++;
      } else {
        y++;
      }
    }
  }
  closeHunk();
  return hunks;
}
