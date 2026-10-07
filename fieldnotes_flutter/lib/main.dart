import 'package:flutter/material.dart';

import 'client.dart';
import 'data/notes_repository.dart';
import 'screens/sign_in_screen.dart';
import 'ui/home_screen.dart';
import 'ui/theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeClient();
  final repository = await NotesRepository.open(client);
  repository.start();
  runApp(FieldNotesApp(repository: repository));
}

class FieldNotesApp extends StatelessWidget {
  const FieldNotesApp({super.key, required this.repository});

  final NotesRepository repository;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FieldNotes',
      debugShowCheckedModeBanner: false,
      theme: buildTheme(Brightness.light),
      darkTheme: buildTheme(Brightness.dark),
      themeMode: ThemeMode.system,
      // The sign-in screen is shown until the user is authenticated. Once
      // signed in the session is stored, so the app opens offline too.
      home: SignInScreen(child: HomeScreen(repository: repository)),
    );
  }
}
