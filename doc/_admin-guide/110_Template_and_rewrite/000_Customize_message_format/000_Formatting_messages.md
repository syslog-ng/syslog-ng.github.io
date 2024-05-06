---
title: Formatting messages, filenames, directories, and tablenames
id: adm-temp-format
description: >-
    The syslog-ng OSE application can dynamically create filenames,
    directories, or names of database tables using macros that help you
    organize your log messages. Macros refer to a property or a part of the
    log message, for example, the ${HOST} macro refers to the name or IP
    address of the client that sent the log message, while ${DAY} is the
    day of the month when syslog-ng has received the message. Using these
    macros in the path of the destination log files allows you for example,
    to collect the logs of every host into separate files for every day.
---

A set of macros can be defined as a template object and used in multiple
destinations.

Another use of macros and templates is to customize the format of the
syslog message, for example, to add elements of the message header to
the message text.

**NOTE:** If a message uses the IETF-syslog format (RFC5424), only the text
of the message can be customized (that is, the \$MESSAGE part of the
log), the structure of the header is fixed.
{: .notice--info}

- For details on using templates and macros, see
    [[Templates and macros]].
- For a list and description of the macros available in syslog-ng OSE,
    see [[Macros of syslog-ng OSE]].
- For details on using custom macros created with CSV parsers and
    pattern databases, see [[parser: Parse and segment structured messages]]
    and [[Using parser results in filters and templates]], respectively.
