---
title: 'syslog: Sending messages to a remote logserver using the
  IETF-syslog protocol'
short_title: syslog
id: adm-dest-syslog
description: >-
    The syslog() driver sends messages to a remote host (for example, a
    syslog-ng server or relay) on the local intranet or internet using the
    new standard syslog protocol developed by IETF (for details about the
    new protocol, see IETF-syslog messages.) 

    The protocol supports sending messages using the UDP, TCP, or
    the encrypted TLS networking protocols.
---

The required arguments of the driver are the address of the destination
host (where messages should be sent). The transport method (networking
protocol) is optional, syslog-ng uses the TCP protocol by default. For
the list of available optional parameters, see
[[syslog() destination options]].

**Declaration**

```config
syslog(host transport [options]);
```

**NOTE:** Note that the syslog destination driver has required parameters,
while the source driver defaults to the local bind address, and every
parameter is optional.
{: .notice--info}

The udp transport method automatically sends multicast packets if a
multicast destination address is specified. The tcp and tls methods do
not support multicasting.

**NOTE:** The default ports for the different transport protocols are as
follows: UDP --- 514, TCP --- 514, TLS --- 6514.
{: .notice--info}

### Example: Using the syslog() driver

```config
destination d_tcp { syslog("10.1.2.3" transport("tcp") port(1999) localport(999)); };
```

If name resolution is configured, the hostname of the target server can
be used as well.

```config
destination d_tcp { syslog("target_host" transport("tcp") port(1999) localport(999)); };
```

Send the log messages using TLS encryption and use mutual
authentication. For details on the encryption and authentication
options, see [[TLS options]].  

```config
destination d_syslog_tls {
    syslog("10.100.20.40"
        transport("tls")
        port(6514)
        tls(peer-verify(required-trusted)
            ca-dir('/opt/syslog-ng/etc/syslog-ng/keys/ca.d/')
            key-file('/opt/syslog-ng/etc/syslog-ng/keys/client_key.pem')
            cert-file('/opt/syslog-ng/etc/syslog-ng/keys/client_certificate.pem')
        )
    );
};
```

**NOTE:** If a message uses the IETF-syslog format (RFC5424), only the text
of the message can be customized (that is, the \$MESSAGE part of the
log), the structure of the header is fixed.
{: .notice--info}
