---
title: 'collectd: sending metrics to collectd'
short_title: collectd
id: adm-dest-collectd
description: >-
  The collectd() destination uses the unixsock plugin of the collectd application
  to send log messages to the collectd system statistics collection daemon. You must install and configure collectd separately before using this destination.

  Available in {{ site.product.short_name }} version 3.20 and later.
---

**Declaration**

```config
collectd();

destination d_collectd {
  collectd(
    socket("<path-to-collectd-socket>"),
    host("${HOST}"),
    plugin("${PROGRAM}"),
    type("<type-of-the-collected-metric>"),
    values("<metric-sent-to-collectd>"),
  );
};
```

### Example: Using the collectd() driver

The following example uses the name of the application sending the log
message as the plugin name, and the value of the ${SEQNUM} macro as the
value of the metric sent to collectd.

```config
destination d_collectd {
  collectd(
    socket("/var/run/collectd-unixsock"),
    host("${HOST}"),
    plugin("${PROGRAM}"),
    type("gauge"),
    type_instance("seqnum"),
    values("${SEQNUM}"),
  );
};
```

To use the collectd() driver, the scl.conf file must be included in your
{{ site.product.short_name }} configuration:

```config
@include "scl.conf"
```

The collectd() driver is actually a reusable configuration snippet
configured to send log messages using the unix-stream() driver. For
details on using or writing such configuration snippets, see
Reusing configuration blocks. You can find the source of
the collectd configuration snippet on GitHub.
