---
title: PostgreSQL csvlog parser options
id: adm-parser-postgresql-opt
---

The postgresql-csvlog-parser() has the following options:

## on-type-error()

|  Type:|      string|
|Default:|   |

*Description:* Specifies the action to be performed when casting a parsed value to specific data type fails.

**NOTE:** Note that the `flags(drop-invalid)` option and the `on-error()` global option also affects the behavior. 
{: .notice--info}

{% include doc/admin-guide/options/prefix.md %}
