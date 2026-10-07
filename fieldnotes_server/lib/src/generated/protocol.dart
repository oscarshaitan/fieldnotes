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
import 'package:serverpod/protocol.dart' as _isp;
import 'package:serverpod/serverpod.dart' as _is;
import 'package:serverpod_auth_core_server/serverpod_auth_core_server.dart'
    as _iacs;
import 'package:serverpod_auth_idp_server/serverpod_auth_idp_server.dart'
    as _iais;
import 'notes/local_note.dart' as _ikso7gqu;
import 'notes/local_photo.dart' as _itwniwe0;
import 'notes/local_sync_state.dart' as _in0ml025;
import 'notes/note.dart' as _iylmodbg;
import 'notes/note_change.dart' as _i61s5z42;
import 'notes/note_change_result.dart' as _i8ubjst2;
import 'notes/note_sync_status.dart' as _ib2x2ogd;
import 'notes/photo.dart' as _irr91rn9;
import 'notes/sync_counter.dart' as _iog7gw5t;
import 'notes/sync_pull_result.dart' as _i2fy8zhn;
export 'notes/local_note.dart';
export 'notes/local_photo.dart';
export 'notes/local_sync_state.dart';
export 'notes/note.dart';
export 'notes/note_change.dart';
export 'notes/note_change_result.dart';
export 'notes/note_sync_status.dart';
export 'notes/photo.dart';
export 'notes/sync_counter.dart';
export 'notes/sync_pull_result.dart';

class Protocol extends _is.DatabaseSerializationManager {
  Protocol._();

  factory Protocol() => _instance;

  static final Protocol _instance = Protocol._().._registerHostProtocols();

