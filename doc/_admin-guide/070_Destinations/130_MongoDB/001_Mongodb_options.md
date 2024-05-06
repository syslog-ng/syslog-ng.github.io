---
title: mongodb() destination options
id: adm-dest-mongodb-opt
---

The mongodb() driver sends messages to a MongoDB database. MongoDB is a
schema-free, document-oriented database.

The mongodb() destination has the following options:

## bulk()

|Type:|      yes \| no|
|Default: |  yes|

*Description:* Toggles bulk insertion, setting to **no** forces the old
behavior (each log is inserted one by one into the MongoDB).

NOTE: Bulk sending is only efficient if the used collection is constant
(e.g. not using templates) or the used template does not lead to too
many collections switching within a reasonable time range.
{: .notice--info}

## bulk_unordered()

|Type: |     yes \| no|
|Default: |  no|

*Description:* Toggles unordered bulk operations.

## bulk_bypass_validation()

|Type:|     yes \| no|
|Default:  | no|

*Description:* Toggles MongoDB bulk operation validation.

## collection()

|Type:|string|
|Default:  | messages|

*Description:* The name of the MongoDB collection where the log messages
are stored (collections are similar to SQL tables). The collection()
option supports template functions and macros as well.

### Example: using the mongodb() destination with a template embedded in the collection() option

Using the following example configuration, the mongodb() destination
sends incoming messages into separate MongoDB collections (for example,
localhost_messages and anotherhost_messages) based on the HOST field
of the message :

```config
mongodb(
  uri("mongodb://host/syslog?wtimeoutMS=10000&socketTimeoutMS=10000&connectTimeoutMS=10000&serverSelectionTimeoutMS=5000")
  collection("${HOST}_messages")
  workers(8)
);
```

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Hazard of data loss! The syslog-ng OSE application does not verify that
the specified collection name does not contain invalid characters. If
you specify a collection with an invalid name, the log messages sent to
the MongoDB database will be irrevocably lost without any warning.
{: .notice--danger}

For MongoDB operations, syslog-ng OSE uses a one-minute timeout: if an
operation times out, syslog-ng OSE assumes the operation has failed.

## uri()

|Type: |     string|
|Default: |  mongodb://127.0.0.1:27017/syslog?wtimeoutMS=60000&socketTimeoutMS=60000&connectTimeoutMS=60000|

*Description:* Refer to the [MongoDB URI format documentation]
(https://docs.mongodb.com/manual/reference/connection-string/) for detailed syntax.

{% include doc/admin-guide/options/value-pairs-short.md %}

{% include doc/admin-guide/options/workers.md %}

## write_concern()

|Accepted values: |  unacked \| acked \| majority \| a number greater than 0|
|Default:        |   acked|

*Description:* Sets write concern mode of MongoDB operations, both bulk and single.
