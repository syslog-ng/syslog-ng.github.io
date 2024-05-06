---
title: 's3: Sending messages to Amazon Simple Storage'
id: adm-dest-amazon
short_title: s3
description: >-
    Available in syslog-ng OSE version 4.4 and later versions.

    The s3() destination sends log messages to the [Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/s3/) object storage service. Log messages can be sent over TCP, or encrypted with TLS.
---

## Prerequisites

* An already existing S3 bucket configured for programmatic access, and the related `ACCESS_KEY` and `SECRET_KEY` of a user that can access it.
* If the venv (`/usr/bin/syslog-ng-update-virtualenv`) created by syslog-ng OSE is not used, the `boto3` and/or `botocore` Python dependencies must be installed.

To use the s3() driver, the scl.conf file must be included in the syslog-ng OSE configuration:

```config
@include "scl.conf"
```

The s3() driver is actually a reusable configuration snippet. For details on using or writing such configuration snippets, see [[Reusing configuration blocks]].

**Declaration**

```config
s3(
    url("http://localhost:9000")
    bucket("syslog-ng")
    access-key("my-access-key")
    secret-key("my-secret-key")
    object-key("${HOST}/my-logs")
    template("${MESSAGE}\n")
);
```

## Creating Objects

syslog-ng OSE can create a new object based on the following strategies:

* Based on object size:The [[max-object-size()]] option configures syslog-ng OSE to complete an object if it reaches a certain size. syslog-ng OSE appends an index ("-1", “-2”, …) to the end of the object key, then starts a new object.
* Based on timestamp: The [[object-key-timestamp()]] option can be used to set a timestamp related template, which is appended to the end of an object, for example: "${R_MONTH_ABBREV}${R_DAY}". When a log message arrives with a newer timestamp template resolution, the previous timestamped object is completed and a new one is started with a new timestamp. If an older message arrives, it does not reopen the old object, but starts a new object with the key having an index appended to the old object.
* Based on timeout: The [[flush-grace-period()]] option sets the number of minutes to wait for new messages to arrive after the last one. If the timeout expires, syslog-ng OSE completes the object, and opens a new object (with an appended index) when a new message arrives.

All of these methods can be used individually, or together.

## Upload options

syslog-ng OSE uploads objects using the multipart upload API. syslog-ng OSE composes chunks locally. When a chunk reaches the size set in [[chunk-size()]] (by default 5 MiB), the chunk is uploaded. When an object is finished, the multipart upload is completed and S3 merges the chunks.

The upload can be configured with the [[chunk-size()]], [[upload-threads()]], and the [[max-pending-uploads()]] options.
