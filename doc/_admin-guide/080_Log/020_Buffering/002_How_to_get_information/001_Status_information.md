---
title: Getting the status information of disk-buffer files
id: adm-log-diskbuff-status
description: >-
    This section describes getting the status information of the disk-buffer
    files used in syslog-ng Open Source Edition (syslog-ng OSE).
---

## Command syntax

The basic command syntax for getting the status information of the
disk-buffer files used in syslog-ng OSE looks like the following:

```bash
dqtoolinfo DISK-BUFFER_FILE
```

## Example commands

The following example commands describe how you can get the status
information of two different types of disk-buffer files (namely, empty
normal disk-buffer files, and non-empty reliable disk-buffer queue
files).

### Example commands for empty, normal disk-buffer files, and non-empty, reliable disk-buffer queue files

#### Empty, normal disk-buffer file

```bash
dqtool info /var/lib/syslog-ng/syslog-ng-00000.qf
```

>Disk-buffer state loaded; filename='/var/lib/syslog-ng/syslog-ng-00000.qf', number_of_messages='0'

#### Non-empty, reliable disk-buffer queue file

```bash
dqtool info /opt/syslog-ng/var/syslog-ng-00000.rqf
```

>Reliable disk-buffer state loaded; filename='/opt/syslog-ng/var/syslog-ng-00000.rqf', number_of_messages='10'

### One-liner command to get the state of disk-buffer files in the default directory

You can use the following one-liner command to get the state of
disk-buffer files in the default directory:

```bash
for qfile in /opt/syslog-ng/var/*.?(r)qf ; do dqtool info $qfile 2>&1 ; done
```
