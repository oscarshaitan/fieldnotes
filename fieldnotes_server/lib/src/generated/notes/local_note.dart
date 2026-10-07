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
import 'package:serverpod/serverpod.dart' as _is;

/// A note in the on-device SQLite database.
abstract class LocalNote
    implements _is.SerializableModel, _is.ProtocolSerialization {
  LocalNote._({
    _is.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    this.remoteRevision,
    this.remoteTitle,
    this.remoteBody,
    this.remoteDeleted,
    required this.createdAt,
    required this.updatedAt,
  }) : id = id ?? const _is.Uuid().v7obj(),
       title = title ?? '',
       body = body ?? '',
       revision = revision ?? 0,
       baseTitle = baseTitle ?? '',
       baseBody = baseBody ?? '',
       dirty = dirty ?? false,
       deleted = deleted ?? false,
       conflict = conflict ?? false;

  factory LocalNote({
    _is.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    int? remoteRevision,
    String? remoteTitle,
    String? remoteBody,
    bool? remoteDeleted,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) = _LocalNoteImpl;

  factory LocalNote.fromJson(Map<String, dynamic> jsonSerialization) {
    return LocalNote(
      id: jsonSerialization['id'] == null
          ? null
          : _is.UuidValueJsonExtension.fromJson(jsonSerialization['id']),
      title: jsonSerialization['title'] as String?,
      body: jsonSerialization['body'] as String?,
      revision: jsonSerialization['revision'] as int?,
      baseTitle: jsonSerialization['baseTitle'] as String?,
      baseBody: jsonSerialization['baseBody'] as String?,
      dirty: jsonSerialization['dirty'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['dirty']),
      deleted: jsonSerialization['deleted'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['deleted']),
      conflict: jsonSerialization['conflict'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['conflict']),
      remoteRevision: jsonSerialization['remoteRevision'] as int?,
      remoteTitle: jsonSerialization['remoteTitle'] as String?,
      remoteBody: jsonSerialization['remoteBody'] as String?,
      remoteDeleted: jsonSerialization['remoteDeleted'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['remoteDeleted']),
      createdAt: _is.DateTimeJsonExtension.fromJson(
        jsonSerialization['createdAt'],
      ),
      updatedAt: _is.DateTimeJsonExtension.fromJson(
        jsonSerialization['updatedAt'],
      ),
    );
  }

  /// The id of the object.
  _is.UuidValue id;

  String title;

  String body;

  /// Last server revision this device knows about (0 = never synced).
  int revision;

  /// Server snapshot at `revision`; the common ancestor for merges.
  String baseTitle;

  String baseBody;

  /// Local edits not yet accepted by the server.
  bool dirty;

  bool deleted;

  /// Set when the server could not merge; remote* hold the server's version.
  bool conflict;

  int? remoteRevision;

  String? remoteTitle;

  String? remoteBody;

  bool? remoteDeleted;

  DateTime createdAt;

  DateTime updatedAt;

  /// Returns a shallow copy of this [LocalNote]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  LocalNote copyWith({
    _is.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    int? remoteRevision,
    String? remoteTitle,
    String? remoteBody,
    bool? remoteDeleted,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'LocalNote',
      'id': id.toJson(),
      'title': title,
      'body': body,
      'revision': revision,
      'baseTitle': baseTitle,
      'baseBody': baseBody,
      'dirty': dirty,
      'deleted': deleted,
      'conflict': conflict,
      if (remoteRevision != null) 'remoteRevision': remoteRevision,
      if (remoteTitle != null) 'remoteTitle': remoteTitle,
      if (remoteBody != null) 'remoteBody': remoteBody,
      if (remoteDeleted != null) 'remoteDeleted': remoteDeleted,
      'createdAt': createdAt.toJson(),
      'updatedAt': updatedAt.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'LocalNote',
      'id': id.toJson(),
      'title': title,
      'body': body,
      'revision': revision,
      'baseTitle': baseTitle,
      'baseBody': baseBody,
      'dirty': dirty,
      'deleted': deleted,
      'conflict': conflict,
      if (remoteRevision != null) 'remoteRevision': remoteRevision,
      if (remoteTitle != null) 'remoteTitle': remoteTitle,
      if (remoteBody != null) 'remoteBody': remoteBody,
      if (remoteDeleted != null) 'remoteDeleted': remoteDeleted,
      'createdAt': createdAt.toJson(),
      'updatedAt': updatedAt.toJson(),
    };
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _LocalNoteImpl extends LocalNote {
  _LocalNoteImpl({
    _is.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    int? remoteRevision,
    String? remoteTitle,
    String? remoteBody,
    bool? remoteDeleted,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) : super._(
         id: id,
         title: title,
         body: body,
         revision: revision,
         baseTitle: baseTitle,
         baseBody: baseBody,
         dirty: dirty,
         deleted: deleted,
         conflict: conflict,
         remoteRevision: remoteRevision,
         remoteTitle: remoteTitle,
         remoteBody: remoteBody,
         remoteDeleted: remoteDeleted,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [LocalNote]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  LocalNote copyWith({
    _is.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    Object? remoteRevision = _Undefined,
    Object? remoteTitle = _Undefined,
    Object? remoteBody = _Undefined,
    Object? remoteDeleted = _Undefined,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return LocalNote(
      id: id ?? this.id,
      title: title ?? this.title,
      body: body ?? this.body,
      revision: revision ?? this.revision,
      baseTitle: baseTitle ?? this.baseTitle,
      baseBody: baseBody ?? this.baseBody,
      dirty: dirty ?? this.dirty,
      deleted: deleted ?? this.deleted,
      conflict: conflict ?? this.conflict,
      remoteRevision: remoteRevision is int?
          ? remoteRevision
          : this.remoteRevision,
      remoteTitle: remoteTitle is String? ? remoteTitle : this.remoteTitle,
      remoteBody: remoteBody is String? ? remoteBody : this.remoteBody,
      remoteDeleted: remoteDeleted is bool?
          ? remoteDeleted
          : this.remoteDeleted,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
