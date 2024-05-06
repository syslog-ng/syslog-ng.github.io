---
title: Log paths
id: adm-log-path
description: >-
    Log paths determine what happens with the incoming log messages.
    Messages coming from the sources listed in the log statement and
    matching all the filters are sent to the listed destinations.
---

To define a log path, add a log statement to the syslog-ng configuration
file using the following syntax:

**Declaration**

```config
log {
    source(s1); source(s2); ...
    optional_element(filter1|parser1|rewrite1);
    optional_element(filter2|parser2|rewrite2);
    ...
    destination(d1); destination(d2); ...
    flags(flag1[, flag2...]);
};
```

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Log statements are processed in the order they appear in the configuration file,
thus the order of log paths may influence what happens to a message, especially
when using filters and log flags.
{: .notice--warning}

{% include doc/admin-guide/notes/parser-order.md %}

## Named log paths and log path metrics

In syslog-ng-OSE version 4.1 and later versions, it is possible to add an ID or name to the log path to produce an easily readable configuration file. syslog-ng-OSE also collects ingress and egress metrics for named log paths.

### Example

```config
log top-level {
    source(s_local);

    log inner-1 {
        filter(f_inner_1);
        destination(d_local_1);
    };

    log inner-2 {
        filter(f_inner_2);
        destination(d_local_2);
    };
};
```

Each named log path counts its ingress and egress messages:

```config
syslogng_log_path_ingress{id="top-level"} 114
syslogng_log_path_ingress{id="inner-1"} 114
syslogng_log_path_ingress{id="inner-2"} 114
syslogng_log_path_egress{id="top-level"} 103
syslogng_log_path_egress{id="inner-1"} 62
syslogng_log_path_egress{id="inner-2"} 41
```

### Example: A simple log statement

The following log statement sends all messages arriving to the localhost
to a remote server.

```config
source s_localhost {
    network(
        ip(127.0.0.1)
        port(1999)
    );
};
destination d_tcp {
    network("10.1.2.3"
        port(1999)
        localport(999)
    );
};
log {
    source(s_localhost);
    destination(d_tcp);
};
```

All matching log statements are processed by default, and the messages
are sent to *every* matching destination by default. So a single log
message might be sent to the same destination several times, provided
the destination is listed in several log statements, and it can be also
sent to several different destinations.

This default behavior can be changed using the flags() parameter. Flags
apply to individual log paths, they are not global options. For details
and examples on the available flags, see
[[Log path flags]].
The effect and use of the flow-control flag is detailed in
[[Managing incoming and outgoing messages with flow-control]].
