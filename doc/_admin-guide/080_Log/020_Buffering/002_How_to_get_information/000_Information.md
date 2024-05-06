---
title: Information about disk-buffer files
id: adm-log-diskbuff-info
description: >-
    This section describes information about disk-buffer files used in
    syslog-ng Open Source Edition (syslog-ng OSE).
---

The following list contains information about how disk-buffer files are
used in syslog-ng OSE:

- You can configure disk-buffer() for a remote destination in the
    destination() statement.

    For more information about an example of configuring disk-buffer()
    for a remote destination in the destination() statement, see
    [[disk-buffer()]].

- By default, syslog-ng OSE creates disk-buffer files under
    /opt/syslog-ng/var directory, unless dir() option is set in
    disk-buffer().

- The filenames are generated automatically by syslog-ng OSE with the
    extensions .qf for a normal disk-buffer and .rqf for a reliable
    disk-buffer.

- The disk-buffer file stores processed log messages in the format in
    which they would have been sent out to the destination, but doesn\'t
    store information about the destination.
