---
title: 'clickhouse() destination options'
id: adm-dest-clickhouse-opt
description: >-
    This section describes the options of the clickhouse() destination in {{ site.product.short_name }}.
---

The clickhouse() destination has the following options:

## auth()

You can set authentication in the auth() option of the driver. By default, authentication is disabled (`auth(insecure())`).

The following authentication methods are available in the auth() block:

### adc()

Application Default Credentials (ADC). This authentication method is only available for destinations.

### service-account-key()

Available in { site.product.short_name }} version 4.15 and later.

Use the specified service account key for ADC authentication. File path must be the absolute path. For example:

```config
auth(adc(service-account-key("absolute-path-to-key-file")))
```

### alts()

Application Layer Transport Security (ALTS) is a simple to use authentication, only available within Google’s infrastructure. It accepts the target-service-account() option, where you can list service accounts to match against when authenticating the server.

```config
destination {
    clickhouse(
      port(12345)
      auth(alts())
    );
  };

```

### insecure()

This is the default method, authentication is disabled (`auth(insecure())`).

### tls()

`tls()` accepts the `key-file()`, `cert-file()`, `ca-file()` and `peer-verify()` (possible values: `required-trusted`, `required-untrusted`, `optional-trusted` and `optional-untrusted`) options.

```config
destination {
    clickhouse(
      url("your-clickhouse-server:12346")
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

|  Type:|     boolean|
|Default:| no|

Available in {{ site.product.short_name }} 4.5 and later versions.

*Description:* This option enables compression in gRPC requests. Currently only deflate-type (similar to gzip) compression is supported.

{% include doc/admin-guide/options/cloud-auth.md %}

## dataset()

|  Type:|     string|
|Default:| |

*Description:* The name of the {{ site.product.short_name }} destination dataset.

{% include doc/admin-guide/options/disk-buffer.md %}

## format()

|  Type:|     `JSONEachRow`, `JSONCompactEachRow`, or `Protobuf`|
|Default:| see description|

Available in {{ site.product.short_name }} 4.20 and later versions.

*Description:* Specifies the data format to use when sending data to Clickhouse.

By default, format() is set to:
- `Protobuf` if the `proto-var()` option is set, or
- `JSONEachRow` if the `json-var()` option is set.

Starting with {{ site.product.short_name }} 4.20, you can also use `format(JSONCompactEachRow)` (when `json-var()` is also set) to use a more compact, array-based JSON representation. For example:

```config
destination {
  clickhouse (
    # ...
    json-var(json("$my_filterx_json_variable"))
    format("JSONCompactEachRow")
    # ...
  );
};

```

In the `JSONEachRow` format each line is a JSON object, making it more readable. For example:

```config
{"id":1,"name":"foo","value":42}
{"id":2,"name":"bar","value":17}

```

In the `JSONCompactEachRow` format each row is a compact array-based row:

```config
[1,"foo",42]
[2,"bar",17]

```

Note that if the data’s actual format does not match the selected format, ClickHouse returns a `CANNOT_PARSE_INPUT_ASSERTION_FAILED` error message.

{% include doc/admin-guide/options/frac-digits.md %}

{% include doc/admin-guide/options/headers-gRPC.md %}

{% include doc/admin-guide/options/hook.md %}

## json-var()

|  Type:|     string|
|Default:| |

Available in {{ site.product.short_name }} 4.20 and later versions.

*Description:* The `json-var()` option accepts either a JSON template or a variable containing a JSON string, and sends it to the ClickHouse server in Protobuf/JSON mixed mode (`JSONEachRow` format). In this mode, type validation is performed by the ClickHouse server itself, so no Protobuf schema is required for communication. For example:

```config
destination {
  clickhouse (
    ...
    json-var(json("{\"ingest_time\":1755248921000000000, \"body\": \"test template\"}"))ß
    };
};

