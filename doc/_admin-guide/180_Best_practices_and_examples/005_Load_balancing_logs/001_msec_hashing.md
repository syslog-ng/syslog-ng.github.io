---
title: Configuration generator for the load balancing method based on MSEC hashing
short_title: Configuration generator
id: adm-pract-msec
description: >-
  This section describes a configuration generator for the load balancing
  method based on MSEC hashing to load balance your logs between multiple
  syslog-ng Open Source Edition (syslog-ng OSE) destinations.
---

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Consider that network-load-balancer() is not a destination, only a script that
generates the example configuration described in
[[Load balancing with round robin]].
Also consider that the configuration generator script may change incompatibly
in the future. As a result, One Identity does not officially support using
this script, and recommends that you only use this script at your own risk.
{: .notice--warning}

As an alternative to using the example configuration described in
[[Load balancing with round robin]], a
configuration generator script is also available in syslog-ng OSE:

```config
destination d_lb {
  network-load-balancer(
    targets(myhost1 myhost2 myhost3)
  )};
```

Where destinations share the same configuration except for the
destination address, balancing is based on MSEC hashing.
