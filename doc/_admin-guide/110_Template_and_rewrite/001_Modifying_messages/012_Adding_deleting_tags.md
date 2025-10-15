---
title: Adding and deleting tags
id: adm-temp-add-del-tag
description: >-
    This section describes how to add or delete a tag in {{ site.product.short_name }}.
---

To add or delete a tag, you can use rewrite rules. To add a tag, use the
following syntax:

```config
rewrite <name_of_the_rule> {
    set-tag("<tag-to-add>");
};
```

To delete a tag, use the following syntax:

```config
rewrite <name_of_the_rule> {
    clear-tag("<tag-to-delete>");
};
```

Templates (macros, template functions) can be used when specifying tags,
for example, **set-tag(\"dyn::$HOST\");**.

From version 3.27 of {{ site.product.short_name }} it is possible to set tags based on the value of a specified condition.

Configuration example:

```config
rewrite { set-tag("tag" condition(match("test" value("MSG")))); };
```
