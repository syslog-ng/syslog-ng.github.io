---
title: 'network: Collecting messages using the RFC3164 protocol'
short_title: network
id: adm-src-netw
description: >-
    The network() source driver can receive syslog messages conforming to
    RFC3164 from the network using the TCP, TLS, and UDP networking
    protocols.
---

- UDP is a simple datagram oriented protocol, which provides "best
    effort service" to transfer messages between hosts. It may lose
    messages, and no attempt is made to retransmit lost messages. The
    [[BSD-syslog protocol]] traditionally uses UDP.

    Use UDP only if you have no other choice.

- TCP provides connection-oriented service: the client and the server
    establish a connection, each message is acknowledged, and lost
    packets are resent. TCP can detect lost connections, and messages
    are lost, only if the TCP connection breaks. When a TCP connection
    is broken, messages that the client has sent but were not yet
    received on the server are lost.

- The syslog-ng application supports TLS (Transport Layer Security,
    also known as SSL) over TCP. For details, see
    [[Encrypting log messages with TLS]].

**Declaration**

```config
network([options]);
```

By default, the network() driver binds to 0.0.0.0, meaning that it
listens on every available IPV4 interface on the TCP/514 port. To limit
accepted connections to only one interface, use the **localip()**
parameter. To listen on IPv6 addresses, use the **ip-protocol(6)**
option.

### Example: Using the network() driver

Using only the default settings: listen on every available IPV4
interface on the TCP/514 port.

```config
source s_network {
    network();
};
```

UDP source listening on 192.168.1.1 (the default port for UDP is 514):

```config
source s_network {
    network(
        ip("192.168.1.1")
        transport("udp")
    );
};
```

TCP source listening on the IPv6 localhost, port 2222:

```config
source s_network6 {
    network(
        ip("::1")
        transport("tcp")
        port(2222)
        ip-protocol(6)
    );
};
```

A TCP source listening on a TLS-encrypted channel.

```config
source s_network {
    network(
        transport("tls")
        port(2222)
        tls(peer-verify("required-trusted")
            key-file("/opt/syslog-ng/etc/syslog-ng/syslog-ng.key")
            cert-file("/opt/syslog-ng/etc/syslog-ng/syslog-ng.crt")
        );
    );
};
```

A TCP source listening for messages using the IETF-syslog message
format. Note that for transferring IETF-syslog messages, generally you
are recommended to use the syslog() driver on both the client and the
server, as it uses both the IETF-syslog message format and the protocol.  
For details, see
[[syslog: Collecting messages using the IETF syslog protocol (syslog() driver)]].

```config
source s_tcp_syslog {
    network(
        ip("127.0.0.1")
        flags(syslog-protocol)
    );
};
```

For details on the options of the network() source, see network()
source options.
