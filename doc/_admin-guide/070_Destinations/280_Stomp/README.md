---
title: 'stomp: Publishing messages using STOMP'
short_title: Stomp
id: adm-dest-stomp
description: >-
    The stomp() driver sends messages to servers (message brokers) using the
    [Simple (or Streaming) Text Oriented Message Protocol
    (STOMP)](http://stomp.github.io/), formerly known as TTMP. syslog-ng OSE
    supports version 1.0 of the STOMP protocol. The syslog-ng OSE stomp()
    driver supports persistence.
---

The name-value pairs selected with the value-pairs() option will be sent
as STOMP headers, while the body of the STOMP message is empty by
default (but you can add custom content using the body() option).
Publishing the name-value pairs as headers makes it possible to use the
Headers exchange-type and subscribe only to interesting log streams.

For the list of available parameters, see
[[stomp() destination options]].

**Declaration**

```config
stomp( host("<stomp-server-address>") );
```

### Example: Using the stomp() driver

The following example shows the default values of the available options.

```config
destination d_stomp {
    stomp(
        host("localhost")
        port(61613)
        destination("/topic/syslog")
        body("")             # optional, empty by default
        persistent(yes)
        ack(no)
        username("user")     # optional, empty by default
        password("password") # optional, empty by default
        value-pairs(scope(selected-macros, nv-pairs, sdata))
    );
};
```
