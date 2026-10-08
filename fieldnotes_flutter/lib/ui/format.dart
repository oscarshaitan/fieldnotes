/// Human friendly formatting helpers for the UI.
library;

const _months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', //
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/// "Just now", "5 min ago", "3 h ago", "Yesterday", "4 days ago", "12 Mar".
String timeAgo(DateTime time, {DateTime? now}) {
  final current = (now ?? DateTime.now()).toLocal();
  final t = time.toLocal();
  final diff = current.difference(t);
  if (diff.isNegative || diff.inSeconds < 45) return 'Just now';
  if (diff.inMinutes < 60) {
    final m = diff.inMinutes < 1 ? 1 : diff.inMinutes;
    return '$m min ago';
  }
  if (diff.inHours < 24 && current.day == t.day) return '${diff.inHours} h ago';
  final today = DateTime(current.year, current.month, current.day);
  final day = DateTime(t.year, t.month, t.day);
  final days = today.difference(day).inDays;
  if (days == 1) return 'Yesterday';
  if (days < 7) return '$days days ago';
  final year = t.year == current.year ? '' : ' ${t.year}';
  return '${t.day} ${_months[t.month - 1]}$year';
}

int wordCount(String text) =>
    text.trim().isEmpty ? 0 : text.trim().split(RegExp(r'\s+')).length;
