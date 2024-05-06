---
title: 'mbox: Converting local email messages to log messages'
short_title: mbox
id: adm-src-mbox
description: >-
    Using the mbox() driver, syslog-ng OSE can read email messages from
    local mbox files, and convert them to multiline log messages.
---

This driver has only one required option, the filename of the mbox file.
To use the mbox() driver, the scl.conf file must be included in your
syslog-ng OSE configuration:

```config
@include "scl.conf"
```

The mbox() driver is actually a reusable configuration snippet
configured to read log messages using the file() driver. For details on
using or writing such configuration snippets, see
[[Reusing configuration blocks]].  
You can find the source of the configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/mbox/mbox.conf).

### Example: Using the mbox() driver

The following example reads the emails of the root user on the syslog-ng
OSE host.

```config
@include "scl.conf"

source root-mbox {
    mbox("/var/spool/mail/root");
};
```
