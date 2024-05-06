---
title: 'tcp, tcp6, udp, udp6: Collecting messages from remote hosts
  using the BSD syslog protocol--- OBSOLETE'
short_title: tcp / udp (OBSOLETE)
id: adm-src-tcp
---

**NOTE:** The tcp(), tcp6(), udp(), and udp6() drivers are obsolete. Use the
**network()** source and the **network()** destination instead. For details,
see network: Collecting messages using the RFC3164 protocol (network() driver)
and network: Sending messages to a remote log server using the RFC3164
protocol (network() driver), respectively.
{: .notice--info}

The tcp(), tcp6(), udp(), udp6() drivers can receive syslog messages
conforming to RFC3164 from the network using the TCP and UDP networking
protocols. The tcp6() and udp6() drivers use the IPv6 network protocol,
while tcp() and udp() use IPv4.

To convert your existing tcp(), tcp6(), udp(), udp6() source drivers to
use the network() driver, see [[Change an old source driver to the network() driver]].
