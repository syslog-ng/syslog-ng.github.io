---
title: 'prometheus-stats: Providing various statistics information to a Prometheus Scraper'
short_title: prometheus-stats
id: adm-src-prometheus-stats
description: >-
    The prometheus-stats() and prometheus-stats-dont-log() sources can directly serve the output of
    syslog-ng-ctl stats and syslog-ng-ctl query to a Prometheus Scraper.
---

Example usage:

``` config
@version: 4.9
@include "scl.conf"

source s_prometheus_stat {
    prometheus-stats-dont-log(
        ip("0.0.0.0")
        port(8080)
        stat-type("query")
        stat-query("*")
        scrape-freq-limit(30)
        single-instance(yes)
    );
};

log {
    source(s_prometheus_stat);
};
```

>**NOTE:** A destination is not required for this to work; the `prometheus-stats()` sources will respond to the scraper regardless of whether a destination is present in the log path.
{: .notice--info}
