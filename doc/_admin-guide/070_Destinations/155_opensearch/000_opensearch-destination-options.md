---
title: opensearch() destination options 
driver: 'opensearch'
id: adm-dest-os-opt
description: >-
    The opensearch destination of {{ site.product.short_name }} can directly post log messages to an OpenSearch deployment using the OpenSearch Bulk API over the HTTP and Secure HTTP (HTTPS) protocols.
    
    The opensearch destination has the following options. The index() and url() options are strictly required.
---

This destination is available in {{ site.product.short_name }} version 4.4 and later versions.

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/http-batch-and-loadbalance-ref.md referred_page='Batch mode and load balancing with OpenSearch' %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/http-batch-and-loadbalance-ref.md referred_page='Batch mode and load balancing with OpenSearch' %}

{% include doc/admin-guide/options/batch-timeout.md %}

{% include doc/admin-guide/http-batch-and-loadbalance-ref.md referred_page='Batch mode and load balancing with OpenSearch' %}

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/options/cert-file.md %}

{% include doc/admin-guide/options/cipher-suite.md %}

## custom-id()

| Type:    | string       |
| Default: | empty string |

*Description:* Sets the specified value as the ID of the OpenSearch index (_id).

{% include doc/admin-guide/options/delimiter.md %}

For details on how this option influences batch mode, see Batch mode and load balancing with OpenSearch.

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/hook.md %}

## index()

| Type:    | string or template |
| Default: | none               |

*Description:* The name of the OpenSearch index where OpenSearch will store the messages received from {{ site.product.short_name }}. This option is mandatory for this destination.

You can use macros and template functions, but you must ensure that the resolved template contains only characters that OpenSearch permits in the name of the index. The {{ site.product.short_name }} application does not validate the name of the index. For details on the characters permitted in the name of OpenSearch indices, see the documentation of OpenSearch.

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/key-file.md %}

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/peer-verify.md %}

{% include doc/admin-guide/options/persist-name.md %}

## retries()

| Type:    | number |
| Default: | 3      |

*Description:* If {{ site.product.short_name }} cannot send a message, it will try again until the number of attempts reaches retries().

If the number of attempts reaches retries(), {{ site.product.short_name }} will wait for time-reopen() time, then tries sending the message again.

To handle HTTP error responses, if the HTTP server returns 5xx codes, {{ site.product.short_name }} will attempt to resend messages until the number of attempts reaches retries. If the HTTP server returns 4xx codes, {{ site.product.short_name }} will drop the messages.

## ssl-version()

| Type:    | string                         |
| Default: | None, uses the libcurl default |

*Description:* Specifies the permitted SSL/TLS version. Possible values: sslv2, sslv3, tlsv1, tlsv1_0, tlsv1_1, tlsv1_2, tlsv1_3.

An alternative way to specify this option is to put it into a tls() block, together with any other TLS options. This allows you to separate these options and ensure better readability.

Make sure that you specify TLS options either using their own dedicated option (ca-dir(), ca-file(), cert-file(), cipher-suite(), key-file(), peer-verify(), and ssl-version()), or using the tls() block and inserting the relevant options within tls(). Avoid mixing the two methods. In case you do specify TLS options in both ways, the one that comes later in the configuration file will take effect.

**Declaration**

```config
   destination d_elasticsearch-http {
        elasticsearch-http(
            url("http://your-elasticsearch-server:9200/_bulk")
            type("")
            index("example-index")
            tls(
                ca-dir("dir")
                ca-file("ca")
                cert-file("cert")
                cipher-suite("cipher")
                key-file("key")
                peer-verify(yes|no)
                ssl-version(<the permitted SSL/TLS version>)
            )
        );
    };
```

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/timeout.md %}

## url()

| Type:    | URL or list of URLs, for example, url("site1" "site2") |
| Default: | N/A                                                    |

*Description:* Specifies the hostname or IP address and optionally the port number of the OpenSearch indexer. Use a colon (:) after the address to specify the port number of the server. For example: `http://your-opensearch-indexer.server:8088/_bulk`

This option is mandatory for this destination.

Make sure that the URL ends with _bulk, this is the OpenSearch API endpoint that properly parses the messages sent by {{ site.product.short_name }}.

In case the server on the specified URL returns a redirect request, {{ site.product.short_name }} automatically follows maximum 3 redirects. Only HTTP and HTTPS based redirections are supported.

{% include doc/admin-guide/http-load-balancing.md %}

{% include doc/admin-guide/http-load-balancing-example.md %}

## user()

| Type:    | string |
| Default: |        |

*Description:* The username that {{ site.product.short_name }} uses to authenticate on the server where it sends the messages.

{% include doc/admin-guide/options/use-system-cert-store.md %}

{% include doc/admin-guide/options/workers.md %}
