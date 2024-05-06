---
title: 'osquery: Sending log messages to osquery´s syslog table'
short_title: osquery
id: adm-dest-osquery
description: >-
  The osquery() driver sends log messages to osquery's syslog table.

  The syslog table contains logs forwarded over a named pipe from
  syslog-ng. When an osquery process that supports the syslog table starts
  up, it creates (and properly sets permissions for) a named pipe for
  syslog-ng to write to.
---

## Example: Using the osquery() destination driver

Run osqueryi:

```bash
osqueryi --enable_syslog 
         --disable-events=false
```

To store the database on disk:

```bash
osqueryi --enable_syslog
         --disable-events=false
         --database_path=/tmp/osquery.db
```

To set up a custom named pipe:

```bash
osqueryi --enable_syslog
         --disable-events=false
         --database_path=/tmp/osquery.db
         --syslog_pipe_path=/tmp/osq.pipe
```

Example configuration:

```config
@version: 3.12
@include "scl.conf"

source s_net {
  network(port(5514));
};

destination d_osquery {
  # custom pipe path:
  #osquery(pipe("/tmp/osq.pipe"));

  # backup outgoing logs:
  #osquery(file("/var/log/osquery_inserts.log" template(t_osquery)));

  # defaults
  osquery();
};

log {
  source(s_net);
  destination(d_osquery);
  flags(flow-control);
};
```
