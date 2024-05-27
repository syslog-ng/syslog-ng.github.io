---
title: loki() destination options
id: adm-dest-loki-opt
---

The `loki()` driver sends messages to a Loki Grafana database and has the following options:

## auth()

The `auth()` option can be used to set the authentication of the driver. The default state of this option is `insecure`, as it is not defined.

The following sub-options are available for `auth()`.

### adc()

This option is an authentication method that is only available for destinations. For more information, see Application Default Credentials.

### alts()

This option is an accessible authentication available for Google infrastructures. Service accounts can be listed with the nested `target-service-account()` option, to match these against the server.

#### Example: configure a Loki destination using auth(alts())

```config
destination {
    loki(
      port(1234)
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

#### Example: configure a Loki destination using auth(tls())

```config
destination {
    loki(
      url("loki-server:123")
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

{% include doc/admin-guide/options/gRPC-keep-alive.md %}

## labels()

This option defines the labels applied to the message as they are sent to the destination.

**Declaration:**

```config
labels(
    "label-output-name" => "field-of-the-message"
)
```

## template()

|   Type:|       template or template-function|
|Default:| ${ISODATE} ${HOST} ${MSGHDR} ${MSG}|

*Description:* This option specifies a template that defines the logformat to be used in the destination. For more information on macros and template functions, see Macros of {{ site.product.short_name }} and Template functions of {{ site.product.short_name }}.

## tenant-id()

|   Type:|     string|
|Default:|           |

Available in {{ site.product.short_name }} 4.7 and later versions.

*Description:* This option sets the tenant ID for multi-tenant cases.

**Declaration:**

```config
loki(
    url("localhost:9096")
    labels(
        "app" => "$PROGRAM",
        "host" => "$HOST",
    )

    tenant-id("testTenant")
);
```

## timestamp()

|   Type:|     `current`, `received`, `msg`|
|Default:|                        `current`|

*Description:* This option sets the timestamp type to be used for messages sent to a Loki destination.

**NOTE:** Loki destinations only accept subsequent messages with increasing timestamps. Messages with timestamps deviating from this are rejected.
{: .notice--info}

The timestamp types are the following.

* `current`: The message procession output timestamp is used. This type guarantees an increasing timestamp order, but can deviate significantly from the message generation time.
* `msg`: The original timestamp of the message is used.
* `received`: The timestamp of message reception is used.

## url()

|   Type:|         string|
|Default:| localhost:9095|

*Description:* This option specifies the URL of the Loki endpoint.

{% include doc/admin-guide/options/workers.md %}
