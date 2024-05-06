---
title: amqp() destination options
srv: 'AMQP server'
port: '5672'
id: adm-dest-aqmp-opt
---

The amqp() driver publishes messages using the AMQP (Advanced Message
Queuing Protocol).

The amqp() destination has the following options:

## auth-method()

|  Accepted values:|   plain \| external|
|Default:|           plain|

*Description:* The amqp() driver supports the following types of
authentication:

- plain: Authentication happens using username and password. This is
    the default.

- external: Authentication happens using an out-of-band mechanism, for
    example, x509 certificate peer verification, client IP address
    range, or similar. For more information, see the [RabbitMQ
    documentation](https://www.rabbitmq.com/access-control.html).

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

## body()

|  Type:|      string|
|Default:|   empty string|

*Description:* The body of the AMQP message. You can also use macros and
templates.

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/examples/amqp.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/options/cert-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/examples/amqp.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/options/disk-buffer.md %}

## exchange()

|  Type:|      string|
  |Default:|   syslog|

*Description:* The name of the AMQP exchange where syslog-ng OSE sends
the message. Exchanges take a message and route it into zero or more
queues.

## exchange-declare()

|  Type:|      yes \| no|
  |Default:|   no|

*Description:* By default, syslog-ng OSE does not create non-existing
exchanges. Use the **exchange-declare(yes)** option to automatically
create exchanges.

## exchange-type()

|  Type:|      direct \| fanout \| topic \| headers|
  |Default:|   fanout|

*Description:* The type of the AMQP exchange.

## frame-size()

|  Type:|      integer|
  |Default:|   |

*Description:* Sets maximal frame size (the frame-max option described
in the [AMQP Reference
Guide](https://www.rabbitmq.com/amqp-0-9-1-reference.html).

## heartbeat()

|  Type:|      number \[seconds\]|
  |Default:|   0 (disabled)|

*Description:* If enabled, the syslog-ng OSE amqp destination sends
heartbeat messages to the server periodically. During negotiation, both
the amqp server and the client provide a heartbeat parameter, and the
smaller is chosen for heartbeat interval. For example:

```config
destination { amqp(
    vhost("/")
    exchange("logs")
    body("hello world")
    heartbeat(10)
    username(guest) password(guest)
    );
};
```

Available in syslog-ng OSE version 3.21 and later.

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host.md %}

{% include doc/admin-guide/options/key-file.md %}

## max-channel()

|  Type:|      integer|
|Default:|   |

*Description:* Sets maximal number of channels (the channel-max option
described in the [AMQP Reference
Guide](https://www.rabbitmq.com/amqp-0-9-1-reference.html).

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/examples/amqp.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/peer-verify.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/examples/amqp.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/options/persistent.md %}

{% include doc/admin-guide/options/port.md %}

{% include doc/admin-guide/options/retries.md %}

## routing-key()

|  Type:|      string|
|Default:|   empty string|

*Description:* Specifies a routing key for the exchange. The routing key
selects certain messages published to an exchange to be routed to the
bound queue. In other words, the routing key acts like a filter. The
routing key can include macros and templates.

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/username.md %}

{% include doc/admin-guide/options/value-pairs-short.md %}

## vhost()

|  Type:|      string|
  |Default:|   /|

*Description:* The name of the AMQP virtual host to send the messages to.
