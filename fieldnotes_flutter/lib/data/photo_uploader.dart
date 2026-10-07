import 'dart:convert';
import 'dart:typed_data';

import 'package:http/http.dart' as http;

/// Result of sending a photo to Serverpod's file storage.
class UploadResult {
  const UploadResult(this.statusCode, this.detail);

  final int? statusCode;

  /// Response body excerpt or the transport error, for diagnostics.
  final String detail;

  bool get ok => statusCode == 200 || statusCode == 201 || statusCode == 204;

  @override
  String toString() => 'HTTP ${statusCode ?? 'n/a'}: $detail';
}

/// Uploads bytes using an upload description issued by the server.
///
/// Mirrors Serverpod's `FileUploader` but keeps the response, so a rejected
/// upload can be explained to the user instead of returning just `false`.
Future<UploadResult> uploadWithDescription(
  String description,
  Uint8List bytes,
  String mimeType,
) async {
  try {
    final data = jsonDecode(description) as Map<String, dynamic>;
    final url = Uri.parse(data['url'] as String);

    if (data['type'] == 'multipart') {
      final request = http.MultipartRequest('POST', url)
        ..files.add(
          http.MultipartFile.fromBytes(
            data['field'] as String,
            bytes,
            filename: data['file-name'] as String?,
          ),
        );
      final fields = (data['request-fields'] as Map?)?.cast<String, String>();
      if (fields != null) request.fields.addAll(fields);
      final response = await http.Response.fromStream(await request.send());
      return UploadResult(response.statusCode, _excerpt(response.body));
    }

    final headers = <String, String>{
      'Content-Type': mimeType,
      ...?(data['headers'] as Map?)?.cast<String, String>(),
    };
    final request = http.Request((data['method'] as String?) ?? 'POST', url)
      ..headers.addAll(headers)
      ..bodyBytes = bytes;
    final response = await http.Response.fromStream(await request.send());
    return UploadResult(response.statusCode, _excerpt(response.body));
  } catch (e) {
    return UploadResult(null, e.toString());
  }
}

String _excerpt(String body) {
  final text = body.trim().replaceAll(RegExp(r'\s+'), ' ');
  return text.length > 300 ? '${text.substring(0, 300)}…' : text;
}
