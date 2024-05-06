---
title: Recover data from orphaned diskbuffer files
id: adm-debug-diskbuff-recover
description: >-
    When you change the configuration of a syslog-ng OSE host that uses
    disk-based buffering (also called disk queue), syslog-ng OSE may start
    new disk buffer files for the destinations that you have changed. In
    this case, syslog-ng OSE abandons the old disk queue files. If there
    were unsent log messages in the disk queue files, these messages remain
    in the disk queue files, and will not be sent to the destinations.
---
