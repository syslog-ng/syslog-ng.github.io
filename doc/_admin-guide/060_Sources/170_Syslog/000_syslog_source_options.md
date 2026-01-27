---
title: syslog() source options
id: adm-src-syslog-opt
description: >-
    This section describes the options of the syslog() source in {{ site.product.short_name }}.
---

The syslog() driver has the following options.

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/options/dynamic-window-size.md %}

## ebpf()

|Type:   | string|
|Default:|   None|

This option is available in {{ site.product.short_name }} 4.2 and later versions.

*Description:* By default, the kernel selects the receive socket for a specific UDP randomly based on the source IP/port of the sender. You can customize this algorithm using the Extended Berkeley Packet Filter (eBPF) plugin. The `ebpf()` option changes the kernel’s `SO_REUSEPORT` algorithm so that all messages are randomly placed into one of the UDP sockets. The decision which UDP socket buffer a datagram is placed is made for every datagram, and not once for every stream. This means that messages are perfectly load-balanced across your set of UDP sockets. While this resolves the imbalance between the sockets and results in perfect load balancing, you will lose ordering between messages from the same sender, which is the price to pay for increased throughput.


{% include doc/admin-guide/options/encoding.md %}

{% include doc/admin-guide/options/format.md %}

{% include doc/admin-guide/options/source-flags.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host-override.md %}

{% include doc/admin-guide/options/internal.md %}

## interface()

Available in {{ site.product.short_name }} 3.19 and later versions.

|  Type:|      string|
  |Default:|   None|

*Description:* Bind to the specified interface instead of an IP address.

{% include doc/admin-guide/options/ip-localip.md %}

{% include doc/admin-guide/options/ip-protocol.md %}

{% include doc/admin-guide/options/ip-tos.md %}

{% include doc/admin-guide/options/ip-ttl.md %}

{% include doc/admin-guide/options/keep-alive.md %}

{% include doc/admin-guide/options/keep-hostname.md %}

{% include doc/admin-guide/options/keep-timestamp.md %}

{% include doc/admin-guide/options/listen-backlog.md %}

{% include doc/admin-guide/options/log-fetch-limit.md %}

{% include doc/admin-guide/options/log-iw-size.md %}

{% include doc/admin-guide/options/log-msg-size.md %}

{% include doc/admin-guide/options/max-connections.md %}

{% include doc/admin-guide/options/multi-line-mode-network.md %}

{% include doc/admin-guide/options/normalize-hostnames.md %}

{% include doc/admin-guide/options/pad-size.md %}

{% include doc/admin-guide/options/port-localport.md %}

{% include doc/admin-guide/options/program-override.md %}

{% include doc/admin-guide/options/sdata-prefix.md %}

{% include doc/admin-guide/options/so-broadcast.md %}

{% include doc/admin-guide/options/so-keepalive.md %}

{% include doc/admin-guide/options/so-rcvbuf.md %}

{% include doc/admin-guide/options/so-reuseport.md %}

{% include doc/admin-guide/options/so-sndbuf.md %}

{% include doc/admin-guide/options/tags.md %}

## tcp-keepalive-intvl()

Available in {{ site.product.short_name }} 3.4 and later versions.

|Type:   | number [seconds]|
|Default:|   `0`|

*Description:* This option specifies the interval between subsequential keepalive probes in seconds, regardless of the traffic exchanged in the connection. This option is equivalent to `/proc/sys/net/ipv4/tcp_keepalive_intvl`. The default value is `0`, which results in using the kernel default.

{% include doc/admin-guide/warnings/tcp-warning.md %}

## tcp-keepalive-probes()

Available in {{ site.product.short_name }} 3.4 and later versions.

|Type:   | number [seconds]|
|Default:|   `0`|

*Description:* This option specifies the number of unacknowledged probes to send before considering the connection dead. This option is equivalent to `/proc/sys/net/ipv4/tcp_keepalive_probes`. The default value is `0`, which results in using the kernel default.

{% include doc/admin-guide/warnings/tcp-warning.md %}

## tcp-keepalive-time()

Available in {{ site.product.short_name }} 3.4 and later versions.

|Type:   | number [seconds]|
|Default:|   `0`|

*Description:* This option specifies the interval between the last data packet sent and the first keepalive probe in seconds. This option is equivalent to `/proc/sys/net/ipv4/tcp_keepalive_time`. The default value is `0`, which results in using the kernel default.

{% include doc/admin-guide/warnings/tcp-warning.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/source-transport.md %}

{% include doc/admin-guide/options/trim-large-messages.md %}

{% include doc/admin-guide/options/tls.md %}

{% include doc/admin-guide/options/use-dns.md %}

{% include doc/admin-guide/options/use-fqdn.md %}
