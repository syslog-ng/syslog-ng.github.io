---
title: Flow control in {{ site.product.short_name }} and the Kafka client
id: adm-dest-kafkac-flow
description: >-
    A {{ site.product.short_name }} destination recognizes a message as sent when the
    message has been sent to the Kafka client, not when the Kafka server
    confirms its delivery.
---

If the Kafka client collects too many unsent messages, it will not
accept any more messages from {{ site.product.short_name }}. The {{ site.product.short_name }}
application detects this and stops sending messages to the Kafka client.
Also, {{ site.product.short_name }}'s flow control starts functioning in the direction
of the sources (for example, {{ site.product.short_name }} will not read from the
sources in that specific logpath).

You can specify a "high water mark" limit for the Kafka client in the
properties-file().

For more information about how the C implementation of the kafka()
destination works with {{ site.product.short_name }}, click [[here|adm-dest-kafkac]].
