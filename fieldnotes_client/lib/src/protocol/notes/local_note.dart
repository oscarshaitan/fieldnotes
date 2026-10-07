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

/// A note in the on-device SQLite database.
abstract class LocalNote
    implements _isd.TableRow<_isc.UuidValue>, _isc.ProtocolSerialization {
  LocalNote._({
    _isc.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    this.remoteRevision,
    this.remoteTitle,
    this.remoteBody,
    this.remoteDeleted,
    required this.createdAt,
    required this.updatedAt,
  }) : id = id ?? const _isc.Uuid().v7obj(),
       title = title ?? '',
       body = body ?? '',
       revision = revision ?? 0,
       baseTitle = baseTitle ?? '',
       baseBody = baseBody ?? '',
       dirty = dirty ?? false,
       deleted = deleted ?? false,
       conflict = conflict ?? false;

  factory LocalNote({
    _isc.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    int? remoteRevision,
    String? remoteTitle,
    String? remoteBody,
    bool? remoteDeleted,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) = _LocalNoteImpl;

  factory LocalNote.fromJson(Map<String, dynamic> jsonSerialization) {
    return LocalNote(
      id: jsonSerialization['id'] == null
          ? null
          : _isc.UuidValueJsonExtension.fromJson(jsonSerialization['id']),
      title: jsonSerialization['title'] as String?,
      body: jsonSerialization['body'] as String?,
      revision: jsonSerialization['revision'] as int?,
      baseTitle: jsonSerialization['baseTitle'] as String?,
      baseBody: jsonSerialization['baseBody'] as String?,
      dirty: jsonSerialization['dirty'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['dirty']),
      deleted: jsonSerialization['deleted'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['deleted']),
      conflict: jsonSerialization['conflict'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['conflict']),
      remoteRevision: jsonSerialization['remoteRevision'] as int?,
      remoteTitle: jsonSerialization['remoteTitle'] as String?,
      remoteBody: jsonSerialization['remoteBody'] as String?,
      remoteDeleted: jsonSerialization['remoteDeleted'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['remoteDeleted']),
      createdAt: _isc.DateTimeJsonExtension.fromJson(
        jsonSerialization['createdAt'],
      ),
      updatedAt: _isc.DateTimeJsonExtension.fromJson(
        jsonSerialization['updatedAt'],
      ),
    );
  }

  static final t = LocalNoteTable();

  static const db = LocalNoteRepository._();

  @override
  _isc.UuidValue id;

  String title;

  String body;

  /// Last server revision this device knows about (0 = never synced).
  int revision;

  /// Server snapshot at `revision`; the common ancestor for merges.
  String baseTitle;

  String baseBody;

  /// Local edits not yet accepted by the server.
  bool dirty;

  bool deleted;

  /// Set when the server could not merge; remote* hold the server's version.
  bool conflict;

  int? remoteRevision;

  String? remoteTitle;

  String? remoteBody;

  bool? remoteDeleted;

  DateTime createdAt;

  DateTime updatedAt;

  @override
  _isd.Table<_isc.UuidValue> get table => t;

  /// Returns a shallow copy of this [LocalNote]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  LocalNote copyWith({
    _isc.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    int? remoteRevision,
    String? remoteTitle,
    String? remoteBody,
    bool? remoteDeleted,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'LocalNote',
      'id': id.toJson(),
      'title': title,
      'body': body,
      'revision': revision,
      'baseTitle': baseTitle,
      'baseBody': baseBody,
      'dirty': dirty,
      'deleted': deleted,
      'conflict': conflict,
      if (remoteRevision != null) 'remoteRevision': remoteRevision,
      if (remoteTitle != null) 'remoteTitle': remoteTitle,
      if (remoteBody != null) 'remoteBody': remoteBody,
      if (remoteDeleted != null) 'remoteDeleted': remoteDeleted,
      'createdAt': createdAt.toJson(),
      'updatedAt': updatedAt.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'LocalNote',
      'id': id.toJson(),
      'title': title,
      'body': body,
      'revision': revision,
      'baseTitle': baseTitle,
      'baseBody': baseBody,
      'dirty': dirty,
      'deleted': deleted,
      'conflict': conflict,
      if (remoteRevision != null) 'remoteRevision': remoteRevision,
      if (remoteTitle != null) 'remoteTitle': remoteTitle,
      if (remoteBody != null) 'remoteBody': remoteBody,
      if (remoteDeleted != null) 'remoteDeleted': remoteDeleted,
      'createdAt': createdAt.toJson(),
      'updatedAt': updatedAt.toJson(),
    };
  }

  static LocalNoteInclude include() {
    return LocalNoteInclude._();
  }

  static LocalNoteIncludeList includeList({
    _isd.WhereExpressionBuilder<LocalNoteTable>? where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalNoteTable>? orderBy,
    _isd.OrderByListBuilder<LocalNoteTable>? orderByList,
    LocalNoteInclude? include,
  }) {
    return LocalNoteIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(LocalNote.t),
      orderByList: orderByList?.call(LocalNote.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _LocalNoteImpl extends LocalNote {
  _LocalNoteImpl({
    _isc.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    int? remoteRevision,
    String? remoteTitle,
    String? remoteBody,
    bool? remoteDeleted,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) : super._(
         id: id,
         title: title,
         body: body,
         revision: revision,
         baseTitle: baseTitle,
         baseBody: baseBody,
         dirty: dirty,
         deleted: deleted,
         conflict: conflict,
         remoteRevision: remoteRevision,
         remoteTitle: remoteTitle,
         remoteBody: remoteBody,
         remoteDeleted: remoteDeleted,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [LocalNote]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  LocalNote copyWith({
    _isc.UuidValue? id,
    String? title,
    String? body,
    int? revision,
    String? baseTitle,
    String? baseBody,
    bool? dirty,
    bool? deleted,
    bool? conflict,
    Object? remoteRevision = _Undefined,
    Object? remoteTitle = _Undefined,
    Object? remoteBody = _Undefined,
    Object? remoteDeleted = _Undefined,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return LocalNote(
      id: id ?? this.id,
      title: title ?? this.title,
      body: body ?? this.body,
      revision: revision ?? this.revision,
      baseTitle: baseTitle ?? this.baseTitle,
      baseBody: baseBody ?? this.baseBody,
      dirty: dirty ?? this.dirty,
      deleted: deleted ?? this.deleted,
      conflict: conflict ?? this.conflict,
      remoteRevision: remoteRevision is int?
          ? remoteRevision
          : this.remoteRevision,
      remoteTitle: remoteTitle is String? ? remoteTitle : this.remoteTitle,
      remoteBody: remoteBody is String? ? remoteBody : this.remoteBody,
      remoteDeleted: remoteDeleted is bool?
          ? remoteDeleted
          : this.remoteDeleted,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

class LocalNoteUpdateTable extends _isd.UpdateTable<LocalNoteTable> {
  LocalNoteUpdateTable(super.table);

  _isd.ColumnValue<String, String> title(String value) => _isd.ColumnValue(
    table.title,
    value,
  );

  _isd.ColumnValue<String, String> body(String value) => _isd.ColumnValue(
    table.body,
    value,
  );

  _isd.ColumnValue<int, int> revision(int value) => _isd.ColumnValue(
    table.revision,
    value,
  );

  _isd.ColumnValue<String, String> baseTitle(String value) => _isd.ColumnValue(
    table.baseTitle,
    value,
  );

  _isd.ColumnValue<String, String> baseBody(String value) => _isd.ColumnValue(
    table.baseBody,
    value,
  );

  _isd.ColumnValue<bool, bool> dirty(bool value) => _isd.ColumnValue(
    table.dirty,
    value,
  );

  _isd.ColumnValue<bool, bool> deleted(bool value) => _isd.ColumnValue(
    table.deleted,
    value,
  );

  _isd.ColumnValue<bool, bool> conflict(bool value) => _isd.ColumnValue(
    table.conflict,
    value,
  );

  _isd.ColumnValue<int, int> remoteRevision(int? value) => _isd.ColumnValue(
    table.remoteRevision,
    value,
  );

  _isd.ColumnValue<String, String> remoteTitle(String? value) =>
      _isd.ColumnValue(
        table.remoteTitle,
        value,
      );

  _isd.ColumnValue<String, String> remoteBody(String? value) =>
      _isd.ColumnValue(
        table.remoteBody,
        value,
      );

  _isd.ColumnValue<bool, bool> remoteDeleted(bool? value) => _isd.ColumnValue(
    table.remoteDeleted,
    value,
  );

  _isd.ColumnValue<DateTime, DateTime> createdAt(DateTime value) =>
      _isd.ColumnValue(
        table.createdAt,
        value,
      );

  _isd.ColumnValue<DateTime, DateTime> updatedAt(DateTime value) =>
      _isd.ColumnValue(
        table.updatedAt,
        value,
      );
}

class LocalNoteTable extends _isd.Table<_isc.UuidValue> {
  LocalNoteTable({super.tableRelation}) : super(tableName: 'local_note') {
    updateTable = LocalNoteUpdateTable(this);
    title = _isd.ColumnString(
      'title',
      this,
      hasDefault: true,
    );
    body = _isd.ColumnString(
      'body',
      this,
      hasDefault: true,
    );
    revision = _isd.ColumnInt(
      'revision',
      this,
      hasDefault: true,
    );
    baseTitle = _isd.ColumnString(
      'baseTitle',
      this,
      hasDefault: true,
    );
    baseBody = _isd.ColumnString(
      'baseBody',
      this,
      hasDefault: true,
    );
    dirty = _isd.ColumnBool(
      'dirty',
      this,
      hasDefault: true,
    );
    deleted = _isd.ColumnBool(
      'deleted',
      this,
      hasDefault: true,
    );
    conflict = _isd.ColumnBool(
      'conflict',
      this,
      hasDefault: true,
    );
    remoteRevision = _isd.ColumnInt(
      'remoteRevision',
      this,
    );
    remoteTitle = _isd.ColumnString(
      'remoteTitle',
      this,
    );
    remoteBody = _isd.ColumnString(
      'remoteBody',
      this,
    );
    remoteDeleted = _isd.ColumnBool(
      'remoteDeleted',
      this,
    );
    createdAt = _isd.ColumnDateTime(
      'createdAt',
      this,
    );
    updatedAt = _isd.ColumnDateTime(
      'updatedAt',
      this,
    );
  }

  late final LocalNoteUpdateTable updateTable;

  late final _isd.ColumnString title;

  late final _isd.ColumnString body;

  /// Last server revision this device knows about (0 = never synced).
  late final _isd.ColumnInt revision;

  /// Server snapshot at `revision`; the common ancestor for merges.
  late final _isd.ColumnString baseTitle;

  late final _isd.ColumnString baseBody;

  /// Local edits not yet accepted by the server.
  late final _isd.ColumnBool dirty;

  late final _isd.ColumnBool deleted;

  /// Set when the server could not merge; remote* hold the server's version.
  late final _isd.ColumnBool conflict;

  late final _isd.ColumnInt remoteRevision;

  late final _isd.ColumnString remoteTitle;

  late final _isd.ColumnString remoteBody;

  late final _isd.ColumnBool remoteDeleted;

  late final _isd.ColumnDateTime createdAt;

  late final _isd.ColumnDateTime updatedAt;

  @override
  List<_isd.Column> get columns => [
    id,
    title,
    body,
    revision,
    baseTitle,
    baseBody,
    dirty,
    deleted,
    conflict,
    remoteRevision,
    remoteTitle,
    remoteBody,
    remoteDeleted,
    createdAt,
    updatedAt,
  ];
}

class LocalNoteInclude extends _isd.IncludeObject {
  LocalNoteInclude._();

  @override
  Map<String, _isd.Include?> get includes => {};

  @override
  _isd.Table<_isc.UuidValue> get table => LocalNote.t;
}

class LocalNoteIncludeList extends _isd.IncludeList {
  LocalNoteIncludeList._({
    _isd.WhereExpressionBuilder<LocalNoteTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(LocalNote.t);
  }

  @override
  Map<String, _isd.Include?> get includes => include?.includes ?? {};

  @override
  _isd.Table<_isc.UuidValue> get table => LocalNote.t;
}

class LocalNoteRepository {
  const LocalNoteRepository._();

  /// Returns a list of [LocalNote]s matching the given query parameters.
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
  Future<List<LocalNote>> find(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalNoteTable>? where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalNoteTable>? orderBy,
    _isd.OrderByListBuilder<LocalNoteTable>? orderByList,
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<LocalNote>(
      where: where?.call(LocalNote.t),
      orderBy: orderBy?.call(LocalNote.t),
      orderByList: orderByList?.call(LocalNote.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Returns the first matching [LocalNote] matching the given query parameters.
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
  Future<LocalNote?> findFirstRow(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalNoteTable>? where,
    int? offset,
    _isd.OrderByBuilder<LocalNoteTable>? orderBy,
    _isd.OrderByListBuilder<LocalNoteTable>? orderByList,
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<LocalNote>(
      where: where?.call(LocalNote.t),
      orderBy: orderBy?.call(LocalNote.t),
      orderByList: orderByList?.call(LocalNote.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [LocalNote] by its [id] or null if no such row exists.
  Future<LocalNote?> findById(
    _isd.DatabaseSession session,
    _isc.UuidValue id, {
    _isd.Transaction? transaction,
    _isd.LockMode? lockMode,
    _isd.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<LocalNote>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [LocalNote]s in the list and returns the inserted rows.
  ///
  /// The returned [LocalNote]s will have their `id` fields set.
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
  Future<List<LocalNote>> insert(
    _isd.DatabaseSession session,
    List<LocalNote> rows, {
    _isd.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<LocalNote>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [LocalNote] and returns the inserted row.
  ///
  /// The returned [LocalNote] will have its `id` field set.
  Future<LocalNote> insertRow(
    _isd.DatabaseSession session,
    LocalNote row, {
    _isd.Transaction? transaction,
  }) async {
    return session.db.insertRow<LocalNote>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [LocalNote]s in the list and returns the resulting rows.
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
  /// The returned [LocalNote]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalNote>> upsert(
    _isd.DatabaseSession session,
    List<LocalNote> rows, {
    required _isd.ColumnSelections<LocalNoteTable> conflictColumns,
    _isd.ColumnSelections<LocalNoteTable>? updateColumns,
    _isd.WhereExpressionBuilder<LocalNoteTable>? updateWhere,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<LocalNote>(
      rows,
      conflictColumns: conflictColumns(LocalNote.t),
      updateColumns: updateColumns?.call(LocalNote.t),
      updateWhere: updateWhere?.call(LocalNote.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [LocalNote] and returns the resulting row.
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
  /// The returned [LocalNote] will have its `id` field set.
  Future<LocalNote?> upsertRow(
    _isd.DatabaseSession session,
    LocalNote row, {
    required _isd.ColumnSelections<LocalNoteTable> conflictColumns,
    _isd.ColumnSelections<LocalNoteTable>? updateColumns,
    _isd.WhereExpressionBuilder<LocalNoteTable>? updateWhere,
    _isd.Transaction? transaction,
  }) async {
    return session.db.upsertRow<LocalNote>(
      row,
      conflictColumns: conflictColumns(LocalNote.t),
      updateColumns: updateColumns?.call(LocalNote.t),
      updateWhere: updateWhere?.call(LocalNote.t),
      transaction: transaction,
    );
  }

  /// Updates all [LocalNote]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalNote>> update(
    _isd.DatabaseSession session,
    List<LocalNote> rows, {
    _isd.ColumnSelections<LocalNoteTable>? columns,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<LocalNote>(
      rows,
      columns: columns?.call(LocalNote.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [LocalNote]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<LocalNote> updateRow(
    _isd.DatabaseSession session,
    LocalNote row, {
    _isd.ColumnSelections<LocalNoteTable>? columns,
    _isd.Transaction? transaction,
  }) async {
    return session.db.updateRow<LocalNote>(
      row,
      columns: columns?.call(LocalNote.t),
      transaction: transaction,
    );
  }

  /// Updates a single [LocalNote] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<LocalNote?> updateById(
    _isd.DatabaseSession session,
    _isc.UuidValue id, {
    required _isd.ColumnValueListBuilder<LocalNoteUpdateTable> columnValues,
    _isd.Transaction? transaction,
  }) async {
    return session.db.updateById<LocalNote>(
      id,
      columnValues: columnValues(LocalNote.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [LocalNote]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LocalNote>> updateWhere(
    _isd.DatabaseSession session, {
    required _isd.ColumnValueListBuilder<LocalNoteUpdateTable> columnValues,
    required _isd.WhereExpressionBuilder<LocalNoteTable> where,
    int? limit,
    int? offset,
    _isd.OrderByBuilder<LocalNoteTable>? orderBy,
    _isd.OrderByListBuilder<LocalNoteTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<LocalNote>(
      columnValues: columnValues(LocalNote.t.updateTable),
      where: where(LocalNote.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(LocalNote.t),
      orderByList: orderByList?.call(LocalNote.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [LocalNote]s in the list and returns the deleted rows.
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
  Future<List<LocalNote>> delete(
    _isd.DatabaseSession session,
    List<LocalNote> rows, {
    _isd.OrderByBuilder<LocalNoteTable>? orderBy,
    _isd.OrderByListBuilder<LocalNoteTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<LocalNote>(
      rows,
      orderBy: orderBy?.call(LocalNote.t),
      orderByList: orderByList?.call(LocalNote.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [LocalNote].
  Future<LocalNote> deleteRow(
    _isd.DatabaseSession session,
    LocalNote row, {
    _isd.Transaction? transaction,
  }) async {
    return session.db.deleteRow<LocalNote>(
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
  Future<List<LocalNote>> deleteWhere(
    _isd.DatabaseSession session, {
    required _isd.WhereExpressionBuilder<LocalNoteTable> where,
    _isd.OrderByBuilder<LocalNoteTable>? orderBy,
    _isd.OrderByListBuilder<LocalNoteTable>? orderByList,
    _isd.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<LocalNote>(
      where: where(LocalNote.t),
      orderBy: orderBy?.call(LocalNote.t),
      orderByList: orderByList?.call(LocalNote.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _isd.DatabaseSession session, {
    _isd.WhereExpressionBuilder<LocalNoteTable>? where,
    int? limit,
    _isd.Transaction? transaction,
  }) async {
    return session.db.count<LocalNote>(
      where: where?.call(LocalNote.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [LocalNote] rows matching the [where] expression.
  Future<void> lockRows(
    _isd.DatabaseSession session, {
    required _isd.WhereExpressionBuilder<LocalNoteTable> where,
    required _isd.LockMode lockMode,
    required _isd.Transaction transaction,
    _isd.LockBehavior lockBehavior = _isd.LockBehavior.wait,
  }) async {
    return session.db.lockRows<LocalNote>(
      where: where(LocalNote.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
