---
title: 'PostgreSQL csvlog parser'
short_title: 'PostgreSQL parser'
id: adm-parser-postrgresql
description: >-
    This parser processes messages in the [PostgreSQL](https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-CSVLOG) csvlog format. The following multi-line message example is a embedded with NL characters. This single, multi-line log entry starts with the timestamp.
---

```config
2023-08-08 12:05:52.805 UTC,,,22113,,64d22fa0.5661,1,,2023-08-08 12:05:52 UTC,23/74060,0,LOG,00000,"automatic vacuum of table ""tablename"": index scans: 0
pages: 0 removed, 4 remain, 0 skipped due to pins, 0 skipped frozen
tuples: 114 removed, 268 remain, 0 are dead but not yet removable, oldest xmin: 149738000
buffer usage: 97 hits, 0 misses, 6 dirtied
avg read rate: 0.000 MB/s, avg write rate: 114.609 MB/s
system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s",,,,,,,,,""
```
The `postgresql-csvlog-parser()` extracts information from this message into a set of name-value pairs. The name-value pairs have the `.pgsql` prefix by default.

```config
@version: current

log {
    source { file("/var/log/pgsql.log" follow-freq(1) flags(no-parse)); };
    parser { postgresql-csvlog-parser() };
    destination { ... };
};
```

The `postgresql-csvlog-parser()` driver functions as a reusable configuration snippet configured to parse log messages using the `csv-parser()`. For more information on using or writing configuration snippets, see [[Reusing configuration blocks]]. The source of this configuration snippet can be found on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/pgsql/pgsql.conf).
