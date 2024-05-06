---
title: No local logs after specifying an unusual storage directory
short_title: Unusual storage directory
id: adm-debug-unusual-storage
description: >-
    Security-Enhanced Linux (SELinux) is a set of kernel and user-space
    tools enforcing strict access control policies. SELinux rules in Linux
    distributions cover all aspects of the syslog-ng configuration coming in
    the syslog-ng package available in the distribution. But as soon as an
    unusual port number or directory name is specified in the configuration,
    syslog-ng fails to work even with a completely legitimate configuration.
---

When you choose to save logs of a central syslog-ng OSE server to a
directory other than the /var/log directory, logs will not start
appearing on the newly configured directory. For details on how to fix
this issue, see section Using a different storage directoryin the blog
post titled [Using syslog-ng with SELinux in enforcing mode](https://syslog-ng.com/blog/using-syslog-ng-with-selinux-in-enforcing-mode/).
