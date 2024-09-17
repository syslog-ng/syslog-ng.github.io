---
title: 'Element: tags'
short_title: tags
id: adm-parser-db-elem-tags
description: >-
    An element containing custom keywords (tags) about the
    messages matching the patterns. The tags can be used to label specific
    events (for example, user logons). It is also possible to filter on
    these tags later (for details, see Tagging messages). Starting with
    {{ site.product.name }} 3.2, the list of tags assigned to a
    message can be referenced with the ${TAGS} macro. (optional)
---

## Location

/ patterndb / ruleset / tags

## Attributes

N/A

## Children

- *tag*: OPTIONAL --- A keyword or tags applied to messages matching
    the rule.

### Example

```xml
<tags><tag>UserLogin</tag></tags>
```
