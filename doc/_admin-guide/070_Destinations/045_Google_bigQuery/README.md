---
title: 'bigquery: Send data to Google BigQuery'
short_title: Google BigQuery
id: adm-dest-google-bq
description: >-
    In syslog-ng OSE 4.6 and later versions it is possible to send data to [Google Cloud BigQuery](https://cloud.google.com/bigquery) through the [BigQuery Storage Write API](https://cloud.google.com/bigquery/docs/write-api) using a gRCP based high performance implementation.
---

## Prerequisites

* An available Google BigQuery environment, for example a [BigQuery Sandbox](https://cloud.google.com/bigquery/docs/sandbox).
* A BigQuery table.
* The following OAuth scopes are required in order to use the Storage Write API:
  * https://www.googleapis.com/auth/bigquery
  * https://www.googleapis.com/auth/cloud-platform 
  * https://www.googleapis.com/auth/bigquery.insertdata

To configure syslog-ng OSE, the name of the project, the dataset, the name and schema of the used table are necessary.

The authentication is done through [Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc).

The destination uses `GoogleDefaultCredentials` for authentication, which covers everything listed in as [ADC](https://cloud.google.com/docs/authentication/provide-credentials-adc). Within a production environment, use a service account and [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).

### Example: BigQuery destination configuration

```config
destination d_bigquery {
    bigquery(
        project("test-project")
        dataset("test-dataset")
        table("test-table")
        workers(8)

        schema(
            "message" => "$MESSAGE"
            "app" STRING => "$PROGRAM"
            "host" STRING => "$HOST"
            "time" DATETIME => "$ISODATE"
            "pid" INTEGER => int("$PID")
        )

        on-error("drop-property")
    );
}

```

If not specified, the messages are sent with one worker, one message per batch, and without compression.
