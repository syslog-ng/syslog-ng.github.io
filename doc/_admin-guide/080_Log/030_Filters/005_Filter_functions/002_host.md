---
title: host()
id: adm-log-filters-host
---

*Synopsis:* host(regexp)

*Description:* Match messages by using a regular expression against the
hostname field of log messages. Note that you can filter only on the
actual content of the HOST field of the message (or what it was
rewritten to). That is, syslog-ng OSE will compare the filter expression
to the content of the \${HOST} macro. This means that for the IP address
of a host will not match, even if the IP address and the hostname field
refers to the same host. To filter on IP addresses, use the
[[netmask()]] filter.  

```config
filter demo_filter { host("example") };
```
