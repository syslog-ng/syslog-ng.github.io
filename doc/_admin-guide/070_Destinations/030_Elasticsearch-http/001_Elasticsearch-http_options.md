---
title: elasticsearch-http() destination options
batch_lines: '25'
workers: '4'
id: adm-dest-es-http-opt
description: >-
  The elasticsearch-http destination of syslog-ng OSE can directly post
  log messages to an Elasticsearch deployment using the Elasticsearch Bulk
  API over the HTTP and Secure HTTP (HTTPS) protocols. The
  elasticsearch-http destination has the following options. The required
  options are: index(), type(), and url().
---

This destination is available in syslog-ng OSE version 3.21 and later.

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-lines.md %}

For details on how this option influences batch mode, see
[[Batch mode and load balancing]]

{% include doc/admin-guide/options/batch-timeout.md %}

For details on how this option influences batch mode, see
[[Batch mode and load balancing]]

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/es-http.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/es-http.md %}

{% include doc/admin-guide/options/cert-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/es-http.md %}

{% include doc/admin-guide/options/cipher-suite.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/es-http.md %}

## custom-id()

|  Accepted values:|   string|
  |Default:|           empty string|

*Description:* Sets the specified value as the ID of the Elasticsearch
index (_id).

{% include doc/admin-guide/options/delimiter.md %}

For details on how this option influences batch mode, see
[[Batch mode and load balancing]]

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/hook.md %}

## index()

|  Accepted values:|   string or template|
  |Default:|           None|

*Description:* The name of the Elasticsearch index where Elasticsearch
will store the messages received from syslog-ng OSE. This option is
mandatory for this destination.

You can use macros and template functions, but you must ensure that the
resolved template contains only characters that Elasticsearch permits in
the name of the index. The syslog-ng OSE application does not validate
the name of the index. For details on the characters permitted in the
name of Elasticsearch indices, see the documentation of Elasticsearch.

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/key-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/es-http.md %}

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/peer-verify.md %}

{% include doc/admin-guide/examples/es-http.md %}

{% include doc/admin-guide/options/persist-name.md %}

## proxy()

|  Type:|      |
  |Default:|   empty|

*Description:*

Format in configuration:

```config
destination {
  http( url("SYSLOG_SERVER_IP:PORT") proxy("PROXY_IP:PORT") method("POST"));
};
```

{% include doc/admin-guide/options/retries.md %}

To handle HTTP error responses, if the HTTP server returns 5xx codes,
syslog-ng OSE will attempt to resend messages until the number of
attempts reaches retries. If the HTTP server returns 4xx codes,
syslog-ng OSE will drop the messages.

{% include doc/admin-guide/options/ssl-version.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/es-http.md %}

{% include doc/admin-guide/options/throttle.md %}

## type()

|  Type:|      string or template|
  |Default:|   N/A|

*Description:* The type of the Elasticsearch index.

Use an empty string to omit the type from the index: type(""). For
example, you need to do that when using Elasticsearch 7 or newer, and
you use a mapping in Elasticsearch to modify the type of the data.

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/timeout.md %}

## url()

|  Type: |     URL or list of URLs, for example, url(\"site1\" \"site2\")|
  |Default:|   N/A|

*Description:* Specifies the hostname or IP address and optionally the
port number of the Elasticsearch indexer. Use a colon (**:**) after the
address to specify the port number of the server. For example:
<http://your-elasticsearch-indexer.server:8088/\_bulk>

This option is mandatory for this destination.

Make sure that the URL ends with _bulk, this is the Elasticsearch API
endpoint that properly parses the messages sent by syslog-ng OSE.

In case the server on the specified URL returns a redirect request,
syslog-ng OSE automatically follows maximum 3 redirects. Only HTTP and
HTTPS based redirections are supported.

{% include doc/admin-guide/load-balancing.md %}

## user()

|  Type:|      string|
|Default:|   |

*Description:* The username that syslog-ng OSE uses to authenticate on
the server where it sends the messages.

{% include doc/admin-guide/options/use-system-cert-store.md %}

{% include doc/admin-guide/options/workers.md %}
