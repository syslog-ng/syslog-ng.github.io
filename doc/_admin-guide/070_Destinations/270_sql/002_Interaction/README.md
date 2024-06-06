---
title: The way {{ site.product.short_name }} interacts with the database
id: adm-dest-sql-interact
description: >-
	This section describes the way {{ site.product.short_name }} interacts with the database.
---

## Used SQL operations by syslog-ng

### Create table

- If the given table does not exist, {{ site.product.short_name }} tries to create it with
    the given column types.

- The {{ site.product.short_name }} application automatically creates the required
    tables and columns, if the user account used to connect to the
    database has the required privileges.

- If {{ site.product.short_name }} cannot create or alter a table, it tries to do it again
    when it reaches the next time-reopen().

### Alter table

- If the table structure is different from given structure in an
    existing table, {{ site.product.short_name }} tries to add columns in this table but
    never will delete or modify an existing column.

- If {{ site.product.short_name }} cannot create or alter a table, it tries to do it
    again when reach the next time-reopen().

- The {{ site.product.short_name }} application requires read and write access to the
    SQL table, otherwise it cannot verify that the destination table
    exists.

### Insert table

- Insert new records in a table.

- Inserting the records into the database is performed by a separate
    thread.

- The {{ site.product.short_name }} application automatically performs the escaping
    required to insert the messages into the database.

- If insert returns with error, {{ site.product.short_name }} tries to insert the message
    +two times by default, then drops it. Retrying time is the value of
    time-reopen().

## Encoding

The {{ site.product.short_name }} application uses UTF-8 by default when writes logs
into database.

## Start/stop and reload

### Start

- The {{ site.product.short_name }} application will connect to database automatically
    after starting regardless existing incoming messages.

### Stop

- The {{ site.product.short_name }} application will close the connection to database
    before shutting down.

### Possibility of losing logs

- The {{ site.product.short_name }} application cannot lose logs during shutting down
    if disk buffer was given and it is not full yet.

- The {{ site.product.short_name }} application cannot lose logs during shutting down
    if disk buffer was not given.

### Reload

- The {{ site.product.short_name }} application will close the connection to database
    if it received SIGHUP signal (reload).

- It will reconnect to the database when it tries to send a new
    message to this database again.

## Macros

The value of ${SEQNUM} macro will be overrided by sql driver regardless
of local or relayed incoming message.

It will be grown continously.
