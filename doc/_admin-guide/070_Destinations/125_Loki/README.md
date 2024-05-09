---
title: 'loki(): Storing messages in a Grafna Loki database'
short_title: Loki
id: adm-dest-loki
description: >-
    In syslog-ng OSE 4.4 and later versions the `loki()` destination can be used to send log data to [Grafna Loki](https://grafana.com/docs/loki/latest/). 
    
    For more information on the message format, see [Grafna Loki HTTP endpoint](https://grafana.com/docs/loki/latest/reference/loki-http-api/#push-log-entries-to-loki).
---

### Example: loki() destination configuration

```config
loki(
    url("localhost:9096")
    labels(
        "app" => "$PROGRAM",
        "host" => "$HOST",
    )

    workers(16)
    batch-timeout(10000)
    batch-lines(1000)
);
```
