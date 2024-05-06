---
title: 'elasticsearch-http: Sending messages to Elasticsearch HTTP Bulk
  API'
short_title: elasticsearch-http
id: adm-dest-es-http
description: >-
    Version 3.21 of syslog-ng OSE can directly post log messages to an
    Elasticsearch deployment using the Elasticsearch Bulk API over the HTTP
    and Secure HTTP (HTTPS) protocols.
---

HTTPS connection, as well as password- and certificate-based
authentication is supported. The content of the events is sent in JSON
format.

**Declaration**

```config
d_elasticsearch_http {
    elasticsearch-http(
        index("<elasticsearch-index-to-store-messages>")
        url("https://your-elasticsearch-server1:9200/_bulk" "https://your-elasticsearch-server2:9200/_bulk")
        type("<type-of-the-index>")
    );
};
```

Use an empty string to omit the type from the index: type(" "). For
example, you need to do that when using Elasticsearch 7 or newer, and
you use a mapping in Elasticsearch to modify the type of the data.

You can use the proxy() option to configure the HTTP driver in all
HTTP-based destinations to use a specific HTTP proxy that is independent
from the proxy configured for the system.

Alternatively, you can leave the HTTP as-is, in which case the driver
leaves the default http_proxy and https_proxy environment variables
unmodified.

For more detailed information about these environment variables, see
[the libcurl documentation](https://curl.haxx.se/libcurl/c/CURLOPT_PROXY.html).

NOTE: Configuring the proxy() option overwrites the default http_proxy
and https_proxy environment variables.

### Example: Sending log data to Elasticsearch

The following example defines a elasticsearch-http() destination, with
only the required options.

```config
destination d_elasticsearch_http {
    elasticsearch-http(
        index("<name-of-the-index>")
        type("<type-of-the-index>")
        url("http://my-elastic-server:9200/_bulk")
    );
};


log {
    source(s_file);
    destination(d_elasticsearch_http);
    flags(flow-control);
};
```

The following example uses mutually-authenticated HTTPS connection,
templated index, and also sets the type() and some other options.

```config
destination d_elasticsearch_https {
    elasticsearch-http(
        url("https://node01.example.com:9200/_bulk")
        index("test-${YEAR}${MONTH}${DAY}")
        time-zone("UTC")
        type("test")
        workers(4)
        batch-lines(16)
        timeout(10)
        tls(
            ca-file("ca.pem")
            cert-file("syslog_ng.crt.pem")
            key-file("syslog_ng.key.pem")
            peer-verify(yes)
        )
    );
};
```

This driver is actually a reusable configuration snippet configured to
send log messages using the tcp() driver using a template. For details
on using or writing such configuration snippets, see
[[Reusing configuration blocks]]. You can find the source of
this configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/tree/master/scl/elasticsearch).
