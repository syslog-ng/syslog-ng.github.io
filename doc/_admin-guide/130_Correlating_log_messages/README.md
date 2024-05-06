---
title: Correlating log messages
id: adm-correlate
description: >-
    The syslog-ng OSE application can correlate log messages. Alternatively,
    you can also correlate log messages using pattern databases. For
    details, see Correlating log messages using pattern databases.
---

- To group or correlate log messages that match a set of filters, use
    the **group-by** parser. This works similarly to SQL GROUP BY
    statements. For details, see
    [[Correlating messages using the grouping-by() parser]].

- You can correlate log messages identified using pattern databases.
    For details, see [[Correlating log messages using pattern databases]].

Log messages are supposed to describe events, but applications often
separate information about a single event into different log messages.
For example, the Postfix email server logs the sender and recipient
addresses into separate log messages, or in case of an unsuccessful
login attempt, the OpenSSH server sends a log message about the
authentication failure, and the reason of the failure in the next
message. Of course, messages that are not so directly related can be
correlated as well, for example, login-logout messages, and so on.

To correlate log messages with syslog-ng OSE, you can add messages into
message-groups called contexts. A context consists of a series of log
messages that are related to each other in some way, for example, the
log messages of an SSH session can belong to the same context. As new
messages come in, they may be added to a context. Also, when an incoming
message is identified it can trigger actions to be performed, for
example, generate a new message that contains all the important
information that was stored previously in the context.
