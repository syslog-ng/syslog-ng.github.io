---
title: HDFS destination options
id: adm-dest-hdfs-opt
---

The hdfs destination stores the log messages in files on the Hadoop
Distributed File System (HDFS). The hdfs destination has the following
options.

The following options are required: hdfs-file(), hdfs-uri(). Note that
to use hdfs, you must add the following line to the beginning of your
syslog-ng OSE configuration:

```config
@include "scl.conf"
```

{% include doc/admin-guide/options/client-lib-dir.md %}

For the hdfs destination, include the path to the directory where you
copied the required libraries (see
[[Prerequisites]],
for example,
client-lib-dir(\"/opt/syslog-ng/lib/syslog-ng/java-modules/:/opt/hadoop/libs/\").

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/frac-digits.md %}

## hdfs-append-enabled()

|  Type:|      true \| false|
  |Default:|   false|

*Description:* When hdfs-append-enabled is set to **true**, syslog-ng
OSE will append new data to the end of an already existing HDFS file.
Note that in this case, archiving is automatically disabled, and
syslog-ng OSE will ignore the hdfs-archive-dir option.

When hdfs-append-enabled is set to **false**, the syslog-ng OSE
application always creates a new file if the previous has been closed.
In that case, appending data to existing files is not supported.

When you choose to write data into an existing file, syslog-ng OSE does
not extend the filename with a UUID suffix because there is no need to
open a new file (a new unique ID would mean opening a new file and
writing data into that).

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Before enabling the hdfs-append-enabled option, ensure that your HDFS
server supports the append operation and that it is enabled. Otherwise syslog-ng
OSE will not be able to append data into an existing file, resulting in an
error log.
{: .notice--warning}

## hdfs-archive-dir()

|  Type:|      string|
|Default:|   N/A|

*Description:* The path where syslog-ng OSE will move the closed log
files. If syslog-ng OSE cannot move the file for some reason (for
example, syslog-ng OSE cannot connect to the HDFS NameNode), the file
remains at its original location. For example,
hdfs-archive-dir(\"/usr/hdfs/archive/\").

**NOTE:** When hdfs-append-enabled is set to **true**, archiving is
automatically disabled, and syslog-ng OSE will ignore the
hdfs-archive-dir option.
{: .notice--info}

## hdfs-file()

|  Type:|      string|
|Default:|   N/A|

*Description:* The path and name of the log file. For example,
hdfs-file(\"/usr/hdfs/mylogfile.txt\"). syslog-ng OSE checks if the path
to the logfile exists. If a directory does not exist syslog-ng OSE
automatically creates it.

hdfs-file() supports the usage of macros. This means that syslog-ng OSE
can create files on HDFS dynamically, using macros in the file (or
directory) name.

**NOTE:** When a filename resolved from the macros contains a character that
HDFS does not support, syslog-ng OSE will not be able to create the
file. Make sure that you use macros that do not contain unsupported
characters.
{: .notice--warning}

### Example: Using macros in filenames

In the following example, a /var/testdb_working_dir/$DAY-$HOUR.txt
file will be created (with a UUID suffix):

```config
destination d_hdfs_9bf3ff45341643c69bf46bfff940372a {
    hdfs(client-lib-dir(/hdfs-libs)
  hdfs-uri("hdfs://hdp2.syslog-ng.example:8020")
  hdfs-file("/var/testdb_working_dir/$DAY-$HOUR.txt"));
};
```

As an example, if it is the 31st day of the month and it is 12 o\'clock,
then the name of the file will be 31-12.txt.

## hdfs-max-filename-length()

|  Type:|      number|
  |Default:|   255|

*Description:* The maximum length of the filename. This filename
(including the UUID that syslog-ng OSE appends to it) cannot be longer
than what the file system permits. If the filename is longer than the
value of hdfs-max-filename-length, syslog-ng OSE will automatically
truncate the filename. For example, hdfs-max-filename-length("255").

## hdfs-resources()

|  Type:|      string|
  |Default:|   N/A|

*Description:* The list of Hadoop resources to load, separated by
semicolons. For example,
hdfs-resources("/home/user/hadoop/core-site.xml;/home/user/hadoop/hdfs-site.xml").

## hdfs-uri()

|  Type:|      string|
  |Default:|   N/A|

*Description:* The URI of the HDFS NameNode is in hdfs://IPaddress:port
or hdfs://hostname:port format. When using MapR-FS, the URI of the
MapR-FS NameNode is in maprfs://IPaddress or maprfs://hostname format,
for example: maprfs://10.140.32.80. The IP address of the node can be
IPv4 or IPv6. For example, hdfs-uri(\"hdfs://10.140.32.80:8020\"). The
IPv6 address must be enclosed in square brackets (*\[\]*) as specified
by RFC 2732, for example,
hdfs-uri(\"hdfs://\[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210\]:8020\").

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/jvm-options.md %}

You can set this option only as a
[[global option]], by adding it
to the options statement of the syslog-ng configuration file.

## kerberos-keytab-file()

|  Type:|      string|
  |Default:|   N/A|

*Description:* The path to the Kerberos keytab file that you received
from your Kerberos administrator. For example,
kerberos-keytab-file(\"/opt/syslog-ng/etc/hdfs.headless.keytab\"). This
option is needed only if you want to authenticate using Kerberos in
Hadoop. You also have to set the hdfs-option-kerberos-principal()
option. For details on the using Kerberos authentication with the hdfs()
destination, see
[[Kerberos authentication with syslog-ng hdfs() destination]].

```config
destination d_hdfs {
    hdfs(client-lib-dir("/hdfs-libs/lib")
    hdfs-uri("hdfs://hdp-kerberos.syslog-ng.example:8020")
    kerberos-keytab-file("/opt/syslog-ng/etc/hdfs.headless.keytab")
    kerberos-principal("hdfs-hdpkerberos@MYREALM")
    hdfs-file("/var/hdfs/test.log"));
};
```

Available in syslog-ng OSE version 3.10 and later.

## kerberos-principal()

|  Type:|      string|
|Default:|   N/A|

*Description:* The Kerberos principal you want to authenticate with. For
example, kerberos-principal(\"hdfs-user@MYREALM\"). This option is
needed only if you want to authenticate using Kerberos in Hadoop. You
also have to set the hdfs-option-kerberos-keytab-file() option. For
details on the using Kerberos authentication with the hdfs()
destination, see
[[Kerberos authentication with syslog-ng hdfs() destination]].

```config
destination d_hdfs {
    hdfs(client-lib-dir("/hdfs-libs/lib")
    hdfs-uri("hdfs://hdp-kerberos.syslog-ng.example:8020")
    kerberos-keytab-file("/opt/syslog-ng/etc/hdfs.headless.keytab")
    kerberos-principal("hdfs-hdpkerberos@MYREALM")
    hdfs-file("/var/hdfs/test.log"));
};
```

Available in syslog-ng OSE version 3.10 and later.

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/on-error.md %}

{% include doc/admin-guide/options/retries.md %}

{% include doc/admin-guide/options/template-logformat.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reap.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/ts-format.md %}
