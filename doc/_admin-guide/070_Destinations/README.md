---
title: 'destination: Forward, send, and store log messages'
short_title: Destinations
id: adm-dest
description: >-
    A destination is where a log message is sent if the filtering rules
    match. Similarly to sources, destinations consist of one or more
    drivers, each defining where and how messages are sent.
---

**TIP:** If no drivers are defined for a destination, all messages sent to
the destination are discarded. This is equivalent to omitting the
destination from the log statement.
{: .notice--info}

To define a destination, add a destination statement to the syslog-ng
configuration file using the following syntax:

```config
destination <identifier> {
    destination-driver(params); destination-driver(params); ...
};
```

**_Example_**: A simple destination statement

The following destination statement sends messages to the TCP port 1999
of the 10.1.2.3 host.

```config
destination d_demo_tcp {
    network("10.1.2.3" port(1999));
};
```

If name resolution is configured, you can use the hostname of the target server as well.

```config
destination d_tcp {
    network("target_host" port(1999));
};
```

- ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
- Do not define the same drivers with the same parameters more than once,
    because it will cause problems. For example, do not open the same file in
    multiple destinations.
- Do not use the same destination in different log paths, because it can cause
    problems with most destination types. Instead, use filters and log paths to
    avoid such situations.
- Sources and destinations are initialized only when they are used in a log
    statement. For example, syslog-ng OSE starts listening on a port or starts
    polling a file only if the source is used in a log statement.
    For details on creating log statements, see
    [[log: Filter and route log messages using log paths, flags, and filters]]
{: .notice--warning}

The following section lists the destination drivers available in syslog-ng
OSE. If these destinations do not satisfy your needs, you can extend
syslog-ng OSE and write your own destination, for example, in C, Java,
or Python. For details, see
[[Write your own custom destination in Java or Python]].
