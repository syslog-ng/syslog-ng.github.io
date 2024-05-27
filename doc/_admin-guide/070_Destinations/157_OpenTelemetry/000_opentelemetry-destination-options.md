---
title: opentelemetry() destination options 
id: adm-dest-optel-opt
---

The following options are available for the opentelemetry() destination.

## auth()

The `auth()` option can be used to set the authentication of the driver. The default state of this option is `insecure`, as it is not defined.

The following sub-options are available for `auth()`.

### adc()

This option is an authentication method that is only available for destinations. For more information, see Application Default Credentials.

### alts()

This option is an accessible authentication available for Google infrastructures. Service accounts can be listed with the nested `target-service-account()` option, to match these against the server.

#### Example: configure an opentelemetry() destination using auth(alts())

```config
destination {
  opentelemetry(
    url("otel-server:1234")
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

```config
destination {
    opentelemetry(
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
{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

{% include doc/admin-guide/options/channel-args.md %}

## compression()

|   Type:|       boolean|
|Default:|          `no`|

Available in syslog-ng OSE 4.5 and later versions.

*Description:* This option enables compression in gRPC requests. Currently, only the deflate compression method is supported.

{% include doc/admin-guide/options/workers.md %}
