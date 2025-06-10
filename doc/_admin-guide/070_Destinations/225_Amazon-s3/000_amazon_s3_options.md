---
title: 'Amazon s3 options'
id: adm-opt-amazon
description: >-
  This section describes the options of the s3() destination in {{ site.product.short_name }}.
---

The following options are specific to the s3 destination.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Hazard of data loss!
The {{ site.product.short_name }} Amazon S3 destination has been designed to work with the AWS implementation.
While it is possible to use the {{ site.product.short_name }} S3 destination with other implementations,
some options might suffer from reduced functionality or not work at all.<br>
We recommend carefully testing your configuration before sending any production data to other S3 compatible solutions.
Some configurations, such as using the `storag-class()` option with MinIO could result in permanent data loss without any warning.
{: .notice--danger}

## access-key()

|Type:|   string|
|Default:|           N/A|

*Description:* The `ACCESS_KEY` of the service account of the S3 bucket. (Used together with secret-key().)

## bucket()

|Type:|   string|
|Default:|           N/A|

*Description:* The name of the S3 bucket.
For example: `my-bucket`.

{% include doc/admin-guide/warnings/s3-dataloss-warning.md %}

## canned-acl()

|Type:|   string|
|Default:|           N/A|

*Description:* The ACL assigned to the object, if specified, for example, `bucket-owner-read`. The following values are accepted:

`authenticated-read`, `aws-exec-read`, `bucket-owner-full-control`,
`bucket-owner-read`, `log-delivery-write`, `private`, `public-read`, `public-read-write`

If an invalid value is configured, the default is used.

## chunk-size()

|Type:|   string|
|Default:|           5 MiB|

*Description:* Only effective if `upload-threads()` is set higher than one. Signifies the part size in a multithreaded upload, but only if the uploaded object is at least 1.5 times the chunk size. If compression is enabled, the chunk-size() specifies the compressed size. Must be set to at least 5 MiB.

## content-type()

|Type:|   string|
|Default:|      `application/octet-stream`|

*Description:* This option allows the user to change the displayed content type of the log messages.

## compression()

|Type:|   boolean|
|Default:|           no|

*Description:* Setting compression to `yes` enables gzip compression, and implicitly adds a `.gz` suffix to the created object’s key. You can set the level of the compression using the compresslevel() option (`0-9`).

## compresslevel()

|Type:|   integer|
|Default:|           9|

Description: Only has effect if compression() is set to `yes`. The level of the compression can be set using the compresslevel() option (`0-9`).

## flush-grace-period()

|Type:|   integer [minutes]|
|Default:|           60|

*Description:* After the grace period expires and no new messages are routed to the destination, {{ site.product.short_name }} flushes the contents of the buffer to the S3 object even if the volume of the messages in the buffer is lower than max-object-size().

{% include doc/admin-guide/options/log-fifo-size.md %}

## max-object-size()

|Type:|   string|
|Default:|           5120GiB|

*Description:* The maximal size of the S3 object. If an object reaches this size, {{ site.product.short_name }} appends an index suffix ("-1", “-2”, …) to the object key and starts a new object after rotation. The index is appended before the `object-key-suffix()` value.

## max-pending-uploads()

|Type:|   integer|
|Default:|           32|

Description: The max-pending-uploads() and upload-threads() options configure the upload of the chunks. Uploading happens in multiple threads to minimize network overhead.

* upload-threads() limits the maximum number of parallel uploads.
* max-pending-uploads() limits the number of chunks that are waiting in the work queue of the upload threads to get uploaded

## object-key()

|Type:|   template|
|Default:|           N/A|

*Description:* The unique object key (or key name), which identifies the object in an Amazon S3 bucket.

{% include doc/admin-guide/warnings/s3-dataloss-warning.md %}

## object-key-suffix()

|Type:|   string|
|Default:|          .log|

*Description:* A suffix added to the very end of the object key, barring the `.gz` extension with enabled compression. Might be used to denote file extension, as in the default case.

## object-key-timestamp()

|Type:|   template|
|Default:|           N/A|

*Description:* The object-key-timestamp() option can be used to set a datetime-related template, which is appended to the end of the object, for example: "`${R_MONTH_ABBREV}${R_DAY}`". When a log message arrives with a newer timestamp template resolution, the previous timestamped object gets finished and a new one is started with the new timestamp. If an older message arrives, it does not reopen the old object, but starts a new object with the key having an index appended to the old object.

{% include doc/admin-guide/options/persist-name.md %}

## region()

|Type:|   string|
|Default:|           N/A|

*Description:* The regional endpoint where the bucket is stored. For example, us-east-1.

## secret-key()

|Type:|   string|
|Default:|           N/A|

*Description:* The `SECRET_KEY` of the service account used to access the S3 bucket. (Together with access-key().)

## storage-class()

|Type:|   string|
|Default:|           STANDARD|

*Description:* The storage class of the object, for example, REDUCED_REDUNDANCY. The following values are valid:

`DEEP_ARCHIVE`, `GLACIER`, `GLACIER_IR`, `INTELLIGENT_TIERING`, `ONEZONE_IA`, `OUTPOSTS`, `REDUCED_REDUNDANCY`, `SNOW`, `STANDARD`, `STANDARD_IA`

If an invalid value is configured, the default is used.

## template()

*Description:* The message as written to the Amazon S3 object. You can use templates and template functions to format the message.

## use_checksum()

|Accepted values:|   `when_supported`, `when_required`|
|Default:|           `when_supported`|

*Description:* This option allows users to change the default `when_supported` value to `when_required` for `S3` compatible solutions that do not support checksums.

## upload-threads()

|Type:|   integer|
|Default:|           8|

*Description:* The number of {{ site.product.short_name }} worker threads that are used to upload a single object to S3 from this destination, meaning the S3 destination uses a maximum of `max-pending-uploads() * upload-threads()` threads for uploading.

## url()

|Type:|   string|
|Default:|           N/A|

*Description:* The API endpoint URL of the S3 bucket. When used with Amazon AWS, the {{ site.product.short_name }} S3 destination automatically creates the service URL. It is recommended that you omit this option. This option is required only if the {{ site.product.short_name }} S3 driver is used in conjunction with third-party S3 service providers, such as MinIO or Google Cloud.

{% include doc/admin-guide/warnings/s3-dataloss-warning.md %}
