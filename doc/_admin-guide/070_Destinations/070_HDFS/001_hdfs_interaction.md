---
title: How syslog-ng OSE interacts with HDFS
id: adm-dest-hdfs-interact
description: >-
    The syslog-ng OSE application sends the log messages to the official
    HDFS client library, which forwards the data to the HDFS nodes. The way
    syslog-ng OSE interacts with HDFS is described in the following steps.
---

1. After syslog-ng OSE is started and the first message arrives to the
    hdfs destination, the hdfs destination tries to connect to the HDFS
    NameNode. If the connection fails, syslog-ng OSE will repeatedly
    attempt to connect again after the period set in time-reopen()
    expires.

2. syslog-ng OSE checks if the path to the logfile exists. If a
    directory does not exist syslog-ng OSE automatically creates it.
    syslog-ng OSE creates the destination file (using the filename set
    in the syslog-ng OSE configuration file, with a UUID suffix to make
    it unique, for example,
    /usr/hadoop/logfile.txt.3dc1c59e-ab3b-4b71-9e81-93db477ed9d9) and
    writes the message into the file. After the file is created,
    syslog-ng OSE will write all incoming messages into the hdfs
    destination.NOTE: When the
    [[hdfs-append-enabled()]] option
    is set to **true**, syslog-ng OSE will not assign a new UUID suffix
    to an existing file, because it is then possible to open a closed
    file and append data to that.NOTE:You cannot set when log messages
    are flushed. Hadoop performs this action automatically, depending on
    its configured block size, and the amount of data received. There is
    no way for the syslog-ng OSE application to influence when the
    messages are actually written to disk. This means that syslog-ng OSE
    cannot guarantee that a message sent to HDFS is actually written to
    disk. When using flow-control, syslog-ng OSE acknowledges a message
    as written to disk when it passes the message to the HDFS client.
    This method is as reliable as your HDFS environment.

3. If the HDFS client returns an error, syslog-ng OSE attempts to close
    the file, then opens a new file and repeats sending the message
    (trying to connect to HDFS and send the message), as set in the
    retries() parameter. If sending the message fails for retries()
    times, syslog-ng OSE drops the message.

4. The syslog-ng OSE application closes the destination file in the
    following cases:

    - syslog-ng OSE is reloaded

    - syslog-ng OSE is restarted

    - The HDFS client returns an error.

5. If the file is closed and you have set an archive directory,
    syslog-ng OSE moves the file to this directory. If syslog-ng OSE
    cannot move the file for some reason (for example, syslog-ng OSE
    cannot connect to the HDFS NameNode), the file remains at its
    original location, syslog-ng OSE will not try to move it again.
