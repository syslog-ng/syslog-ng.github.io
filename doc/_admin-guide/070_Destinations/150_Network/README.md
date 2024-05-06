---
title: 'network: Sending messages to a remote log server using the
  RFC3164 protocol (network() driver)'
short_title: network
id: adm-dest-netw
description: >-
    The network() destination driver can send syslog messages conforming to
    RFC3164 from the network using the TCP, TLS, and UDP networking
    protocols.
---

- UDP is a simple datagram oriented protocol, which provides \"best
    effort service\" to transfer messages between hosts. It may lose
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
network("<destination-address>" [options]);
```

The network() destination has a single required parameter that specifies
the destination host address where messages should be sent. If name
resolution is configured, you can use the hostname of the target server.
By default, syslog-ng OSE sends messages using the TCP protocol to port
514.

## Example: Using the network() driver

TCP destination that sends messages to 10.1.2.3, port 1999:

```config
destination d_tcp { network("10.1.2.3" port(1999)); };
```

If name resolution is configured, you can use the hostname of the target
server as well.

```config
destination d_tcp { network("target_host" port(1999)); };
```

TCP destination that sends messages to the ::1 IPv6 address, port 2222.

```config
destination d_tcp6 {
    network(
        "::1"
        port(2222)
        transport(tcp)
        ip-protocol(6)
        );
};
```

To send messages using the IETF-syslog message format without using the
IETF-syslog protocol, enable the syslog-protocol flag. (For details on
how to use the IETF-syslog protocol, see
[[syslog() destination options]]

```config
destination d_tcp { network("10.1.2.3" port(1999) flags(syslog-protocol) ); };
```
