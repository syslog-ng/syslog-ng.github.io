---
title: 'sql: Storing messages in an SQL database'
short_title: sql
id: adm-dest-sql
description: >-
    The sql() driver sends messages into an SQL database. Currently the
    Microsoft SQL (MSSQL), MySQL, Oracle, PostgreSQL, and SQLite databases
    are supported.
---

**Declaration**

```config
sql(database_type host_parameters database_parameters [options]);
```

The sql() driver has the following required parameters:
[[type()]], [[database()]], [[table()]], [[columns()]]
and [[values()]].

>![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
>  
>- The syslog-ng application requires read and write access to the SQL table,
>   otherwise it cannot verify that the destination table exists.
>- Currently the syslog-ng application has default schemas for the different
>   databases and uses these defaults if the database schema (for example,
>   columns and column types) is not defined in the configuration file.
>   However, these schemas will be deprecated and specifying the exact
>   database schema will be required in later versions of syslog-ng.
>  
>{: .notice--warning}

**NOTE:** In addition to the standard syslog-ng packages, the sql()
destination requires database-specific packages to be installed. These
packages are automatically installed by the binary syslog-ng installer.
{: .notice--info}

The table and value parameters can include macros to create tables and
columns dynamically (for details, see [[Macros of syslog-ng OSE]].

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
When using macros in table names, note that some databases limit the maximum
allowed length of table names. Consult the documentation of the database for details.
{: .notice--warning}

Inserting the records into the database is performed by a separate
thread. The syslog-ng application automatically performs the escaping
required to insert the messages into the database.

### Example: Using the sql() driver

The following example sends the log messages into a PostgreSQL database
running on the logserver host. The messages are inserted into the logs
database, the name of the table includes the exact date and the name of
the host sending the messages. The syslog-ng application automatically
creates the required tables and columns, if the user account used to
connect to the database has the required privileges.

```config
destination d_sql {
    sql(type(pgsql)
    host("logserver") username("syslog-ng") password("password")
    database("logs")
    table("messages_${HOST}_${R_YEAR}${R_MONTH}${R_DAY}")
    columns("datetime", "host", "program", "pid", "message")
    values("{$R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
    indexes("datetime", "host", "program", "pid", "message"));
};
```

The following example specifies the type of the database columns as
well:

```config
destination d_sql {
    sql(type(pgsql)
    host("logserver") username("syslog-ng") password("password")
    database("logs")
    table("messages_${HOST}_${R_YEAR}${R_MONTH}${R_DAY}")
    columns("datetime varchar(16)", "host varchar(32)", "program  varchar(20)", 
    "pid varchar(8)", "message  varchar(200)")
    values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
    indexes("datetime", "host", "program", "pid", "message"));
};
```
