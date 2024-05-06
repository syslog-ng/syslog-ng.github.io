---
title: 'opensearch: Send messages to OpenSearch'
short_title: opensearch
id: adm-dest-os
description: >-
    Available in syslog-ng-OSE version 4.4 and later versions.

    The opensearch() destination posts log messages to [OpenSearch](https://opensearch.org)
    using its HTTP endpoint.

    HTTPS connection, password- and certificate-based authentication are supported.
    The content of the events is sent in JSON format.
---

**Declaration**

```config
d_opensearch {
    opensearch(
        index("&lt;opensearch-index-to-store-messages&gt;")
        url("https://your-opensearch-endpoint:9200/_bulk")
    );
};
```

### Example: Sending log data to OpenSearch

The following example defines an opensearch() destination, using only the required options.

```config
destination opensearch {
    opensearch(
        index("&lt;name-of-the-index&gt;")
        url("http://my-elastic-server:9200/_bulk")
    );
};


log {
    source(s_file);
    destination(d_opensearch_http);
    flags(flow-control);
};
```

The following example uses mutually-authenticated HTTPS connection, templated index, and additional options.

```config
destination opensearch_https {
    opensearch(
        url("https://node01.example.com:9200/_bulk")
        index("test-${YEAR}${MONTH}${DAY}")
        time-zone("UTC")
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

This driver is a reusable configuration snippet configured to send log messages using the http() driver with a template. For more information on using or writing such configuration snippets, see [[Reusing configuration blocks]].
