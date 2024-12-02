---
title: 'elasticsearch-datastream: Elasticsearch data streams'
short_title: elasticsearch-datastream
id: adm-dest-es-datastream
description: >-
    From {{ site.product.short_name }} 4.8 and later versions, you  can send messages and metrics to Elasticsearch data streams to store your log and metrics data as time series data.
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

This driver is a reusable configuration snippet configured to send log messages using the http() driver using a template. You can find the Elasticsearch datastream configuration snippet on GitHub.

## Prerequisites

* An account for Elasticsearch datastreams with a username and a password.

## Options

Elasticsearch datastream is an HTTP based driver, hence it utilizes the HTTP destination options.

> *Copyright © 2024 Axoflow*
