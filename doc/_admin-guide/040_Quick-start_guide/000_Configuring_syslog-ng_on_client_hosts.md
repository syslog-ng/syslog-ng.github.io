---
title: Configuring syslog-ng on client hosts
id: adm-qs-client-conf
description: >-
    To configure syslog-ng on a client host, complete the following steps.
---

## Steps

1. Install the syslog-ng application on the host. For details
    installing syslog-ng on specific operating systems, see
    [[Installing syslog-ng]].
2. Configure the local sources to collect the log messages of the host.
    Starting with version 3.2, syslog-ng OSE automatically collects the
    log messages that use the native system logging method of the
    platform, for example, messages from /dev/log on Linux, or /dev/klog
    on FreeBSD. For a complete list of messages that are collected
    automatically, see [[system: Collecting the system-specific log messages of a platform]].

    To configure syslog-ng OSE, edit the syslog-ng.conf file with any
    regular text editor application. The location of the configuration
    file depends on how you installed syslog-ng OSE. Native packages of
    a platform (like the ones downloaded from Linux repositories)
    typically place the configuration file under the /etc/syslog-ng/
    directory.

    Add sources to collect the messages from your log files. File
    sources look like this:

    ```config
    source s_myfilesource {
        file("/var/log/myapplication.log" follow-freq(1));
    };
    ```

    Name every source uniquely. For details on configuring file sources,
    see [[file: Collecting messages from text files]].

    **TIP:** Many applications send log messages to logfiles by default (for
    example, the Roundcube webmail client, or the ProFTPD FTP server),
    but can be configured to send them to syslog instead. If possible,
    it is recommended to reconfigure the application that way.
    {: .notice--info}

    **NOTE:** The default configuration file of syslog-ng OSE collects
    platform-specific log messages and the internal log messages of
    syslog-ng OSE.
    {: .notice--info}

    ```config
    source s_local {
        system();
        internal();
    };
    ```

3. Create a network destination that points directly to the syslog-ng
    server, or to a local relay. The network destination greatly depends
    on the protocol that your log server or relay accepts messages. Many
    systems still use the legacy BSD-syslog protocol (RFC3162) over the
    unreliable UDP transport:

    ```config
    destination d_network { network("10.1.2.3" transport("udp")); };
    ```

    However, if possible, use the much more reliable IETF-syslog
    protocol over TCP transport:

    ```config
    destination d_network {
        syslog("10.1.2.3" transport("tcp"));
    };
    ```

4. Create a log statement connecting the local sources to the syslog-ng
    server or relay. For example:

    ```config
    log {
        source(s_local); destination(d_network);
    };
    ```

5. If the logs will also be stored locally on the host, create local
    file destinations.

    **NOTE:** The default configuration of syslog-ng OSE places the
    collected messages into the /var/log/messages file:
    {: .notice--info}

    ```config
    destination d_local {
        file("/var/log/messages");
    };
    ```

6. Create a log statement connecting the local sources to the file
    destination.

    **NOTE:** The default configuration of syslog-ng OSE has only one log
    statement:
    {: .notice--info}

    ```config
    log {
        source(s_local); destination(d_local);
    };
    ```

7. Set filters, macros and other features and options (for example, TLS
    encryption) as necessary.

    Example: The default configuration file of syslog-ng OSE

    The following is the default configuration file of syslog-ng
    OSE3.38. It collects local log messages and the log messages of
    syslog-ng OSE and saves them in the /var/log/messages file.

    ```config
    @version: 3.38
    @include "scl.conf"
    source s_local {
        system(); internal();
    };
    destination d_local {
        file("/var/log/messages");
    };
    log {
        source(s_local); destination(d_local);
    };
    ```

    Example: A simple configuration for clients

    The following is a simple configuration file that collects local log
    messages and forwards them to a logserver using the IETF-syslog
    protocol.

    ```config
    @version: 3.38
    @include "scl.conf"
    source s_local {
        system(); internal();
    };
    destination d_syslog_tcp {
        syslog("192.168.1.1" transport("tcp") port(2010));
    };
    log {
        source(s_local);destination(d_syslog_tcp);
    };
    ```
