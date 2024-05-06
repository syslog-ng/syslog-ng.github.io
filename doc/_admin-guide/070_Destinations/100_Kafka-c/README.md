---
title: 'kafka-c(): Publishing messages to Apache Kafka using the
  librdkafka client (C implementation)'
short_title: kafka-c
id: adm-dest-kafkac
description: >-
  Starting with version 3.21, syslog-ng Open Source Edition (syslog-ng
  OSE) can directly publish log messages to the [Apache Kafka](http://kafka.apache.org)
  message bus, where subscribers can access them.
---

As of syslog-ng OSE version 3.21, the new C implementation of the kafka
destination is available. The new implementation uses the librdkafka
client and has several advantages, such as scalability, more efficient
memory usage and simpler setup. The options of this implementation are
compatible with those of the old Java implementation.

## Figure 11: How the C implementation of the kafka destination works with syslog-ng OSE

![]({{ adm_img_folder | append: 'fig-kafka-c-implementation.png'}})
