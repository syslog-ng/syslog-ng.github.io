---
title: 'mbox: Converting local email messages to log messages'
short_title: mbox
id: adm-src-mbox
description: >-
    Using the mbox() driver, {{ site.product.short_name }} can read email messages from
    local mbox files, and convert them to multi-line log messages.
---

This driver has only one required option, the filename of the mbox file.
To use the mbox() driver, the scl.conf file must be included in your
{{ site.product.short_name }} configuration:

```config
@include "scl.conf"
```

The mbox() driver is actually a reusable configuration snippet
configured to read log messages using the file() driver. For details on
using or writing such configuration snippets, see
[[Reusing configuration blocks]].  
You can find the source of the mbox configuration snippet on GitHub.

### Example: Using the mbox() driver

The following example reads the emails of the root user on the {{ site.product.short_name }} host.

```config
@include "scl.conf"

source root-mbox {
    mbox("/var/spool/mail/root");
};
```
