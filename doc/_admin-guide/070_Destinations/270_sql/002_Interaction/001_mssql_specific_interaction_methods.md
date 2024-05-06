---
title: MSSQL-specific interaction methods
id: adm-dest-sql-interact-mssql
---

In SQL Server 2005 this restriction is lifted - kind of. The total
length of all key columns in an index cannot exceed 900 bytes.

If you are using null() in your configuration, be sure that the columns
allow NULL to insert. Give the column as the following example:
\"datetime varchar(16) NULL\".

The date format used by the MSSQL database must be explicitly set in the
/etc/locales.conf file of the syslog-ng server. **\[default\] date =
\"%Y-%m-%d %H:%M:%S\"**.
