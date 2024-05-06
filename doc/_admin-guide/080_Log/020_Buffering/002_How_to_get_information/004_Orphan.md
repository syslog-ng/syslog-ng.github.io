---
title: Orphan disk-buffer files
id: adm-log-diskbuff-orphan
description: >-
    This section describes orphan disk-buffer files used in syslog-ng Open
    Source Edition(syslog-ng OSE).
---

## Orphan disk-buffer files

In certain situations (for example, after modifying the disk-buffer
configuration or losing the persist information), syslog-ng OSE creates
a new disk-buffer file instead of using the already existing one. In
these situations, the already existing disk-buffer file becomes a
so-called orphan disk-buffer file.

**NOTE:** The syslog-ng OSE application does not store messages in orphan
disk-buffer files or forward the messages stored in the disk-buffer
file.
{: .notice--info}

## Discovering the new disk-buffer files (orphan disk-buffer files)

To discover orphan disk-buffer files, get the list of disk-buffer files
from the persist file, then compare the list with the contents of the
disk-buffer files\' saving directory.

For more information about how you can get the list of disk-buffer files
from the persist file, see
[[Getting the list of disk-buffer files]].

### Example: difference between the list of disk-buffer files from the persist file and the content of the disk-buffer files\' saving directory

The following examples show the difference between the list of
disk-buffer files from the persist file and the content of the
disk-buffer files\' saving directory.

Disk-buffer file list from persist file:

```bash
afsocket_dd_qfile(stream,10.21.10.112:514) = { "queue_file": "/opt/syslog-ng/var/syslog-ng-00001.rqf" }
```

Disk-buffer files\' saving directory content:

```bash
# ls -l /var/lib/syslog-ng/*qf
-rw------- 1 root root 2986780 Jul 31 12:30 /var/lib/syslog-ng/syslog-ng-00000.qf
-rw------- 1 root root 2000080 Jul 31 12:31 /opt/syslog-ng/var/syslog-ng-00000.rqf
-rw------- 1 root root    4096 Aug  1 11:09 /opt/syslog-ng/var/syslog-ng-00001.rqf
```

The disk-buffer files syslog-ng-00000.qf and syslog-ng-00000.rqf don\'t
exist in the persist file. These two files are the orphan disk-buffer
files.

For more information about orphan disk-buffer files and how to process
the messages in orphan disk-buffer files using a separate syslog-ng OSE
instance, see How to process messages from an orphan disk-buffer file using a
separate syslog-ng OSE instance.
