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

/// A note as stored on the server. Also the DTO sent to clients.
abstract class Note
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  Note._({
    _isc.UuidValue? id,
    required this.userId,
    String? title,
    String? body,
    int? revision,
    bool? deleted,
    required this.seq,
    required this.createdAt,
    required this.updatedAt,
  }) : id = id ?? const _isc.Uuid().v7obj(),
       title = title ?? '',
       body = body ?? '',
       revision = revision ?? 1,
       deleted = deleted ?? false;

  factory Note({
    _isc.UuidValue? id,
    required _isc.UuidValue userId,
    String? title,
    String? body,
    int? revision,
    bool? deleted,
    required int seq,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) = _NoteImpl;

  factory Note.fromJson(Map<String, dynamic> jsonSerialization) {
    return Note(
      id: jsonSerialization['id'] == null
          ? null
          : _isc.UuidValueJsonExtension.fromJson(jsonSerialization['id']),
      userId: _isc.UuidValueJsonExtension.fromJson(jsonSerialization['userId']),
      title: jsonSerialization['title'] as String?,
      body: jsonSerialization['body'] as String?,
      revision: jsonSerialization['revision'] as int?,
      deleted: jsonSerialization['deleted'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['deleted']),
      seq: jsonSerialization['seq'] as int,
      createdAt: _isc.DateTimeJsonExtension.fromJson(
        jsonSerialization['createdAt'],
      ),
      updatedAt: _isc.DateTimeJsonExtension.fromJson(
        jsonSerialization['updatedAt'],
      ),
    );
  }

  /// The id of the object.
  _isc.UuidValue id;

  _isc.UuidValue userId;

  String title;

  String body;

  /// Incremented on every accepted change. Clients send the revision they
  /// based their edit on; a mismatch triggers a three-way merge.
  int revision;

  bool deleted;

  /// Position in the user's change log, used as the pull cursor.
  int seq;

  DateTime createdAt;

  DateTime updatedAt;

  /// Returns a shallow copy of this [Note]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  Note copyWith({
    _isc.UuidValue? id,
    _isc.UuidValue? userId,
    String? title,
    String? body,
    int? revision,
    bool? deleted,
    int? seq,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Note',
      'id': id.toJson(),
      'userId': userId.toJson(),
      'title': title,
      'body': body,
      'revision': revision,
      'deleted': deleted,
      'seq': seq,
      'createdAt': createdAt.toJson(),
      'updatedAt': updatedAt.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Note',
      'id': id.toJson(),
      'userId': userId.toJson(),
      'title': title,
      'body': body,
      'revision': revision,
      'deleted': deleted,
      'seq': seq,
      'createdAt': createdAt.toJson(),
      'updatedAt': updatedAt.toJson(),
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _NoteImpl extends Note {
  _NoteImpl({
    _isc.UuidValue? id,
    required _isc.UuidValue userId,
    String? title,
    String? body,
    int? revision,
    bool? deleted,
    required int seq,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) : super._(
         id: id,
         userId: userId,
         title: title,
         body: body,
         revision: revision,
         deleted: deleted,
         seq: seq,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Note]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  Note copyWith({
    _isc.UuidValue? id,
    _isc.UuidValue? userId,
    String? title,
    String? body,
    int? revision,
    bool? deleted,
    int? seq,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Note(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      title: title ?? this.title,
      body: body ?? this.body,
      revision: revision ?? this.revision,
      deleted: deleted ?? this.deleted,
      seq: seq ?? this.seq,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
