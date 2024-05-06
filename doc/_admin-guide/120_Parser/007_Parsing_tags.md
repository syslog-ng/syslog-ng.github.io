---
title: Parsing tags
id: adm-parser-tags
description: >-
    The syslog-ng Open Source Edition (syslog-ng OSE) application can tag
    log messages, and can include these tags in the log messages, as
    described in Tagging messages can parse these tags from the incoming messages
    and re-tag them. That way if you add tags to a log message on a syslog-ng OSE
    client, the message will have the same tags on the syslog-ng OSE server.
---

Available in version 3.23 and later.

Specify the macro that contains the list of tags to parse in the
template() option of the parser, for example, the SDATA field that you
used to transfer the tags, or the name of the JSON field that contains
the tags after using the json-parser().

```config
tags-parser(template("${<macro-or-field-with-tags>}"));
```
