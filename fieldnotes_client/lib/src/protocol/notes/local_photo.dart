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
import 'package:serverpod_client/serverpod_client.dart' as _isc;
import 'package:serverpod_database/serverpod_database.dart' as _isd;

/// A photo in the on-device SQLite database.
abstract class LocalPhoto
    implements _isd.TableRow<_isc.UuidValue>, _isc.ProtocolSerialization {
  LocalPhoto._({
    _isc.UuidValue? id,
    required this.noteId,
    required this.mimeType,
    this.data,
    bool? uploaded,
    bool? deleted,
    required this.createdAt,
  }) : id = id ?? const _isc.Uuid().v7obj(),
       uploaded = uploaded ?? false,
       deleted = deleted ?? false;

  factory LocalPhoto({
    _isc.UuidValue? id,
    required _isc.UuidValue noteId,
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
          : _isc.UuidValueJsonExtension.fromJson(jsonSerialization['id']),
      noteId: _isc.UuidValueJsonExtension.fromJson(jsonSerialization['noteId']),
      mimeType: jsonSerialization['mimeType'] as String,
      data: jsonSerialization['data'] == null
          ? null
          : _isc.ByteDataJsonExtension.fromJson(jsonSerialization['data']),
      uploaded: jsonSerialization['uploaded'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['uploaded']),
      deleted: jsonSerialization['deleted'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['deleted']),
      createdAt: _isc.DateTimeJsonExtension.fromJson(
        jsonSerialization['createdAt'],
      ),
    );
  }

  static final t = LocalPhotoTable();

  static const db = LocalPhotoRepository._();

  @override
  _isc.UuidValue id;

  _isc.UuidValue noteId;

  String mimeType;

  /// Null until downloaded (photos taken on another device).
  _idt.ByteData? data;

  /// True once the bytes are safely on the server.
  bool uploaded;

  /// Removed locally, waiting for the deletion to reach the server.
  bool deleted;

  DateTime createdAt;

  @override
  _isd.Table<_isc.UuidValue> get table => t;

  /// Returns a shallow copy of this [LocalPhoto]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  LocalPhoto copyWith({
    _isc.UuidValue? id,
    _isc.UuidValue? noteId,
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

  static LocalPhotoInclude include() {
    return LocalPhotoInclude._();
  }

  static LocalPhotoIncludeList includeList({
    _isd.WhereExpressionBuilder<LocalPhotoTable>? where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalPhotoTable>? orderBy,
    _isd.OrderByListBuilder<LocalPhotoTable>? orderByList,
    LocalPhotoInclude? include,
  }) {
    return LocalPhotoIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(LocalPhoto.t),
      orderByList: orderByList?.call(LocalPhoto.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _LocalPhotoImpl extends LocalPhoto {
  _LocalPhotoImpl({
    _isc.UuidValue? id,
    required _isc.UuidValue noteId,
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
  @_isc.useResult
  @override
  LocalPhoto copyWith({
    _isc.UuidValue? id,
    _isc.UuidValue? noteId,
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

class LocalPhotoUpdateTable extends _isd.UpdateTable<LocalPhotoTable> {
  LocalPhotoUpdateTable(super.table);

  _isd.ColumnValue<_isc.UuidValue, _isc.UuidValue> noteId(
    _isc.UuidValue value,
  ) => _isd.ColumnValue(
    table.noteId,
    value,
  );

  _isd.ColumnValue<String, String> mimeType(String value) => _isd.ColumnValue(
    table.mimeType,
    value,
  );

  _isd.ColumnValue<_idt.ByteData, _idt.ByteData> data(_idt.ByteData? value) =>
      _isd.ColumnValue(
        table.data,
        value,
      );

  _isd.ColumnValue<bool, bool> uploaded(bool value) => _isd.ColumnValue(
    table.uploaded,
    value,
  );

  _isd.ColumnValue<bool, bool> deleted(bool value) => _isd.ColumnValue(
    table.deleted,
    value,
  );

  _isd.ColumnValue<DateTime, DateTime> createdAt(DateTime value) =>
      _isd.ColumnValue(
        table.createdAt,
        value,
      );
}

class LocalPhotoTable extends _isd.Table<_isc.UuidValue> {
  LocalPhotoTable({super.tableRelation}) : super(tableName: 'local_photo') {
    updateTable = LocalPhotoUpdateTable(this);
    noteId = _isd.ColumnUuid(
      'noteId',
      this,
    );
    mimeType = _isd.ColumnString(
      'mimeType',
      this,
    );
    data = _isd.ColumnByteData(
      'data',
      this,
    );
    uploaded = _isd.ColumnBool(
      'uploaded',
      this,
      hasDefault: true,
    );
    deleted = _isd.ColumnBool(
      'deleted',
      this,
      hasDefault: true,
    );
    createdAt = _isd.ColumnDateTime(
      'createdAt',
      this,
    );
  }

  late final LocalPhotoUpdateTable updateTable;

  late final _isd.ColumnUuid noteId;

  late final _isd.ColumnString mimeType;

  /// Null until downloaded (photos taken on another device).
  late final _isd.ColumnByteData data;

  /// True once the bytes are safely on the server.
  late final _isd.ColumnBool uploaded;

  /// Removed locally, waiting for the deletion to reach the server.
  late final _isd.ColumnBool deleted;

  late final _isd.ColumnDateTime createdAt;

  @override
  List<_isd.Column> get columns => [
    id,
    noteId,
    mimeType,
    data,
    uploaded,
    deleted,
    createdAt,
  ];
}

class LocalPhotoInclude extends _isd.IncludeObject {
  LocalPhotoInclude._();

  @override
  Map<String, _isd.Include?> get includes => {};

  @override
  _isd.Table<_isc.UuidValue> get table => LocalPhoto.t;
}

class LocalPhotoIncludeList extends _isd.IncludeList {
  LocalPhotoIncludeList._({
    _isd.WhereExpressionBuilder<LocalPhotoTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(LocalPhoto.t);
  }

  @override
  Map<String, _isd.Include?> get includes => include?.includes ?? {};

  @override
  _isd.Table<_isc.UuidValue> get table => LocalPhoto.t;
}

class LocalPhotoRepository {
  const LocalPhotoRepository._();

  /// Returns a list of [LocalPhoto]s matching the given query parameters.
  ///
  /// Use [where] to specify which items to include in the return value.
  /// If none is specified, all items will be returned.
  ///
  /// To specify the order of the items use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// The maximum number of items can be set by [limit]. If no limit is set,
  /// all items matching the query will be returned.
  ///
  /// [offset] defines how many items to skip, after which [limit] (or all)
  /// items are read from the database.
  ///
  /// ```dart
  /// var persons = await Persons.db.find(
  ///   session,
  ///   where: (t) => t.lastName.equals('Jones'),
  ///   orderBy: (t) => t.firstName,
  ///   limit: 100,
  /// );
  /// ```
  Future<List<LocalPhoto>> find(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalPhotoTable>? where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalPhotoTable>? orderBy,
    _isd.OrderByListBuilder<LocalPhotoTable>? orderByList,
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<LocalPhoto>(
      where: where?.call(LocalPhoto.t),
      orderBy: orderBy?.call(LocalPhoto.t),
      orderByList: orderByList?.call(LocalPhoto.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Returns the first matching [LocalPhoto] matching the given query parameters.
  ///
  /// Use [where] to specify which items to include in the return value.
  /// If none is specified, all items will be returned.
  ///
  /// To specify the order use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// [offset] defines how many items to skip, after which the next one will be picked.
  ///
  /// ```dart
  /// var youngestPerson = await Persons.db.findFirstRow(
  ///   session,
  ///   where: (t) => t.lastName.equals('Jones'),
  ///   orderBy: (t) => t.age,
  /// );
  /// ```
  Future<LocalPhoto?> findFirstRow(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalPhotoTable>? where,
    int? offset,
    _isd.OrderByBuilder<LocalPhotoTable>? orderBy,
    _isd.OrderByListBuilder<LocalPhotoTable>? orderByList,
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<LocalPhoto>(
      where: where?.call(LocalPhoto.t),
      orderBy: orderBy?.call(LocalPhoto.t),
      orderByList: orderByList?.call(LocalPhoto.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [LocalPhoto] by its [id] or null if no such row exists.
  Future<LocalPhoto?> findById(
    _isd.DatabaseSession session,
    _isc.UuidValue id, {
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<LocalPhoto>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [LocalPhoto]s in the list and returns the inserted rows.
  ///
  /// The returned [LocalPhoto]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// insert, none of the rows will be inserted.
  ///
  /// If [ignoreConflicts] is set to `true`, rows that conflict with existing
  /// rows are silently skipped, and only the successfully inserted rows are
  /// returned.
  ///
  /// If [noReturn] is set to `true`, the inserted rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalPhoto>> insert(
    _isd.DatabaseSession session,
    List<LocalPhoto> rows, {
    _isd.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<LocalPhoto>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [LocalPhoto] and returns the inserted row.
  ///
  /// The returned [LocalPhoto] will have its `id` field set.
  Future<LocalPhoto> insertRow(
    _isd.DatabaseSession session,
    LocalPhoto row, {
    _isd.Transaction? transaction,
  }) async {
    return session.db.insertRow<LocalPhoto>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [LocalPhoto]s in the list and returns the resulting rows.
  ///
  /// If a row conflicts on the given [conflictColumns], the existing row is
  /// updated with the new values. Otherwise, a new row is inserted.
  ///
  /// If [updateColumns] is provided, only those columns will be updated on
  /// conflict. If null, all non-conflict, non-id columns are updated.
  ///
  /// If [updateWhere] is provided, the update only applies to rows matching the
  /// given expression. Conflicting rows that don't match are skipped and not
  /// returned, so the resulting list may be shorter than [rows].
  ///
  /// The returned [LocalPhoto]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalPhoto>> upsert(
    _isd.DatabaseSession session,
    List<LocalPhoto> rows, {
    required _isd.ColumnSelections<LocalPhotoTable> conflictColumns,
    _isd.ColumnSelections<LocalPhotoTable>? updateColumns,
    _isd.WhereExpressionBuilder<LocalPhotoTable>? updateWhere,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<LocalPhoto>(
      rows,
      conflictColumns: conflictColumns(LocalPhoto.t),
      updateColumns: updateColumns?.call(LocalPhoto.t),
      updateWhere: updateWhere?.call(LocalPhoto.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [LocalPhoto] and returns the resulting row.
  ///
  /// If the row conflicts on the given [conflictColumns], the existing row is
  /// updated. Otherwise, a new row is inserted.
  ///
  /// If [updateColumns] is provided, only those columns will be updated on
  /// conflict. If null, all non-conflict, non-id columns are updated.
  ///
  /// If [updateWhere] is provided, the update only applies when the existing
  /// row matches the expression. Returns `null` if no row was affected — for
  /// example when [updateWhere] does not match the conflicting row.
  ///
  /// The returned [LocalPhoto] will have its `id` field set.
  Future<LocalPhoto?> upsertRow(
    _isd.DatabaseSession session,
    LocalPhoto row, {
    required _isd.ColumnSelections<LocalPhotoTable> conflictColumns,
    _isd.ColumnSelections<LocalPhotoTable>? updateColumns,
    _isd.WhereExpressionBuilder<LocalPhotoTable>? updateWhere,
    _isd.Transaction? transaction,
  }) async {
    return session.db.upsertRow<LocalPhoto>(
      row,
      conflictColumns: conflictColumns(LocalPhoto.t),
      updateColumns: updateColumns?.call(LocalPhoto.t),
      updateWhere: updateWhere?.call(LocalPhoto.t),
      transaction: transaction,
    );
  }

  /// Updates all [LocalPhoto]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalPhoto>> update(
    _isd.DatabaseSession session,
    List<LocalPhoto> rows, {
    _isd.ColumnSelections<LocalPhotoTable>? columns,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<LocalPhoto>(
      rows,
      columns: columns?.call(LocalPhoto.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [LocalPhoto]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<LocalPhoto> updateRow(
    _isd.DatabaseSession session,
    LocalPhoto row, {
    _isd.ColumnSelections<LocalPhotoTable>? columns,
    _isd.Transaction? transaction,
  }) async {
    return session.db.updateRow<LocalPhoto>(
      row,
      columns: columns?.call(LocalPhoto.t),
      transaction: transaction,
    );
  }

  /// Updates a single [LocalPhoto] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<LocalPhoto?> updateById(
    _isd.DatabaseSession session,
    _isc.UuidValue id, {
    required _isd.ColumnValueListBuilder<LocalPhotoUpdateTable> columnValues,
    _isd.Transaction? transaction,
  }) async {
    return session.db.updateById<LocalPhoto>(
      id,
      columnValues: columnValues(LocalPhoto.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [LocalPhoto]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalPhoto>> updateWhere(
    _isd.DatabaseSession session, {
    required _isd.ColumnValueListBuilder<LocalPhotoUpdateTable> columnValues,
    required _isd.WhereExpressionBuilder<LocalPhotoTable> where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalPhotoTable>? orderBy,
    _isd.OrderByListBuilder<LocalPhotoTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<LocalPhoto>(
      columnValues: columnValues(LocalPhoto.t.updateTable),
      where: where(LocalPhoto.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(LocalPhoto.t),
      orderByList: orderByList?.call(LocalPhoto.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [LocalPhoto]s in the list and returns the deleted rows.
  ///
  /// To specify the order of the returned rows use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// This is an atomic operation, meaning that if one of the rows fail to
  /// be deleted, none of the rows will be deleted.
  ///
  /// If [noReturn] is set to `true`, the deleted rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalPhoto>> delete(
    _isd.DatabaseSession session,
    List<LocalPhoto> rows, {
    _isd.OrderByBuilder<LocalPhotoTable>? orderBy,
    _isd.OrderByListBuilder<LocalPhotoTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<LocalPhoto>(
      rows,
      orderBy: orderBy?.call(LocalPhoto.t),
      orderByList: orderByList?.call(LocalPhoto.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [LocalPhoto].
  Future<LocalPhoto> deleteRow(
    _isd.DatabaseSession session,
    LocalPhoto row, {
    _isd.Transaction? transaction,
  }) async {
    return session.db.deleteRow<LocalPhoto>(
      row,
      transaction: transaction,
    );
  }

  /// Deletes all rows matching the [where] expression.
  ///
  /// To specify the order of the returned rows use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// If [noReturn] is set to `true`, the deleted rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalPhoto>> deleteWhere(
    _isd.DatabaseSession session, {
    required _isd.WhereExpressionBuilder<LocalPhotoTable> where,
    _isd.OrderByBuilder<LocalPhotoTable>? orderBy,
    _isd.OrderByListBuilder<LocalPhotoTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<LocalPhoto>(
      where: where(LocalPhoto.t),
      orderBy: orderBy?.call(LocalPhoto.t),
      orderByList: orderByList?.call(LocalPhoto.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalPhotoTable>? where,
    int? limit,
    _isd.Transaction? transaction,
  }) async {
    return session.db.count<LocalPhoto>(
      where: where?.call(LocalPhoto.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [LocalPhoto] rows matching the [where] expression.
  Future<void> lockRows(
    _isd.DatabaseSession session, {
    required _isd.WhereExpressionBuilder<LocalPhotoTable> where,
    required _isd.LockMode lockMode,
    required _isd.Transaction transaction,
    _isd.LockBehavior lockBehavior = _isd.LockBehavior.wait,
  }) async {
    return session.db.lockRows<LocalPhoto>(
      where: where(LocalPhoto.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
