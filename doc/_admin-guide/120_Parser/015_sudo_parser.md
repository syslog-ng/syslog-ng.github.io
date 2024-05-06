---
title: Sudo parser
parser: sudo
id: adm-parser-sudo
description: >-
    The sudo parser can parse the log messages of the sudo command.
    Available in version 3.16 and later.
---

**Declaration**

```config
@version: 3.38
@include "scl.conf"
log {
    source { system(); };
    parser { sudo-parser(); };
    destination { ... };
};
```

The sudo-parser() is actually a reusable configuration snippet
configured to parse sudo messages. For details on using or writing such
configuration snippets, see [[Reusing configuration blocks]].
You can find the source of this configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/sudo/sudo.conf).

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-prefix.md %}
