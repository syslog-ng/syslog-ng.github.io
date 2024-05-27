---
title: Troubleshooting syslog-ng
id: adm-debug
description: >-
    This chapter provides tips and guidelines about troubleshooting problems
    related to syslog-ng.
---

- As a general rule, first try to log the messages to a local file.
    Once this is working, you know that {{ site.product.short_name }} is running correctly
    and receiving messages, and you can proceed to forwarding the
    messages to the server.

- Always check the configuration files for any syntax errors on both
    the client and the server using the **syslog-ng \--syntax-only**
    command.

- If the {{ site.product.short_name }} server does not receive the messages, verify
    that the IP addresses and ports are correct in your sources and
    destinations. Also, check that the client and the server uses the
    same protocol (a common error is to send logs on UDP, but configure
    the server to receive logs on TCP).

    If the problem persists, use **tcpdump** or a similar packet sniffer
    tool on the client to verify that the messages are sent correctly,
    and on the server to verify that it receives the messages.

- To find message-routing problems, run {{ site.product.short_name }} with the
    following command **syslog-ng -Fevd**. That way {{ site.product.short_name }} will
    run in the foreground, and display debug messages about the messages
    that are processed.

- If {{ site.product.short_name }} is closing the connections for no apparent reason, be
    sure to check the log messages of syslog-ng. You may also want to
    run {{ site.product.short_name }} with the **\--verbose** or **\--debug** command-line
    options for more-detailed log messages. You can enable these
    messages without restarting {{ site.product.short_name }} using the **syslog-ng-ctl
    verbose \--set=on** command. For details, see the syslog-ng-ctl man
    page at The {{ site.product.short_name }} control tool manual page.

- Build up encrypted connections step-by-step. First create a working,
    unencrypted (for example, TCP) connection, then add TLS encryption,
    and finally, client authentication if needed.

- If you use the same driver and options in the destination of your
    {{ site.product.short_name }} client and the source of your {{ site.product.short_name }} server,
    everything should work as expected. Unfortunately, there are some
    other combinations, that may seem to work, but result in losing
    parts of the messages. For details on the working combinations, see
    Things to consider when forwarding messages between {{ site.product.short_name }} hosts.

- In case you experience a problem that is not covered in this guide,
    send it to the {{ site.product.short_name }} mailing list.

    To report bugs found in {{ site.product.short_name }}, visit the {{ site.product.short_name }} issue tracker on GitHub.

    Precompiled binary packages are available for free from various
    third-parties. See the list of precompiled {{ site.product.short_name }} binary packages.
