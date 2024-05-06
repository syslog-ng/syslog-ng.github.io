---
title: Adding and deleting tags
id: adm-temp-add-del-tag
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
for example, **set-tag(\"dyn::\$HOST\");**.
