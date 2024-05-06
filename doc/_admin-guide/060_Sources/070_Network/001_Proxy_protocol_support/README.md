---
title: Proxy Protocol support
id: adm-src-netw-proxy
description: >-
    If you connect load balancers to your syslog-ng OSE application,
    syslog-ng OSE identifies every connection that is connected to the load
    balancers identically by default, regardless of the source IP or the
    source protocol. 
---

Essentially, the load balancer masks the source IP
unless you enable [Proxy Protocol](https://www.haproxy.com/blog/haproxy/proxy-protocol/)
support for your proxy TLS transport() to inject information about the original
connection into the forwarded TCP session.

In syslog-ng OSE version 4.1 and later versions, PROXY protocol v2 (transport(proxied-tcp)) is supported. This protocol is used by network load balancers, such as Amazon Elastic Load Balancer and HAProxy, to carry original source/destination address information, as described in the [Proxy protocol description](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt).

For further details about the working mechanism behind the Proxy
Protocol support on syslog-ng OSE and the configuration details, see the
following sections.
