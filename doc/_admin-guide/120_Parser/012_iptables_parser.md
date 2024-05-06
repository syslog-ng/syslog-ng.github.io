---
title: iptables parser
parser: iptables
id: adm-parser-iptables
description: >-
    The iptables parser can parse the log messages of the iptables command.
    Available in version 3.16 and later.
---

**Declaration**

    @version: 3.38
    @include "scl.conf"
    log {
        source { system(); };
        parser { iptables-parser(); };
        destination { ... };
    };

The iptables-parser() is actually a reusable configuration snippet
configured to parse iptables messages. For details on using or writing
such configuration snippets, see [[Reusing configuration blocks]].
You can find the source of this configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/iptables/iptables.conf).

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-prefix.md %}
