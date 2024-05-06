---
title: Stopping syslog-ng
id: adm-debug-stop
---

To avoid problems, always use the init scripts to stop syslog-ng
(`/etc/init.d/syslog-ng stop`), instead of using the kill command.
This is especially true on Solaris and HP-UX systems, here use
`/etc/init.d/syslog stop`.
