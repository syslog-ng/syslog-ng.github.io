---
title: The way syslog-ng interacts with the database
id: adm-dest-sql-interact
---

## Used SQL operations by syslog-ng

### Create table

- If the given table does not exist, syslog-ng tries to create it with
    the given column types.

- The syslog-ng OSE application automatically creates the required
    tables and columns, if the user account used to connect to the
    database has the required privileges.

- If syslog-ng cannot create or alter a table, it tries to do it again
    when it reaches the next time-reopen().

### Alter table

- If the table structure is different from given structure in an
    existing table, syslog-ng tries to add columns in this table but
    never will delete or modify an existing column.

- If syslog-ng OSE cannot create or alter a table, it tries to do it
    again when reach the next time-reopen().

- The syslog-ng OSE application requires read and write access to the
    SQL table, otherwise it cannot verify that the destination table
    exists.

### Insert table

- Insert new records in a table.

- Inserting the records into the database is performed by a separate
    thread.

- The syslog-ng OSE application automatically performs the escaping
    required to insert the messages into the database.

- If insert returns with error, syslog-ng tries to insert the message
    +two times by default, then drops it. Retrying time is the value of
    time-reopen().

## Encoding

The syslog-ng OSE application uses UTF-8 by default when writes logs
into database.

## Start/stop and reload

### Start

- The syslog-ng OSE application will connect to database automatically
    after starting regardless existing incoming messages.

### Stop

- The syslog-ng OSE application will close the connection to database
    before shutting down.

### Possibility of losing logs

- The syslog-ng OSE application cannot lose logs during shutting down
    if disk buffer was given and it is not full yet.

- The syslog-ng OSE application cannot lose logs during shutting down
    if disk buffer was not given.

### Reload

- The syslog-ng OSE application will close the connection to database
    if it received SIGHUP signal (reload).

- It will reconnect to the database when it tries to send a new
    message to this database again.

## Macros

The value of \${SEQNUM} macro will be overrided by sql driver regardless
of local or relayed incoming message.

It will be grown continously.
