---
title: MariaDB parser
parser: mariadb-audit
prefix: mariadb
id: adm-parser-mariadb
description: >-
    The MariaDB parser can parse the log messages of the MariaDB Audit
    Plugin. The parser supports the syslog output types format. Available
    in version 3.37 and later.
---

**Declaration**

```config
@version: 3.38
@include "scl.conf"
log {
    source { system(); };
    parser { mariadb-audit-parser(); };
    destination { ... };
};
```

The mariadb-audit is a reusable configuration snippet configured to
parse MariaDB Audit Plugin messages. For details on using or writing
such configuration snippets, see [[Reusing configuration blocks]].
You can find the source of this configuration snippet on [GitHub]
(https://github.com/syslog-ng/syslog-ng/blob/master/scl/mariadb/audit.conf).

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-prefix.md %}
