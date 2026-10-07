// Entry point of the web worker that hosts the on-device SQLite database in
// the browser. Compiled to web/db_worker.js by tool/build_web_db_assets.sh.
// ignore_for_file: implementation_imports, depend_on_referenced_packages
import 'package:sqlite_async/src/web/worker/worker.dart' as worker;

void main() => worker.main();
