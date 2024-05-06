---
title: Configuring syslog-ng on server hosts
id: adm-qs-server-conf
description: >-
    To configure syslog-ng on a server host, complete the following steps.
---

## Steps

1. Install the syslog-ng application on the host. For details
    installing syslog-ng on specific operating systems, see
    [[Installing syslog-ng]].
2. Starting with version 3.2, syslog-ng OSE automatically collects the
    log messages that use the native system logging method of the
    platform, for example, messages from /dev/log on Linux, or /dev/klog
    on FreeBSD. For a complete list of messages that are collected
    automatically, see [[system: Collecting the system-specific log messages of a platform]].

3. To configure syslog-ng OSE, edit the syslog-ng.conf file with any
    regular text editor application. The location of the configuration
    file depends on how you installed syslog-ng OSE. Native packages of
    a platform (like the ones downloaded from Linux repositories)
    typically place the configuration file under the /etc/syslog-ng/
    directory.

    Configure the network sources that collect the log messages sent by
    the clients and relays. How the network sources should be configured
    depends also on the capabilities of your client hosts: many older
    networking devices support only the legacy BSD-syslog protocol
    (RFC3164) using UDP transport:

    ```config
    source s_network {
        syslog(ip(10.1.2.3) transport("udp"));
    };
    ```

    However, if possible, use the much more reliable TCP transport:

    ```config
    source s_network {
        syslog(ip(10.1.2.3) transport("tcp"));
    };
    ```

    For other options, see syslog: Collecting messages using the IETF syslog protocol (syslog() driver and
    tcp, tcp6, udp, udp6: Collecting messages from remote hosts using the BSD syslog protocol --- OBSOLETE.

    **NOTE:** Starting with syslog-ng OSE version 3.2, the syslog() source
    driver can handle both BSD-syslog (RFC 3164) and IETF-syslog (RFC
    5424-26) messages.
    {: .notice--info}

4. Create local destinations that will store the log messages, for
    example, file- or program destinations. The default configuration of
    syslog-ng OSE places the collected messages into the
    /var/log/messages file:

    ```config
    destination d_local {
        file("/var/log/messages");
    };
    ```

    If you want to create separate logfiles for every client host, use
    the **\${HOST}** macro when specifying the filename, for example:

    ```config
    destination d_local {
        file("/var/log/messages_${HOST}");
    };
    ```

    For details on further macros and how to use them, see
    [[template and rewrite: Format, modify, and manipulate log messages]].

5. Create a log statement connecting the sources to the local
    destinations.

    ```config
    log {
        source(s_local); source(s_network); destination(d_local);
    };
    ```

6. Set filters, options (for example, TLS encryption) and other
    advanced features as necessary.

    **NOTE:** By default, the syslog-ng server will treat the relayed
    messages as if they were created by the relay host, not the host
    that originally sent them to the relay. In order to use the original
    hostname on the syslog-ng server, use the **keep-hostname(yes)**
    option both on the syslog-ng relay and the syslog-ng server. This
    option can be set individually for every source if needed.
    {: .notice--info}

    If you are relaying log messages and want to resolve IP addresses to
    hostnames, configure the first relay to do the name resolution.

    Example: A simple configuration for servers

    The following is a simple configuration file for syslog-ng Open
    Source Edition that collects incoming log messages and stores them
    in a text file.

    ```config
    @version: 3.38
    @include "scl.conf"

    options {
        time-reap(30);
        mark-freq(10);
        keep-hostname(yes);
    };

    source s_local {
        system(); internal();
    };

    source s_network {
        syslog(transport(tcp));
    };

    destination d_logs {
        file(
            "/var/log/syslog-ng/logs.txt"
            owner("root")
            group("root")
            perm(0777)
            );
        };

    log {
        source(s_local); source(s_network); destination(d_logs);
    };
    ```
