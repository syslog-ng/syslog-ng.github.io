---
title: 'file: Collecting messages from text files (DEPRECATED)'
short_title: file (DEPRECATED)
id: adm-src-file
description: >-
    The file() source has been deprecated. For a more stable performance, use the [[wildcard-file() source|adm-src-wild]] instead. Collects log messages from plain-text files, for example, from the logfiles of
    an Apache webserver. If you want to use wildcards in the filename, use the [[wildcard-file() source|adm-src-wild]].
---

The {{ site.product.short_name }} application notices if a file is renamed or replaced with
a new file, so it can correctly follow the file even if logrotation is
used. When {{ site.product.short_name }} is restarted, it records the position of the last
sent log message in the /var/lib/syslog-ng/syslog-ng.persist file, and
continues to send messages from this position after the restart.

The file driver has a single required parameter specifying the file to
open. If you want to use wildcards in the filename, use the [[wildcard-file() source|adm-src-wild]].
For the list of available optional parameters, see file() source options.

{% include doc/admin-guide/warnings/file-source-follow-warning.md %}

**Declaration**

```config
file("filename");
```

### Example: Using the file() driver

```config
source s_file {
    file("/var/log/messages");
};
```

### Example: Tailing files

The following source checks the access.log file every second for new
messages.

```config
source s_tail {
    file("/var/log/apache/access.log" follow-freq(1) flags(no-parse));
};
```

**NOTE:** If the message does not have a proper syslog header, syslog-ng
treats messages received from files as sent by the kern facility. Use
the **default-facility()** and **default-priority()** options in the
source definition to assign a different facility if needed.
{: .notice--info}
