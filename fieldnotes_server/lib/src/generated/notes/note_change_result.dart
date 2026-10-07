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
import 'package:fieldnotes_server/src/generated/protocol.dart' as _ix00qkn1;
import 'package:serverpod/serverpod.dart' as _is;
import '../notes/note.dart' as _i9a2yvtv;
import '../notes/note_sync_status.dart' as _ihy2q8uk;

abstract class NoteChangeResult
    implements _is.SerializableModel, _is.ProtocolSerialization {
  NoteChangeResult._({
    required this.status,
    required this.note,
  });

  factory NoteChangeResult({
    required _ihy2q8uk.NoteSyncStatus status,
    required _i9a2yvtv.Note note,
  }) = _NoteChangeResultImpl;

  factory NoteChangeResult.fromJson(Map<String, dynamic> jsonSerialization) {
    return NoteChangeResult(
      status: _ihy2q8uk.NoteSyncStatus.fromJson(
        (jsonSerialization['status'] as String),
      ),
      note: _ix00qkn1.Protocol().deserialize<_i9a2yvtv.Note>(
        jsonSerialization['note'],
      ),
    );
  }

  _ihy2q8uk.NoteSyncStatus status;

  /// The server's current version of the note (after the merge, if any).
  _i9a2yvtv.Note note;

  /// Returns a shallow copy of this [NoteChangeResult]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  NoteChangeResult copyWith({
    _ihy2q8uk.NoteSyncStatus? status,
    _i9a2yvtv.Note? note,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'NoteChangeResult',
      'status': status.toJson(),
      'note': note.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'NoteChangeResult',
      'status': status.toJson(),
      'note': note.toJsonForProtocol(),
    };
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _NoteChangeResultImpl extends NoteChangeResult {
  _NoteChangeResultImpl({
    required _ihy2q8uk.NoteSyncStatus status,
    required _i9a2yvtv.Note note,
  }) : super._(
         status: status,
         note: note,
       );

  /// Returns a shallow copy of this [NoteChangeResult]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  NoteChangeResult copyWith({
    _ihy2q8uk.NoteSyncStatus? status,
    _i9a2yvtv.Note? note,
  }) {
    return NoteChangeResult(
      status: status ?? this.status,
      note: note ?? this.note.copyWith(),
    );
  }
}
