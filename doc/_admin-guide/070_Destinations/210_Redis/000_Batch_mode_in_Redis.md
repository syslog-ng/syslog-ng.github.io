---
title: Batch mode and load balancing with Redis
id: adm-dest-redis-batch
description: >-
    Starting with version 3.34, you can send multiple log messages with the
    help of Redis's pipelining feature.
---

{% include doc/admin-guide/batch-size.md %}

### Example: Redis batch mode

The following destination sends log messages to a Redis server using the
pipelining feature. A batch consists of **100** messages and is sent
every **10** seconds (**10000** milliseconds) if there is less than
**100** messages are in the queue.

```config
destination d_redis {
    redis(
        host("localhost")
        port(6379)
        command("HINCRBY", "hosts", "${HOST}", "1")
        batch-lines(100)
        batch-timeout(10000)
        log-fifo-size(100000)
    );
};
```
