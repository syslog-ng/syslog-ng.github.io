---
title: 'graphite: Sending metrics to Graphite'
short_title: graphite
id: adm-dest-graphite
description: >-
    The graphite() destination can send metrics to a
    [Graphite](http://graphite.readthedocs.io/en/latest/index.html) server
    to store numeric time-series data. There are many ways to feed the
    Graphite template function with name value pairs. 
---

The syslog-ng OSE CSV and PatternDB parsers (for details,
see [[Using pattern parsers]]) can parse
log messages and generate name value pairs based on message
content. The CSV parser (for details, see
[[Parsing messages with comma-separated and similar values]])
can be used for logs that have a constant field based structure,
like the Apache web server access logs. The patterndb parser can
parse information and can extract important fields from free form
log messages, as long as patterns describing the log messages
are available. Another way is to send JSON-based log messages
(for details, see [[JSON parser]]) to syslog-ng
OSE, like running a simple shell script collecting
metrics and running it from cron regularly.

To see an example of how the graphite() destination is used to collect
statistics coming from syslog-ng, see the blog post [Collecting syslog-ng
statistics to Graphite](https://syslog-ng.com/blog/collecting-syslog-ng-statistics-to-graphite/).

**Declaration**

```config
graphite(payload());
```

### Example: Using the graphite() driver

To use the graphite() destination, the only mandatory parameter is
payload, which specifies the value pairs to send to graphite. In the
following example any value pairs starting with \"monitor.\" are
forwarded to graphite.

```config
destination d_graphite { graphite(payload("--key monitor.*")); };
```

**NOTE:** The graphite() destination is only a wrapper around the network()
destination and the graphite-output template function. If you want to
fine-tune the TCP parameters, use the **network()** destination instead,
as described in [[graphite-output]].
{: .notice--info}
