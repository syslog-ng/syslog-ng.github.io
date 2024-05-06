---
title: "Options of the kafka() destination's C implementation"
id: adm-dest-kafkac-opt
---

The C implementation of the kafka() destination of syslog-ng OSE can
directly publish log messages to the [Apache
Kafka](http://kafka.apache.org) message bus, where subscribers can
access them. The C implementation of the kafka() destination has the
following options.

## Required options

The following options are required: bootstrap-servers(), topic(). Note
that to use the C implementation of the kafka() destination, you must
add the following lines to the beginning of your syslog-ng OSE
configuration:

```config
@define kafka-implementation kafka-c
```

{% include doc/admin-guide/notes/kafka-c.md %}

{% include doc/admin-guide/options/batch-lines.md %}

**NOTE:** The syslog-ng OSE configuration accepts this option with
sync-send() set to both "yes" or "no", but the option will only take
effect if you set sync-send() to "yes".
{: .notice--info}

**NOTE:** If you set sync-send() to "yes", the number you specify for
batch-lines() affects how many messages syslog-ng OSE packs into once
transaction.
{: .notice--info}

{% include doc/admin-guide/options/batch-timeout.md %}

**NOTE:** The syslog-ng OSE configuration accepts this option with
sync-send() set to both "yes" or "no", but the option will only take
effect if you set sync-send() to "yes".
{: .notice--info}

**NOTE:** When setting batch-timeout(), consider the value of the
transaction.timeout.ms Kafka property. If in case of timeout (that is,
if syslog-ng OSE does not receive batch-lines() amount of messages) the
value of batch-timeout() exceeds the value of transaction.timeout.ms,
syslog-ng OSE will not send out messages in time.
{: .notice--info}

For more information about the default values of the
transaction.timeout.ms Kafka property, see [the librdkafka
documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md).

## bootstrap-servers()

|  Type:|      string|
  |Default:|   |

*Description:* Specifies the hostname or IP address of the Kafka server.
When specifying an IP address, IPv4 (for example, 192.168.0.1) or IPv6
(for example, \[::1\]) can be used as well. Use a colon (**:**) after
the address to specify the port number of the server. When specifying
multiple addresses, use a comma to separate the addresses, for example,
bootstrap-servers(\"127.0.0.1:2525,remote-server-hostname:6464\")

{% include doc/admin-guide/options/client-lib-dir.md %}

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

*Description:* You can use this option to expand or override the options
of the properties-file().

{% include doc/admin-guide/notes/kafka-c.md %}

The syslog-ng OSE kafka destination supports all properties of the
official Kafka producer. For details, see [the librdkafka
documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md).

The syntax of the config() option is the following:

```config
config( 
  “key1” => “value1” 
  “key2” => “value2” 
)
```

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/frac-digits.md %}

## flush-timeout-on-reload()

|  Type:|      integer in msec|
  |Default:|   1000|

*Description:* When syslog-ng reloads, the Kafka client will also
reload. The flush-timeout-on-reload() option specifies the number of
milliseconds syslog-ng waits for the Kafka client to send the unsent
messages. The unsent messages will be retained in syslog-ng\'s own queue
and syslog-ng will continue sending them after reload. This works
without disk-buffering, too.

## flush-timeout-on-shutdown()

|  Type:|      integer in msec|
  |Default:|   60000|

*Description:* When syslog-ng shuts down, the Kafka client will also
shut down. The flush-timeout-on-shutdown() option specifies the number
of milliseconds syslog-ng waits for the Kafka client to send the unsent
messages. Any messages not sent after the specified time will be lost.
To avoid losing messages, we recommend you use the disk-buffer option.

{% include doc/admin-guide/options/hook.md %}

## key()

|  Type:|      template|
  |Default:|   empty string|

*Description:* The key of the partition under which the message is
published. You can use templates to change the topic dynamically based
on the source or the content of the message, for example,
key(\"\${PROGRAM}\").

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/local-time-zone.md %}

{% include doc/admin-guide/options/on-error.md %}

{% include doc/admin-guide/options/persist-name.md %}

## poll-timeout()

|  Type:|      integer in msec|
  |Default:|   1000|

*Description:* Specifies the frequency your syslog-ng queries the Kafka
client about the amount of messages sent since the last poll-timeout ().
In case of multithreading, the first syslog-ng worker is responsible for
poll-timeout().

## properties-file()

|  Type:|      string (absolute path)|
  |Default:|   N/A|

*Description:* The absolute path and filename of the Kafka properties
file to load. For example,
properties-file(\"/opt/syslog-ng/etc/kafka_dest.properties\"). The
syslog-ng OSE application reads this file and passes the properties to
the Kafka Producer.

The syslog-ng OSE kafka destination supports all properties of the
official Kafka producer. For details, see [the librdkafka
documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md).

The bootstrap-servers option is translated to the bootstrap.servers
property.

For example, the following properties file defines the acknowledgment
method and compression:

```config
acks=all
compression.type=snappy.
```

{% include doc/admin-guide/notes/kafka-c.md %}

{% include doc/admin-guide/options/retries.md %}

{% include doc/admin-guide/options/send-time-zone.md %}

## sync-send()

|  Type:|      yes \| no|
  |Default:|   no|

*Description:* When sync-send is set to **yes**, syslog-ng OSE sends
the message reliably: it sends a message to the Kafka server, then waits
for a reply. In case of failure, syslog-ng OSE repeats sending the
message, as set in the retries() parameter. If sending the message fails
for retries() times, syslog-ng OSE drops the message.

This method ensures reliable message transfer, but is very slow.

When sync-send() is set to **no**, syslog-ng OSE sends messages
asynchronously, and receives the response asynchronously. In case of a
problem, syslog-ng OSE cannot resend the messages.

This method is fast, but the transfer is not reliable. Several thousands
of messages can be lost before syslog-ng OSE recognizes the error.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Hazard of data loss! If sync-send() is set to "no", the messages passed
to the Kafka client can be lost. To avoid data loss, One Identity
recommends that you set sync-send() to "yes", as this setting
delivers messages to the Kafka client more reliably.
{: .notice--danger}

## template()

|  Type:|      template or template function|
  |Default:|   \$ISODATE \$HOST \$MSGHDR\$MSG\\n|

*Description:* The message as published to Apache Kafka. You can use
templates and template functions (for example, format-json()) to format
the message, for example, template(\"\$(format-json \--scope rfc5424
\--exclude DATE \--key ISODATE)\").

For details on formatting messages in JSON format, see
[[format-json]].

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-zone.md %}

## topic()

|  Type:|      string|
  |Default:|   N/A|

*Description:* The Kafka topic under which the message is published. You can use
templates to change the topic dynamically based on the source or the content of
the message, for example, topic("${HOST}").

>**NOTE:** Valid topic names for the topic() and fallback-topic() options have the
>following limitations:
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

## workers()

|  Type:|      integer|
  |Default:|   1|

*Description:* The workers are only responsible for formatting the
messages that need to be delivered to the Kafka clients. Configure this
option only if your Kafka clients have many threads and they do not
receive enough messages.

**NOTE:** Kafka clients have their own threadpool, entirely independent from
any syslog-ng settings. The workers() option has no effect on this
threadpool.
{: .notice--info}
