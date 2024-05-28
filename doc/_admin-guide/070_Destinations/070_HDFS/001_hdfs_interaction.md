---
title: How {{ site.product.short_name }} interacts with HDFS
id: adm-dest-hdfs-interact
description: >-
    The {{ site.product.short_name }} application sends the log messages to the official
    HDFS client library, which forwards the data to the HDFS nodes. The way
    {{ site.product.short_name }} interacts with HDFS is described in the following steps.
---

1. After {{ site.product.short_name }} is started and the first message arrives to the
    hdfs destination, the hdfs destination tries to connect to the HDFS
    NameNode. If the connection fails, {{ site.product.short_name }} will repeatedly
    attempt to connect again after the period set in time-reopen()
    expires.

2. {{ site.product.short_name }} checks if the path to the logfile exists. If a
    directory does not exist {{ site.product.short_name }} automatically creates it.
    {{ site.product.short_name }} creates the destination file (using the filename set
    in the {{ site.product.short_name }} configuration file, with a UUID suffix to make
    it unique, for example,
    /usr/hadoop/logfile.txt.3dc1c59e-ab3b-4b71-9e81-93db477ed9d9) and
    writes the message into the file. After the file is created,
    {{ site.product.short_name }} will write all incoming messages into the hdfs
    destination.NOTE: When the
    hdfs-append-enabled() option
    is set to **true**, {{ site.product.short_name }} will not assign a new UUID suffix
    to an existing file, because it is then possible to open a closed
    file and append data to that.NOTE:You cannot set when log messages
    are flushed. Hadoop performs this action automatically, depending on
    its configured block size, and the amount of data received. There is
    no way for the {{ site.product.short_name }} application to influence when the
    messages are actually written to disk. This means that {{ site.product.short_name }}
    cannot guarantee that a message sent to HDFS is actually written to
    disk. When using flow-control, {{ site.product.short_name }} acknowledges a message
    as written to disk when it passes the message to the HDFS client.
    This method is as reliable as your HDFS environment.

3. If the HDFS client returns an error, {{ site.product.short_name }} attempts to close
    the file, then opens a new file and repeats sending the message
    (trying to connect to HDFS and send the message), as set in the
    retries() parameter. If sending the message fails for retries()
    times, {{ site.product.short_name }} drops the message.

4. The {{ site.product.short_name }} application closes the destination file in the
    following cases:

    - {{ site.product.short_name }} is reloaded

    - {{ site.product.short_name }} is restarted

    - The HDFS client returns an error.

5. If the file is closed and you have set an archive directory,
    {{ site.product.short_name }} moves the file to this directory. If {{ site.product.short_name }}
    cannot move the file for some reason (for example, {{ site.product.short_name }}
    cannot connect to the HDFS NameNode), the file remains at its
    original location, {{ site.product.short_name }} will not try to move it again.
