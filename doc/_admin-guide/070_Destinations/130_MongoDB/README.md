---
title: 'mongodb(): Storing messages in a MongoDB database'
short_title: mongodb
id: adm-dest-mongodb
description: >-
    The mongodb() driver sends messages to a
    [MongoDB](https://www.mongodb.com/) database. MongoDB is a schema-free,
    document-oriented database. For the list of available optional
    parameters, see [[mongodb() destination options]].
---

**Declaration**

```config
mongodb(parameters);
```

The mongodb() driver does not support creating indexes, as that can be a
very complex operation in MongoDB. If needed, the administrator of the
MongoDB database must ensure that indexes are created on the
collections.

The mongodb() driver does not add the _id field to the message: the
MongoDB server will do that automatically, if none is present. If you
want to override this field from syslog-ng OSE, use the key() parameter
of the value-pairs() option.

The syslog-ng OSE mongodb() driver is compatible with MongoDB server
version 1.4 and newer.

**NOTE:** Prior to version 4.0, syslog-ng OSE handled all data as strings, and allowed the strings to be converted into other types of data that only data formats of certain destinations supported.
In syslog-ng OSE 4.0 and later versions, each name-value pair is a (name, type, value) triplet, and several components of syslog-ng OSE 4.0 support this format. For details, see [Specifying data types in value-pairs](./000_Specifying_data_types.md).
{: .notice--info}

**NOTE:** By default, syslog-ng OSE handles every message field as a string.
For details on how to send selected fields as other types of data (for
example, handle the PID as a number), see
[[Specifying data types in value-pairs]].
{: .notice--info}

### Example: Using the mongodb() driver

The following example creates a mongodb() destination using only default
values.

```config
destination d_mongodb {
    mongodb();
};
```

The following example displays the default values.

```config
destination d_mongodb {
    mongodb(
        uri("mongodb://localhost:27017/syslog")
        collection("messages")
        value-pairs(
            scope("selected-macros" "nv-pairs" "sdata")
        )
    );
};
```

The following example shows the same setup using the deprecated
libmongo-client syntax, and is equivalent with the previous example.

```config
destination d_mongodb {
    mongodb(
        servers("localhost:27017")
        database("syslog")
        collection("messages")
        value-pairs(
            scope("selected-macros" "nv-pairs" "sdata")
        )
    );
};
```
