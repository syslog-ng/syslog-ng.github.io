---
title: 'OpenObserve: Send messages to OpenObserve'
short_title: openobserve-log
id: adm-dest-opobs
description: >-
    In {{ site.product.short_name }} version 4.5 and later versions it is possible to send  messages to  OpenObserve using OpenObserve Log Ingestion - JSON API. This API receives multiple-record batches in JSON format.

---

## Prerequisites

* An OpenObserve account for {{ site.product.short_name }} or a self-hosted OpenObserve deployment
* Username, password, organization name and the name of the OpenObserve target stream where data is sent to.

### Example: minimal configuration of OpenObserve

```config
destination d_openobserve {
  openobserve-log(
    url("http://your-openobserve-endpoint")
    organization("your-organization")
    stream("your-example-stream")
    user("root@example.com")
    password("V2tsn88GhdNTKxaS")
  );
};
```

### Example: port-specific configuration of OpenObserve

```config
destination d_openobserve {
  openobserve-log(
    url("http://openobserve-endpoint")
    port(5080)
    organization("your-organization")
    stream("your-example-stream")
    user("root@example.com")
    password("V2tsn88GhdNTKxaS")
  );
};
```

This driver is a reusable configuration snippet configured to send log messages using the `http()` driver using a template. The source of the OpenObserve configuration snippet can be accessed on GitHub.
