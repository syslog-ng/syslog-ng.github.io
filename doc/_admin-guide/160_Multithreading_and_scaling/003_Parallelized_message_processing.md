---
title: Parallelizing message processing
id: adm-parallelize
description: >-
    By default, {{ site.product.short_name }} handles log messages from each connection sequentially to preserve message order and ensure efficient per-message CPU usage, which scales well with many parallel connections but can become a bottleneck when only a few connections generate a high volume of messages. The parallelize() log path element distributes messages from a single connection across multiple worker threads (partitions), eliminating the single-threaded bottleneck of sequential processing by fanning out message handling to a configurable number of workers (partitions).
---

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
When using the parallelize() method, the incoming load can be fully distributed across all CPU cores; however, depending on the chosen partitioning strategy, message ordering may be lost, even if all messages originate from a single sender.
{: .notice--warning}

## Partitioning strategies

parallelize() uses round-robin to allocate messages to workers (partitions) by default, which evenly distributes the load across all workers. However, you can use the worker-partition-key() option to preserve message ordering for related messages by routing all messages that expand the template to the same value to the same worker partition. The worker-partition-key() option specifies a template: messages with the same key value are always mapped to the same partition. For example, you can partition messages based on their sender host, the program that generated the message, etc. Note that using worker-partition-key() may result in uneven load distribution if key values are not balanced.

### Partitioning strategy examples

Round-robin across 4 partitions:

```config
log {
    source { tcp(port(514) max-connections(10)); };
    parallelize(workers(4));
    # From this point on, messages are processed in parallel even if
    # messages originate from a single connection    
    destination { file("/var/log/messages"); };
};
```

Key-based routing (same host always goes to same partition):

```config
log {
    source { tcp(port(514) max-connections(10)); };
    parallelize(workers(8) worker-partition-key("${HOST}"));
    # From this point forward, message processing is parallelized based on the
    # $HOST value. Messages with different $HOST values are handled concurrently,
    # while messages sharing the same $HOST are routed to the same partition and
    # processed sequentially.
    parser {...};
    destination { opensearch(...); };
};
```

Key-based routing by program name:

```config
log {
    source { tcp(port(514) max-connections(10)); };
    parallelize(workers(4) worker-partition-key("${PROGRAM}"));
    # From this point forward, message processing is parallelized based on the
    # $PROGRAM value. Messages with different $PROGRAM values are handled concurrently,
    # while messages sharing the same $PROGRAM are routed to the same partition and
    # processed sequentially.
    parser {...};
    destination { file("/var/log/$PROGRAM.log"); };
};
```
