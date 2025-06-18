---
title: opentelemetry() source options
id: adm-src-optel-opt
description: >-
    This section describes the options of the opentelemetry() source in {{ site.product.short_name }}.
---

The following options are available for the `opentelemetry()` source.

## auth()

The `auth()` option can be used to set the authentication of the driver. The default state of this option is `insecure`, as it is not defined.

The following sub-options are available for `auth()`.

### adc()

This option is an authentication method that is only available for destinations. For more information, see Application Default Credentials.

### alts()

This option is an accessible authentication available for Google infrastructures. Service accounts can be listed with the nested `target-service-account()` option, to match these against the server.

#### Example: configure an opentelemetry() source using auth(alts())

```config
source {
    opentelemetry(
      port(4317)
      auth(alts())
    );
  };

```

### insecure()

This option can be used to disable authentication: `auth(insecure())`.

### tls()

The `tls()` option accepts the following nested sub-options.
* ca-file()
* key-file()
* cert-file()
* peer-verify()

#### Example: configure an OpenTelemetry source using auth(tls())

```config
source {
    opentelemetry(
      port(1234)
      auth(
        tls(
          ca-file("/path/to/ca.pem")
          key-file("/path/to/key.pem")
          cert-file("/path/to/cert.pem")
          peer-verify(yes)
        )
      )
    );
  };

```

{% include doc/admin-guide/options/channel-args.md %}

## concurrent-requests()

|   Type:|       integer|
|Default:|             2|

*Description:* This option configures the upper limit of in-flight gRPC requests per worker. It is advisd to set this value in the range of 10s or 100s when there are a high number of clients sending simultaneously. In an optimzed solution, the number of `workers()` and `concurrent-requests()` is greater than or equal to the number of clients. However, this can cause an increase in memory usage.

## keep-hostname()

The `syslog-ng-otlp()` and `opentelemetry()` sources ignore this option and use the hostname from the message as the `${HOST}`.

## log-fetch-limit()

|   Type:|       number|
|Default:|          100|

*Description:* This option specifies the upper limit of messages received from a source during a single poll loop. The destination queues can fill up before flow-control could stop reading if the defined `log-fetch-limit()` is too high.

{% include doc/admin-guide/options/port.md %}

{% include doc/admin-guide/options/workers.md %}
