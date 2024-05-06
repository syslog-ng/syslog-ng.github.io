---
title: 'hdfs: Storing messages on the Hadoop Distributed File System
  (HDFS)'
short_title: HDFS
id: adm-dest-hdfs
description: >-
    Starting with version 3.7, syslog-ng OSE can send plain-text log files
    to the [Hadoop Distributed File System (HDFS)](http://hadoop.apache.org/),
    allowing you to store your log data on a distributed, scalable file system.
    This is especially useful if you have huge amounts of log messages that would
    be difficult to store otherwise, or if you want to process your messages 
    using Hadoop tools (for example, Apache Pig).
---

For more information about the benefits of using syslog-ng as a data
collection, processing, and filtering tool in a Hadoop environment, see
the blog post [Filling your data lake with log messages: the syslog-ng Hadoop (HDFS)
destination](https://syslog-ng.com/blog/filling-your-data-lake-with-log-messages-the-syslog-ng-hadoop-hdfs-destination/).

Note the following limitations when using the syslog-ng OSE hdfs
destination:

- This destination is only supported on the Linux platform.

- Since syslog-ng OSE uses the official Java HDFS client, the hdfs
    destination has significant memory usage (about 400MB).

- You cannot set when log messages are flushed. Hadoop performs this
    action automatically, depending on its configured block size, and
    the amount of data received. There is no way for the syslog-ng OSE
    application to influence when the messages are actually written to
    disk. This means that syslog-ng OSE cannot guarantee that a message
    sent to HDFS is actually written to disk. When using flow-control,
    syslog-ng OSE acknowledges a message as written to disk when it
    passes the message to the HDFS client. This method is as reliable as
    your HDFS environment.

- The log messages of the underlying client libraries are available in
    the internal() source of syslog-ng OSE.

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
    [[Prerequisites]].
- For details on how the hdfs destination works, see
    [[How syslog-ng OSE interacts with HDFS]].
- For details on using MapR-FS, see
    [[Storing messages with MapR-FS]].
- For details on using Kerberos authentication, see
    [[Kerberos authentication with syslog-ng hdfs()destination]].
- For the list of options, see
    [[HDFS destination options]].

The hdfs() driver is actually a reusable configuration snippet
configured to receive log messages using the Java language-binding of
syslog-ng OSE. For details on using or writing such configuration
snippets, see [[Reusing configuration blocks]].
You can find the source of the hdfs configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/hdfs/plugin.conf).
For details on extending syslog-ng OSE in Java, see the [Getting started
with syslog-ng development](https://syslog-ng.gitbooks.io/getting-started/content/chapters/chapter_5/section_2.html)
guide.

**NOTE:** If you delete all Java destinations from your configuration and
reload syslog-ng, the JVM is not used anymore, but it is still running.
If you want to stop JVM, stop syslog-ng and then start syslog-ng again.
{: .notice--info}
