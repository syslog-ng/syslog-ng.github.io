---
title: 'parser: Parse and segment structured messages'
short_title: Parse and segment structured messages
id: adm-parser
description: >-
    The filters and default macros of syslog-ng work well on the headers and
    metainformation of the log messages, but are rather limited when
    processing the content of the messages. Parsers can segment the content
    of the messages into name-value pairs, and these names can be used as
    user-defined macros. Subsequent filtering or other type of processing of
    the message can use these custom macros to refer to parts of the
    message. Parsers are global objects most often used together with
    filters and rewrite rules.
---

The syslog-ng OSE application provides the following possibilities to
parse the messages, or parts of the messages:

- By default, syslog-ng OSE parses every message as a syslog message.
    To disable message parsing, use the **flags(no-parse)** option of
    the source. To explicitly parse a message as a syslog message, use
    the **syslog** parser. For details, see
    [[Parsing syslog messages]].
- To segment a message into columns using a CSV-parser, see
    [[Parsing messages with comma-separated and similar values]].

- To segment a message consisting of whitespace or comma-separated
    key=value pairs (for example, Postfix log messages), see
    [[Parsing key=value pairs]].
- To parse JSON-formatted messages, see [[JSON parser]].

- To parse XML-formatted messages, see [[XML parser]].

- To identify and parse the messages using a pattern database, see
    [[db-parser: Process message content with a pattern database]].

- To parse a specially-formatted date or timestamp, see
    [[Parsing dates and timestamps]].
- To write a custom parser in Python or Hy, see
    [[Python parser]].
- To parse the tags sent by another syslog-ng host. For details, see
    [[Parsing tags]].

The syslog-ng OSE application provides built-in parsers for the
following application logs:

- Apache HTTP server access logs. For details, see
    [[Apache access log parser]].
- Cisco devices. For details, see [[Cisco parser]]Cisco     parser.

- Messages formatted using the enterprise-wide message model (EWMM) of
    syslog-ng OSE. For details, see
    [[Parsing enterprise-wide message model (EWMM) messages]].

- Iptables logs. For details, see [[iptables parser]].

- Linux Audit (auditd) logs. For details, see
    [[Linux audit parser]].
- Netskope log messages. For details, see
    [[Netskope parser]].
- [osquery](https://osquery.io) result logs. For details, see
    [[osquery: Collect and parse osquery result logs]].

- SNMP traps of the [Net-SNMP](http://www.net-snmp.org)\'s snmptrapd
    application. For details, see
    [[snmptrap: Read Net-SNMP traps]].
- sudo logs. For details, see [[Sudo parser]].
- Websense Content Gateway (Raytheon\|Websense, now Forcepoint) log
    messages. For details, see [[Websense parser]].
