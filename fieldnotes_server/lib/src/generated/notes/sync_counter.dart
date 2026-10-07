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

/// Per-user monotonically increasing counter that orders all changes.
abstract class SyncCounter
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
  SyncCounter._({
    this.id,
    required this.userId,
    int? value,
  }) : value = value ?? 0;

  factory SyncCounter({
    int? id,
    required _is.UuidValue userId,
    int? value,
  }) = _SyncCounterImpl;

  factory SyncCounter.fromJson(Map<String, dynamic> jsonSerialization) {
    return SyncCounter(
      id: jsonSerialization['id'] as int?,
      userId: _is.UuidValueJsonExtension.fromJson(jsonSerialization['userId']),
      value: jsonSerialization['value'] as int?,
    );
  }

  static final t = SyncCounterTable();

  static const db = SyncCounterRepository._();

  @override
  int? id;

  _is.UuidValue userId;

  int value;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [SyncCounter]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  SyncCounter copyWith({
    int? id,
    _is.UuidValue? userId,
    int? value,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'SyncCounter',
      if (id != null) 'id': id,
      'userId': userId.toJson(),
      'value': value,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {};
  }

  static SyncCounterInclude include() {
    return SyncCounterInclude._();
  }

  static SyncCounterIncludeList includeList({
    _is.WhereExpressionBuilder<SyncCounterTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<SyncCounterTable>? orderBy,
    _is.OrderByListBuilder<SyncCounterTable>? orderByList,
    SyncCounterInclude? include,
  }) {
    return SyncCounterIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(SyncCounter.t),
      orderByList: orderByList?.call(SyncCounter.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _SyncCounterImpl extends SyncCounter {
  _SyncCounterImpl({
    int? id,
    required _is.UuidValue userId,
    int? value,
  }) : super._(
         id: id,
         userId: userId,
         value: value,
       );

  /// Returns a shallow copy of this [SyncCounter]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  SyncCounter copyWith({
    Object? id = _Undefined,
    _is.UuidValue? userId,
    int? value,
  }) {
    return SyncCounter(
      id: id is int? ? id : this.id,
      userId: userId ?? this.userId,
      value: value ?? this.value,
    );
  }
}

class SyncCounterUpdateTable extends _is.UpdateTable<SyncCounterTable> {
  SyncCounterUpdateTable(super.table);

  _is.ColumnValue<_is.UuidValue, _is.UuidValue> userId(_is.UuidValue value) =>
      _is.ColumnValue(
        table.userId,
        value,
      );

  _is.ColumnValue<int, int> value(int value) => _is.ColumnValue(
    table.value,
    value,
  );
}

class SyncCounterTable extends _is.Table<int?> {
  SyncCounterTable({super.tableRelation}) : super(tableName: 'sync_counter') {
    updateTable = SyncCounterUpdateTable(this);
    userId = _is.ColumnUuid(
      'userId',
      this,
    );
    value = _is.ColumnInt(
      'value',
      this,
      hasDefault: true,
    );
  }

  late final SyncCounterUpdateTable updateTable;

  late final _is.ColumnUuid userId;

  late final _is.ColumnInt value;

  @override
  List<_is.Column> get columns => [
    id,
    userId,
    value,
  ];
}

class SyncCounterInclude extends _is.IncludeObject {
  SyncCounterInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => SyncCounter.t;
}

class SyncCounterIncludeList extends _is.IncludeList {
  SyncCounterIncludeList._({
    _is.WhereExpressionBuilder<SyncCounterTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(SyncCounter.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => SyncCounter.t;
}

class SyncCounterRepository {
  const SyncCounterRepository._();

  /// Returns a list of [SyncCounter]s matching the given query parameters.
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
  Future<List<SyncCounter>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<SyncCounterTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<SyncCounterTable>? orderBy,
    _is.OrderByListBuilder<SyncCounterTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<SyncCounter>(
      where: where?.call(SyncCounter.t),
      orderBy: orderBy?.call(SyncCounter.t),
      orderByList: orderByList?.call(SyncCounter.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Returns the first matching [SyncCounter] matching the given query parameters.
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
  Future<SyncCounter?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<SyncCounterTable>? where,
    int? offset,
    _is.OrderByBuilder<SyncCounterTable>? orderBy,
    _is.OrderByListBuilder<SyncCounterTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<SyncCounter>(
      where: where?.call(SyncCounter.t),
      orderBy: orderBy?.call(SyncCounter.t),
      orderByList: orderByList?.call(SyncCounter.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [SyncCounter] by its [id] or null if no such row exists.
  Future<SyncCounter?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<SyncCounter>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [SyncCounter]s in the list and returns the inserted rows.
  ///
  /// The returned [SyncCounter]s will have their `id` fields set.
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
  Future<List<SyncCounter>> insert(
    _is.DatabaseSession session,
    List<SyncCounter> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<SyncCounter>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [SyncCounter] and returns the inserted row.
  ///
  /// The returned [SyncCounter] will have its `id` field set.
  Future<SyncCounter> insertRow(
    _is.DatabaseSession session,
    SyncCounter row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<SyncCounter>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [SyncCounter]s in the list and returns the resulting rows.
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
  /// The returned [SyncCounter]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<SyncCounter>> upsert(
    _is.DatabaseSession session,
    List<SyncCounter> rows, {
    required _is.ColumnSelections<SyncCounterTable> conflictColumns,
    _is.ColumnSelections<SyncCounterTable>? updateColumns,
    _is.WhereExpressionBuilder<SyncCounterTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<SyncCounter>(
      rows,
      conflictColumns: conflictColumns(SyncCounter.t),
      updateColumns: updateColumns?.call(SyncCounter.t),
      updateWhere: updateWhere?.call(SyncCounter.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [SyncCounter] and returns the resulting row.
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
  /// The returned [SyncCounter] will have its `id` field set.
  Future<SyncCounter?> upsertRow(
    _is.DatabaseSession session,
    SyncCounter row, {
    required _is.ColumnSelections<SyncCounterTable> conflictColumns,
    _is.ColumnSelections<SyncCounterTable>? updateColumns,
    _is.WhereExpressionBuilder<SyncCounterTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<SyncCounter>(
      row,
      conflictColumns: conflictColumns(SyncCounter.t),
      updateColumns: updateColumns?.call(SyncCounter.t),
      updateWhere: updateWhere?.call(SyncCounter.t),
      transaction: transaction,
    );
  }

  /// Updates all [SyncCounter]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<SyncCounter>> update(
    _is.DatabaseSession session,
    List<SyncCounter> rows, {
    _is.ColumnSelections<SyncCounterTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<SyncCounter>(
      rows,
      columns: columns?.call(SyncCounter.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [SyncCounter]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<SyncCounter> updateRow(
    _is.DatabaseSession session,
    SyncCounter row, {
    _is.ColumnSelections<SyncCounterTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<SyncCounter>(
      row,
      columns: columns?.call(SyncCounter.t),
      transaction: transaction,
    );
  }

  /// Updates a single [SyncCounter] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<SyncCounter?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<SyncCounterUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<SyncCounter>(
      id,
      columnValues: columnValues(SyncCounter.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [SyncCounter]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<SyncCounter>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<SyncCounterUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<SyncCounterTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<SyncCounterTable>? orderBy,
    _is.OrderByListBuilder<SyncCounterTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<SyncCounter>(
      columnValues: columnValues(SyncCounter.t.updateTable),
      where: where(SyncCounter.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(SyncCounter.t),
      orderByList: orderByList?.call(SyncCounter.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [SyncCounter]s in the list and returns the deleted rows.
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
  Future<List<SyncCounter>> delete(
    _is.DatabaseSession session,
    List<SyncCounter> rows, {
    _is.OrderByBuilder<SyncCounterTable>? orderBy,
    _is.OrderByListBuilder<SyncCounterTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<SyncCounter>(
      rows,
      orderBy: orderBy?.call(SyncCounter.t),
      orderByList: orderByList?.call(SyncCounter.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [SyncCounter].
  Future<SyncCounter> deleteRow(
    _is.DatabaseSession session,
    SyncCounter row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<SyncCounter>(
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
  Future<List<SyncCounter>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<SyncCounterTable> where,
    _is.OrderByBuilder<SyncCounterTable>? orderBy,
    _is.OrderByListBuilder<SyncCounterTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<SyncCounter>(
      where: where(SyncCounter.t),
      orderBy: orderBy?.call(SyncCounter.t),
      orderByList: orderByList?.call(SyncCounter.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<SyncCounterTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<SyncCounter>(
      where: where?.call(SyncCounter.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [SyncCounter] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<SyncCounterTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<SyncCounter>(
      where: where(SyncCounter.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
