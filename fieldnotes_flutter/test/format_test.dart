import 'package:fieldnotes_flutter/ui/format.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  final now = DateTime(2026, 10, 8, 15, 0);

  group('timeAgo', () {
    test('recent times', () {
      expect(
        timeAgo(now.subtract(const Duration(seconds: 10)), now: now),
        'Just now',
      );
      expect(
        timeAgo(now.subtract(const Duration(minutes: 5)), now: now),
        '5 min ago',
      );
      expect(
        timeAgo(now.subtract(const Duration(hours: 2)), now: now),
        '2 h ago',
      );
    });

    test('days and dates', () {
      expect(timeAgo(DateTime(2026, 10, 7, 20), now: now), 'Yesterday');
      expect(timeAgo(DateTime(2026, 10, 4, 9), now: now), '4 days ago');
      expect(timeAgo(DateTime(2026, 3, 12), now: now), '12 Mar');
      expect(timeAgo(DateTime(2025, 3, 12), now: now), '12 Mar 2025');
    });

    test('future times do not break', () {
      expect(
        timeAgo(now.add(const Duration(minutes: 3)), now: now),
        'Just now',
      );
    });
  });

  test('wordCount', () {
    expect(wordCount(''), 0);
    expect(wordCount('  \n '), 0);
    expect(wordCount('one two\nthree'), 3);
  });
}
