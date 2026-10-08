import 'package:flutter/material.dart';
import 'package:serverpod_auth_idp_flutter/serverpod_auth_idp_flutter.dart';

import '../client.dart';
import '../ui/brand.dart';

class SignInScreen extends StatefulWidget {
  final Widget child;
  const SignInScreen({super.key, required this.child});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  bool _isSignedIn = false;

  @override
  void initState() {
    super.initState();
    client.auth.authInfoListenable.addListener(_updateSignedInState);
    _isSignedIn = client.auth.isAuthenticated;
  }

  @override
  void dispose() {
    client.auth.authInfoListenable.removeListener(_updateSignedInState);
    super.dispose();
  }

  void _updateSignedInState() {
    setState(() {
      _isSignedIn = client.auth.isAuthenticated;
    });
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    if (_isSignedIn) return widget.child;

    final theme = Theme.of(context);
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              colors.primaryContainer.withValues(alpha: 0.75),
              theme.scaffoldBackgroundColor,
              colors.surface,
            ],
            stops: const [0, 0.55, 1],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 420),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const BrandMark(size: 68),
                    const SizedBox(height: 18),
                    Text('FieldNotes', style: theme.textTheme.headlineLarge),
                    const SizedBox(height: 6),
                    Text(
                      'Notes and photos that work without a signal.',
                      textAlign: TextAlign.center,
                      style: theme.textTheme.bodyLarge?.copyWith(
                        color: colors.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 22),
                    const Wrap(
                      alignment: WrapAlignment.center,
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        _Feature(Icons.cloud_off_outlined, 'Works offline'),
                        _Feature(Icons.sync, 'Syncs everywhere'),
                        _Feature(Icons.merge_type, 'Merges your edits'),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(20, 24, 20, 20),
                        child: SignInWidget(
                          client: client,
                          onAuthenticated: () {
                            context.showSnackBar(
                              message: 'Signed in.',
                              backgroundColor: colors.primaryContainer,
                              foregroundColor: colors.onPrimaryContainer,
                            );
                          },
                          onError: (error) {
                            context.showSnackBar(
                              message: 'Authentication failed: $error',
                              backgroundColor: colors.errorContainer,
                              foregroundColor: colors.onErrorContainer,
                            );
                          },
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _Feature extends StatelessWidget {
  const _Feature(this.icon, this.label);

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return DecoratedBox(
      decoration: BoxDecoration(
        color: scheme.surfaceContainerLowest.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: scheme.outlineVariant),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 15, color: scheme.primary),
            const SizedBox(width: 6),
            Text(
              label,
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }
}

extension on BuildContext {
  void showSnackBar({
    required String message,
    required Color backgroundColor,
    required Color foregroundColor,
  }) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(
        content: Text(message, style: TextStyle(color: foregroundColor)),
        backgroundColor: backgroundColor,
        duration: const Duration(seconds: 5),
      ),
    );
  }
}
