---
title: 'elasticsearch-http: Sending messages to Elasticsearch HTTP Bulk
  API'
short_title: elasticsearch-http
id: adm-dest-es-http
description: >-
    Version 3.21 of {{ site.product.short_name }} can directly post log messages to an
    Elasticsearch deployment using the Elasticsearch Bulk API over the HTTP
    and Secure HTTP (HTTPS) protocols.
---

HTTPS connection, as well as password- and certificate-based
authentication is supported. The content of the events is sent in JSON
format.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** When a shard fails to respond to a read request, the coordinating node sends the request to another shard copy in the same replication group. Repeated failures can result in no available shard copies.
{: .notice--warning}

To ensure fast responses, the following APIs will respond with partial results if one or more shards fail:

* Search
* Multi Search
* Bulk
* Multi Get

Responses containing partial results still provide a 200 OK HTTP status code. Shard failures are indicated by the timed_out and _shards fields of the response header.

**Declaration**

```config
destination d_elasticsearch {
    elasticsearch-http(
        index("<elasticsearch-index-to-store-messages>")
        op_type("create")
        user("<elastic-user>")
        password("<your-password>")
        url("http://localhost:9200/_bulk")
        template("$(format-json --scope rfc5424 --scope dot-nv-pairs
        --rekey .* --shift 1 --scope nv-pairs
        --exclude DATE @timestamp=${ISODATE})")
    );
};
```

**NOTE:** In {{ site.product.short_name }} 4.11 and later versions the `type()` option is deprecated for elasticsearch destinations and including it in the configuration does not affect any functionality.
{: .notice--info}

In versions prior to 4.11, you can use an empty string to omit the type from the index: type(" "). For
example, you need to do that when using Elasticsearch 7 or newer, and
you use a mapping in Elasticsearch to modify the type of the data.

You can use the proxy() option to configure the HTTP driver in all
HTTP-based destinations to use a specific HTTP proxy that is independent
from the proxy configured for the system.

Alternatively, you can leave the HTTP as-is, in which case the driver
leaves the default http_proxy and https_proxy environment variables
unmodified.

For more detailed information about these environment variables, see
the libcurl documentation.

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
Reusing configuration blocks. You can find the source of
the Elasticsearch configuration snippet on GitHub.
