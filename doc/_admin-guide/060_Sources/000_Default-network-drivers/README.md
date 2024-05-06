---
title: 'default-network-drivers: Receive and parse common syslog messages'
short_title: default-network-drivers
id: adm-src-def-netw
description: >-
    The default-network-drivers() source is a special source that uses
    multiple source drivers to receive and parse several different types of
    syslog messages from the network. Available in version 3.16 and later.
---

To use the default-network-drivers() source, the scl.conf file must be
included in your syslog-ng OSE configuration:

```config
@include "scl.conf"
```

Also, make sure that your SELinux, AppArmor, and firewall settings
permit syslog-ng Open Source Edition to access the ports where you want
to receive messages, and that no other application is using these ports.
By default, the default-network-drivers() source accepts messages on the
following ports:

- 514, both TCP and UDP, for RFC3164 (BSD-syslog) formatted traffic

- 601 TCP, for RFC5424 (IETF-syslog) formatted traffic

- 6514 TCP, for TLS-encrypted traffic

In addition to receiving messages on different ports and in different
formats, this source tries to parse the messages automatically. If
successful, it sets the \${.app.name} name-value pair to the name of the
application that sent the log message. Currently it uses the following
procedures.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** If you do not
configure the TLS keys to dislay to the clients, syslog-ng OSE cannot accept
encrypted connections. The application starts and listens on TCP:6514, and
can receive messages on other ports, but will display a warning messages about
missing keys.
{: .notice--warning}

## Parsing RFC3164-formatted messages

For RFC3164-formatted messages (that is, messages received on the ports
set in options udp-port() and tcp-port() which default to port 514),
syslog-ng OSE attempts to use the following parsers. If a parser cannot
parse the message, it passes the original message to the next parser.

1. Parse the incoming raw message as a [[message from a Cisco device|adm-parser-cisco]].

2. Parse the incoming message as an [[RFC3164-formatted message|adm-struct-bsd]].
    - If the incoming message was sent by a syslog-ng OSE client using
        the [[syslog-ng() destination|adm-dest-syslogng]], parse its
        fields as a [[syslog-ng() message|adm-struct-ietf]].

        The [[Enterprise-wide message model (EWMM)]] allows you
        to deliver structured messages from the initial receiving syslog-ng
        component right up to the central log server, through any number of
        hops. It does not matter if you parse the messages on the client,
        on a relay, or on the central server, their structured results will
        be available where you store the messages. Optionally, you can also
        forward the original raw message as the first syslog-ng component in your
        infrastructure has received it, which is important if you want
        to forward a message for example, to a SIEM system. To make use
        of the enterprise-wide message model, you have to use the
        [[syslog-ng() destination()|adm-dest-syslogng]] on the sender
        side, and the default-network-drivers() source on the receiver side.

    - Otherwise, apply the application adapters if the message was
        sent from an application that already has a specific parser in
        syslog-ng OSE (for example, Splunk Common Information Model
        (CIM), [[iptables|adm-parser-iptables]], or [[sudo|adm-parser-sudo]]).

## Parsing RFC5424-formatted messages

For RFC5424-formatted messages (that is, messages received on the ports
set in options rfc5424-tls-port() and rfc5424-tcp-port(), which default
to port 601 and 6514), syslog-ng OSE parses the message according to
RFC5424, then attempts apply the application adapters if the message was
sent from an application that already has a specific parser in syslog-ng
OSE (for example, Splunk Common Information Model (CIM),
[[iptables|adm-parser-iptables]], or [[sudo|adm-parser-sudo]]).

### Example: Using the default-network-drivers() driver

The following example uses only the default settings.

```config
source s_network {
    default-network-drivers();
};
```

The following example can receive TLS-encrypted connections on the
default port (port 6514).

```config
source s_network {
    default-network-drivers(
        tls(
            key-file("/path/to/ssl-private-key")
            cert-file("/path/to/ssl-cert")
                )
    );
};
```
