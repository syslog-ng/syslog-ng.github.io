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

### batch-size()

| Type:    | integer |
| Default: | 0       |

*Description:* Defines how many consecutive messages each input thread assigns to a single `parallelize()` worker.\
This preserves ordering for those messages on the output side and can also improve the performance of `parallelize()`.\
A value around 100 is recommended.

### workers()

| Type:    | integer |
| Default: | 1       |

*Description:* Specifies the number of worker threads (at least 1) that
{{ site.product.short_name }} uses to process incoming messages. Increasing the number of worker threads can significantly improve message-processing performance by distributing the load across all CPU cores; however, depending on the selected partitioning strategy, message ordering may be lost, even if all messages originate from a single sender.

{% include doc/admin-guide/options/deprecated-options.md old='partitions()' new='workers()' %}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Setting an excessively high worker count can degrade performance due to increased CPU context switching, memory overhead, and resource contention. Start with a maximum value around half the number of available CPU cores, then increase it gradually while monitoring system and {{ site.product.short_name }} performance. Values significantly higher than the CPU core count rarely provide additional benefits and may even reduce overall throughput.
{: .notice--warning}

### worker-partition-key()

| Type:    | template |
| Default: |          |

*Description:* Specifies a template used for partitioning. Messages that expand the template to the same value are assigned to the same partition.

For more details, see Parallelizing message processing.

{% include doc/admin-guide/options/deprecated-options.md old='partition_key()' new='worker-partition-key()' %}
