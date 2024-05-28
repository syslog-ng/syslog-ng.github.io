---
title: Kerberos authentication with {{ site.product.short_name }} hdfs() destination
id: adm-dest-hdfs-kerberos
description: >-
    Version 3.10 and later supports Kerberos authentication to authenticate
    the connection to your Hadoop cluster. {{ site.product.short_name }} assumes that you
    already have a Hadoop and Kerberos infrastructure.
---

**NOTE:** If you configure Kerberos authentication for a hdfs() destination,
it affects all hdfs() destinations. Kerberos and non-Kerberos hdfs()
destinations cannot be mixed in a {{ site.product.short_name }} configuration. This
means that if one hdfs() destination uses Kerberos authentication, you
have to configure all other hdfs() destinations to use Kerberos
authentication too.
{: .notice--info}

Failing to do so results in non-Kerberos hdfs() destinations being
unable to authenticate to the HDFS server.

**NOTE:** If you want to configure your hdfs() destination to stop using
Kerberos authentication, namely, to remove Kerberos-related options from
the hdfs() destination configuration, make sure to restart {{ site.product.short_name }}
for the changes to take effect.
{: .notice--info}

## Prerequisites

- You have configured your Hadoop infrastructure to use Kerberos
    authentication.

- You have a keytab file and a principal for the host running
    {{ site.product.short_name }}. For details, see the Kerberos documentation.

- You have installed and configured the Kerberos client packages on
    the host running {{ site.product.short_name }}. (That is, Kerberos authentication
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
