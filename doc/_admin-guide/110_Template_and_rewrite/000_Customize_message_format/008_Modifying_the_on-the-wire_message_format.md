---
title: Modifying the on-the-wire message format
id: adm-temp-modify-otw
description: >-
    Macros, templates, and template functions allow you to fully customize
    the format of the message. This flexibility makes it possible to use
    syslog-ng OSE in some unexpected way if needed, for example, to emulate
    simple, plain-text protocols. The following example shows you how to
    send LPUSH commands to a Redis server.
---

**NOTE:** The purpose of this example is to demonstrate the flexibility of
syslog-ng OSE. A dedicated Redis destination is available in syslog-ng
OSE version 3.5. For details, see
[[redis: Storing name-value pairs in Redis]].
{: .notice--info}

The following template is a valid LPUSH command in accordance with the
[Redis protocol](https://redis.io/topics/protocol/), and puts the
\$MESSAGE into a separate list for every \$PROGRAM:

```config
template t_redis_lpush {
    template("*3\r\n$$5\r\nLPUSH\r\n$$$(length ${PROGRAM})\r\n${PROGRAM}\r\n$$$(length ${MESSAGE})\r\n${MESSAGE}\r\n");
};
```

If you use this template in a network() destination, syslog-ng OSE
formats the message according to the template, and sends it to the Redis
server.

```config
destination d_redis_tcp {
    network("127.0.0.1" port(6379) template(t_redis_lpush));
};
```
