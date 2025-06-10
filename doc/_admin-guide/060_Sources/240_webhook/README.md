---
title: 'Webhook source'
short_title: webhook
id: adm-src-webhook
description: >-
        From version 4.8.0 and onwards, {{ site.product.short_name }} can collect logs through a webhook using the `webhook()` and `webhook-json()` sources. The webhook-json() source automatically parses the payload using the `json-parser()`.
---

**Declaration**

```config
source s_webhook {
webhook-json(
    port(8181)
    paths(["/events","/events/(?P<HOST>.*)"])
    );
};
```

On hosts where {{ site.product.short_name }} is running, you can use the curl command to test the source.

```config
curl -X POST --data "{'MESSAGE':'message-value'}" http://127.0.0.1:8181/events
```

## Query parameters

You can include query parameters in the URL and {{ site.product.short_name }} automatically makes them available as `${webhook.query.*}`.

### Example: Sending data with query parameters

```config
http://127.0.0.1:8181/events?param1=value1&param2=value2&param3=value3
```

This way, the available values become `${webhook.query.param1}`, `${webhook.query.param2}` and `${webhook.query.param3}`.

## HTTPS Webhook

To receive data using HTTPS, configure a certificate and a private key for the webhook using the `tls_cert_file` and `tls_key_file` options.

**NOTE:** Setting `tls_key_file` automatically changes the default port from `80` to `443`.
{: .notice--info}

To verify the certificate of the clients sending data to the webhook, set `tls_peer_verify(yes)`, and use one of the following options:
* `tls_use_system_cert_store(no)`
* `tls_ca_file("")`
* `tls_ca_dir("")`

> *Copyright © 2025 Axoflow*