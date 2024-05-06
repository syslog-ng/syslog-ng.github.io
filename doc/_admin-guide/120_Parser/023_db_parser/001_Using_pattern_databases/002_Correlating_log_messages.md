---
title: Correlating log messages using pattern databases
id: adm-parser-db-correlate
description: >-
    The syslog-ng OSE application can correlate log messages identified
    using pattern databases. Alternatively, you can also correlate log 
    messages using the grouping-by() parser. For details, see 
    Correlating messages using the grouping-by() parser.
---

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

(For details on triggering actions and generating messages, see
[[Triggering actions for identified messages]])

There are two attributes for pattern database rules that determine if a
message matching the rule is added to a context: context-scope and
context-id. The context-scope attribute acts as an early filter,
selecting messages sent by the same process (\${HOST}\${PROGRAM}\${PID}
is identical), application (\${HOST}\${PROGRAM} is identical), or host,
while the context-id actually adds the message to the context specified
in the id. The context-id can be a simple string, or can contain macros
or values extracted from the log messages for further filtering.
Starting with syslog-ng OSE version 3.5, if a message is added to a
context, syslog-ng OSE automatically adds the identifier of the context
to the .classifier.context\_id macro of the message.

**NOTE:** Message contexts are persistent and are not lost when syslog-ng
OSE is reloaded (SIGHUP), but are lost when syslog-ng OSE is restarted.
{: .notice--info}

Another parameter of a rule is the context-timeout attribute, which
determines how long a context is stored, that is, how long syslog-ng OSE
waits for related messages to arrive.

Note the following points about timeout values:

- When a new message is added to a context, syslog-ng OSE will restart
    the timeout using the context-timeout set for the new message.

- When calculating if the timeout has already expired or not,
    syslog-ng OSE uses the timestamps of the incoming messages, not
    system time elapsed between receiving the two messages (unless the
    messages do not include a timestamp, or the **keep-timestamp(no)**
    option is set). That way syslog-ng OSE can be used to process and
    correlate already existing log messages offline. However, the
    timestamps of the messages must be in chronological order (that is,
    a new message cannot be older than the one already processed), and
    if a message is newer than the current system time (that is, it
    seems to be coming from the future), syslog-ng OSE will replace its
    timestamp with the current system time.

    Example: How syslog-ng OSE calculates context-timeout

    Consider the following two messages:

    ><38>1990-01-01T14:45:25 customhostname program6[1234]: program6 testmessage
    ><38>1990-01-01T14:46:25 customhostname program6[1234]: program6 testmessage

    If the context-timeout is 10 seconds and syslog-ng OSE receives the
    messages within 1 second, the timeout event will occour immediately,
    because the difference of the two timestamp (60 seconds) is larger
    than the timeout value (10 seconds).

- Avoid using unnecessarily long timeout values on high-traffic
    systems, as storing the contexts for many messages can require
    considerable memory. For example, if two related messages usually
    arrive within seconds, it is not needed to set the timeout to
    several hours.

## Example: Using message correlation

```xml
<rule xml:id="..." context-id="ssh-session" context-timeout="86400" context-scope="process">
    <patterns>
        <pattern>Accepted @ESTRING:usracct.authmethod: @for @ESTRING:usracct.username: @from @ESTRING:usracct.device: @port @ESTRING:: @@ANYSTRING:usracct.service@</pattern>
    </patterns>
...
</rule>
```

For details on configuring message correlation, see the
[[context-id, context-timeout, and context-scope]]
attributes of pattern database rules.
