---
title: default-network-drivers() source options
max_conn_default: 10
id: adm-src-def-netw-opt
---

The systemd-journal() driver has the following options.

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/options/source-flags.md %}

{% include doc/admin-guide/options/log-msg-size.md %}

{% include doc/admin-guide/options/max-connections.md %}

## rfc5424-tcp-port()

|  Type:|      number|
|Default:|   601|

*Description:* The TCP port number where the default-network-drivers()
source receives RFC5424-formatted (IETF-syslog) messages.

## rfc5424-tls-port()

|  Type:|      number|
|Default:|   6514|

*Description:* The TCP port number where the default-network-drivers()
source receives RFC5424-formatted (IETF-syslog), TLS-encrypted messages.

>![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** To receive messages
>using a TLS-encrypted connection, you must set the `tls(key-file() cert-file())`
>options of the **default-network-drivers()** source.
>  
>For example:
>  
>```config
>source s_network {
>    default-network-drivers(
>        tls(
>            key-file("/path/to/ssl-private-key")
>            cert-file("/path/to/ssl-cert")
>        )
>    );
>};
>```
>
{: .notice--warning}

## tcp-port()

|  Type:|      number|
  |Default:|   514|

*Description:* The TCP port number where the default-network-drivers()
source receives RFC3164-formatted (BSD-syslog) messages.

{% include doc/admin-guide/options/tls.md %}

## udp-port()

|  Type:|      number|
  |Default:|   514|

*Description:* The UDP port number where the default-network-drivers()
source receives RFC3164-formatted (BSD-syslog) messages
