---
title: Proxy Protocol support
id: adm-src-netw-proxy
description: >-
    If you connect load balancers to your {{ site.product.short_name }} application,
    {{ site.product.short_name }} identifies every connection that is connected to the load
    balancers identically by default, regardless of the source IP or the
    source protocol. 
---

Essentially, the load balancer masks the source IP
unless you enable Proxy Protocol
support for your proxy TLS transport() to inject information about the original
connection into the forwarded TCP session.

In {{ site.product.short_name }} version 4.1 and later versions, PROXY protocol v2 (transport(proxied-tcp)) is supported. This protocol is used by network load balancers, such as Amazon Elastic Load Balancer and HAProxy, to carry original source/destination address information, as described in the Proxy protocol description.

For further details about the working mechanism behind the Proxy
Protocol support on {{ site.product.short_name }} and the configuration details, see the
following sections.
