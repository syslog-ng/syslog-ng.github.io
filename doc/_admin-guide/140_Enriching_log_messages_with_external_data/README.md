---
title: Enriching log messages with external data
id: adm-enrich
description: >-
    To properly interpret the events that the log messages describe, you
    must be able to handle log messages as part of a system of events,
    instead of individual information chunks. The syslog-ng OSE application
    allows you to import data from external sources to include in the log
    messages, thus extending, enriching, and complementing the data found in
    the log message.
---

The syslog-ng OSE application currently provides the following
possibilities to enrich log messages.

- You can add name-value pairs from an external CSV file. For details,
    see [[Adding metadata from an external file]].

- You can resolve the IP addresses from log messages to include GeoIP
    information in the log messages. For details, see
    [[Looking up GeoIP2 data from IP addresses]].

- You can write custom Python modules to process the messages and add
    data from external files or databases. For details, see
    [[Python parser]].
