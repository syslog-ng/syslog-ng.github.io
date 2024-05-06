---
title: 'PubSub: Send data to Google Pub/Sub'
short_title: Google PubSub
id: adm-dest-google-pubsub
description: >-
    In syslog-ng OSE 4.5 and later versions it is possible to send data to [Google Cloud Pub/Sub](https://cloud.google.com/pubsub?hl=en) using its [HTTP REST API](https://cloud.google.com/pubsub/docs/reference/rest).
---

## Prerequisites

* A live [Google Pub/Sub subscription](https://cloud.google.com/pubsub?hl=en).
* An [IAM service account](https://cloud.google.com/iam/docs/service-account-overview) used by syslog-ng OSE for authentication.
* A Google Cloud project with the Pub/Sub API enabled.

For more information, see the [Google Pub/Sub tutorial](https://cloud.google.com/pubsub/docs/building-pubsub-messaging-system#before_you_begin).

To configure syslog-ng OSE, the name of the project and the target topic of the data is required.

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

This driver is a reusable configuration snippet configured to send log messages using the `http()` driver using a template. The source of this configuration snippet can be accessed on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/google/google-pubsub.conf).
