---
title: 'OpenTelemetry Destination'
short_title: OpenTelemetry
id: adm-dest-optel
description: >-
    In syslog-ng OSE 4.3 and later versions it is possible to send logs, metrics and traces from OpenTelemetry clients. For more information see the OpenTelemetry Protocol (OTLP/gRPC).
---

In the example below, an OpenTelemetry source and destination are defined. It receives data and forwards it to a receiver.

### Example: Forwarding OpenTelemetry data

```config
log otel_forward_mode_alts {
  source {
    opentelemetry(
      port(12345)
      auth(alts())
    );
  };

  destination {
    opentelemetry(
      url("my-otel-server:12345")
      auth(alts())
    );
  };
};
```

**NOTE:** Only the `url()` option is mandatory to definie in the destination, which includes the port number.
{: .notice--info}

### Example: Sending log messages to an OpenTelemetry destination

```config
log non_otel_to_otel_tls {
  source {
    network(
      port(12346)
    );
  };

  destination {
    opentelemetry(
      url("my-otel-server:12346")
      auth(
        tls(
          ca-file("/path/to/ca.pem")
          key-file("/path/to/key.pem")
          cert-file("/path/to/cert.pem")
        )
      )
    );
  };
};
```
