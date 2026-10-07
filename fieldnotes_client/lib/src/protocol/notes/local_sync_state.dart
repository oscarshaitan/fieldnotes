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
import 'package:serverpod_database/serverpod_database.dart' as _isd;

/// Single-row table with the pull cursor and whose data this device holds.
abstract class LocalSyncState
    implements _isd.TableRow<int?>, _isc.ProtocolSerialization {
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

  static final t = LocalSyncStateTable();

  static const db = LocalSyncStateRepository._();

  @override
  int? id;

  int cursor;

  /// "<server url>|<user id>" the local data belongs to. Data is discarded when
  /// another account or server signs in, since cursors are per user and server.
  String? owner;

  @override
  _isd.Table<int?> get table => t;

  /// Returns a shallow copy of this [LocalSyncState]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
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

  static LocalSyncStateInclude include() {
    return LocalSyncStateInclude._();
  }

  static LocalSyncStateIncludeList includeList({
    _isd.WhereExpressionBuilder<LocalSyncStateTable>? where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalSyncStateTable>? orderBy,
    _isd.OrderByListBuilder<LocalSyncStateTable>? orderByList,
    LocalSyncStateInclude? include,
  }) {
    return LocalSyncStateIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(LocalSyncState.t),
      orderByList: orderByList?.call(LocalSyncState.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
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
  @_isc.useResult
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

class LocalSyncStateUpdateTable extends _isd.UpdateTable<LocalSyncStateTable> {
  LocalSyncStateUpdateTable(super.table);

  _isd.ColumnValue<int, int> cursor(int value) => _isd.ColumnValue(
    table.cursor,
    value,
  );

  _isd.ColumnValue<String, String> owner(String? value) => _isd.ColumnValue(
    table.owner,
    value,
  );
}

class LocalSyncStateTable extends _isd.Table<int?> {
  LocalSyncStateTable({super.tableRelation})
    : super(tableName: 'local_sync_state') {
    updateTable = LocalSyncStateUpdateTable(this);
    cursor = _isd.ColumnInt(
      'cursor',
      this,
      hasDefault: true,
    );
    owner = _isd.ColumnString(
      'owner',
      this,
    );
  }

  late final LocalSyncStateUpdateTable updateTable;

  late final _isd.ColumnInt cursor;

  /// "<server url>|<user id>" the local data belongs to. Data is discarded when
  /// another account or server signs in, since cursors are per user and server.
  late final _isd.ColumnString owner;

  @override
  List<_isd.Column> get columns => [
    id,
    cursor,
    owner,
  ];
}

class LocalSyncStateInclude extends _isd.IncludeObject {
  LocalSyncStateInclude._();

  @override
  Map<String, _isd.Include?> get includes => {};

  @override
  _isd.Table<int?> get table => LocalSyncState.t;
}

class LocalSyncStateIncludeList extends _isd.IncludeList {
  LocalSyncStateIncludeList._({
    _isd.WhereExpressionBuilder<LocalSyncStateTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(LocalSyncState.t);
  }

  @override
  Map<String, _isd.Include?> get includes => include?.includes ?? {};

  @override
  _isd.Table<int?> get table => LocalSyncState.t;
}

class LocalSyncStateRepository {
  const LocalSyncStateRepository._();

  /// Returns a list of [LocalSyncState]s matching the given query parameters.
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
  Future<List<LocalSyncState>> find(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalSyncStateTable>? where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalSyncStateTable>? orderBy,
    _isd.OrderByListBuilder<LocalSyncStateTable>? orderByList,
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<LocalSyncState>(
      where: where?.call(LocalSyncState.t),
      orderBy: orderBy?.call(LocalSyncState.t),
      orderByList: orderByList?.call(LocalSyncState.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Returns the first matching [LocalSyncState] matching the given query parameters.
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
  Future<LocalSyncState?> findFirstRow(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalSyncStateTable>? where,
    int? offset,
    _isd.OrderByBuilder<LocalSyncStateTable>? orderBy,
    _isd.OrderByListBuilder<LocalSyncStateTable>? orderByList,
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<LocalSyncState>(
      where: where?.call(LocalSyncState.t),
      orderBy: orderBy?.call(LocalSyncState.t),
      orderByList: orderByList?.call(LocalSyncState.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [LocalSyncState] by its [id] or null if no such row exists.
  Future<LocalSyncState?> findById(
    _isd.DatabaseSession session,
    int id, {
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<LocalSyncState>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [LocalSyncState]s in the list and returns the inserted rows.
  ///
  /// The returned [LocalSyncState]s will have their `id` fields set.
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
  Future<List<LocalSyncState>> insert(
    _isd.DatabaseSession session,
    List<LocalSyncState> rows, {
    _isd.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<LocalSyncState>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [LocalSyncState] and returns the inserted row.
  ///
  /// The returned [LocalSyncState] will have its `id` field set.
  Future<LocalSyncState> insertRow(
    _isd.DatabaseSession session,
    LocalSyncState row, {
    _isd.Transaction? transaction,
  }) async {
    return session.db.insertRow<LocalSyncState>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [LocalSyncState]s in the list and returns the resulting rows.
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
  /// The returned [LocalSyncState]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalSyncState>> upsert(
    _isd.DatabaseSession session,
    List<LocalSyncState> rows, {
    required _isd.ColumnSelections<LocalSyncStateTable> conflictColumns,
    _isd.ColumnSelections<LocalSyncStateTable>? updateColumns,
    _isd.WhereExpressionBuilder<LocalSyncStateTable>? updateWhere,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<LocalSyncState>(
      rows,
      conflictColumns: conflictColumns(LocalSyncState.t),
      updateColumns: updateColumns?.call(LocalSyncState.t),
      updateWhere: updateWhere?.call(LocalSyncState.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [LocalSyncState] and returns the resulting row.
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
  /// The returned [LocalSyncState] will have its `id` field set.
  Future<LocalSyncState?> upsertRow(
    _isd.DatabaseSession session,
    LocalSyncState row, {
    required _isd.ColumnSelections<LocalSyncStateTable> conflictColumns,
    _isd.ColumnSelections<LocalSyncStateTable>? updateColumns,
    _isd.WhereExpressionBuilder<LocalSyncStateTable>? updateWhere,
    _isd.Transaction? transaction,
  }) async {
    return session.db.upsertRow<LocalSyncState>(
      row,
      conflictColumns: conflictColumns(LocalSyncState.t),
      updateColumns: updateColumns?.call(LocalSyncState.t),
      updateWhere: updateWhere?.call(LocalSyncState.t),
      transaction: transaction,
    );
  }

  /// Updates all [LocalSyncState]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalSyncState>> update(
    _isd.DatabaseSession session,
    List<LocalSyncState> rows, {
    _isd.ColumnSelections<LocalSyncStateTable>? columns,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<LocalSyncState>(
      rows,
      columns: columns?.call(LocalSyncState.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [LocalSyncState]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<LocalSyncState> updateRow(
    _isd.DatabaseSession session,
    LocalSyncState row, {
    _isd.ColumnSelections<LocalSyncStateTable>? columns,
    _isd.Transaction? transaction,
  }) async {
    return session.db.updateRow<LocalSyncState>(
      row,
      columns: columns?.call(LocalSyncState.t),
      transaction: transaction,
    );
  }

  /// Updates a single [LocalSyncState] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<LocalSyncState?> updateById(
    _isd.DatabaseSession session,
    int id, {
    required _isd.ColumnValueListBuilder<LocalSyncStateUpdateTable>
    columnValues,
    _isd.Transaction? transaction,
  }) async {
    return session.db.updateById<LocalSyncState>(
      id,
      columnValues: columnValues(LocalSyncState.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [LocalSyncState]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalSyncState>> updateWhere(
    _isd.DatabaseSession session, {
    required _isd.ColumnValueListBuilder<LocalSyncStateUpdateTable>
    columnValues,
    required _isd.WhereExpressionBuilder<LocalSyncStateTable> where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalSyncStateTable>? orderBy,
    _isd.OrderByListBuilder<LocalSyncStateTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<LocalSyncState>(
      columnValues: columnValues(LocalSyncState.t.updateTable),
      where: where(LocalSyncState.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(LocalSyncState.t),
      orderByList: orderByList?.call(LocalSyncState.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [LocalSyncState]s in the list and returns the deleted rows.
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
  Future<List<LocalSyncState>> delete(
    _isd.DatabaseSession session,
    List<LocalSyncState> rows, {
    _isd.OrderByBuilder<LocalSyncStateTable>? orderBy,
    _isd.OrderByListBuilder<LocalSyncStateTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<LocalSyncState>(
      rows,
      orderBy: orderBy?.call(LocalSyncState.t),
      orderByList: orderByList?.call(LocalSyncState.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [LocalSyncState].
  Future<LocalSyncState> deleteRow(
    _isd.DatabaseSession session,
    LocalSyncState row, {
    _isd.Transaction? transaction,
  }) async {
    return session.db.deleteRow<LocalSyncState>(
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
  Future<List<LocalSyncState>> deleteWhere(
    _isd.DatabaseSession session, {
    required _isd.WhereExpressionBuilder<LocalSyncStateTable> where,
    _isd.OrderByBuilder<LocalSyncStateTable>? orderBy,
    _isd.OrderByListBuilder<LocalSyncStateTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<LocalSyncState>(
      where: where(LocalSyncState.t),
      orderBy: orderBy?.call(LocalSyncState.t),
      orderByList: orderByList?.call(LocalSyncState.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalSyncStateTable>? where,
    int? limit,
    _isd.Transaction? transaction,
  }) async {
    return session.db.count<LocalSyncState>(
      where: where?.call(LocalSyncState.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [LocalSyncState] rows matching the [where] expression.
  Future<void> lockRows(
    _isd.DatabaseSession session, {
    required _isd.WhereExpressionBuilder<LocalSyncStateTable> where,
    required _isd.LockMode lockMode,
    required _isd.Transaction transaction,
    _isd.LockBehavior lockBehavior = _isd.LockBehavior.wait,
  }) async {
    return session.db.lockRows<LocalSyncState>(
      where: where(LocalSyncState.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
