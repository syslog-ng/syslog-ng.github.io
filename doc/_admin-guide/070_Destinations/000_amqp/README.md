---
title: 'amqp: Publishing messages using AMQP'
short_title: amqp
id: adm-dest-amqp
description: >-
    The amqp() driver publishes messages using the [AMQP (Advanced Message
    Queuing Protocol)](http://www.amqp.org/). syslog-ng OSE supports AMQP
    versions 0.9.1 and 1.0. The syslog-ng OSE amqp() driver supports
    persistence, and every available exchange types.
---

The name-value pairs selected with the value-pairs() option will be sent
as AMQP headers, while the body of the AMQP message is empty by default
(but you can add custom content using the body() option). Publishing the
name-value pairs as headers makes it possible to use the Headers
exchange-type and subscribe only to interesting log streams. This
solution is more flexible than using the routing-key() option.

For the list of available parameters, see amqp() destination options.

**Declaration**

```config
amqp( host("<amqp-server-address>") );
```

### Example: Using the amqp() driver

The following example shows the default values of the available options.

```config
destination d_amqp {
    amqp(
        vhost("/")
        host("127.0.0.1")
        port(5672)
        exchange("syslog")
        exchange-type("fanout")
        routing-key("")
        body("")
        persistent(yes)
        value-pairs(
            scope("selected-macros" "nv-pairs" "sdata")
        )
    );
};
```
