---
title: 'bigquery() destination options'
id: adm-dest-bigquery-opt
description: >-
  The Google bigquery() destination has the following options.
---

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

## compression()

|  Type:|     boolean|
|Default:| no|

Available in syslog-ng OSE 4.5 and later versions.

*Description:* This option enables compression in gRPC requests. Currently only deflate-type (similar to gzip) compression is supported.

## dataset()

|  Type:|     string|
|Default:| |

*Description:* The name of the syslog-ng OSE destination dataset.

{% include doc/admin-guide/options/disk-buffer.md %}

## flags()

|  Type:|     no-multi-line, syslog-protocol|
|Default:| empty set|

*Description:* Flags modify the behavior of the destination driver.

* `no-multi-line`: This flag disables line breaking in messages. The message is sent in a single line.
* `syslog-protocol`: This flag instructs the driver to format the message in IETF syslog protocol standard (RFC5424), but without the frame header. When this flag is used, applied macros only have an effect on the message text and not the header. The header is formatted according to the new standard.

**NOTE:** The `syslog-protocol` flag is not essential for the syslog driver. The driver adds header to the messages automatically.
{: .notice--info}

{% include doc/admin-guide/options/frac-digits.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/keep-alive.md %}

{% include doc/admin-guide/options/local-time-zone.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/on-error.md %}

{% include doc/admin-guide/options/persist-name.md %}

## project()

|  Type:|     string|
|Default:| |

*Description:* The ID of the Google Cloud project where syslog-ng OSE sends data.

## protobuf-schema()

|  Type:|     schema|
|Default:| |

*Description:* Defines the schema syntax of the BigQuery table from a protobuf schema file.

```config
protobuf-schema("/tmp/test.proto" => "$MESSAGE", "$PROGRAM", "$HOST", "$PID")
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

{% include doc/admin-guide/options/retries.md %}

## schema()

|  Type:|     schema|
|Default:| |

*Description:* Defines the schema syntax of the BigQuery table. Each line defines a column. The first part of the line defines the name and type of the column, the second part after the arrow sets syslog-ng OSE templates or macros which are evaluated on every log routed to the bigquery() destination. The available column types are the following: `STRING`, `BYTES`, `INTEGER`, `FLOAT`, `BOOLEAN`, `TIMESTAMP`, `DATE`, `TIME`, `DATETIME`, `JSON`, `NUMERIC`, `BIGNUMERIC`, `GEOGRAPHY`, `RECORD`, `INTERVAL`.

### Example: defining a BigQuery table using schema()

```config
schema(
    "message" => "$MESSAGE"
    "app" STRING => "$PROGRAM"
    "host" STRING => "$HOST"
    "time" DATETIME => "$ISODATE"
    "pid" INTEGER => int("$PID")
)
```
{% include doc/admin-guide/options/send-time-zone.md %}

## table()

|  Type:|     string|
|Default:| |

*Description:* Defines the name of the Google BigQuery table where syslog-ng OSE send data to.

{% include doc/admin-guide/options/template-escape.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/ts-format.md %}

## url()

|  Type:|     string|
|Default:| bigquerystorage.googleapis.com|

*Description:* This option sets the URL of the Google BigQuery where the logs are sent.

{% include doc/admin-guide/options/worker-partition-key.md %}

{% include doc/admin-guide/options/workers.md %}
