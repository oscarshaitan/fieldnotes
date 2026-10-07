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

/// Single-row table with the pull cursor and whose data this device holds.
abstract class LocalSyncState
    implements _is.SerializableModel, _is.ProtocolSerialization {
  LocalSyncState._({
    this.id,
    int? cursor,
    this.owner,
  }) : cursor = cursor ?? 0;

  factory LocalSyncState({
    int? id,
    int? cursor,
    String? owner,
  }) = _LocalSyncStateImpl;

  factory LocalSyncState.fromJson(Map<String, dynamic> jsonSerialization) {
    return LocalSyncState(
      id: jsonSerialization['id'] as int?,
      cursor: jsonSerialization['cursor'] as int?,
      owner: jsonSerialization['owner'] as String?,
    );
  }

  /// The database id, set if the object has been inserted into the
  /// database or if it has been fetched from the database. Otherwise,
  /// the id will be null.
  int? id;

  int cursor;

  /// "<server url>|<user id>" the local data belongs to. Data is discarded when
  /// another account or server signs in, since cursors are per user and server.
  String? owner;

  /// Returns a shallow copy of this [LocalSyncState]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  LocalSyncState copyWith({
    int? id,
    int? cursor,
    String? owner,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'LocalSyncState',
      if (id != null) 'id': id,
      'cursor': cursor,
      if (owner != null) 'owner': owner,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'LocalSyncState',
      if (id != null) 'id': id,
      'cursor': cursor,
      if (owner != null) 'owner': owner,
    };
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _LocalSyncStateImpl extends LocalSyncState {
  _LocalSyncStateImpl({
    int? id,
    int? cursor,
    String? owner,
  }) : super._(
         id: id,
         cursor: cursor,
         owner: owner,
       );

  /// Returns a shallow copy of this [LocalSyncState]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  LocalSyncState copyWith({
    Object? id = _Undefined,
    int? cursor,
    Object? owner = _Undefined,
  }) {
    return LocalSyncState(
      id: id is int? ? id : this.id,
      cursor: cursor ?? this.cursor,
      owner: owner is String? ? owner : this.owner,
    );
  }
}
