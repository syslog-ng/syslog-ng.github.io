---
title: afmongodb
description: >-
  The afmongodb module has only one driver, that is the mongodb() destination
  driver. The mongodb() driver sends messages to a MongoDB database.
id: dev-macos-mod-sup-afmongodb
---

### Important Information

The syslog-ng OSE mongodb() driver is compatible with MongoDB server version 1.4 and newer. Using mongo() without any parameters uses the following default values:

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

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### Testing

From the default values, we can see that mongodb() driver sends the messages to a database named syslog, so to test this driver we first need to set up mongodb to receive these messages. \
\
To do so,

* Install MongoDB
* Create a database called syslog by entering the command:
  * `mongosh syslog`
* Set up the database like so:
  * `db.createCollection( "messages", { capped: true, size: 100000000 } )`
* Once the messages have been transmitted, to view us:
  * `db.messages.find().pretty()`

#### Configuration file used

```config
@version: 3.31
@include "scl.conf"

source custom
{
    example-msg-generator(
        num(50)
        freq(2)
        template("Random Message")
    );
};

destination d_mongodb {
    mongodb();
};

log {
    source(custom);
    destination(d_mongodb);
};
```

#### Proof

![Testing mongodb() driver on macOS (x86)]({{dev_img_folder}}/module-support/Screenshot 2021-06-20 at 10.56.21 PM.png)

![Testing mongodb() driver on macOS (ARM)]({{dev_img_folder}}/module-support/Screen Shot 2021-08-21 at 7.10.16 PM.png)
