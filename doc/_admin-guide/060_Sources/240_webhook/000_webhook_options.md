---
title: webhook() source options
src: 'webhook'
id: adm-src-webhook-opt
description: >-
    This section describes the options of the webhook source in {{ site.product.short_name }}.
---

The `webhook()` and `webhook-json()` drivers have the following options:

## auth_token()

|Type:|   string|
|Default:|  none|

*Description:* You can request an authentication token from the clients as an additional method of validation. Do not use this under plain HTTP. When `auth_token("<token>")` is set, {{ site.product.short_name }} only accepts requests that contain the Authorization: Basic \<token\>, Authorization: Bearer \<token\>, or a similar header. Other requests will be rejected with `403`.

### Example:

```config
auth_token("dGVzdF9zZWdlskfoe0aF90b2tlbg==")
```

## include_request_headers()

|Type:|   `yes`, `no`|
|Default:|       `no`|

*Description:* If enabled, the HTTP request headers from the webhook are available for processing as a JSON object under the `${webhook.headers}` field. This option works for `webhook()` and for `webhook-json()` as well.

## paths()

|Type:|   JSON list|
|Default:|    `/.*`|

*Description:* The `paths()` option sets the endpoints where the webhook will receive data. You can use static paths, or regular expressions. In regular expressions you can use named capture groups to automatically set the macro values.

For example, the `/events/(?P<HOST>.*)` path specifies the hostname for the data received in the request based on the second part of the URL: a request to the `/events/my-example-host` URL sets the host field of that message to `my-example-host`.

You can set multiple endpoints, for example, paths(["/events","/events/(?P<HOST>.*)"])

## port()

|Type:|   integer|
|Default:|    `80`(webhook), `443`(HTTPS webhook)|

*Description:* Specifies the port-number where the webhook is listening on, for example, `8080`. Make sure to enable the port you have configured on the firewall of the {{ site.product.short_name }} host. The default value is `80` for HTTP webhooks, and `443` for HTTPS webhooks.

## prefix()

|Type:|   string|
|Default:|      |

*Description:* This option can be used to insert a prefix before the name part of the parsed name-value pairs to help further processing when using the `webhook-json()` source. For example, to insert the `webhook.` prefix, use the `prefix(webhook.)` option.

Names starting with a dot (for example, .example) are reserved for use by {{ site.product.short_name }}. If you attempt use a macro name identical to the name of a parsed value, it will attempt to replace the original value of the macro (note that only soft macros can be overwritten, for more information, see Hard versus soft macros). To avoid such problems, use a prefix when naming the parsed values, for example, `prefix(my-parsed-data.)`.

## proxy_header()

|Type:|   string|
|Default:|      |

*Description:* By default, {{ site.product.short_name }} expects data to be sent directly, without a proxy, and sets the `${SOURCEIP}` and `${SOURCEPORT}` macros to the IP and port of the peer.

When `proxy_header()` is set the following conditions apply:
* `${SOURCEIP}` and `${SOURCEPORT}` macros will be set according to the proxy header defined in proxy_header().
* The `${PEERIP}` and `${PEERPORT}` macros will contain the IP and port of the proxy.

### Example: getting proxy data from `x-forwarded-for` request header

```config
webhook(port(8080) proxy-header("x-forwarded-for"));
```

Header in the request:

```config
curl  -H "X-Forwarded-FOR: 1.2.3.4" -X POST --data "{}" http://127.0.0.1:8080/
```

**NOTE:** 
Note that {{ site.product.short_name }} only trusts the header that is specified in the `proxy_header()` option. If the request includes multiple headers with the specified name, the last one is used.
{: .notice--info}

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/options/cert-file.md %}

{% include doc/admin-guide/options/key-file.md %}

{% include doc/admin-guide/options/peer-verify.md %}

{% include doc/admin-guide/options/use-system-cert-store.md %}

> *Copyright © 2025 Axoflow*