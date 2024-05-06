---
title: 'Element: patterns container'
short_title: patterns
id: adm-parser-db-elem-patterns-ruleset
---

## Location

/ patterndb / ruleset / patterns

## Description

A container element. A \<patterns\> element may contain any number of
\<pattern\> elements.

## Attributes

N/A

## Children

- *pattern*: The name of the application --- syslog-ng matches this
    value to the \${PROGRAM} header of the syslog message to find the
    rulesets applicable to the syslog message.

    Specifying multiple patterns is useful if two or more applications
    have different names (that is, different \${PROGRAM} fields), but
    otherwise send identical log messages.

    It is not necessary to use multiple patterns if only the end of the
    \${PROGRAM} fields is different, use only the beginning of the
    \${PROGRAM} field as the pattern. For example, the Postfix email
    server sends messages using different process names, but all of them
    begin with the postfix string.

    You can also use parsers in the program pattern if needed, and use
    the parsed results later. For example:
    \<pattern\>postfix\\@ESTRING:.postfix.component:\[@\</pattern\>

    NOTE: If the \<pattern\> element of a ruleset is not specified,
    syslog-ng OSE will use this ruleset as a fallback ruleset: it will
    apply the ruleset to messages that have an empty PROGRAM header, or
    if none of the program patterns matched the PROGRAM header of the
    incoming message.

### Example

```xml
<patterns>
    <pattern>firstapplication</pattern>
    <pattern>otherapplication</pattern>
</patterns>
```

Using parsers in the program pattern:

```xml
<pattern>postfix@ESTRING:.postfix.component:[@</pattern>
```
