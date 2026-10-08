import 'package:fieldnotes_flutter/data/line_diff.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('diffText', () {
    test('identical text has no changes', () {
      final d = diffText('a\nb', 'a\nb');
      expect(d.hasChanges, isFalse);
      expect(d.unified.every((l) => l.kind == DiffKind.same), isTrue);
    });

    test('a replaced line is one removal and one addition', () {
      final d = diffText('a\nold\nc', 'a\nnew\nc');
      expect(d.removed, 1);
      expect(d.added, 1);
      expect(d.unified.map((l) => l.kind), [
        DiffKind.same,
        DiffKind.removed,
        DiffKind.added,
        DiffKind.same,
      ]);
      // Side by side the pair shares a row.
      expect(d.rows[1].left?.text, 'old');
      expect(d.rows[1].right?.text, 'new');
    });

    test('line numbers refer to the old and new text', () {
      final d = diffText('a\nb', 'x\na\nb');
      final addedLine = d.unified.firstWhere((l) => l.kind == DiffKind.added);
      expect(addedLine.newNo, 1);
      final a = d.unified.firstWhere((l) => l.text == 'a');
      expect(a.oldNo, 1);
      expect(a.newNo, 2);
    });

    test('pure additions and deletions have no counterpart', () {
      final d = diffText('a', 'a\nb');
      expect(d.added, 1);
      expect(d.removed, 0);
      expect(d.rows.last.left, isNull);
      expect(d.rows.last.right?.text, 'b');
    });

    test('empty old text is all additions', () {
      final d = diffText('', 'one\ntwo');
      expect(d.added, 2);
      expect(d.removed, 0);
    });

    test('empty new text is all removals', () {
      final d = diffText('one\ntwo', '');
      expect(d.removed, 2);
      expect(d.added, 0);
    });

    test('modified lines highlight only the changed words', () {
      final d = diffText(
        'Pier 5: bearing pad displaced 10mm.',
        'Pier 5: bearing pad displaced 25mm.',
      );
      final removed = d.unified.firstWhere((l) => l.kind == DiffKind.removed);
      final added = d.unified.firstWhere((l) => l.kind == DiffKind.added);
      expect(
        removed.segments!.where((s) => s.changed).map((s) => s.text),
        ['10mm'],
      );
      expect(
        added.segments!.where((s) => s.changed).map((s) => s.text),
        ['25mm'],
      );
    });

    test('completely different lines are marked as a whole', () {
      final d = diffText('alpha beta gamma', 'one two three');
      final removed = d.unified.firstWhere((l) => l.kind == DiffKind.removed);
      expect(removed.segments, [
        const DiffSegment('alpha beta gamma', changed: true),
      ]);
    });

    test('uneven change blocks pair what they can', () {
      final d = diffText('keep\nA\nB', 'keep\nX');
      expect(d.removed, 2);
      expect(d.added, 1);
      expect(d.rows[1].left?.text, 'A');
      expect(d.rows[1].right?.text, 'X');
      expect(d.rows[2].left?.text, 'B');
      expect(d.rows[2].right, isNull);
    });
  });

  group('combineBoth', () {
    test('keeps shared lines once and both sides of a changed line', () {
      expect(combineBoth('a\nremote\nc', 'a\nlocal\nc'), 'a\nremote\nlocal\nc');
    });

    test('keeps additions from either side', () {
      expect(combineBoth('a\nb', 'a'), 'a\nb');
      expect(combineBoth('a', 'a\nb'), 'a\nb');
    });

    test('identical text is unchanged and empty stays empty', () {
      expect(combineBoth('x\ny', 'x\ny'), 'x\ny');
      expect(combineBoth('', ''), '');
    });
  });
}
