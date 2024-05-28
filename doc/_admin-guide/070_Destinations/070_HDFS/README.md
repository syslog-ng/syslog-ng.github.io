---
title: 'hdfs: Storing messages on the Hadoop Distributed File System
  (HDFS)'
short_title: HDFS
id: adm-dest-hdfs
description: >-
    Starting with version 3.7, {{ site.product.short_name }} can send plain-text log files
    to the Hadoop Distributed File System (HDFS),
    allowing you to store your log data on a distributed, scalable file system.
    This is especially useful if you have huge amounts of log messages that would
    be difficult to store otherwise, or if you want to process your messages 
    using Hadoop tools (for example, Apache Pig).
---

For more information about the benefits of using {{ site.product.short_name }} as a data
collection, processing, and filtering tool in a Hadoop environment, see
the blog post Filling your data lake with log messages: the syslog-ng Hadoop (HDFS) destination.

Note the following limitations when using the {{ site.product.short_name }} hdfs
destination:

- This destination is only supported on the Linux platform.

- Since {{ site.product.short_name }} uses the official Java HDFS client, the hdfs
    destination has significant memory usage (about 400MB).

- You cannot set when log messages are flushed. Hadoop performs this
    action automatically, depending on its configured block size, and
    the amount of data received. There is no way for the {{ site.product.short_name }}
    application to influence when the messages are actually written to
    disk. This means that {{ site.product.short_name }} cannot guarantee that a message
    sent to HDFS is actually written to disk. When using flow-control,
    {{ site.product.short_name }} acknowledges a message as written to disk when it
    passes the message to the HDFS client. This method is as reliable as
    your HDFS environment.

- The log messages of the underlying client libraries are available in
    the internal() source of {{ site.product.short_name }}.

**Declaration**

```config
@include "scl.conf"

hdfs(
    client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/:<path-to-preinstalled-hadoop-libraries>")
    hdfs-uri("hdfs://NameNode:8020")
    hdfs-file("<path-to-logfile>")
);
```

### Example: Storing logfiles on HDFS

The following example defines an hdfs destination using only the
required parameters.

```config
@include "scl.conf"

destination d_hdfs {
    hdfs(
        client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/:/opt/hadoop/libs")
        hdfs-uri("hdfs://10.140.32.80:8020")
        hdfs-file("/user/log/logfile.txt")
    );
};
```

- To install the software required for the hdfs destination, see
    [[Prerequisites|adm-dest-hdfs-pre]].
- For details on how the hdfs destination works, see
    How {{ site.product.short_name }} interacts with HDFS.
- For details on using MapR-FS, see
    Storing messages with MapR-FS.
- For details on using Kerberos authentication, see
    Kerberos authentication with {{ site.product.short_name }} hdfs() destination.
- For the list of options, see
    HDFS destination options.

The hdfs() driver is actually a reusable configuration snippet
configured to receive log messages using the Java language-binding of
{{ site.product.short_name }}. For details on using or writing such configuration
snippets, see Reusing configuration blocks.
You can find the source of the hdfs configuration snippet on GitHub.

For details on extending {{ site.product.short_name }} in Java, see the Getting started with implementing Java destinations guide.

**NOTE:** If you delete all Java destinations from your configuration and
reload {{ site.product.short_name }}, the JVM is not used anymore, but it is still running.
If you want to stop JVM, stop {{ site.product.short_name }} and then start {{ site.product.short_name }} again.
{: .notice--info}
