---
title: Junctions and channels
id: adm-log-junc
description: >-
    Junctions make it possible to send the messages to different channels,
    process the messages differently on each channel, and then join every
    channel together again. You can define any number of channels in a
    junction: every channel receives a copy of every message that reaches
    the junction. Every channel can process the messages differently, and at
    the end of the junction, the processed messages of every channel return
    to the junction again, where further processing is possible.
---

A junction includes one or more channels. A channel usually includes at
least one filter, though that is not enforced. Otherwise, channels are
identical to log statements, and can include any kind of objects, for
example, parsers, rewrite rules, destinations, and so on. (For details
on using channels, as well as on using channels outside junctions, see
[[Using channels in configuration objects]]

>**NOTE:** Certain parsers can also act as filters:  
>  
>- The JSON parser automatically discards messages that are not valid JSON messages.  
>- The csv-parser() discards invalid messages if the **flags(drop-invalid)** option is set.
>  
{: .notice--info}

You can also use log-path flags in the channels of the junction. Within
the junction, a message is processed by every channel, in the order the
channels appear in the configuration file. Typically if your channels
have filters, you also set the **flags(final)** option for the channel.
However, note that the log-path flags of the channel apply only within
the junction, for example, if you set the final flag for a channel, then
the subsequent channels of the junction will not receive the message,
but this does not affect any other log path or junction of the
configuration. The only exception is the flow-control flag: if you
enable flow-control in a junction, it affects the entire log path. For
details on log-path flags, see [[Log path flags]].

```config
junction {
    channel { <other-syslog-ng-objects> <log-path-flags>};
    channel { <other-syslog-ng-objects> <log-path-flags>};
    ...
};
```

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

**NOTE:** Junctions differ from embedded log statements, because embedded
log statements are like branches: they split the flow of messages into
separate paths, and the different paths do not meet again. Messages
processed on different embedded log statements cannot be combined
together for further processing. However, junctions split the messages
to channels, then combine the channels together.
{: .notice--info}

An alternative, more straightforward way to implement conditional
evaluation is to configure conditional expressions using if {}, elif {},
and else {} blocks. For details, see
[[if-else-elif: Conditional expressions]].
