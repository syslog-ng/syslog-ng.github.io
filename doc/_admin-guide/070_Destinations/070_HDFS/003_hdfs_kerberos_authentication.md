---
title: Kerberos authentication with syslog-ng hdfs() destination
id: adm-dest-hdfs-kerberos
description: >-
    Version 3.10 and later supports Kerberos authentication to authenticate
    the connection to your Hadoop cluster. syslog-ng OSE assumes that you
    already have a Hadoop and Kerberos infrastructure.
---

**NOTE:** If you configure Kerberos authentication for a hdfs() destination,
it affects all hdfs() destinations. Kerberos and non-Kerberos hdfs()
destinations cannot be mixed in a syslog-ng OSE configuration. This
means that if one hdfs() destination uses Kerberos authentication, you
have to configure all other hdfs() destinations to use Kerberos
authentication too.
{: .notice--info}

Failing to do so results in non-Kerberos hdfs() destinations being
unable to authenticate to the HDFS server.

**NOTE:** If you want to configure your hdfs() destination to stop using
Kerberos authentication, namely, to remove Kerberos-related options from
the hdfs() destination configuration, make sure to restart syslog-ng OSE
for the changes to take effect.
{: .notice--info}

## Prerequisites

- You have configured your Hadoop infrastructure to use Kerberos
    authentication.

- You have a keytab file and a principal for the host running
    syslog-ng OSE. For details, see the [Kerberos
    documentation](http://web.mit.edu/Kerberos/krb5-1.5/krb5-1.5.4/doc/krb5-install/The-Keytab-File.html).

- You have installed and configured the Kerberos client packages on
    the host running syslog-ng OSE. (That is, Kerberos authentication
    works for the host, for example, from the command line using the
    **kinit user@REALM -k -t \<keytab\_file\>** command.)

    ```config
    destination d_hdfs {
        hdfs(client-lib-dir("/hdfs-libs/lib")
        hdfs-uri("hdfs://hdp-kerberos.syslog-ng.example:8020")
        kerberos-keytab-file("/opt/syslog-ng/etc/hdfs.headless.keytab")
        kerberos-principal("hdfs-hdpkerberos@MYREALM")
        hdfs-file("/var/hdfs/test.log"));
    };
    ```