  static List<_isp.TableDefinition> get targetTableDefinitions => [
    _isp.TableDefinition(
      name: 'note',
      dartName: 'Note',
      schema: 'public',
      module: 'fieldnotes',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
          columnDefault: 'random_v7',
        ),
        _isp.ColumnDefinition(
          name: 'userId',
          columnType: _isp.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
        ),
        _isp.ColumnDefinition(
          name: 'title',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'\'',
        ),
        _isp.ColumnDefinition(
          name: 'body',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
          columnDefault: '\'\'',
        ),
        _isp.ColumnDefinition(
          name: 'revision',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '1',
        ),
        _isp.ColumnDefinition(
          name: 'deleted',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isp.ColumnDefinition(
          name: 'seq',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: false,
          dartType: 'DateTime',
        ),
        _isp.ColumnDefinition(
          name: 'updatedAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: false,
          dartType: 'DateTime',
        ),
      ],
      foreignKeys: [],
      indexes: [
        _isp.IndexDefinition(
          indexName: 'note_user_seq_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'userId',
            ),
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'seq',
            ),
          ],
          type: 'btree',
          isUnique: false,
          isPrimary: false,
        ),
      ],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'photo',
      dartName: 'Photo',
      schema: 'public',
      module: 'fieldnotes',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
          columnDefault: 'random_v7',
        ),
        _isp.ColumnDefinition(
          name: 'userId',
          columnType: _isp.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
        ),
        _isp.ColumnDefinition(
          name: 'noteId',
          columnType: _isp.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
        ),
        _isp.ColumnDefinition(
          name: 'mimeType',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'byteSize',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
        ),
        _isp.ColumnDefinition(
          name: 'storagePath',
          columnType: _isp.ColumnType.text,
          isNullable: false,
          dartType: 'String',
        ),
        _isp.ColumnDefinition(
          name: 'uploaded',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isp.ColumnDefinition(
          name: 'deleted',
          columnType: _isp.ColumnType.boolean,
          isNullable: false,
          dartType: 'bool',
          columnDefault: 'false',
        ),
        _isp.ColumnDefinition(
          name: 'seq',
          columnType: _isp.ColumnType.bigint,
          isNullable: true,
          dartType: 'int?',
        ),
        _isp.ColumnDefinition(
          name: 'createdAt',
          columnType: _isp.ColumnType.timestampWithoutTimeZone,
          isNullable: false,
          dartType: 'DateTime',
        ),
      ],
      foreignKeys: [],
      indexes: [
        _isp.IndexDefinition(
          indexName: 'photo_user_seq_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'userId',
            ),
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'seq',
            ),
          ],
          type: 'btree',
          isUnique: false,
          isPrimary: false,
        ),
        _isp.IndexDefinition(
          indexName: 'photo_note_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'noteId',
            ),
          ],
          type: 'btree',
          isUnique: false,
          isPrimary: false,
        ),
      ],
      managed: true,
    ),
    _isp.TableDefinition(
      name: 'sync_counter',
      dartName: 'SyncCounter',
      schema: 'public',
      module: 'fieldnotes',
      columns: [
        _isp.ColumnDefinition(
          name: 'id',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int?',
          columnDefault: 'serial',
        ),
        _isp.ColumnDefinition(
          name: 'userId',
          columnType: _isp.ColumnType.uuid,
          isNullable: false,
          dartType: 'UuidValue',
        ),
        _isp.ColumnDefinition(
          name: 'value',
          columnType: _isp.ColumnType.bigint,
          isNullable: false,
          dartType: 'int',
          columnDefault: '0',
        ),
      ],
      foreignKeys: [],
      indexes: [
        _isp.IndexDefinition(
          indexName: 'sync_counter_user_idx',
          tableSpace: null,
          elements: [
            _isp.IndexElementDefinition(
              type: _isp.IndexElementDefinitionType.column,
              definition: 'userId',
            ),
          ],
          type: 'btree',
          isUnique: true,
          isPrimary: false,
        ),
      ],
      managed: true,
    ),
    ..._iais.Protocol.targetTableDefinitions,
    ..._iacs.Protocol.targetTableDefinitions,
    ..._isp.Protocol.targetTableDefinitions,
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
      } on _is.DeserializationClassNameNotFoundException catch (_) {
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
    if (t == _iog7gw5t.SyncCounter) {
      return _iog7gw5t.SyncCounter.fromJson(data) as T;
    }
    if (t == _i2fy8zhn.SyncPullResult) {
      return _i2fy8zhn.SyncPullResult.fromJson(data) as T;
    }
    if (t == _is.getType<_ikso7gqu.LocalNote?>()) {
      return (data != null ? _ikso7gqu.LocalNote.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_itwniwe0.LocalPhoto?>()) {
      return (data != null ? _itwniwe0.LocalPhoto.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_in0ml025.LocalSyncState?>()) {
      return (data != null ? _in0ml025.LocalSyncState.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_iylmodbg.Note?>()) {
      return (data != null ? _iylmodbg.Note.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_i61s5z42.NoteChange?>()) {
      return (data != null ? _i61s5z42.NoteChange.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_i8ubjst2.NoteChangeResult?>()) {
      return (data != null ? _i8ubjst2.NoteChangeResult.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_ib2x2ogd.NoteSyncStatus?>()) {
      return (data != null ? _ib2x2ogd.NoteSyncStatus.fromJson(data) : null)
          as T;
    }
    if (t == _is.getType<_irr91rn9.Photo?>()) {
      return (data != null ? _irr91rn9.Photo.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_iog7gw5t.SyncCounter?>()) {
      return (data != null ? _iog7gw5t.SyncCounter.fromJson(data) : null) as T;
    }
    if (t == _is.getType<_i2fy8zhn.SyncPullResult?>()) {
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
      return _iais.Protocol().deserialize<T>(data, t);
    } on _is.DeserializationTypeNotFoundException catch (_) {}
    try {
      return _iacs.Protocol().deserialize<T>(data, t);
    } on _is.DeserializationTypeNotFoundException catch (_) {}
    try {
      return _isp.Protocol().deserialize<T>(data, t);
    } on _is.DeserializationTypeNotFoundException catch (_) {}
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
      _iog7gw5t.SyncCounter => 'SyncCounter',
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
      case _iog7gw5t.SyncCounter():
        return 'SyncCounter';
      case _i2fy8zhn.SyncPullResult():
        return 'SyncPullResult';
    }
    className = _iais.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.')
          ? className
          : 'serverpod_auth_idp.$className';
    }
    className = _iacs.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.')
          ? className
          : 'serverpod_auth_core.$className';
    }
    className = _isp.Protocol().getClassNameForObject(data);
    if (className != null) {
      return className.contains('.') ? className : 'serverpod.$className';
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
    if (dataClassName == 'SyncCounter') {
      return deserialize<_iog7gw5t.SyncCounter>(data['data']);
    }
    if (dataClassName == 'SyncPullResult') {
      return deserialize<_i2fy8zhn.SyncPullResult>(data['data']);
    }
    if (dataClassName.startsWith('serverpod_auth_idp.')) {
      data['className'] = dataClassName.substring(19);
      return _iais.Protocol().deserializeByClassName(data);
    }
    if (dataClassName.startsWith('serverpod_auth_core.')) {
      data['className'] = dataClassName.substring(20);
      return _iacs.Protocol().deserializeByClassName(data);
    }
    if (dataClassName.startsWith('serverpod.')) {
      data['className'] = dataClassName.substring(10);
      return _isp.Protocol().deserializeByClassName(data);
    }
    return super.deserializeByClassName(data);
  }

  void _registerHostProtocols() {
    _iais.Protocol().registerHostProtocol('fieldnotes', this);
    _iacs.Protocol().registerHostProtocol('fieldnotes', this);
  }

  @override
  _is.Table? getTableForType(Type t) {
    {
      var table = _iais.Protocol().getTableForType(t);
      if (table != null) {
        return table;
      }
    }
    {
      var table = _iacs.Protocol().getTableForType(t);
      if (table != null) {
        return table;
      }
    }
    {
      var table = _isp.Protocol().getTableForType(t);
      if (table != null) {
        return table;
      }
    }
    switch (t) {
      case _iylmodbg.Note:
        return _iylmodbg.Note.t;
      case _irr91rn9.Photo:
        return _irr91rn9.Photo.t;
      case _iog7gw5t.SyncCounter:
        return _iog7gw5t.SyncCounter.t;
    }
    return null;
  }

  @override
  List<_isp.TableDefinition> getTargetTableDefinitions() =>
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
      return _iais.Protocol().mapRecordToJson(record);
    } catch (_) {}
    try {
      return _iacs.Protocol().mapRecordToJson(record);
    } catch (_) {}
    throw Exception('Unsupported record type ${record.runtimeType}');
  }
}
