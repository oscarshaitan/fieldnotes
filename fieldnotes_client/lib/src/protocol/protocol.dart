/* AUTOMATICALLY GENERATED CODE DO NOT MODIFY */
/*   To generate run: "serverpod generate"    */

// ignore_for_file: implementation_imports
// ignore_for_file: library_private_types_in_public_api
// ignore_for_file: non_constant_identifier_names
// ignore_for_file: public_member_api_docs
// ignore_for_file: type_literal_in_constant_pattern
// ignore_for_file: use_super_parameters
// ignore_for_file: invalid_use_of_internal_member
// ignore_for_file: dead_code, unnecessary_type_check

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:serverpod_auth_core_client/serverpod_auth_core_client.dart'
    as _iacc;
import 'package:serverpod_auth_idp_client/serverpod_auth_idp_client.dart'
    as _iaic;
import 'package:serverpod_client/serverpod_client.dart' as _isc;
import 'package:serverpod_database/serverpod_database.dart' as _isd;
import 'notes/local_note.dart' as _ikso7gqu;
import 'notes/local_photo.dart' as _itwniwe0;
import 'notes/local_sync_state.dart' as _in0ml025;
import 'notes/note.dart' as _iylmodbg;
import 'notes/note_change.dart' as _i61s5z42;
import 'notes/note_change_result.dart' as _i8ubjst2;
import 'notes/note_sync_status.dart' as _ib2x2ogd;
import 'notes/photo.dart' as _irr91rn9;
import 'notes/sync_pull_result.dart' as _i2fy8zhn;
export 'notes/local_note.dart';
export 'notes/local_photo.dart';
export 'notes/local_sync_state.dart';
export 'notes/note.dart';
export 'notes/note_change.dart';
export 'notes/note_change_result.dart';
export 'notes/note_sync_status.dart';
export 'notes/photo.dart';
export 'notes/sync_pull_result.dart';
export 'client.dart';

class Protocol extends _isd.DatabaseSerializationManager {
  Protocol._();

  factory Protocol() => _instance;

  static final Protocol _instance = Protocol._().._registerHostProtocols();

