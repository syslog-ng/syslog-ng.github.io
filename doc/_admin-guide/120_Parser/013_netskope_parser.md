---
title: Netskope parser
parser: netskope
id: adm-parser-netskope
description: >-
    The Netskope parser can parse Netskope log messages.
---

{% include doc/admin-guide/parser-intro.md %}

The parser can parse messages in the following format:

>\<PRI\>{JSON-formatted-log-message}

For example:

><134>{"count": 1, "supporting_data": {"data_values": ["x.x.x.x", "user@domain.com"], "data_type": "user"}, "organization_unit": "domain/domain/Domain Users/Enterprise Users", "severity_level": 2, "category": null, "timestamp": 1547421943, "_insertion_epoch_timestamp": 1547421943, "ccl": "unknown", "user": "user@domain.com", "audit_log_event": "Login Successful", "ur_normalized": "user@domain.com", "_id": "936289", "type": "admin_audit_logs", "appcategory": null}

{% include doc/admin-guide/parser-support.md %}

The {{ site.product.short_name }} application sets the PROGRAM field to Netskope.

By default, the Netskope-specific fields are extracted into name-value
pairs prefixed with .netskope. For example, the organization_unit in
the previous message becomes ${.netskope.organization_unit}. You can
change the prefix using the **prefix** option of the parser.

**Declaration**

```config
@version: 3.38
@include "scl.conf"
log {
    source { network(flags(no-parse)); };
    parser { netskope-parser(); };
    destination { ... };
};
```

Note that you have to disable message parsing in the source using the
**flags(no-parse)** option for the parser to work.

The netskope-parser() is actually a reusable configuration snippet
configured to parse Netskope messages. For details on using or writing
such configuration snippets, see Reusing configuration blocks.
You can find the source of the Checkpoint configuration snippet on GitHub.

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-prefix.md %}
