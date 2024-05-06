---
title: sql() destination options
srv: 'database server'
port: '1433 TCP for MSSQL, 3306 TCP for MySQL, 1521 for Oracle, and 5432 TCP for PostgreSQL'
id: adm-dest-sql-opt
---

This driver sends messages into an SQL database. The sql() destination
has the following options:

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

## columns()

|  Type:|      string list|
|Default:|   \"date\", \"facility\", \"level\", \"host\", \"program\", \"pid\", \"message\"|

*Description:* Name of the columns storing the data in fieldname
\[dbtype\] format. The \[dbtype\] parameter is optional, and specifies
the type of the field. By default, syslog-ng OSE creates text columns.
Note that not every database engine can index text fields.

{% include doc/admin-guide/warnings/mssql-columns.md %}

## create-statement-append()

|  Type:  |    string|
|Default: |  empty string|

*Description:* Specifies additional SQL options that are appended to the
CREATE statement. That way you can customize what happens when syslog-ng
OSE creates a new table in the database. Consult the documentation of
your database server for details on the available options. Syntax:

```config
create-statement-append(<options-to-append>)
```

For example, you can appends the ROW\_FORMAT=COMPRESSED option to MySQL
create table statements:

```config
create-statement-append(ROW_FORMAT=COMPRESSED)
```

## database()

|  Type:|      string|
|  Default:|   logs|

*Description:* Name of the database that stores the logs. Macros cannot
be used in database name. Also, when using an Oracle database, you
cannot use the same database() settings in more than one destination.

## dbd-option()

|  Type:  |    string|
|Default: |  empty string|

*Description:* Specify database options that are set whenever syslog-ng
OSE connects to the database server. Consult the documentation of your
database server for details on the available options. Syntax:

```config
dbd-option(OPTION_NAME VALUE)
```

OPTION\_NAME is always a string, VALUE is a string or a number. For
example:

```config
dbd-option("null.sleep.connect" 1)
dbd-option("null.sleep.query" 5)
```

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/destination-flags.md %}

{% include doc/admin-guide/options/frac-digits.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host.md %}

Note that Oracle destinations do not use this parameter, but
retrieve the hostname from the /etc/tnsnames.ora file.

**NOTE:** If you specify **host=\"localhost\"**, syslog-ng will use a socket
to connect to the local database server. Use **host=\"127.0.0.1\"** to
force TCP communication between syslog-ng and the local database server.
{: .notice--info}

To specify the socket to use, set and export the **MYSQL\_UNIX\_PORT**
environment variable, for example,
**MYSQL\_UNIX\_PORT=/var/lib/mysql/mysql.sock; export
MYSQL\_UNIX\_PORT**.

## indexes()

|  Type: |     string list|
|  Default:|   \"date\", \"facility\", \"host\", \"program\"|

*Description:* The list of columns that are indexed by the database to
speed up searching. To disable indexing for the destination, include the
empty indexes() parameter in the destination, simply omitting the
indexes parameter will cause syslog-ng to request indexing on the
default columns.

The syslog-ng OSE application will create the name of indexes
automaticaly with the following method:

- In case of MsSQL, PostgreSQL, MySQL or SQLite or (Oracle but
    tablename \< 30 characters): {table}\_{column}\_idx.

- In case of Oracle and tablename \> 30 characters: md5sum of
    {table}\_{column}-1 and the first character will be replaced by
    \"i\" character and the md5sum will be truncated to 30 characters.

{% include doc/admin-guide/options/local-time-zone.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

## null()

|  Type: |     string|
|  Default:||

*Description:* If the content of a column matches the string specified
in the null() parameter, the contents of the column will be replaced
with an SQL NULL value. If unset (by default), the option does not match
on any string. For details, see the Example: Using SQL NULL
values.

### Example: Using SQL NULL values

The null() parameter of the SQL driver can be used to replace the
contents of a column with a special SQL NULL value. To replace every
column that contains an empty string with NULL, use the **null(\"\")**
option, for example

```config
destination d_sql {
    sql(type(pgsql)
    host("logserver") username("syslog-ng") password("password")
    database("logs")
    table("messages_${HOST}_${R_YEAR}${R_MONTH}${R_DAY}")
    columns("datetime", "host", "program", "pid", "message")
    values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
    indexes("datetime", "host", "program", "pid", "message")
    null(""));
};
```

To replace only a specific column (for example, pid) if it is empty,
assign a default value to the column, and use this default value in the
null() parameter:

```config
destination d_sql {
    sql(type(pgsql)
    host("logserver") username("syslog-ng") password("password")
    database("logs")
    table("messages_${HOST}_${R_YEAR}${R_MONTH}${R_DAY}")
    columns("datetime", "host", "program", "pid", "message")
    values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID:-@@NULL@@}", "${MSGONLY}")
    indexes("datetime", "host", "program", "pid", "message")
    null("@@NULL@@"));
};
```

Ensure that the default value you use does not appear in the actual log
messages, because other occurrences of this string will be replaced with
NULL as well.

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/port.md %}

{% include doc/admin-guide/options/retries.md %}

## session-statements()

|  Type: |     comma-separated list of SQL statements|
|  Default:|   empty string|

*Description:* Specifies one or more SQL-like statement which is
executed after syslog-ng OSE has successfully connected to the database.
For example:

```config
session-statements("SET COLLATION_CONNECTION='utf8_general_ci'")
```

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
The syslog-ng OSE application does not validate or limit the contents
of customized queries. Consequently, queries performed with a user with
write-access can potentially modify or even harm the database.
Use customized queries with care, and only for your own responsibility.
{: .notice--warning}

## table()

|  Type:    |  string|
|  Default:  | messages|

*Description:* Name of the database table to use (can include macros).
When using macros, note that some databases limit the length of table
names.

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/time-zone.md %}

## type()

|  Type:     | mssql, mysql, oracle, pgsql, or sqlite3|
|  Default: |  mysql|

*Description:* Specifies the type of the database, that is, the DBI
database driver to use. Use the mssql option to send logs to an MSSQL
database. For details, see the examples of the databases on the
following sections.

{% include doc/admin-guide/options/username.md %}

## values()

|  Type:  |    string list|
|Default: |  \"\${R\_YEAR}-\${R\_MONTH}-\${R\_DAY}, \${R\_HOUR}:\${R\_MIN}:\${R\_SEC}\", \"\${FACILITY}\", \"\${LEVEL}\", \"\${HOST}\", \"\${PROGRAM}\", \"\${PID}\", \"\${MSGONLY}\"|

*Description:* The parts of the message to store in the fields specified
in the columns() parameter.

It is possible to give a special value calling: default (without
quotation marks).It means that the value will be used that is the
default of the column type of this value.

### Example: Value: default

```config
columns("date datetime", "host varchar(32)", "row_id serial")
    values("${R_DATE}", "${HOST}", default)
```
