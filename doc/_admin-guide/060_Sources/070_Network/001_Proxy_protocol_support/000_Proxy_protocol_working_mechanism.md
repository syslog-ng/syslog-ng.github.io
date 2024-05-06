---
title: The working mechanism behind the Proxy Protocol
id: adm-src-netw-proxy-mech
description: >-
    This section describes how syslog-ng Open Source Edition (syslog-ng OSE)
    supports the [Proxy Protocol](https://www.haproxy.com/blog/haproxy/proxy-protocol/).
---

## The working mechanism behind the Proxy Protocol

When using the Proxy Protocol during load balancing, syslog-ng OSE
detects the information behind connections connected to the load
balancer, then parses the injected information and adds the following
macros to every message the comes through the connection later on:

- PROXY_SRCIP (the source IP of the proxy)

- PROXY_SRCPORT (the source port of the proxy)

- PROXY_DSTIP (the destination IP of the proxy)

- PROXY_DSTPORT (the destination port of the proxy)

>**NOTE:** Consider the following about macros and headers:  
>  
>- When the proxy protocol header is PROXY UNKNOWN, no additional macros are added.
>  
>- When syslog-ng OSE cannot parse a proxy protocol header, the connection is closed:
>  
> [2020-11-20T17:33:22.189458] PROXY protocol header received; line='PROXYdsfj'  
> [2020-11-20T17:33:22.189475] Error parsing PROXY protocol header;  
> [2020-11-20T17:33:22.189517] Syslog connection closed; fd='13',  
> client='AF_INET(127.0.0.1:51665)', local='AF_INET(0.0.0.0:6666)'
> [2020-11-20T17:33:22.189546] Freeing PROXY protocol source driver; driver='0x7fffcba5bcf0'  
> [2020-11-20T17:33:22.189600] Closing log transport fd; fd='13'
{: .notice--info}

**NOTE:** Since the driver only implements version 1 of the protocol, it
only supports TCP4 and TCP6 connections. TLS connections also supported.
{: .notice--info}
