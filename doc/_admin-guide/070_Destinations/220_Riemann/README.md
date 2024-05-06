---
title: 'riemann: Monitoring your data with Riemann'
short_title: riemann
id: adm-dest-riemann
description: >-
        The riemann() driver sends your data (for example, metrics or events) to
        a [Riemann](http://riemann.io/) monitoring system.

        For the list of available parameters, see
        [[riemann() destination options]].  
---

**Declaration**

```config
riemann(
        server("<riemann-server-address>")
        port("<riemann-server-port>")
        metric("<the-metric-or-data-to-send-to-riemann>")
);
```

### Example: Using the riemann() driver

The following destination sends the value of the SEQNUM macro (the
number of messages sent to this destination) as a metric to the Riemann
server.

```config
@version: 3.38

source s_network {
        network(port(12345));
};

destination d_riemann {
        riemann(
                server("localhost")
                port(5555)
                ttl("300.5")
                metric(int("$SEQNUM"))
                description("syslog-ng riemann test")
                state("ok")
                attributes(x-ultimate-answer("$(+ $PID 42)")
                                key("MESSAGE", rekey(add-prefix("x-")) )
                                )
        );
};

log {
        source(s_network);
        destination(d_riemann);
        flags(flow-control);
};
```

For a detailed use-case on using syslog-ng OSE with the Riemann
monitoring system, see the article [A How to Guide on Modern Monitoring
and Alerting by Fabien
Wernli](https://devops.com/guide-modern-monitoring-alerting/).
