---
title: Possible causes of losing log messages
id: adm-debug-causes
description: >-
    During the course of a message from the sending application to the final
    destination of the message, there are a number of locations where a
    message may be lost, even though {{ site.product.short_name }} does its best to avoid
    message loss. Usually losing messages can be avoided with careful
    planning and proper configuration of {{ site.product.short_name }} and the hosts running
    syslog-ng. 
---

The following list shows the possible locations where
messages may be lost, and provides methods to minimize the risk of
losing messages:

- Between the application and the {{ site.product.short_name }} client: Make sure to use
    an appropriate source to receive the logs from the application (for
    example, from /dev/log). For example, use **unix-stream** instead of
    unix-dgram whenever possible.

- When {{ site.product.short_name }} is sending messages: If {{ site.product.short_name }} cannot send
    messages to the destination and the output buffer gets full,
    {{ site.product.short_name }} will drop messages.

    Use flags (flow-control) to avoid this (for details, see
    Configuring flow-control.  

    For more information about the error caused by the missing flow-control,
    see Destination queue full in Error messages.

    The number of dropped messages is displayed per destination in the
    log message statistics of {{ site.product.short_name }} (for details, see
    Statistics of syslog-ng.

- On the network: When transferring messages using the UDP protocol,
    messages may be lost without any notice or feedback --- such is the
    nature of the UDP protocol. Always use the TCP protocol to transfer
    messages over the network whenever possible.

- In the socket receive buffer: When transferring messages using the
    UDP protocol, the UDP datagram (that is, the message) that reaches
    the receiving host placed in a memory area called the socket receive
    buffer. If the host receives more messages than it can process, this
    area overflows, and the kernel drops messages without letting
    {{ site.product.short_name }} know about it. Using TCP instead of UDP prevents this
    issue. If you must use the UDP protocol, increase the size of the
    receive buffer using the so-rcvbuf() option.

- When {{ site.product.short_name }} is receiving messages:

  - The receiving {{ site.product.short_name }} (for example, the {{ site.product.short_name }} server or
        relay) may drop messages if the fifo of the destination file
        gets full. The number of dropped messages is displayed per
        destination in the log message statistics of {{ site.product.short_name }} (for
        details, see Statistics of syslog-ng.

- When the destination cannot handle large load: When {{ site.product.short_name }} is
    sending messages at a high rate into an SQL database, a file, or
    another destination, it is possible that the destination cannot
    handle the load, and processes the messages slowly. As a result, the
    buffers of {{ site.product.short_name }} fill up, {{ site.product.short_name }} cannot process the incoming
    messages, and starts to loose messages. For details, see the
    previous entry. Use the throttle parameter to avoid this problem.

- As a result of an unclean shutdown of the {{ site.product.short_name }} server: If the
    host running the {{ site.product.short_name }} server experiences an unclean shutdown,
    it takes time until the clients realize that the connection to the
    {{ site.product.short_name }} server is down. Messages that are put into the output TCP
    buffer of the clients during this period are not sent to the server.

- When {{ site.product.short_name }} is writing messages into files: If {{ site.product.short_name }}
    receives a signal (SIG) while writing log messages to file, the log
    message that is processed by the *write* call can be lost if the
    flush\_lines parameter is higher than 1.
