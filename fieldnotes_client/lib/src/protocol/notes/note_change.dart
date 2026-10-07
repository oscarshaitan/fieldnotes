/* AUTOMATICALLY GENERATED CODE DO NOT MODIFY */
/*   To generate run: "serverpod generate"    */

// ignore_for_file: implementation_imports
// ignore_for_file: library_private_types_in_public_api
// ignore_for_file: non_constant_identifier_names
// ignore_for_file: public_member_api_docs
// ignore_for_file: type_literal_in_constant_pattern
// ignore_for_file: use_super_parameters
// ignore_for_file: invalid_use_of_internal_member

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:serverpod_client/serverpod_client.dart' as _isc;

/// An edit made on a device, together with the server snapshot it was based on.
abstract class NoteChange
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  NoteChange._({
    required this.noteId,
    required this.baseRevision,
    required this.baseTitle,
    required this.baseBody,
    required this.title,
    required this.body,
    required this.deleted,
    required this.createdAt,
  });

  factory NoteChange({
    required _isc.UuidValue noteId,
    required int baseRevision,
    required String baseTitle,
    required String baseBody,
    required String title,
    required String body,
    required bool deleted,
    required DateTime createdAt,
  }) = _NoteChangeImpl;

  factory NoteChange.fromJson(Map<String, dynamic> jsonSerialization) {
    return NoteChange(
      noteId: _isc.UuidValueJsonExtension.fromJson(jsonSerialization['noteId']),
      baseRevision: jsonSerialization['baseRevision'] as int,
      baseTitle: jsonSerialization['baseTitle'] as String,
      baseBody: jsonSerialization['baseBody'] as String,
      title: jsonSerialization['title'] as String,
      body: jsonSerialization['body'] as String,
      deleted: _isc.BoolJsonExtension.fromJson(jsonSerialization['deleted']),
      createdAt: _isc.DateTimeJsonExtension.fromJson(
        jsonSerialization['createdAt'],
      ),
    );
  }

  _isc.UuidValue noteId;

  /// Server revision the edit was based on. 0 for a note never synced.
  int baseRevision;

  String baseTitle;

  String baseBody;

  String title;

  String body;

  bool deleted;

  DateTime createdAt;

  /// Returns a shallow copy of this [NoteChange]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  NoteChange copyWith({
    _isc.UuidValue? noteId,
    int? baseRevision,
    String? baseTitle,
    String? baseBody,
    String? title,
    String? body,
    bool? deleted,
    DateTime? createdAt,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'NoteChange',
      'noteId': noteId.toJson(),
      'baseRevision': baseRevision,
      'baseTitle': baseTitle,
      'baseBody': baseBody,
      'title': title,
      'body': body,
      'deleted': deleted,
      'createdAt': createdAt.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'NoteChange',
      'noteId': noteId.toJson(),
      'baseRevision': baseRevision,
      'baseTitle': baseTitle,
      'baseBody': baseBody,
      'title': title,
      'body': body,
      'deleted': deleted,
      'createdAt': createdAt.toJson(),
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _NoteChangeImpl extends NoteChange {
  _NoteChangeImpl({
    required _isc.UuidValue noteId,
    required int baseRevision,
    required String baseTitle,
    required String baseBody,
    required String title,
    required String body,
    required bool deleted,
    required DateTime createdAt,
  }) : super._(
         noteId: noteId,
         baseRevision: baseRevision,
         baseTitle: baseTitle,
         baseBody: baseBody,
         title: title,
         body: body,
         deleted: deleted,
         createdAt: createdAt,
       );

  /// Returns a shallow copy of this [NoteChange]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  NoteChange copyWith({
    _isc.UuidValue? noteId,
    int? baseRevision,
    String? baseTitle,
    String? baseBody,
    String? title,
    String? body,
    bool? deleted,
    DateTime? createdAt,
  }) {
    return NoteChange(
      noteId: noteId ?? this.noteId,
      baseRevision: baseRevision ?? this.baseRevision,
      baseTitle: baseTitle ?? this.baseTitle,
      baseBody: baseBody ?? this.baseBody,
      title: title ?? this.title,
      body: body ?? this.body,
      deleted: deleted ?? this.deleted,
      createdAt: createdAt ?? this.createdAt,
    );
  }
}