```

Using `json-var()` is mutually exclusive with the `proto-var()`, `server-side-schema()`, `schema()`, and `protobuf-schema()` options.

{% include doc/admin-guide/options/keep-alive.md %}

{% include doc/admin-guide/options/local-time-zone.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/on-error.md %}

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/persist-name.md %}

## protobuf-schema()

|  Type:|     schema|
|Default:| |

*Description:* Defines the schema syntax of the BigQuery table from a protobuf schema file.

```config
protobuf-schema("/tmp/test.proto" => "${MESSAGE}", "${PROGRAM}", "${HOST}", "${PID}")
```
### Example: using the protobuf-schema() option

```config
syntax = "proto2";
​
message CustomRecord {
  optional string message = 1;
  optional string app = 2;
  optional string host = 3;
  optional int64 pid = 4;
}
```

## proto-var()

|  Type:|     FilterX variable|
|Default:| |

Available in {{ site.product.short_name }} 4.13 and later versions.

*Description:* Create the message contents from a FilterX variable formatted using the protobuf_message function, instead of using schema() or protobuf-schema().

## response-action()

|  Type:|     arrow list|
|Default:| driver dependent|

Available in {{ site.product.short_name }} 4.13 and later versions.

*Description:* Fine-tunes how {{ site.product.short_name }} behaves in case of different gRPC results. You can assign specific actions to the different gRPC results, for example:

```config
response-action(
  not-found => disconnect
  unavailable => drop
)
```

The following gRPC results are supported:

* `aborted`
* `already-exists`
* `cancelled`
* `data-loss`
* `deadline-exceeded`
* `failed-precondition`
* `internal`
* `invalid-argument`
* `not-found`
* `ok`
* `out-of-range`
* `permission-denied`
* `resource-exhausted`
* `unauthenticated`
* `unavailable`
* `unknown`
* `unimplemented`

The following actions are available:

* `disconnect`
* `drop`
* `retry`
* `success`

{% include doc/admin-guide/options/retries.md %}

## schema()

|  Type:|     schema|
|Default:| |

*Description:* Defines the schema syntax of the BigQuery table. Each line defines a column. The first part of the line defines the name and type of the column, the second part after the arrow sets {{ site.product.short_name }} templates or macros which are evaluated on every log routed to the bigquery() destination. The available column types are the following: `STRING`, `BYTES`, `INTEGER`, `FLOAT`, `BOOLEAN`, `TIMESTAMP`, `DATE`, `TIME`, `DATETIME`, `JSON`, `NUMERIC`, `BIGNUMERIC`, `GEOGRAPHY`, `RECORD`, `INTERVAL`.

### Example: defining a BigQuery table using schema()

```config
schema(
    "message" => "${MESSAGE}"
    "app" STRING => "${PROGRAM}"
    "host" STRING => "${HOST}"
    "time" DATETIME => "${ISODATE}"
    "pid" INTEGER => int("${PID}")
)
```
{% include doc/admin-guide/options/send-time-zone.md %}

## server-side-schema()

|  Type:|     string|
|Default:| |

*Description:* By default, sending data to ClickHouse does not propagate the type information of the data fields. The `server-side-schema()` option provides a solution for that using the ClickHouse format schema. Using a server-side schema is needed when you are using complex types, like `DateTime` or `LowCardinality`.

1. Create a `.proto` file that matches the `schema()` of your {{ site.product.short_name }} configuration. For details on formatting, see the ClickHouse documentation. For example:
```config
syntax = "proto3";

message MessageType {
  uint32 user_id = 3;
  string message = 1;
  string timestamp = 2;
  float metric = 4;
};
```
2. Copy the `.proto` file to your ClickHouse server, into the directory set in the proto_schema_path option of your ClickHouse configuration.
3. Reference that schema in the `clickhouse()` destination of your {{ site.product.short_name }} configuration. The parameter of `server-side-schema()` is <name-of-the-proto-file>:<identifier-after-message-in-the-proto-file>. So if in the previous step you named the proto file my-proto-file.proto with the sample content, the parameter will be `my-proto-file:MessageType`. For example:
```config
destination {
  clickhouse(
    database("default")
    table("demo_table")
    user("your-username")
    password("your-password")
    schema(
      "user_id" UInt32 => $R_MSEC,
      "message" String => "$MSG",
      "timestamp" DateTime => "$R_UNIXTIME",
      "metric" Float32 => 3.14
    )
    server-side-schema("<my_proto_file_on_server>:<my_message_schema_name>")
  );
};
```

## table()

|  Type:|     string|
|Default:| |

*Description:* Defines the name of the Google BigQuery table where {{ site.product.short_name }} send data to.

{% include doc/admin-guide/options/template-escape.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/ts-format.md %}

## url()

|  Type:|     string|
|Default:| bigquerystorage.googleapis.com|

*Description:* This option sets the URL of the Google BigQuery where the logs are sent.

## user()

|  Type:|     string|
|Default:| |

*Description:* The username used for authentication.

{% include doc/admin-guide/options/worker-partition-key.md %}

{% include doc/admin-guide/options/workers.md %}

> *Copyright © 2025 Axoflow*
