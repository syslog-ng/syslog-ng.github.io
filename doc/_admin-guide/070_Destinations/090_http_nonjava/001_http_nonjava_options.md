---
title: HTTP-nonjava destination options
batch_timeout: 'none'
id: adm-dest-http-nonjava-opt
---

The http destination of syslog-ng OSE can directly post log messages to
web services using the HTTP protocol. The http destination has the
following options.

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/http-batch.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/http-batch.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

{% include doc/admin-guide/http-batch.md %}

## body()

|  Type:|      string or template|
  |Default:|   |

*Description:* The body of the HTTP request, for example,
body(\"\${ISODATE} \${MESSAGE}\"). You can use strings, macros, and
template functions in the body. If not set, it will contain the message
received from the source by default.

## body-prefix()

|  Accepted values:|   string|
  |Default:|           none|

*Description:* The string syslog-ng OSE puts at the beginning of the
body of the HTTP request, before the log message. Available in syslog-ng
OSE version 3.18 and later.

{% include doc/admin-guide/http-batch.md %}

## body-suffix()

|  Accepted values:|   string|
  |Default:|           none|

*Description:* The string syslog-ng OSE puts to the end of the body of
the HTTP request, after the log message. Available in syslog-ng OSE
version 3.18 and later.

{% include doc/admin-guide/http-batch.md %}

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/options/cert-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

{% include doc/admin-guide/options/cipher-suite.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

{% include doc/admin-guide/options/delimiter.md %}

{% include doc/admin-guide/http-batch.md %}

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/headers.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/key-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

## method()

|  Type:|      POST \| PUT|
  |Default:|   POST|

*Description:* Specifies the HTTP method to use when sending the message
to the server.

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/peer-verify.md %}

{% include doc/admin-guide/options/persist-name.md %}

## proxy()

| Type:    | The proxy server address, in proxy(\"PROXY\_IP:PORT\") format. For example, proxy(\"http://myproxy:3128\")                    |
| Default: | None                                                           |

*Description:* You can use the proxy() option to configure the HTTP driver in all
HTTP-based destinations to use a specific HTTP proxy that is independent
from the proxy configured for the system.

Alternatively, you can leave the HTTP as-is, in which case the driver
leaves the default http_proxy and https_proxy environment variables
unmodified.

**NOTE:** Configuring the proxy() option overwrites the default http_proxy
and https_proxy environment variables.
{: .notice--info}

### Example: the proxy() option in configuration

The following example illustrates including the proxy() option in your
configuration.

```config
destination {
  http( url("SYSLOG_SERVER_IP:PORT") proxy("PROXY_IP:PORT") method("POST"));
};
```

{% include doc/admin-guide/options/response-action.md %}

{% include doc/admin-guide/options/retries.md %}

{% include doc/admin-guide/options/ssl-version.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

{% include doc/admin-guide/options/template-logformat.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/timeout.md %}

## url()

|  Type:|      URL or list of URLs|
|Default:|   http://localhost/|

*Description:* Specifies the hostname or IP address and optionally the port number of the web service that can receive log data via HTTP. Use a colon (**:**) after the address to specify the port number of the server. For example: http://127.0.0.1:8000

In case the server on the specified URL returns a redirect request, syslog-ng OSE automatically follows maximum 3 redirects. Only HTTP and HTTPS based redirections are supported.

### Templates in the URL

In syslog-ng OSE 4.5 and later versions, templates can be used in the `url()` option of the `http()` driver, with the following conditions:

* **Templates and batching:** Templates can only be resolved for a single message, because the template could resolve differently on different messages. If batching is enabled and multiple workers are configured, only add messages to a batch that generate identical URLs. Set the `worker-partition-key()` option with a template that contains all the templates used in the `url()` option, otherwise messages get mixed.
* Due to security concerns, syslog-ng OSE URL-encodes the  templated content of the `url()` option. The following parts of the URL cannot be templated:
  * scheme
  * host
  * port
  * user
  * password



{% include doc/admin-guide/load-balancing.md %}

{% include doc/admin-guide/options/user-agent.md %}

## user()

|  Type:|      string|
  |Default:|   |

*Description:* The username that syslog-ng OSE uses to authenticate on
the server where it sends the messages.

{% include doc/admin-guide/options/use-system-cert-store.md %}

{% include doc/admin-guide/options/worker-partition-key.md %}

{% include doc/admin-guide/options/workers.md %}
