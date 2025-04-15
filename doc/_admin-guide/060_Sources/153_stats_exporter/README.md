---
title: 'stats-exporter: Providing various statistics information to a HTTP Scraper'
short_title: stats-exporter
id: adm-src-stats-exporter
description: >-
    The stats-exporter() and stats-exporter-dont-log() sources can directly serve the output of
    syslog-ng-ctl stats and syslog-ng-ctl query to an HTTP scraper, such as Prometheus.
---

Example usage for a Prometheus Scraper which logs the HTTP request of the scraper to /var/log/scraper.log:

``` config
@version: 4.9
@include "scl.conf"

source s_prometheus_stat {
    stats-exporter(
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
    destination { file(/var/log/scraper.log); };
};
```

Example usage for a generic HTTP Scraper which sends e.g. the `GET /stats HTTP/1.1` HTTP request to get statistics of {{ site.product.short_name }}, do not want to log or further process the HTTP requests in the log pipe, and needs the response in CSV format:

``` config
@version: 4.9
@include "scl.conf"

source s_scraper_stat {
    stats-exporter-dont-log(
        ip("0.0.0.0")
        port(8080)
        stat-type("stats")
        stat-format("csv")
        scrape-pattern("GET /stats*")
        scrape-freq-limit(30)
        single-instance(yes)
    );
};

log {
    source(s_scraper_stat);
};
```

>**NOTE:** A destination is not required for this to work; the `stats-exporter()` sources will respond to the scraper regardless of whether a destination is present in the log path.
{: .notice--info}
