---
title: netmask6()
id: adm-log-filters-netmask6
---

*Synopsis:* netmask6(ipv6/mask)

*Description:* Select only messages sent by a host whose IP address
belongs to the specified IPv6 subnet. Note that this filter checks the
IP address of the last-hop relay (the host that actually sent the
message to syslog-ng OSE), not the contents of the HOST field of the
message. You can use both the regular and the compressed format to
specify the IP address, for example, 1080:0:0:0:8:800:200C:417A or
1080::8:800:200C:417A. If you do not specify the address, localhost is
used.

Use the netmask (also called prefix) to specify how many of the leftmost
bits of the address comprise the netmask (values 1-128 are valid). For
example, the following specify a 60-bit prefix:
12AB:0000:0000:CD30:0000:0000:0000:0000/60 or 12AB::CD30:0:0:0:0/60.
Note that if you set an IP address and a prefix, syslog-ng OSE will
ignore the bits of the address after the prefix. To filter IPv4
addresses, see netmask().

The netmask6() filter is available in syslog-ng OSE 3.7 and later.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
If the IP address is not syntactically correct, the filter will never match.
The syslog-ng OSE application currently does not send a warning for such
configuration errors.
{: .notice--warning}
