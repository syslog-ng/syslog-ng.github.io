---
title: syslog-ng() destination options 
id: adm-dest-syslogng-opt
---

The syslog-ng() destination is a special version of the network()
destination driver: by default, it sends EWMM-formatted log messages to
the TCP514 port of the server.

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/failover.md %}

{% include doc/admin-guide/options/destination-flags.md %}

{% include doc/admin-guide/options/flush-lines.md %}

{% include doc/admin-guide/options/frac-digits.md %}

{% include doc/admin-guide/options/ip-protocol.md %}

{% include doc/admin-guide/options/ip-tos.md %}

{% include doc/admin-guide/options/ip-ttl.md %}

{% include doc/admin-guide/options/keep-alive.md %}

{% include doc/admin-guide/options/localip.md %}

{% include doc/admin-guide/options/localport.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/mark-freq.md %}

{% include doc/admin-guide/options/mark-mode.md %}

{% include doc/admin-guide/options/port-destport.md %}

## server()

|  Type:|      hostname or IP address|
|Default: |  127.0.0.1|

*Description:* The hostname or IP address of the syslog-ng server.

{% include doc/admin-guide/options/so-broadcast.md %}

{% include doc/admin-guide/options/so-keepalive.md %}

{% include doc/admin-guide/options/so-rcvbuf.md %}

{% include doc/admin-guide/options/so-sndbuf.md %}

{% include doc/admin-guide/options/spoof-source.md %}

{% include doc/admin-guide/options/suppress.md %}

{% include doc/admin-guide/options/tcp-keepalive.md %}

{% include doc/admin-guide/options/template-logformat.md %}

{% include doc/admin-guide/options/template-escape.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/tls.md %}

{% include doc/admin-guide/options/destination-transport.md %}

{% include doc/admin-guide/options/ts-format.md %}
