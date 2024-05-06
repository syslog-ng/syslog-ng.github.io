---
title: Flow control in syslog-ng OSE and the Kafka client
id: adm-dest-kafkac-flow
description: >-
    A syslog-ng OSE destination recognizes a message as sent when the
    message has been sent to the Kafka client, not when the Kafka server
    confirms its delivery.
---

If the Kafka client collects too many unsent messages, it will not
accept any more messages from syslog-ng OSE. The syslog-ng OSE
application detects this and stops sending messages to the Kafka client.
Also, syslog-ng OSE's flow control starts functioning in the direction
of the sources (for example, syslog-ng OSE will not read from the
sources in that specific logpath).

You can specify a "high water mark" limit for the Kafka client in the
properties-file().

For more information about how the C implementation of the kafka()
destination works with syslog-ng OSE, click [[here]].
