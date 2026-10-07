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

/// Metadata of a photo attached to a note. The bytes live in file storage.
abstract class Photo
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  Photo._({
    _isc.UuidValue? id,
    required this.userId,
    required this.noteId,
    required this.mimeType,
    required this.byteSize,
    required this.storagePath,
    bool? uploaded,
    bool? deleted,
    this.seq,
    required this.createdAt,
  }) : id = id ?? const _isc.Uuid().v7obj(),
       uploaded = uploaded ?? false,
       deleted = deleted ?? false;

  factory Photo({
    _isc.UuidValue? id,
    required _isc.UuidValue userId,
    required _isc.UuidValue noteId,
    required String mimeType,
    required int byteSize,
    required String storagePath,
    bool? uploaded,
    bool? deleted,
    int? seq,
    required DateTime createdAt,
  }) = _PhotoImpl;

  factory Photo.fromJson(Map<String, dynamic> jsonSerialization) {
    return Photo(
      id: jsonSerialization['id'] == null
          ? null
          : _isc.UuidValueJsonExtension.fromJson(jsonSerialization['id']),
      userId: _isc.UuidValueJsonExtension.fromJson(jsonSerialization['userId']),
      noteId: _isc.UuidValueJsonExtension.fromJson(jsonSerialization['noteId']),
      mimeType: jsonSerialization['mimeType'] as String,
      byteSize: jsonSerialization['byteSize'] as int,
      storagePath: jsonSerialization['storagePath'] as String,
      uploaded: jsonSerialization['uploaded'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['uploaded']),
      deleted: jsonSerialization['deleted'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['deleted']),
      seq: jsonSerialization['seq'] as int?,
      createdAt: _isc.DateTimeJsonExtension.fromJson(
        jsonSerialization['createdAt'],
      ),
    );
  }

  /// The id of the object.
  _isc.UuidValue id;

  _isc.UuidValue userId;

  _isc.UuidValue noteId;

  String mimeType;

  int byteSize;

  String storagePath;

  /// False until the client finished uploading and the server verified it.
  bool uploaded;

  bool deleted;

  int? seq;

  DateTime createdAt;

  /// Returns a shallow copy of this [Photo]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  Photo copyWith({
    _isc.UuidValue? id,
    _isc.UuidValue? userId,
    _isc.UuidValue? noteId,
    String? mimeType,
    int? byteSize,
    String? storagePath,
    bool? uploaded,
    bool? deleted,
    int? seq,
    DateTime? createdAt,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Photo',
      'id': id.toJson(),
      'userId': userId.toJson(),
      'noteId': noteId.toJson(),
      'mimeType': mimeType,
      'byteSize': byteSize,
      'storagePath': storagePath,
      'uploaded': uploaded,
      'deleted': deleted,
      if (seq != null) 'seq': seq,
      'createdAt': createdAt.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Photo',
      'id': id.toJson(),
      'userId': userId.toJson(),
      'noteId': noteId.toJson(),
      'mimeType': mimeType,
      'byteSize': byteSize,
      'storagePath': storagePath,
      'uploaded': uploaded,
      'deleted': deleted,
      if (seq != null) 'seq': seq,
      'createdAt': createdAt.toJson(),
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _PhotoImpl extends Photo {
  _PhotoImpl({
    _isc.UuidValue? id,
    required _isc.UuidValue userId,
    required _isc.UuidValue noteId,
    required String mimeType,
    required int byteSize,
    required String storagePath,
    bool? uploaded,
    bool? deleted,
    int? seq,
    required DateTime createdAt,
  }) : super._(
         id: id,
         userId: userId,
         noteId: noteId,
         mimeType: mimeType,
         byteSize: byteSize,
         storagePath: storagePath,
         uploaded: uploaded,
         deleted: deleted,
         seq: seq,
         createdAt: createdAt,
       );

  /// Returns a shallow copy of this [Photo]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  Photo copyWith({
    _isc.UuidValue? id,
    _isc.UuidValue? userId,
    _isc.UuidValue? noteId,
    String? mimeType,
    int? byteSize,
    String? storagePath,
    bool? uploaded,
    bool? deleted,
    Object? seq = _Undefined,
    DateTime? createdAt,
  }) {
    return Photo(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      noteId: noteId ?? this.noteId,
      mimeType: mimeType ?? this.mimeType,
      byteSize: byteSize ?? this.byteSize,
      storagePath: storagePath ?? this.storagePath,
      uploaded: uploaded ?? this.uploaded,
      deleted: deleted ?? this.deleted,
      seq: seq is int? ? seq : this.seq,
      createdAt: createdAt ?? this.createdAt,
    );
  }
}
