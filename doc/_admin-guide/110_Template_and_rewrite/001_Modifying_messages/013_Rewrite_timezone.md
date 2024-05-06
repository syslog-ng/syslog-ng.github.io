---
title: Rewrite the timezone of a message
id: adm-temp-rewrite-tz
description: >-
    Starting with version 3.24 of the syslog-ng Open Source Edition
    (syslog-ng OSE) application, you can manipulate the timezone information
    of messages using rewrite rules. 
---

You can:

- [[Set a timezone|adm-temp-rewrite-tz#set-time-zone]] to a specific value

- [[Fix a timezone|adm-temp-rewrite-tz#fix-time-zone]] if it was improperly parsed

- Assuming the sender is sending messages in near-real-time, syslog-ng
    OSE can [[guess the timezone|adm-temp-rewrite-tz#guess-time-zone]]

By default, these operations modify the date-related macros of the
message that correspond to the date the message was sent (that is, the
S\_ macros). You can modify the dates when syslog-ng OSE has received
the messages (that is, the R\_ macros), but this is rarely needed. To do
so, include the time-stamp(recvd) option in the operation, for example:

```config
rewrite { fix-time-zone("EST5EDT" time-stamp(recvd)); };
```

## fix-time-zone()

Use the fix-time-zone() operation to correct the timezone of a message
if it was parsed incorrectly for some reason, or if the client did not
include any timezone information in the message. You can specify the new
timezone as the name of a timezone, or as a template string. For
example, use the following rewrite rule to set the timezone to EST5EDT:

```config
rewrite { fix-time-zone("EST5EDT"); };
```

If you have lots of clients that do not send timezone information in the
log messages, you can create a database file that stores the timezone of
the clients, and feed this data to syslog-ng OSE using the
add-contextual-data() feature. For details, see
[[Adding metadata from an external file]].

## guess-time-zone()

Use the guess-time-zone() operation attempts to set the timezone of the
message automatically, using heuristics on the timestamps. Normally the
syslog-ng OSE application performs this operation automatically when it
parses the incoming message. Using this operation in a rewrite rule can
be useful if you cannot parse the incoming message for some reason (and
use the **flags(no-parse)** option in your source, but you want to set
the timezone automatically later (for example, after you have
preprocessed the message).

Using this operation is identical to using the flags(guess-timezone)
flag in the source.

## set-time-zone()

Use the set-time-zone() operation to set the timezone of the message to
a specific value, that is to convert an existing timezone to a different
one. This operation is identical to setting the time-zone() option in a
destination or as a global option, but can be applied selectively to the
messages using conditions.
