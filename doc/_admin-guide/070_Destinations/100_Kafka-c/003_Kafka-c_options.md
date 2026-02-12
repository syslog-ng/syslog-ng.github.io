---
title: "Options of the kafka() destination"
id: adm-dest-kafkac-opt
description: >-
    This section describes the options of the kafka() destination in {{ site.product.short_name }}.
---

The kafka() destination of {{ site.product.short_name }} can
directly publish log messages to the Apache Kafka message bus, where subscribers can access them. The destination has the following options.

**NOTE:** `kafka()` and `kafka-c()` is now interchangable as the first one is just an alias of the latter
{: .notice--info}

## Required options

To use the kafka() destination, the following two options are required: `bootstrap-servers()` and `topic()`. Both must appear at the beginning of your {{ site.product.short_name }} configuration.

You can specify multiple, comma-separated addresses, demonstrated in the following example:

```config
bootstrap-servers("127.0.0.1:2525,remote-server-hostname:6464")
```

{% include doc/admin-guide/options/batch-lines.md %}

**NOTE:** The {{ site.product.short_name }} configuration accepts this option with
sync-send() set to both "yes" or "no", but the option will only take
effect if you set sync-send() to "yes".
{: .notice--info}

**NOTE:** If you set sync-send() to "yes", the number you specify for
batch-lines() affects how many messages {{ site.product.short_name }} packs into once
transaction.
{: .notice--info}

{% include doc/admin-guide/options/batch-timeout.md %}

**NOTE:** The {{ site.product.short_name }} configuration accepts this option with
sync-send() set to both "yes" or "no", but the option will only take
effect if you set sync-send() to "yes".
{: .notice--info}

**NOTE:** When setting batch-timeout(), consider the value of the
transaction.timeout.ms Kafka property. If in case of timeout (that is,
if {{ site.product.short_name }} does not receive batch-lines() amount of messages) the
value of batch-timeout() exceeds the value of transaction.timeout.ms,
{{ site.product.short_name }} will not send out messages in time.
{: .notice--info}

For more information about the default values of the
transaction.timeout.ms Kafka property, see the librdkafka
documentation.

## bootstrap-servers()

|  Type:|      string|
  |Default:|   |

