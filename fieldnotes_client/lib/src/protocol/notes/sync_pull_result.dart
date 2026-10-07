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
import 'package:fieldnotes_client/src/protocol/protocol.dart' as _imuhbzep;
import 'package:serverpod_client/serverpod_client.dart' as _isc;
import '../notes/note.dart' as _i9a2yvtv;
import '../notes/photo.dart' as _iaxhh6h2;

abstract class SyncPullResult
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  SyncPullResult._({
    required this.notes,
    required this.photos,
    required this.cursor,
    required this.hasMore,
  });

  factory SyncPullResult({
    required List<_i9a2yvtv.Note> notes,
    required List<_iaxhh6h2.Photo> photos,
    required int cursor,
    required bool hasMore,
  }) = _SyncPullResultImpl;

  factory SyncPullResult.fromJson(Map<String, dynamic> jsonSerialization) {
    return SyncPullResult(
      notes: _imuhbzep.Protocol().deserialize<List<_i9a2yvtv.Note>>(
        jsonSerialization['notes'],
      ),
      photos: _imuhbzep.Protocol().deserialize<List<_iaxhh6h2.Photo>>(
        jsonSerialization['photos'],
      ),
      cursor: jsonSerialization['cursor'] as int,
      hasMore: _isc.BoolJsonExtension.fromJson(jsonSerialization['hasMore']),
    );
  }

  List<_i9a2yvtv.Note> notes;

  List<_iaxhh6h2.Photo> photos;

  int cursor;

  bool hasMore;

  /// Returns a shallow copy of this [SyncPullResult]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  SyncPullResult copyWith({
    List<_i9a2yvtv.Note>? notes,
    List<_iaxhh6h2.Photo>? photos,
    int? cursor,
    bool? hasMore,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'SyncPullResult',
      'notes': notes.toJson(valueToJson: (v) => v.toJson()),
      'photos': photos.toJson(valueToJson: (v) => v.toJson()),
      'cursor': cursor,
      'hasMore': hasMore,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'SyncPullResult',
      'notes': notes.toJson(valueToJson: (v) => v.toJsonForProtocol()),
      'photos': photos.toJson(valueToJson: (v) => v.toJsonForProtocol()),
      'cursor': cursor,
      'hasMore': hasMore,
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _SyncPullResultImpl extends SyncPullResult {
  _SyncPullResultImpl({
    required List<_i9a2yvtv.Note> notes,
    required List<_iaxhh6h2.Photo> photos,
    required int cursor,
    required bool hasMore,
  }) : super._(
         notes: notes,
         photos: photos,
         cursor: cursor,
         hasMore: hasMore,
       );

  /// Returns a shallow copy of this [SyncPullResult]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  SyncPullResult copyWith({
    List<_i9a2yvtv.Note>? notes,
    List<_iaxhh6h2.Photo>? photos,
    int? cursor,
    bool? hasMore,
  }) {
    return SyncPullResult(
      notes: notes ?? this.notes.map((e0) => e0.copyWith()).toList(),
      photos: photos ?? this.photos.map((e0) => e0.copyWith()).toList(),
      cursor: cursor ?? this.cursor,
      hasMore: hasMore ?? this.hasMore,
    );
  }
}
