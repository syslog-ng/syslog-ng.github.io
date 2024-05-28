---
title: 'PubSub: Send data to Google Pub/Sub'
short_title: Google PubSub
id: adm-dest-google-pubsub
description: >-
    In {{ site.product.short_name }} 4.5 and later versions it is possible to send data to Google Cloud Pub/Sub using its HTTP REST API.
---

## Prerequisites

* A live Google Pub/Sub subscription.
* An IAM service account used by {{ site.product.short_name }} for authentication.
* A Google Cloud project with the Pub/Sub API enabled.

For more information, see the Google Pub/Sub tutorial.

To configure {{ site.product.short_name }}, the name of the project and the target topic of the data is required.

### Example: minimal configuration of a Pub/Sub destination

```config
destination d_pubsub {
  google-pubsub(
    project("syslog-ng-project")
    topic("syslog-ng-topic")
    auth(
      service-account(
        key("/path/to/service-account-key.json")
      )
    )
  );
};
```

This driver is a reusable configuration snippet configured to send log messages using the `http()` driver using a template. The source of the Google Pub/Sub configuration snippet can be accessed on GitHub.