*Description:* Specifies the hostname or IP address of the Kafka server.
When specifying an IP address, IPv4 (for example, 192.168.0.1) or IPv6
(for example, \[::1\]) can be used as well. Use a colon (**:**) after
the address to specify the port number of the server. When specifying
multiple addresses, use a comma to separate the addresses, for example,
bootstrap-servers(\"127.0.0.1:2525,remote-server-hostname:6464\")

For the kafka destination, include the path to the directory where you
copied the required libraries (see [[Prerequisites|adm-dest-hdfs-pre]]), for example,
**client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/KafkaDestination.jar:/usr/share/kafka/lib/*.jar")**.

**NOTE:** Unlike in the Java implementation, the client-lib-dir() option has
no significant role in the C implementation of the kafka() destination.
The programming language accepts this option for better compatibility.
{: .notice--info}


## config()

|  Type:|      |
  |Default:|   |

*Description:* You can use this option to set the properties of the kafka producer.

The {{ site.product.short_name }} kafka destination supports all properties of the
official Kafka producer. For details, see the librdkafka documentation.

The syntax of the config() option is the following:

```config
config( 
  “key1” => “value1” 
  “key2” => “value2” 
)
```

{% include doc/admin-guide/options/disk-buffer.md %}

## fallback-topic()

|  Type:|      string|
  |Default:|   N/A|

*Description:* If the resolved `topic()` template is not a valid Kafka topic , {{ site.product.short_name }} will use `fallback-topic()` to send messages.

**NOTE:** If instead of strings, you use actual templates (that is, a macro like `${MESSAGE}`, or a template function like `$(format-json)`) in the `topic()` option, configuring the `fallback-topic()` option is required.
{: .notice--info}

{% include doc/admin-guide/options/frac-digits.md %}

## flush-timeout-on-reload()

|  Type:|      integer in msec|
  |Default:|   1000|

*Description:* When {{ site.product.short_name }} reloads, the Kafka client will also
reload. The flush-timeout-on-reload() option specifies the number of
milliseconds {{ site.product.short_name }} waits for the Kafka client to send the unsent
messages. The unsent messages will be retained in syslog-ng\'s own queue
and {{ site.product.short_name }} will continue sending them after reload. This works
without disk-buffering, too.

## flush-timeout-on-shutdown()

|  Type:|      integer in msec|
  |Default:|   60000|

*Description:* When {{ site.product.short_name }} shuts down, the Kafka client will also
shut down. The flush-timeout-on-shutdown() option specifies the number
of milliseconds {{ site.product.short_name }} waits for the Kafka client to send the unsent
messages. Any messages not sent after the specified time will be lost.
To avoid losing messages, we recommend you use the disk-buffer option.

{% include doc/admin-guide/options/hook.md %}

## key()

|  Type:|      template|
  |Default:|   empty string|

*Description:* The key of the partition under which the message is
published. You can use templates to change the topic dynamically based
on the source or the content of the message, for example,
key(\"${PROGRAM}\").

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/local-time-zone.md %}

## message()

|  Type:|      message template|
  |Default:|   ${ISODATE} ${HOST} ${MSGHDR}${MSG}\\n|

*Description:* The message as published to Apache Kafka. You can use
templates and template functions (for example, format-json()) to format
the message, for example, template(\"$(format-json \--scope rfc5424
\--exclude DATE \--key ISODATE)\").

For details on formatting messages in JSON format, see
[[format-json|adm-temp-func#format-json]].

{% include doc/admin-guide/options/on-error.md %}

{% include doc/admin-guide/options/persist-name.md %}

## poll-timeout()

|  Type:|      integer in msec|
  |Default:|   1000|

*Description:* Specifies the frequency your {{ site.product.short_name }} queries the Kafka
client about the amount of messages sent since the last poll-timeout ().
In case of multithreading, the first {{ site.product.short_name }} worker is responsible for
poll-timeout().

{% include doc/admin-guide/options/retries.md %}

{% include doc/admin-guide/options/send-time-zone.md %}

## sync-send()

|  Type:|      yes \| no|
  |Default:|   no|

*Description:* When sync-send is set to **yes**, {{ site.product.short_name }} sends
the message reliably: it sends a message to the Kafka server, then waits
for a reply. In case of failure, {{ site.product.short_name }} repeats sending the
message, as set in the retries() parameter. If sending the message fails
for retries() times, {{ site.product.short_name }} drops the message.

This method ensures reliable message transfer, but is very slow.

When sync-send() is set to **no**, {{ site.product.short_name }} sends messages
asynchronously, and receives the response asynchronously. In case of a
problem, {{ site.product.short_name }} cannot resend the messages.

This method is fast, but the transfer is not reliable. Several thousands
of messages can be lost before {{ site.product.short_name }} recognizes the error.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Hazard of data loss! If sync-send() is set to "no", the messages passed
to the Kafka client can be lost. To avoid data loss, One Identity
recommends that you set sync-send() to "yes", as this setting
delivers messages to the Kafka client more reliably.
{: .notice--danger}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-zone.md %}

## time-reopen()

|  Type:|      number (seconds)|
  |Default:|   60|

*Description:* This is an optional parameter. If message delivery fails, {{ site.product.short_name }} retries sending the messages for `retries()` time (3 times by default) before waiting for `time-reopen()` time to try sending it again.

## topic()

|  Type:|      string|
  |Default:|   N/A|

*Description:* The Kafka topic under which the message is published. You can use
templates to change the topic dynamically based on the source or the content of
the message, for example, topic("${HOST}").

>**NOTE:** Valid topic names for the topic() and fallback-topic() options have the following limitations:
>
>The topic name must contain characters within the pattern \[-._a-zA-Z0-9\].
>
>The length of the topic name must be between 1 and 249 characters.
>
{: .notice--info}

**NOTE:** If you use templates with the topic() option, configuring the
fallback-topic() option is also required.
{: .notice--info}

{% include doc/admin-guide/options/ts-format.md %}

{% include doc/admin-guide/options/workers.md %}

**NOTE:** The workers are only responsible for formatting the
messages that need to be delivered to the Kafka clients. Configure this
option only if your Kafka clients have many threads and they do not
receive enough messages.
{: .notice--info}

**NOTE:** Kafka clients have their own threadpool, entirely independent from
any {{ site.product.short_name }} settings. The workers() option has no effect on this
threadpool.
{: .notice--info}
