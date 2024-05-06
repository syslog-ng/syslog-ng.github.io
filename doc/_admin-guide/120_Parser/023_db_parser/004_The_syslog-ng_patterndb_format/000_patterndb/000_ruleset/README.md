---
title: 'Element: ruleset'
short_title: ruleset
id: adm-parser-db-elem-ruleset
---

## Location

/ patterndb / ruleset

## Description

A container element to group log patterns for an application or program.
A \<patterndb\> element may contain any number of \<ruleset\> elements.

## Attributes

- *name*: The name of the application. Note that the function of this
    attribute is to make the database more readable, syslog-ng uses the
    \<pattern\> element to identify the applications sending log
    messages.

- *id*: A unique ID of the application, for example, the md5 sum of
    the name attribute.

## Children

- *patterns*

- *rules*

- *actions*

- *tags*

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
