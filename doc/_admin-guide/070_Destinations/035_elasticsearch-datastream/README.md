---
title: 'elasticsearch-datastream: Elasticsearch data streams'
short_title: elasticsearch-datastream
id: adm-dest-es-datastream
description: >-
From syslog-ng OSE 4.8 and later versions, you  can send messages and metrics to [Elasticsearch data streams](https://www.elastic.co/guide/en/elasticsearch/reference/current/data-streams.html) to store your log and metrics data as time series data..
---

**Declaration**

```config
destination d_elastic_data_stream {
  elasticsearch-datastream(
    url("https://elastic-endpoint:9200/my-data-stream/_bulk")
    user("elastic")
    password("ba253DOn434Tc0pY22OI")
  );
};
```
This driver is a reusable configuration snippet configured to send log messages using the http() driver using a template. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/main/scl/elasticsearch/elastic-datastream.conf).

## Prerequisites

* An account for Elasticsearch datastreams with a username and a password.

## Options

Elasticsearch datastream is an HTTP based driver, hence it utilizes the HTTP destination options.

> *Copyright © 2024 Axoflow*
