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
import 'dart:typed_data' as _idt;
import 'package:serverpod/serverpod.dart' as _is;

/// A photo in the on-device SQLite database.
abstract class LocalPhoto
    implements _is.SerializableModel, _is.ProtocolSerialization {
  LocalPhoto._({
    _is.UuidValue? id,
    required this.noteId,
    required this.mimeType,
    this.data,
    bool? uploaded,
    bool? deleted,
    required this.createdAt,
  }) : id = id ?? const _is.Uuid().v7obj(),
       uploaded = uploaded ?? false,
       deleted = deleted ?? false;

  factory LocalPhoto({
    _is.UuidValue? id,
    required _is.UuidValue noteId,
    required String mimeType,
    _idt.ByteData? data,
    bool? uploaded,
    bool? deleted,
    required DateTime createdAt,
  }) = _LocalPhotoImpl;

  factory LocalPhoto.fromJson(Map<String, dynamic> jsonSerialization) {
    return LocalPhoto(
      id: jsonSerialization['id'] == null
          ? null
          : _is.UuidValueJsonExtension.fromJson(jsonSerialization['id']),
      noteId: _is.UuidValueJsonExtension.fromJson(jsonSerialization['noteId']),
      mimeType: jsonSerialization['mimeType'] as String,
      data: jsonSerialization['data'] == null
          ? null
          : _is.ByteDataJsonExtension.fromJson(jsonSerialization['data']),
      uploaded: jsonSerialization['uploaded'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['uploaded']),
      deleted: jsonSerialization['deleted'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['deleted']),
      createdAt: _is.DateTimeJsonExtension.fromJson(
        jsonSerialization['createdAt'],
      ),
    );
  }

  /// The id of the object.
  _is.UuidValue id;

  _is.UuidValue noteId;

  String mimeType;

  /// Null until downloaded (photos taken on another device).
  _idt.ByteData? data;

  /// True once the bytes are safely on the server.
  bool uploaded;

  /// Removed locally, waiting for the deletion to reach the server.
  bool deleted;

  DateTime createdAt;

  /// Returns a shallow copy of this [LocalPhoto]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  LocalPhoto copyWith({
    _is.UuidValue? id,
    _is.UuidValue? noteId,
    String? mimeType,
    _idt.ByteData? data,
    bool? uploaded,
    bool? deleted,
    DateTime? createdAt,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'LocalPhoto',
      'id': id.toJson(),
      'noteId': noteId.toJson(),
      'mimeType': mimeType,
      if (data != null) 'data': data?.toJson(),
      'uploaded': uploaded,
      'deleted': deleted,
      'createdAt': createdAt.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'LocalPhoto',
      'id': id.toJson(),
      'noteId': noteId.toJson(),
      'mimeType': mimeType,
      if (data != null) 'data': data?.toJson(),
      'uploaded': uploaded,
      'deleted': deleted,
      'createdAt': createdAt.toJson(),
    };
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _LocalPhotoImpl extends LocalPhoto {
  _LocalPhotoImpl({
    _is.UuidValue? id,
    required _is.UuidValue noteId,
    required String mimeType,
    _idt.ByteData? data,
    bool? uploaded,
    bool? deleted,
    required DateTime createdAt,
  }) : super._(
         id: id,
         noteId: noteId,
         mimeType: mimeType,
         data: data,
         uploaded: uploaded,
         deleted: deleted,
         createdAt: createdAt,
       );

  /// Returns a shallow copy of this [LocalPhoto]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  LocalPhoto copyWith({
    _is.UuidValue? id,
    _is.UuidValue? noteId,
    String? mimeType,
    Object? data = _Undefined,
    bool? uploaded,
    bool? deleted,
    DateTime? createdAt,
  }) {
    return LocalPhoto(
      id: id ?? this.id,
      noteId: noteId ?? this.noteId,
      mimeType: mimeType ?? this.mimeType,
      data: data is _idt.ByteData? ? data : this.data?.clone(),
      uploaded: uploaded ?? this.uploaded,
      deleted: deleted ?? this.deleted,
      createdAt: createdAt ?? this.createdAt,
    );
  }
}
