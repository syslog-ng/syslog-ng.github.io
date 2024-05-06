---
title: 'Amazon s3 options'
id: adm-opt-amazon
---

The following options are specific to the s3 destination.

### access-key()

|Type:|   string|
|Default:|           N/A|

*Description:* The `ACCESS_KEY` of the service account of the S3 bucket. (Used together with [[secret-key()]].)

### bucket()

|Type:|   string|
|Default:|           N/A|

*Description:* The name of the S3 bucket.
For example: `my-bucket`.

### canned-acl()

|Type:|   string|
|Default:|           N/A|

*Description:* The ACL assigned to the object, if specified, for example, `bucket-owner-read`. The following values are accepted:

`authenticated-read`, `aws-exec-read`, `bucket-owner-full-control`,
`bucket-owner-read`, `log-delivery-write`, `private`, `public-read`, `public-read-write`

If an invalid value is configured, the default is used.

### chunk-size()

|Type:|   string|
|Default:|           N/A|

*Description:* The size of log messages written by syslog-n OSE to the S3 object in a batch. If compression is enabled, the [[chunk-size()]] specifies the compressed size.

### compression()

|Type:|   boolean|
|Default:|           no|

*Description:* Setting compression to `yes` enables gzip compression, and implicitly adds a `.gz` suffix to the created object’s key. You can set the level of the compression using the [[compresslevel()]] option (`0-9`).

### compresslevel() 

|Type:|   integer|
|Default:|           0-9|

Description: Only has effect if [[compression()]] is set to `yes`. The level of the compression can be set using the [[compresslevel()]] option (`0-9`).


### flush-grace-period()

|Type:|   integer[minutes]|
|Default:|           60|

*Description:* After the grace period expires and no new messages are routed to the destination, syslog-ng OSE flushes the contents of the buffer to the S3 object even if the volume of the messages in the buffer is lower than [[chunk-size()]].

#{% include doc/admin-guide/options/log-fifo-size.md %}

### max-object-size()

|Type:|   number [GiB]|
|Default:|           5120GiB|

*Description:* The maximal size of the S3 object. If an object reaches this size, syslog-ng OSE appends an index suffix ("-1", “-2”, …) to the object key and starts a new object after rotation.

### max-pending-uploads()


|Type:|   integer|
|Default:|           32|

Description: The [[max-pending-uploads()]] and [[upload-threads()]] options configure the upload of the chunks. Uploading happens in multiple threads to minimize network overhead.

* upload-threads() limits the maximum number of parallel uploads.
* max-pending-uploads() limits the number of chunks that are waiting in the work queue of the upload threads to get uploaded

### object-key()

|Type:|   template|
|Default:|           N/A|

*Description:* The unique object key (or key name), which identifies the object in an Amazon S3 bucket.

### object-key-timestamp()

|Type:|   template|
|Default:|           N/A|

*Description:* The [[object-key-timestamp()]] option can be used to set a datetime-related template, which is appended to the end of the object, for example: "`${R_MONTH_ABBREV}${R_DAY}`". When a log message arrives with a newer timestamp template resolution, the previous timestamped object gets finished and a new one is started with the new timestamp. If an older message arrives, it does not reopen the old object, but starts a new object with the key having an index appended to the old object.

#{% include doc/admin-guide/options/persist-name.md %}

### region()

|Type:|   string|
|Default:|           N/A|


*Description:* The regional endpoint where the bucket is stored. For example, us-east-1.

### secret-key()

|Type:|   string|
|Default:|           N/A|

*Description:* The `SECRET_KEY` of the service account used to access the S3 bucket. (Together with access-key().)

### storage-class()

|Type:|   string|
|Default:|           STANDARD|

*Description:* The storage class of the object, for example, REDUCED_REDUNDANCY. The following values are valid:

`DEEP_ARCHIVE`, `GLACIER`, `GLACIER_IR`, `INTELLIGENT_TIERING`, `ONEZONE_IA`, `OUTPOSTS`, `REDUCED_REDUNDANCY`, `SNOW`, `STANDARD`, `STANDARD_IA`

If an invalid value is configured, the default is used.

### upload-threads()

|Type:|   integer|
|Default:|           8|

*Description:* The number of syslog-ng OSE worker threads that are used to upload data to S3 from this destination.

### template()

*Description:* The message as written to the Amazon S3 object. You can use templates and template functions to format the message.

### url()

|Type:|   string|
|Default:|           N/A|

*Description:* The URL of the S3 bucket, for example, `https://my-bucket.s3.us-west-2.amazonaws.com`.
