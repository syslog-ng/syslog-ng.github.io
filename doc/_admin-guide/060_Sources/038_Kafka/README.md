---
title: 'kafka(): Consuming messages from Apache Kafka using the librdkafka client'
short_title: kafka
id: adm-src-kafka
description: >-
  Starting with version 4.11, {{ site.product.name }} can directly fetch log messages from the Apache Kafka message bus.
---

The kafka() source can fetch messages from explicitly named or wildcard-matching Kafka topics, and from a single partition,
explicitly listed partitions, or all partitions of the selected topic(s). It can use two different strategies
— `assign` or `subscribe` — to start consuming messages from the selected partition(s).
The strategy is determined automatically based on the topic() option definitions and the strategy-hint() option.\
The basic rule is the following:

`subscribe` is used if the topic name contains characters that are not allowed in standard Kafka topic names
(in which case the topic name is treated as a regular expression), if the partition number is `-1`, or if the value
of strategy-hint() is `subscribe` (except when multiple partition numbers are provided for the
same topic name — this will raise an error).

`assign` (the default) is used if the topic name contains only valid Kafka topic characters (for example,
no regexp-related characters) and only positive partition numbers are specified.

## Basic startegy usage cross-reference of the different topic configuration cases

| topic(...) in config                                  | topic name(s)              | part. number(s) | strategy-hint() | resulting strategy |
|-------------------------------------------------------|----------------------------|-----------------|-----------------|--------------------|
| topic( "topic-name-1" => "1" }                        | topic-name-1               | 1               | assign          | assign             |
| topic( "topic-name-1" => "1" }                        | topic-name-1               | 1               | subscribe       | subscribe          |
| topic( "topic-name-1" => "1,2" }                      | topic-name-1               | 1-2             | assign          | assign             |
| topic( "topic-name-1" => "1,2" }                      | topic-name-1               | 1-2             | subscribe       | N/A (error)        |
| topic( "topic-name-1" => "1" "topic-name-1" => "2" }  | topic-name-1               | 1-2             | assign          | assign             |
| topic( "topic-name-1" => "1" "topic-name-1" => "2" }  | topic-name-1               | 1-2             | subscribe       | N/A (error)        |
| topic( "topic-name-1" => "1" "topic-name-3" => "2" }  | topic-name-1, topic-name-3 | 1, 2            | assign          | assign             |
| topic( "topic-name-1" => "1" "topic-name-3" => "2" }  | topic-name-1, topic-name-3 | 1, 2            | subscribe       | subscribe          |
| topic( "topic-name-1" => "-1" }                       | topic-name-1               | all             | assign          | subscribe          |
| topic( "topic-name-1" => "-1" }                       | topic-name-1               | all             | subscribe       | subscribe          |
| topic( "topic-name-1" => "1" "topic-name-3" => "-1" } | topic-name-1, topic-name-3 | 1, all          | assign          | subscribe          |
| topic( "topic-name-1" => "1" "topic-name-3" => "-1" } | topic-name-1, topic-name-3 | 1, all          | subscribe       | subscribe          |
| topic( "topic-name-3" => "1" "topic-name-3" => "-1" } | topic-name-1, topic-name-3 | 1, all          | assign          | subscribe          |
| topic( "topic-name-3" => "1" "topic-name-3" => "-1" } | topic-name-1, topic-name-3 | 1, all          | subscribe       | subscribe          |
| topic( "^topic-name-[13]$" => "2" }                   | topic-name-1, topic-name-3 | 2, 2            | assign          | subscribe          |
| topic( "^topic-name-[13]$" => "2" }                   | topic-name-1, topic-name-3 | 2, 2            | subscribe       | subscribe          |
| topic( "^topic-name-[13]$" => "-1" }                  | topic-name-1, topic-name-3 | all, all        | assign          | subscribe          |
| topic( "^topic-name-[13]$" => "-1" }                  | topic-name-1, topic-name-3 | all, all        | subscribe       | subscribe          |

## Why is it worth using dual consumer strategies?

Using both consumer strategies — `assign` and `subscribe` — provides the flexibility to adapt to a wide range of Kafka setups and practical use cases, instead of forcing a single approach that may not fit all scenarios.

- `assign` is ideal when full control and predictability are required.
  - You can explicitly target a known set of topics and partitions.
  - Guarantees ordering semantics more reliably in single-partition or controlled multi-partition scenarios.
  - Works well in environments where the topic layout is static and predefined.

- `subscribe` is valuable when flexibility matters more than strict control.
  - It supports regular expressions, making it suitable when topic names follow patterns or when topics may appear dynamically.
  - It automatically handles partition assignments inside a consumer group, reducing configuration overhead.
  - It integrates better with scaling scenarios or when consumers should share workload automatically.
  - The possible drawbacks of unordered and/or repeated messages are acceptable.

By supporting both approaches, {{ site.product.short_name }} can be used effectively in a variety of Kafka consumption models — from tightly controlled, partition-specific pipelines to dynamic and scalable consumer setups that evolve with the broker configuration.

## Bookmarking in the kafka() source

Where to store the information about the latest consumed Kafka partition offsets can be controlled via the persist-store() option. By default, {{ site.product.short_name }} stores the offset of the last read message of each topic and partition it consumes in its own persist file. Storing this information altogether can be disabled using the disable-bookmarks() option. Automatic offset restoration takes effect at startup or reload, based on the saved offset value and the ignore-saved-bookmarks() and read-old-records() settings. If ignore-saved-bookmarks() is set to `yes`, it will not use the saved offset. Instead, if read-old-records() is set to `yes`, it will start fetching from the oldest available message; otherwise, it will start from the newest one.

In most cases, you will want to use the `local` storage option, but you can also store the bookmarks remotely on the Kafka side partitions by setting the persist-store() option to `remote`. The only case where using remote-side storage is worth it is when you have multiple kafka() clients consuming the same partitions and using the same consumer group `group.id` in your config(). In this case, you **must use** `remote`; otherwise, you risk data loss and significant message duplication. For all other cases, use the `local` storage option instead.

Usage examples:

| resulting strategy | persist-store() | config( "group.id" ... )                                                          | notes |
|--------------------|-----------------|-----------------------------------------------------------------------------------|-|
| assign             | local           | not used                                                                          | |
| assign             | remote          | used for remote Kafka offset restoration, auto-generated if empty                 | even if clients use the same "group.id", they are isolated and will NOT participate in Kafka rebalancing |
| subscribe          | local           | not used and will be overridden if not empty                                      | because of the `local` offset storage option, the user-provided "group.id" will be replaced by a self-generated one to prevent clients with the same "group.id" from participating in Kafka rebalancing; otherwise, inconsistent offsets might be provided by the Kafka broker |
| subscribe          | remote          | used for remote Kafka offset restoration and rebalancing, auto-generated if empty | clients with the same "group.id" will participate in Kafka rebalancing |

For more details about Kafka consumer types and rebalancing, refer to the librdkafka documentation.

## Multiple workers in the kafka() source

The kafka() source can fetch and process messages from the fafka broker using multiple workers(), by default 2 of them:

{% include doc/admin-guide/options/kafka-source-workers.md %}