  static List<_isd.TableDefinition> get targetTableDefinitions => [
    _isd.TableDefinition(
      name: 'local_note',
      dartName: 'LocalNote',
      schema: 'public',
      module: 'fieldnotes',
      columns: [
        _isd.ColumnDefinition(
          name: 'id',
          columnType: _isd.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
          columnDefault: 'random_v7',
        ),
        _isd.ColumnDefinition(
          name: 'title',
          columnType: _isd.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'\'',
        ),
        _isd.ColumnDefinition(
          name: 'body',
          columnType: _isd.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'\'',
        ),
        _isd.ColumnDefinition(
          name: 'revision',
          columnType: _isd.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '0',
        ),
        _isd.ColumnDefinition(
          name: 'baseTitle',
          columnType: _isd.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'\'',
        ),
        _isd.ColumnDefinition(
          name: 'baseBody',
          columnType: _isd.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'\'',
        ),
        _isd.ColumnDefinition(
          name: 'dirty',
          columnType: _isd.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isd.ColumnDefinition(
          name: 'deleted',
          columnType: _isd.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isd.ColumnDefinition(
          name: 'conflict',
          columnType: _isd.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isd.ColumnDefinition(
          name: 'remoteRevision',
          columnType: _isd.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isd.ColumnDefinition(
          name: 'remoteTitle',
          columnType: _isd.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isd.ColumnDefinition(
          name: 'remoteBody',
          columnType: _isd.ColumnType.text,
          isNullable: true,
          dartType: 'String?',
        ),
        _isd.ColumnDefinition(
          name: 'remoteDeleted',
          columnType: _isd.ColumnType.boolean,
          isNullable: true,
          dartType: 'bool?',
        ),
        _isd.ColumnDefinition(
          name: 'createdAt',
          columnType: _isd.ColumnType.timestampWithoutTimeZone,
          isNullable: false,
          dartType: 'DateTime',
        ),
        _isd.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isd.ColumnType.timestampWithoutTimeZone,
          isNullable: false,
          dartType: 'DateTime',
        ),
      ],
      foreignKeys: [],
      indexes: [],
      managed: true,
    ),
    _isd.TableDefinition(
      name: 'local_photo',
      dartName: 'LocalPhoto',
      schema: 'public',
      module: 'fieldnotes',
      columns: [
        _isd.ColumnDefinition(
          name: 'id',
          columnType: _isd.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
          columnDefault: 'random_v7',
        ),
        _isd.ColumnDefinition(
          name: 'noteId',
          columnType: _isd.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
        ),
        _isd.ColumnDefinition(
          name: 'mimeType',
          columnType: _isd.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isd.ColumnDefinition(
          name: 'data',
          columnType: _isd.ColumnType.bytea,
          isNullable: true,
          dartType: 'dart:typed_data:ByteData?',
        ),
        _isd.ColumnDefinition(
          name: 'uploaded',
          columnType: _isd.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isd.ColumnDefinition(
          name: 'deleted',
          columnType: _isd.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isd.ColumnDefinition(
          name: 'createdAt',
          columnType: _isd.ColumnType.timestampWithoutTimeZone,
          isNullable: false,
          dartType: 'DateTime',
        ),
      ],
      foreignKeys: [],
      indexes: [],
      managed: true,
    ),
    _isd.TableDefinition(
      name: 'local_sync_state',
      dartName: 'LocalSyncState',
      schema: 'public',
      module: 'fieldnotes',
      columns: [
        _isd.ColumnDefinition(
          name: 'id',
          columnType: _isd.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isd.ColumnDefinition(
          name: 'cursor',
          columnType: _isd.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '0',
        ),
      ],
      foreignKeys: [],
      indexes: [],
      managed: true,
    ),
    ..._iaic.Protocol() is _isd.DatabaseSerializationManager
        ? (_iaic.Protocol() as _isd.DatabaseSerializationManager)
              .getTargetTableDefinitions()
        : [],
    ..._iacc.Protocol() is _isd.DatabaseSerializationManager
        ? (_iacc.Protocol() as _isd.DatabaseSerializationManager)
              .getTargetTableDefinitions()
        : [],
  ];

  static String? getClassNameFromObjectJson(dynamic data) {
    if (data is! Map) return null;
    final className = data['__className__'] as String?;
    return className;
  }

  @override
  T deserialize<T>(
    dynamic data, [
    Type? t,
  ]) {
    t ??= T;

    final dataClassName = getClassNameFromObjectJson(data);
    if (dataClassName != null && dataClassName != getClassNameForType(t)) {
      try {
        return deserializeByClassName({
          'className': dataClassName,
          'data': data,
        });
      } on _isc.DeserializationClassNameNotFoundException catch (_) {
        // If the className is not recognized (e.g., older client receiving
        // data with a new subtype), fall back to deserializing without the
        // className, using the expected type T.
      }
    }

    if (t == _ikso7gqu.LocalNote) {
      return _ikso7gqu.LocalNote.fromJson(data) as T;
    }
    if (t == _itwniwe0.LocalPhoto) {
      return _itwniwe0.LocalPhoto.fromJson(data) as T;
    }
    if (t == _in0ml025.LocalSyncState) {
      return _in0ml025.LocalSyncState.fromJson(data) as T;
    }
    if (t == _iylmodbg.Note) {
      return _iylmodbg.Note.fromJson(data) as T;
    }
    if (t == _i61s5z42.NoteChange) {
      return _i61s5z42.NoteChange.fromJson(data) as T;
    }
    if (t == _i8ubjst2.NoteChangeResult) {
      return _i8ubjst2.NoteChangeResult.fromJson(data) as T;
    }
    if (t == _ib2x2ogd.NoteSyncStatus) {
      return _ib2x2ogd.NoteSyncStatus.fromJson(data) as T;
    }
    if (t == _irr91rn9.Photo) {
      return _irr91rn9.Photo.fromJson(data) as T;
    }
    if (t == _i2fy8zhn.SyncPullResult) {
      return _i2fy8zhn.SyncPullResult.fromJson(data) as T;
    }
    if (t == _isc.getType<_ikso7gqu.LocalNote?>()) {
      return (data != null ? _ikso7gqu.LocalNote.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_itwniwe0.LocalPhoto?>()) {
      return (data != null ? _itwniwe0.LocalPhoto.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_in0ml025.LocalSyncState?>()) {
      return (data != null ? _in0ml025.LocalSyncState.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_iylmodbg.Note?>()) {
      return (data != null ? _iylmodbg.Note.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_i61s5z42.NoteChange?>()) {
      return (data != null ? _i61s5z42.NoteChange.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_i8ubjst2.NoteChangeResult?>()) {
      return (data != null ? _i8ubjst2.NoteChangeResult.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_ib2x2ogd.NoteSyncStatus?>()) {
      return (data != null ? _ib2x2ogd.NoteSyncStatus.fromJson(data) : null)
          as T;
    }
    if (t == _isc.getType<_irr91rn9.Photo?>()) {
      return (data != null ? _irr91rn9.Photo.fromJson(data) : null) as T;
    }
    if (t == _isc.getType<_i2fy8zhn.SyncPullResult?>()) {
      return (data != null ? _i2fy8zhn.SyncPullResult.fromJson(data) : null)
          as T;
    }
    if (t == List<_iylmodbg.Note>) {
      return (data as List).map((e) => deserialize<_iylmodbg.Note>(e)).toList()
          as T;
    }
    if (t == List<_irr91rn9.Photo>) {
      return (data as List).map((e) => deserialize<_irr91rn9.Photo>(e)).toList()
          as T;
    }
    try {
      return _iaic.Protocol().deserialize<T>(data, t);
    } on _isc.DeserializationTypeNotFoundException catch (_) {}
    try {
      return _iacc.Protocol().deserialize<T>(data, t);
    } on _isc.DeserializationTypeNotFoundException catch (_) {}
    return super.deserialize<T>(data, t);
  }

  static String? getClassNameForType(Type type) {
    return switch (type) {
      _ikso7gqu.LocalNote => 'LocalNote',
      _itwniwe0.LocalPhoto => 'LocalPhoto',
      _in0ml025.LocalSyncState => 'LocalSyncState',
      _iylmodbg.Note => 'Note',
      _i61s5z42.NoteChange => 'NoteChange',
      _i8ubjst2.NoteChangeResult => 'NoteChangeResult',
      _ib2x2ogd.NoteSyncStatus => 'NoteSyncStatus',
      _irr91rn9.Photo => 'Photo',
      _i2fy8zhn.SyncPullResult => 'SyncPullResult',
      _ => null,
    };
  }

  @override
  String? getClassNameForObject(Object? data) {
    String? className = super.getClassNameForObject(data);
    if (className != null) return className;

    if (data is Map<String, dynamic> && data['__className__'] is String) {
      return (data['__className__'] as String).replaceFirst('fieldnotes.', '');
    }

    switch (data) {
      case _ikso7gqu.LocalNote():
        return 'LocalNote';
      case _itwniwe0.LocalPhoto():
        return 'LocalPhoto';
      case _in0ml025.LocalSyncState():
        return 'LocalSyncState';
      case _iylmodbg.Note():
        return 'Note';
      case _i61s5z42.NoteChange():
        return 'NoteChange';
      case _i8ubjst2.NoteChangeResult():
        return 'NoteChangeResult';
      case _ib2x2ogd.NoteSyncStatus():
        return 'NoteSyncStatus';
      case _irr91rn9.Photo():
        return 'Photo';
      case _i2fy8zhn.SyncPullResult():
        return 'SyncPullResult';
    }
    className = _iaic.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.')
          ? className
          : 'serverpod_auth_idp.$className';
    }
    className = _iacc.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.')
          ? className
          : 'serverpod_auth_core.$className';
    }
    return null;
  }

  @override
  dynamic deserializeByClassName(Map<String, dynamic> data) {
    var dataClassName = data['className'];
    if (dataClassName is! String) {
      return super.deserializeByClassName(data);
    }
    if (dataClassName == 'LocalNote') {
      return deserialize<_ikso7gqu.LocalNote>(data['data']);
    }
    if (dataClassName == 'LocalPhoto') {
      return deserialize<_itwniwe0.LocalPhoto>(data['data']);
    }
    if (dataClassName == 'LocalSyncState') {
      return deserialize<_in0ml025.LocalSyncState>(data['data']);
    }
    if (dataClassName == 'Note') {
      return deserialize<_iylmodbg.Note>(data['data']);
    }
    if (dataClassName == 'NoteChange') {
      return deserialize<_i61s5z42.NoteChange>(data['data']);
    }
    if (dataClassName == 'NoteChangeResult') {
      return deserialize<_i8ubjst2.NoteChangeResult>(data['data']);
    }
    if (dataClassName == 'NoteSyncStatus') {
      return deserialize<_ib2x2ogd.NoteSyncStatus>(data['data']);
    }
    if (dataClassName == 'Photo') {
      return deserialize<_irr91rn9.Photo>(data['data']);
    }
    if (dataClassName == 'SyncPullResult') {
      return deserialize<_i2fy8zhn.SyncPullResult>(data['data']);
    }
    if (dataClassName.startsWith('serverpod_auth_idp.')) {
      data['className'] = dataClassName.substring(19);
      return _iaic.Protocol().deserializeByClassName(data);
    }
    if (dataClassName.startsWith('serverpod_auth_core.')) {
      data['className'] = dataClassName.substring(20);
      return _iacc.Protocol().deserializeByClassName(data);
    }
    return super.deserializeByClassName(data);
  }

  void _registerHostProtocols() {
    _iaic.Protocol().registerHostProtocol('fieldnotes', this);
    _iacc.Protocol().registerHostProtocol('fieldnotes', this);
  }

  @override
  _isd.Table? getTableForType(Type t) {
    {
      var protocol = _iaic.Protocol();
      var table = protocol is _isd.DatabaseSerializationManager
          ? (protocol as _isd.DatabaseSerializationManager).getTableForType(t)
          : null;
      if (table != null) {
        return table;
      }
    }
    {
      var protocol = _iacc.Protocol();
      var table = protocol is _isd.DatabaseSerializationManager
          ? (protocol as _isd.DatabaseSerializationManager).getTableForType(t)
          : null;
      if (table != null) {
        return table;
      }
    }
    switch (t) {
      case _ikso7gqu.LocalNote:
        return _ikso7gqu.LocalNote.t;
      case _itwniwe0.LocalPhoto:
        return _itwniwe0.LocalPhoto.t;
      case _in0ml025.LocalSyncState:
        return _in0ml025.LocalSyncState.t;
    }
    return null;
  }

  @override
  List<_isd.TableDefinition> getTargetTableDefinitions() =>
      targetTableDefinitions;

  @override
  String getModuleName() => 'fieldnotes';

  /// Maps any `Record`s known to this [Protocol] to their JSON representation
  ///
  /// Throws in case the record type is not known.
  ///
  /// This method will return `null` (only) for `null` inputs.
  Map<String, dynamic>? mapRecordToJson(Record? record) {
    if (record == null) {
      return null;
    }
    try {
      return _iaic.Protocol().mapRecordToJson(record);
    } catch (_) {}
    try {
      return _iacc.Protocol().mapRecordToJson(record);
    } catch (_) {}
    throw Exception('Unsupported record type ${record.runtimeType}');
  }
}
