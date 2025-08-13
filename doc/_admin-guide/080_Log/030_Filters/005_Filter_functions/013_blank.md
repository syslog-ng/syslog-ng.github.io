---
title: blank()
id: adm-log-filters-blank
description: >-
    This section describes blank() filter function in {{ site.product.short_name }}.
---

*Synopsis:* blank("MESSAGE")


*Description:* The blank() filter selects messages where the specified key-value pair is considered blank. A value is considered blank if it meets any of the following conditions:

* It is not set
* It is an empty string ("")
* It contains only whitespace characters
* It is an empty list
* It is a boolean value explicitly set to false

## Example: Select log messages where the field MESSAGE is blank

```config
blank("MESSAGE")
```