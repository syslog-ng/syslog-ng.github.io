---
title: 'tcp, tcp6, udp, udp6: Sending messages to a remote log server
  using the legacy BSD-syslog protocol (tcp(), udp() drivers) -- OBSOLETE'
short_title: tcp / udp (OBSOLETE)
id: adm-dest-tcp
---

**NOTE:** The tcp(), tcp6(), udp(), and udp6() drivers are obsolete. Use the
**network()** source and the **network()** destination instead. For
details, see network: Collecting messages using the RFC3164 protocol
(network() driver) and
network: Sending messages to a remote log server using the RFC3164 protocol
(network() driver), respectively.
{: .notice--info}

To convert your existing tcp(), tcp6(), udp(), udp6() source drivers to
use the network() driver, see Change an old destination driver to the
network() driver.

The tcp(), tcp6(), udp(), and udp6() drivers send messages to another
host (for example, a syslog-ng server or relay) on the local intranet or
internet using the UDP or TCP protocol. The tcp6() and udp6() drivers
use the IPv6 network protocol.
