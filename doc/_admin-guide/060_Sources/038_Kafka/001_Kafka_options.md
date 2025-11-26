---
title: "Options of the kafka() source"
id: adm-src-kafka-opt
description: >-
    This section describes the options of the kafka() source in {{ site.product.short_name }}.
---

The kafka() source of {{ site.product.short_name }} can directly consume log messages from the Apache Kafka message bus. The source has the following options.

## Required options

To use the kafka() source, the following two options are required: bootstrap-servers() and topic().

{% include doc/admin-guide/options/bootstrap-servers.md %}

{% include doc/admin-guide/options/config-kafka.md kafka_type='consumer' type='source' protected_options='`bootstrap.servers` `metadata.broker.list` `enable.auto.offset.store` `auto.offset.reset` `enable.auto.commit` `auto.commit.enable`' %}

{% include doc/admin-guide/options/disable-bookmarks.md %}
See Bookmarking in the kafka() source for more details.

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/ignore-saved-bookmarks.md %} (depending on the setting of the read-old-records() option.\
See Bookmarking in the kafka() source for more details.

{% include doc/admin-guide/options/kafka-logging.md %}

## log-fetch-limit()

| Type:   | integer |
| Default:| 10000 |

*Description:* Specifies the maximum number of messages the main worker will consume and queue from the Kafka broker. This effectively determines the size of the internally used Kafka message queue. If the limit is reached, the kafka() source stops fetching messages from the broker, logs the situation, and waits the amount of time specified by fetch-queue-full-delay() before attempting to fetch new data again.

**NOTE:** If more than 2 workers are configured and separated-worker-queues() is set to `yes`, then all processor workers share this total queue size.  
For example, with `workers(3)` and `fetch-limit(100000)`, the 2 processor workers (remember, the first of the configured 3 is always the main worker) will each receive their own queue, and neither queue will grow beyond 50,000 messages.
{: .notice--info}

**NOTE:** This options worth align with the kafka config options `queued.min.messages` and `queued.max.messages.kbytes`, For details, refer to the librdkafka documentation.
{: .notice--info}

## log-fetch-delay()

| Type:   | integer [1 second / fetch_retry_delay * 1000000 milliseconds] |
| Default:| 1000 (1 millisecond) |

*Description:* Specifies the time the main worker will wait between attempts to fetch new data.

## log-fetch-retry-delay()

| Type:   | integer [1 second / fetch_retry_delay * 1000000 milliseconds] |
| Default:| 10000 (10 milliseconds)|

*Description:* Specifies the time the main worker will wait before attempting to fetch new data again when the broker signals no more data is available.

## log-fetch-queue-full-delay()

| Type:   | integer in milliseconds |
| Default:| 1000 |

*Description:* When the main worker reaches the queued message limit defined by fetch-limit(), the kafka() source temporarily stops retrieving messages from the broker. It then waits for the duration specified by `fetch-queue-full-delay()` before attempting to fetch additional messages.

{% include doc/admin-guide/options/persist-name.md %}

## persist-store()

| Accepted values: | local \| remote |
| Default:         | local |

*Description:* Specifies where {{ site.product.short_name }} stores the offset of the last consumed Kafka message. `local` means it uses the default {{ site.product.short_name }} persist file, while `remote` means it uses the remote Kafka offset store.

For more details, see Bookmarking in the kafka() source.

## poll-timeout()

| Type:   | integer in milliseconds |
| Default:| 10000 |

*Description:* Specifies the maximum amount of time {{ site.product.short_name }} waits during a Kafka broker poll request for new messages to become available.

{% include doc/admin-guide/options/read-old-records.md %}\
See Bookmarking in the kafka() source for more details.

## single-worker-queue()

| Type:   | yes \| no |
| Default:| yes |

*Description:* When the value of workers() is greater than 2 (meaning multiple processor threads are used to handle queued messages), and `single-worker-queue()` is set to `no`, the main worker of the kafka() source distributes the consumed messages into separate queues, one for each processor worker.

**NOTE:** This approach can improve performance, especially in high-throughput scenarios, but may also lead to significantly increased memory usage.
{: .notice--info}

## state-update-timeout()

| Type:   | integer in milliseconds |
| Default:| 1000 |

*Description:* Specifies the maximum amount of time {{ site.product.short_name }} waits during Kafka broker state queries or other requests, such as metadata queries, partition offset queries/seeking, etc.

## store-metadata()

| Type:   | yes \| no |
| Default:| no |

*Description:* If set to `yes`, {{ site.product.short_name }} will add the next key-value pairs to the forwarded log messages

+ `.kafka.topic` => the name of the topic the message came from
+ `.kafka.partition` => the partition of the topic
+ `.kafka.offset` => the offset of the message in the partition
+ `.kafka.key` => the partition key

## strategy-hint()

| Accepted values: | assign, subscribe |
| Default:         | assign |

*Description:* This option provides a hint about which Kafka consumer strategy the kafka() source should use when the topic() list contains topic/partition definitions that could be handled in either way.

Why is it worth using dual consumer strategies? describes the differences between the two.

For details on how the resulting topic names, partitions, and Kafka assign/subscribe strategies are determined in different scenarios, see the Basic strategy usage cross-reference of the different topic configuration cases ; for information on how the resulting strategy participates in offset storing and bookmarking, refer to Bookmarking in the kafka() source.

## time-reopen()

| Type:   | integer in seconds |
| Default:| 60 |

*Description:* The time {{ site.product.short_name }} waits between attempts to recover from errors that require re-initialization of the full kafka connection and its internally used data structures.

## topic()

| Type:     |  key-value pairs |
| Default:  |  N/A |
| Mandatory:|  yes |

*Description:* A list of pairs consisting of Kafka topic name(s) and partition number(s) from which messages are consumed, for example:

``` config
topic( 
  "^topic-name-[13]$" => "-1"
  "topic-name-2" => "1"
  "topic-name-4" => "-1"
  "topic-name-5" => "0,1,4"
} 
```

Valid topic names have the following limitations:

+ The topic name must either contain only characters matching the pattern `[-._a-zA-Z0-9]`, or it can be a regular expression.  
  For example: `^topic-name-[13]$` (which expands to `topic-name-1` and `topic-name-3`).
+ The length of the topic name must be between 1 and 249 characters.

The partition number must be:

+ either a single partition number or a comma-separated list of partition numbers
+ a positive integer, or `-1`, which means all partitions of the topic

For details about how the resulting topic names, partitions, and Kafka assign/subscribe strategies are determined in different scenarios, see Basic startegy usage cross-reference of the different topic configuration cases and Why is it worth using dual consumer strategies?

## workers()

| Type:   | integer |
| Default:| 2 |

*Description:* The number of workers the kafka() source uses to consume and process messages from the kafka broker. By default, uses two of them:

{% include doc/admin-guide/options/kafka-source-workers.md %}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Only kafka() sources with `workers()` set to less than 3 can guarantee ordered message forwarding.
{: .notice--warning}

**NOTE:** Kafka clients have their own threadpool, entirely independent from
any {{ site.product.short_name }} settings. The `workers()` option has no effect on this threadpool.
{: .notice--info}
