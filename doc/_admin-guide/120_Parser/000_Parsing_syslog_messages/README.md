---
title: Parsing syslog messages
id: adm-parser-parsing
description: >-
    By default, syslog-ng OSE parses every message using the syslog-parser
    as a syslog message, and fills the macros with values of the message.
    The syslog-parser does not discard messages: the message cannot be
    parsed as a syslog message, the entire message (including its header) is
    stored in the $MSG macro. If you do not want to parse the message as a
    syslog message, use the flags(no-parse) option of the source.
---

You can also use the **syslog-parser** to explicitly parse a message, or
a part of a message as a syslog message (for example, after rewriting
the beginning of a message that does not comply with the syslog
standards).

## Example: Using junctions

For example, suppose that you have a single network source that receives
log messages from different devices, and some devices send messages that
are not RFC-compliant (some routers are notorious for that). To solve
this problem in earlier versions of syslog-ng OSE, you had to create two
different network sources using different IP addresses or ports: one
that received the RFC-compliant messages, and one that received the
improperly formatted messages (for example, using the
**flags(no-parse)** option). Using junctions this becomes much more
simple: you can use a single network source to receive every message,
then use a junction and two channels. The first channel processes the
RFC-compliant messages, the second everything else. At the end, every
message is stored in a single file. The filters used in the example can
be host() filters (if you have a list of the IP addresses of the devices
sending non-compliant messages), but that depends on your environment.

```config
log {
    source {
        syslog(
            ip(10.1.2.3)
            transport("tcp")
            flags(no-parse)
        );
    };
    junction {
        channel {
            filter(f_compliant_hosts);
            parser {
                syslog-parser();
            };
        };
        channel {
            filter(f_noncompliant_hosts);
        };
    };
    destination {
        file("/var/log/messages");
    };
};
```

Since every channel receives every message that reaches the junction,
use the **flags(final)** option in the channels to avoid the unnecessary
processing the messages multiple times:

```config
log {
    source {
        syslog(
            ip(10.1.2.3)
            transport("tcp")
            flags(no-parse)
        );
    };
    junction {
        channel {
            filter(f_compliant_hosts);
            parser {
                syslog-parser();
            };
            flags(final);
        };
        channel {
            filter(f_noncompliant_hosts);
            flags(final);
        };
    };
    destination {
        file("/var/log/messages");
    };
};
```

**NOTE:** syslog-ng OSE has several parsers that you can use to parse
non-compliant messages. You can even [[write a custom syslog-ng parser in Python|adm-parser-python]].
For details, see [[parser: Parse and segment structured messages]].
{: .notice--info}

Note that by default, the syslog-parser attempts to parse the message as
an RFC3164-formatted (BSD-syslog) message. To parse the message as an
RFC5424-formatted message, use the **flags(syslog-protocol)** option in
the parser.

```config
syslog-parser(flags(syslog-protocol));
```
