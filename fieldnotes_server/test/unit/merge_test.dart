import 'package:fieldnotes_server/src/notes/merge.dart';
import 'package:test/test.dart';

void main() {
  group('merge3', () {
    test('returns the changed side when only one side changed', () {
      expect(merge3('a', 'b', 'a'), 'b');
      expect(merge3('a', 'a', 'b'), 'b');
    });

    test('identical edits on both sides merge cleanly', () {
      expect(merge3('a\nb', 'a\nB', 'a\nB'), 'a\nB');
    });

    test('edits to different lines are both kept', () {
      const base = 'one\ntwo\nthree\nfour\nfive';
      const mine = 'ONE\ntwo\nthree\nfour\nfive';
      const theirs = 'one\ntwo\nthree\nfour\nFIVE';
      expect(merge3(base, mine, theirs), 'ONE\ntwo\nthree\nfour\nFIVE');
    });

    test('edits to adjacent lines are both kept', () {
      expect(merge3('a\nb\nc', 'a\nB\nc', 'a\nb\nC'), 'a\nB\nC');
    });

    test('insertions at different places are both kept', () {
      const base = 'a\nb\nc';
      expect(merge3(base, 'x\na\nb\nc', 'a\nb\nc\ny'), 'x\na\nb\nc\ny');
    });

    test('an insertion and a deletion elsewhere are both kept', () {
      expect(
        merge3('a\nb\nc\nd', 'a\nb\nNEW\nc\nd', 'b\nc\nd'),
        'b\nNEW\nc\nd',
      );
    });

    test('the same line edited differently is a conflict', () {
      expect(merge3('a\nb\nc', 'a\nmine\nc', 'a\ntheirs\nc'), isNull);
    });

    test('inserting at the same spot is a conflict', () {
      expect(merge3('a\nc', 'a\nb1\nc', 'a\nb2\nc'), isNull);
    });

    test('editing a line the other side deleted is a conflict', () {
      expect(merge3('a\nb\nc', 'a\nB\nc', 'a\nc'), isNull);
    });

    test('works for single-line values such as titles', () {
      expect(
        merge3('Groceries', 'Groceries', 'Weekly groceries'),
        'Weekly groceries',
      );
      expect(merge3('Groceries', 'Food', 'Weekly groceries'), isNull);
    });

    test('empty base (note created empty on both sides)', () {
      expect(merge3('', 'hello', ''), 'hello');
      expect(merge3('', 'hello', 'world'), isNull);
    });
  });
}
