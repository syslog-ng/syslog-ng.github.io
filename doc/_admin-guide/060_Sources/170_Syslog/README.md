---
title: 'syslog: Collecting messages using the IETF syslog protocol
  (syslog() driver)'
short_title: syslog
id: adm-src-syslog
description: >-
    The syslog() driver can receive messages from the network using the
    standard IETF-syslog protocol (as described in RFC5424-26). UDP, TCP,
    and TLS-encrypted TCP can all be used to transport the messages.
---

NOTE: The syslog() driver can also receive BSD-syslog-formatted messages
(described in RFC 3164, see
[[BSD-syslog or legacy-syslog messages]]
if they are sent using the IETF-syslog protocol.

In syslog-ng OSE versions 3.1 and earlier, the syslog() driver could
handle only messages in the IETF-syslog (RFC 5424-26) format.

For the list of available optional parameters, see
[[syslog() source options]].

**Declaration**

```config
syslog(ip() port() transport() options());
```

### Example: Using the syslog() driver

TCP source listening on the localhost on port 1999.

```config
source s_syslog { syslog(ip(127.0.0.1) port(1999) transport("tcp")); };
```

UDP source with defaults.

```config
source s_udp { syslog( transport("udp")); };
```

Encrypted source where the client is also authenticated. For details on
the encryption settings, see [[TLS options]].  

```config
source s_syslog_tls{ 
    syslog(
        ip(10.100.20.40)
        transport("tls")
        tls(
            peer-verify(required-trusted)
            ca-dir('/opt/syslog-ng/etc/syslog-ng/keys/ca.d/')
            key-file('/opt/syslog-ng/etc/syslog-ng/keys/server_privatekey.pem')
            cert-file('/opt/syslog-ng/etc/syslog-ng/keys/server_certificate.pem')
        )
    );
};
```

{% include doc/admin-guide/warnings/udp-buffer.md %}
