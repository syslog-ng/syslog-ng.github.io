---
title: Dropping messages
id: adm-log-filters-dropping
description: >-
    To skip the processing of a message without sending it to a destination,
    create a log statement with the appropriate filters, but do not include
    any destination in the statement, and use the final flag.
---

## Example: Skipping messages

The following log statement drops all debug level messages without any
further processing.

```config
filter demo_debugfilter { level(debug); };
log { source(s_all); filter(demo_debugfilter); flags(final); };
```
