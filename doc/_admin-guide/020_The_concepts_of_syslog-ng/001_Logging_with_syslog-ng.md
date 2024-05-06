---
title: Logging with syslog-ng
id: adm-conc-log
description: >-
    The syslog-ng application reads incoming messages and forwards them to
    the selected destinations. The syslog-ng application can receive
    messages from files, remote hosts, and other sources.
---

Log messages enter syslog-ng in one of the defined *sources*, and are sent
to one or more *destinations*.

Sources and destinations are independent objects, *log paths* define
what syslog-ng does with a message, connecting the sources to the
destinations. A log path consists of one or more sources and one or more
destinations: messages arriving from a source are sent to every
destination listed in the log path. A log path defined in syslog-ng is
called a *log statement*.

Optionally, log paths can include *filters*. Filters are rules that
select only certain messages, for example, selecting only messages sent
by a specific application. If a log path includes filters, syslog-ng
sends only the messages satisfying the filter rules to the destinations
set in the log path.

Other optional elements that can appear in log statements are *parsers*
and *rewriting rules*. Parsers segment messages into different fields to
help processing the messages, while rewrite rules modify the messages by
adding, replacing, or removing parts of the messages.

## The route of a log message in syslog-ng

### Purpose

The following procedure illustrates the route of a log message from its
source on the syslog-ng client to its final destination on the central
syslog-ng server.

### Figure 1: The route of a log message

![]({{ adm_img_folder | append: 'fig-syslog-ng-logging-01.png' }})

### Steps

1. A device or application sends a log message to a source on the
    syslog-ng client. For example, an Apache web server running on Linux
    enters a message into the /var/log/apache file.

2. The syslog-ng client running on the web server reads the message
    from its /var/log/apache source.

3. The syslog-ng client processes the first log statement that includes
    the /var/log/apache source.

4. The syslog-ng client performs optional operations (message
    filtering, parsing, and rewriting) on the message, for example, it
    compares the message to the filters of the log statement (if any).
    If the message complies with all filter rules, syslog-ng sends the
    message to the destinations set in the log statement, for example,
    to the remote syslog-ng server.

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** Message
    filtering, parsing, and rewriting is performed in the order that the
    operations appear in the log statement.
    {: .notice--warning}

    **NOTE:** The syslog-ng client sends a message to *all* matching
    destinations by default. As a result, a message may be sent to a
    destination more than once, if the destination is used in multiple
    log statements. To prevent such situations, use the **final** flag
    in the destination statements. For details, see
    Log path flags.
    {: .notice--info}

5. The syslog-ng client processes the next log statement that includes
    the /var/log/apache source, repeating [[steps 3-4|adm-conc-log#steps]].

6. The message sent by the syslog-ng client arrives from a source set
    in the syslog-ng server.

7. The syslog-ng server reads the message from its source and processes
    the first log statement that includes that source.

8. The syslog-ng server performs optional operations (message
    filtering, parsing, and rewriting) on the message, for example, it
    compares the message to the filters of the log statement (if any).
    If the message complies with all filter rules, syslog-ng sends the
    message to the destinations set in the log statement.

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** Message filtering,
    parsing, and rewriting is performed in the order that the operations appear
    in the log statement.
    {: .notice--warning}

9. The syslog-ng server processes the next log statement, repeating
    [[steps 7-9|adm-conc-log#steps]].

    **NOTE:** The syslog-ng application can stop reading messages from its
    sources if the destinations cannot process the sent messages. This
    feature is called flow-control and is detailed in
    [[Managing incoming and outgoing messages with flow-control]].
    {: .notice--info}
