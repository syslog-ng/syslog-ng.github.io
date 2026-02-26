---
title: syslog-ng-otlp() source options
id: adm-src-sng-otlp-opt
src: syslog-ng-otlp
priority_default: notice 
description: >-
    This section describes the options of the syslog-ng-otlp() source in {{ site.product.short_name }}.
---

The following options are available for the `syslog-ng-otlp()` source.

## auth()

The `auth()` option can be used to set the authentication of the driver. The default state of this option is `insecure`, as it is not defined.

The following sub-options are available for `auth()`.

### adc()

This option is an authentication method that is only available for destinations. For more information, see Application Default Credentials.

### alts()

This option is an accessible authentication available for Google infrastructures. Service accounts can be listed with the nested `target-service-account()` option, to match these against the server.

#### Example: configure an syslog-ng-otlp() source using auth(alts())

```config
source {
    syslog-ng-otlp(
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
  * required-trusted
  * required-untrusted
  * optional-trusted
  * optional-untrusted

#### Example: configure an syslog-ng-otlp() source using auth(tls())

```config
destination {
    syslog-ng-otlp(
      url("your-otel-server:12346")
      auth(
        tls(
          ca-file("/path/to/ca.pem")
          key-file("/path/to/key.pem")
          cert-file("/path/to/cert.pem")
        )
      )
    );
  };
```

{% include doc/admin-guide/options/chain-hostnames.md %}

{% include doc/admin-guide/options/channel-args.md %}

## concurrent-requests()

|   Type:|       integer|
|Default:|             2|

*Description:* This option configures the upper limit of in-flight gRPC requests per worker. It is advisd to set this value in the range of 10s or 100s when there are a high number of clients sending simultaneously. In an optimized solution, the number of workers() and `concurrent-requests()` is greater than or equal to the number of clients. However, this can cause an increase in memory usage.

{% include doc/admin-guide/options/default-facility.md %}

{% include doc/admin-guide/options/default-priority.md %}

{% include doc/admin-guide/options/dns-cache.md %}

{% include doc/admin-guide/options/ebpf.md %}

### Example: Configure a syslog-ng-otlp() source with ebpf()

```config
source {
      syslog-ng-otlp(
        udp(so-reuseport(yes) port(2000) persist-name("udp1")
          ebpf(reuseport(sockets(4))));
        udp(so-reuseport(yes) port(2000) persist-name("udp2"));
        udp(so-reuseport(yes) port(2000) persist-name("udp3"));
        udp(so-reuseport(yes) port(2000) persist-name("udp4"));
      );
};
```

{% include doc/admin-guide/options/flags.md %}

{% include doc/admin-guide/options/format.md %}

{% include doc/admin-guide/options/host-override.md %}

{% include doc/admin-guide/options/internal.md %}

## keep-hostname()

The syslog-ng-otlp() and opentelemetry() sources ignore this option and use the hostname from the message as the ${HOST}.

{% include doc/admin-guide/options/keep-timestamp.md %}

{% include doc/admin-guide/options/log-fetch-limit.md %}

{% include doc/admin-guide/options/log-iw-size.md %}
{% include doc/admin-guide/options/log-iw-size-network.md %}

{% include doc/admin-guide/options/log-prefix.md %}

{% include doc/admin-guide/options/normalize-hostnames.md %}

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/options/port.md %}

{% include doc/admin-guide/options/program-override.md %}

{% include doc/admin-guide/options/sdata-prefix.md %}

{% include doc/admin-guide/options/tags.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/use-dns.md %}

{% include doc/admin-guide/options/use-fqdn.md %}

{% include doc/admin-guide/options/workers.md %}

{% include doc/admin-guide/options/use-syslogng-pid.md %}
