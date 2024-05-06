---
title: 'Element: values'
short_title: values
id: adm-parser-db-elem-values
---

## Location

/ patterndb / ruleset / rules / rule / patterns / values

## Description

OPTIONAL --- Name-value pairs that are assigned to messages matching the
patterns, for example, the representation of the event in the message
according to the Common Event Format (CEF) or Common Event Exchange
(CEE). The names can be used as macros to reference the assigned values.

## Attributes

N/A

## Children

- *value*: OPTIONAL --- Contains the value of the name-value pair that
    is assigned to the message.

    The \<value\> element of name-value pairs can include template
    functions. For details, see Using template functions, for
    examples, see if.

    When used together with message correlation, the \<value\> element
    of name-value pairs can include references to the values of earlier
    messages from the same context. For details, see
    [[Correlating log messages using pattern databases]].

- *name*: The name of the name-value pair. It can also be used as a
    macro to reference the assigned value.

### Example

```xml
<values>
    <value name=".classifier.outcome">/Success</value>
</values>
```
