---
title: 'Element: ruleset'
short_title: ruleset
id: adm-parser-db-elem-ruleset
description: >-
    A container element to group log patterns for an application or program.
    A \<patterndb\> element may contain any number of \<ruleset\> elements.
---

## Location

/ patterndb / ruleset

## Attributes

- *name*: The name of the application. Note that the function of this
    attribute is to make the database more readable, {{ site.product.short_name }} uses the
    \<pattern\> element to identify the applications sending log
    messages.

- *id*: A unique ID of the application, for example, the md5 sum of
    the name attribute.

## Children

- *pattern*: The name of the application used to match the `PROGRAM` header of
    incoming syslog messages and select the applicable ruleset. Multiple
    `<pattern>` elements may be specified if the same application uses different
    process names (for example, different Postfix daemons all starting with
    `postfix`). All matching patterns map to the same set of rules in this
    ruleset. `<pattern>` elements may appear directly under `<ruleset>`, or
    wrapped inside a `<patterns>` container — both forms are equivalent.

    **NOTE:** If no `<pattern>` is specified, {{ site.product.short_name }} uses the ruleset as a
    fallback: it applies to messages with an empty `PROGRAM` header or when no
    other ruleset pattern matches.

- *patterns*: An optional container for one or more `<pattern>` elements.
    Using `<patterns>` is equivalent to placing `<pattern>` elements directly
    under `<ruleset>` — the wrapper is transparent. For details, see
    Element: patterns container.

- *rules*: A container for the rules belonging to this ruleset. For details,
    see Element: rules.

- *actions*: OPTIONAL --- A container for actions that are performed when a
    message is recognized by the patterns of the ruleset. For details, see
    Element: actions.

- *tags*: OPTIONAL --- Tags assigned to messages matching this ruleset.

- *description*: OPTIONAL --- A description of the ruleset or the
    application.

- *url*: OPTIONAL --- An URL referring to further information about
    the ruleset or the application.

- *rule\_urls*: OPTIONAL --- To list multiple URLs referring to
    further information about the ruleset or the application, enclose
    the \<url\> elements into an \<urls\> element.

### Example

```xml
<ruleset name='su' id='480de478-d4a6-4a7f-bea4-0c0245d361e1'>
```
