---
title: 'http: Posting messages over HTTP without Java'
short_title: http-nonjava
id: adm-dest-http-nonjava
description: >-
    Version 3.8 of syslog-ng OSE can directly post log messages to web
    services using the HTTP protocol, without having to use Java.
---

The current implementation has the following limitations:

- Only the PUT and the POST methods are supported.

HTTPS connection, as well as password- and certificate-based
authentication is supported.

If the server returns a status code beginning with 2 (for example, 200),
syslog-ng OSE assumes the message was successfully sent. For other
response codes, see [[HTTP destination options]].
You can override the behavior of syslog-ng OSE using the response-action() option.

## Example: Client certificate authentication with HTTPS

```config
destination d_https {
    http(
        [...]
        tls(
        ca-file("/<path-to-certificate-directory>/ca-crt.pem")
        ca-dir("/<path-to-certificate-directory>/")
        cert-file("/<path-to-certificate-directory>/server-crt.pem")
        key-file("/<path-to-certificate-directory>/server-key.pem")
            )
        [...]
    );
};
```

**Declaration**

```config
destination d_http {
    http(
        url("<web-service-IP-or-hostname>")
        method("<HTTP-method>")
        user-agent("<USER-AGENT-message-value>")
        user("<username>")
        password("<password>")
    );
};
```

You can use the proxy() option to configure the HTTP driver in all
HTTP-based destinations to use a specific HTTP proxy that is independent
from the proxy configured for the system.

Alternatively, you can leave the HTTP as-is, in which case the driver
leaves the default http_proxy and https_proxy environment variables
unmodified.

For more detailed information about these environment variables, see
[the libcurl
documentation](https://curl.haxx.se/libcurl/c/CURLOPT_PROXY.html).

NOTE: Configuring the proxy() option overwrites the default http_proxy
and https_proxy environment variables.

### Example: Sending log data to a web service

The following example defines an http destination.

```config
destination d_http {
    http(
        url("http://127.0.0.1:8000")
        method("PUT")
        user-agent("syslog-ng User Agent")
        user("user")
        password("password")
        headers("HEADER1: header1", "HEADER2: header2")
        body("${ISODATE} ${MESSAGE}")
    );
};

log {
    source(s_file);
    destination(d_http);
    flags(flow-control);
};
```

You can also use the http() destination to
[[forward log messages to Splunk|adm-dest-splunk-hec]] using syslog-ng OSE.
