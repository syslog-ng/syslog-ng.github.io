---
title: 'ClickHouse database'
short_title: ClickHouse
id: adm-dest-clickhouse
description: >-
    In {{ site.product.short_name }} 4.9 and later versions it is possible to send data to ClickHouse databases using its ClickHouse gRPC interface.
---

## Prerequisites

- A self-hosted ClickHouse installation.

**WARNING:**
Warning ClickHouse Cloud doesn’t support the gRPC interface currently.
{: .notice--warning}

- The gRPC interface must be enabled in your ClickHouse configuration.

- To configure {{ site.product.short_name }}, you’ll need:
  - the name of an existing database and a table where you want to send your data
  - the credentials (username and password) to access the database.


### Example: ClickHouse destination configuration

```config
destination {
  clickhouse(
    url("localhost:9100")
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
  );
};

```

**NOTE:** 
If you have a protobuf-formatted message, you can specify it in the proto-var() option, instead of using the schema() option.
{: .notice--info}

> *Copyright © 2025 Axoflow*