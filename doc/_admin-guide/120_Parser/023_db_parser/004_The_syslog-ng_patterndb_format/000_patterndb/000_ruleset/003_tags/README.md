---
title: 'Element: tags'
short_title: tags
id: adm-parser-db-elem-tags
---

## Location

/ patterndb / ruleset / tags

## Description

OPTIONAL --- An element containing custom keywords (tags) about the
messages matching the patterns. The tags can be used to label specific
events (for example, user logons). It is also possible to filter on
these tags later (for details, see Tagging messages). Starting with
syslog-ng Open Source Edition 3.2, the list of tags assigned to a
message can be referenced with the \${TAGS} macro.

## Attributes

N/A

## Children

- *tag*: OPTIONAL --- A keyword or tags applied to messages matching
    the rule.

### Example

```xml
<tags><tag>UserLogin</tag></tags>
```
