---
title: 'loki(): Storing messages in a Grafana Loki database'
short_title: Loki
id: adm-dest-loki
description: >-
    In {{ site.product.short_name }} 4.4 and later versions the `loki()` destination can be used to send log data to Grafana Loki. 
    
    For more information on the message format, see Grafna Loki HTTP endpoint.
---

## Authentication

The `loki()` destination supports OAuth2 authentication using the `cloud-auth()` framework for gRPC-based communication.

When configured, OAuth2 access tokens are automatically injected into gRPC requests. This follows the same authentication model used by other cloud-enabled destinations.

## Example: loki() destination configuration

```config
loki(
    url("localhost:9096")
    labels(
        "app" => "$PROGRAM",
        "host" => "$HOST",
    )

    workers(16)
    batch-timeout(10000)
    batch-lines(1000)
);
```

## Example: loki() destination configuration with OAuth2 authentication

```config
loki(
    url("loki.example.com:443")

    cloud-auth(
        oauth2(
            client_id("client-id")
            client_secret("client-secret")
            token_url("https://auth.example.com/token")
            scope("loki.write")
        )
    )

    labels(
        "app" => "$PROGRAM",
        "host" => "$HOST",
    )

    workers(16)
    batch-lines(1000)
);
```
