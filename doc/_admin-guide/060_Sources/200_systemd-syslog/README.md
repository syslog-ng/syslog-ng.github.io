---
title: 'systemd-syslog: Collecting systemd messages using a socket'
short_title: systemd-syslog
id: adm-src-systemd-syslog-opt
description: >-
    On platforms running systemd, the systemd-syslog() driver reads the log
    messages of systemd using the /run/systemd/journal/syslog socket. 
---

Note the following points about this driver:

- If possible, use the more reliable
    [[systemd-journal()]] driver instead.

- The socket activation of systemd is buggy, causing some log messages
    to get lost during system startup.

- If syslog-ng OSE is running in a jail or a Linux Container (LXC), it
    will not read from the /dev/kmsg or /proc/kmsg files.

**Declaration**

```config
systemd-syslog();
```

## Example: Using the systemd-syslog() driver

```config
@version: 3.38

source s_systemdd {
    systemd-syslog();
};

destination d_network {
    syslog("server.host");
};

log {
    source(s_systemdd);
    destination(d_network);
};
```
