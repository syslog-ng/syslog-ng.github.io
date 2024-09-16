---
title: Configuring {{ site.product.short_name }} relays
id: adm-qs-relay-conf
description: >-
    This section describes how to configure {{ site.product.short_name }} as a relay.
---

To configure {{ site.product.short_name }} as a relay, complete the following steps:

1. Install the {{ site.product.short_name }} application on the host. For details on
    installing {{ site.product.short_name }} on specific operating systems, see
    Installing syslog-ng.
2. Configure the network sources that collect the log messages sent by
    the clients.

3. Create a network destination that points to the {{ site.product.short_name }} server.

4. Create a log statement connecting the network sources to the
    {{ site.product.short_name }} server.

5. Configure the local sources that collect the log messages of the
    relay host.

6. Create a log statement connecting the local sources to the syslog-ng
    server.

7. Enable the keep-hostname() and disable the chain-hostnames()
    options. (For details on how these options work, see
    chain-hostnames()

    **NOTE:** It is recommended to use these options on your {{ site.product.short_name }}
    server as well.
    {: .notice--info}

8. Set filters and options (for example, TLS encryption) as necessary.

    **NOTE:** By default, the {{ site.product.short_name }} server will treat the relayed
    messages as if they were created by the relay host, not the host
    that originally sent them to the relay. In order to use the original
    hostname on the {{ site.product.short_name }} server, use the **keep-hostname(yes)**
    option both on the {{ site.product.short_name }} relay and the {{ site.product.short_name }} server. This
    option can be set individually for every source if needed.
    {: .notice--info}

    If you are relaying log messages and want to resolve IP addresses to
    hostnames, configure the first relay to do the name resolution.

    Example: A simple configuration for relays

    The following is a simple configuration file that collects local and
    incoming log messages and forwards them to a logserver using the
    IETF-syslog protocol.

    ```config
    @version: 3.38
    @include "scl.conf"

    options {
        time-reap(30);
        mark-freq(10);
        keep-hostname(yes);
        chain-hostnames(no);
    };

    source s_local {
        system(); internal();
    };

    source s_network {
        syslog(transport(tcp));
    };

    destination d_syslog_tcp {
        syslog("192.168.1.5" transport("tcp") port(2010));
    };

    log {
        source(s_local); source(s_network);
        destination(d_syslog_tcp);
    };
    ```
