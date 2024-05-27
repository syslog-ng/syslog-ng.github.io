---
title: 'OpenTelemetry source'
short_title: OpenTelemetry
id: adm-src-optel
description: >-
    In syslog-ng OSE 4.3 and later versions it is possible to collect logs, metrics and traces from OpenTelemetry clients. For more information see the OpenTelemetry Protocol (OTLP/gRPC).
---

In the example below, an OpenTelemetry source and destination are defined. The incoming data is forwarded to a receiver.

### Example: Forwarding OpenTelemetry data

```config
log otel_forward_mode_alts {
  source {
    opentelemetry(
      port(4317)
      auth(alts())
    );
  };

  destination {
    opentelemetry(
      url("otel-server:1234")
      auth(alts())
    );
  };
};
```

**NOTE:** The syslog-ng OSE application does not parse the fields of the incoming messages into name-value pairs. It is only capable of forwarding messages using the `opentelemetry()` destination. For information on parsing OpenTelemetry messages, see the OpenTelemetry parser section.
{: .notice--info}
