---
title: 'bigquery: Send data to Google BigQuery'
short_title: Google BigQuery
id: adm-dest-google-bq
description: >-
    In {{ site.product.short_name }} 4.6 and later versions it is possible to send data to Google Cloud BigQuery through the BigQuery Storage Write API using a gRCP based high performance implementation.
---

## Prerequisites

* An available Google BigQuery environment, for example a BigQuery Sandbox.
* A BigQuery table.
* The following OAuth scopes are required in order to use the Storage Write API:
  * https://www.googleapis.com/auth/bigquery
  * https://www.googleapis.com/auth/cloud-platform 
  * https://www.googleapis.com/auth/bigquery.insertdata

To configure {{ site.product.short_name }}, the name of the project, the dataset, the name and schema of the used table are necessary.

Authentication can be configured using either Google Application Default Credentials (ADC) or OAuth2 via the `cloud-auth()` framework.

By default, the destination uses Google Application Default Credentials (GoogleDefaultCredentials). In production environments, a service account with Workload Identity is recommended.

Alternatively, OAuth2 authentication can be configured explicitly using `cloud-auth(oauth2())`, which injects OAuth2 tokens into gRPC requests.

The destination uses `GoogleDefaultCredentials` for authentication, which covers everything listed in as ADC. Within a production environment, use a service account and Workload Identity.

### Example: BigQuery destination configuration

```config
destination d_bigquery {
    bigquery(
        project("test-project")
        dataset("test-dataset")
        table("test-table")
        workers(8)

        schema(
            "message" => "${MESSAGE}"
            "app" STRING => "${PROGRAM}"
            "host" STRING => "${HOST}"
            "time" DATETIME => "${ISODATE}"
            "pid" INTEGER => int("${PID}")
        )

        on-error("drop-property")
    );
}

```

### Example: BigQuery destination configuration with OAuth2 authentication

```config
destination d_bigquery_oauth2 {
    bigquery(
        project("test-project")
        dataset("test-dataset")
        table("test-table")

        cloud-auth(
            oauth2(
                client_id("client-id")
                client_secret("client-secret")
                token_url("https://auth.example.com/token")
                scope("https://www.googleapis.com/auth/bigquery")
            )
        )

        schema(
            "message" => "${MESSAGE}"
            "app" STRING => "${PROGRAM}"
            "host" STRING => "${HOST}"
            "time" DATETIME => "${ISODATE}"
        )
    );
}
```

If not specified, the messages are sent with one worker, one message per batch, and without compression.
