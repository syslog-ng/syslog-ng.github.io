---
title: Printing the content of disk-buffer files
id: adm-log-diskbuff-content
description: >-
    This section describes printing the content of the disk-buffer files
    used in syslog-ng Open Source Edition(syslog-ng OSE).
---

## Command syntax

The command syntax for printing the content of the disk-buffer files
used in syslog-ng OSE looks like the following:

```bash
dqtool cat DISK-BUFFER_FILE
```

### Example: short output that shows the printed content of the disk-buffer files used in syslog-ng OSE

The following short output example shows the printed content of the
disk-buffer files used in syslog-ng OSE:

```config
dqtool cat /opt/syslog-ng/var/syslog-ng-00000.rqf
```

>Reliable disk-buffer state loaded; filename='/opt/syslog-ng/var/syslog-ng-00000.rqf',
>queue_length='2952', size='-437712'  
>Jul 31 12:33:48.226 10.21.10.10 <382019-07-31T12:33:36 localhost prg00000[1234]:
>seq: 0000000838, thread: 0000, runid: 1564569216, stamp: 2019-07-31T12:33:36
>PADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADD
>...
