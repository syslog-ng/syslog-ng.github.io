---
title: 'Element: patterndb'
short_title: patterndb
id: adm-parser-db-elem-patterndb
description: >-
    The container element of the pattern database.
---

## Location

/ patterndb

## Attributes

- *version*: The schema version of the pattern database. The current
    version is 4.

- *pubdate*: The publication date of the XML file.

## Children

- *ruleset*: A container element that groups log patterns, rules, and optional
    actions for a specific application or program. For details, see
    Element: ruleset.

### Example

```xml
<patterndb version='4' pub_date='2010-10-25'>
```
