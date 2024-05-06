---
title: netmask()
id: adm-log-filters-netmask
---

*Synopsis:* netmask(ipv4/mask)

*Description:* Select only messages sent by a host whose IP address
belongs to the specified IPv4 subnet. Note that this filter checks the
IP address of the last-hop relay (the host that actually sent the
message to syslog-ng OSE), not the contents of the HOST field of the
message. You can use both the dot-decimal and the CIDR notation to
specify the netmask. For example, 192.168.5.0/255.255.255.0 or
192.168.5.0/24. To filter IPv6 addresses, see
netmask6().
