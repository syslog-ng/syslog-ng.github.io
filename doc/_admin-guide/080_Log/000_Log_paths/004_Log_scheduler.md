---
title: Log scheduler
id: adm-log-scheduler
description: >-
    The log scheduler of the log path is responsible for how message processing
    is distributed among internal workers (partitions).
---

## Options of the log scheduler

## parallelize()

| Type:    | string |
| Default: |        |

*Description:* The `parallelize()` log path element distributes messages from a single, linear source across multiple worker threads (partitions), removing the single-threaded bottleneck of sequential processing by fanning out message handling to a configurable number of workers (partitions).

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
When using the `parallelize()` method, the incoming load can be fully distributed across all CPU cores; however, depending on the chosen partitioning strategy, message ordering may be lost, even if all messages originate from a single sender.
{: .notice--warning}

`parallelize()` has the following sub-options:

### workers()

| Type:    | integer |
| Default: | 1     |

*Description:* Specifies the number of worker threads (at least 1) that
{{ site.product.short_name }} uses to process incoming messages. Increasing the number of worker threads can significantly improve message-processing performance by distributing the load across all CPU cores; however, depending on the selected partitioning strategy, message ordering may be lost, even if all messages originate from a single sender.

### worker-partition-key()

| Type:    | template |
| Default: |          |

*Description:* Specifies a template used for partitioning. Messages that expand the template to the same value are assigned to the same partition.

For more details, see Parallelizing message processing.
