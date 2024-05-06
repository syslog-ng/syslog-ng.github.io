---
title: Renaming message fields
id: adm-temp-rename
description: >-
    If you want to change the name of a field of a message, you can use
    rename() rewrite rules. This can be also achieved via using set() and
    unset() but those require extra conditions and two operation instead of
    one.
---

The rename() rewrite rule uses positional arguments and they are both
required. It supports condition rewrite. For more information, see
[[Conditional rewrites]].

**Declaration**

```config
rewrite r_rewrite_rename {
    rename("<string1>" "<string2>");
};
```

### Example usage for the rename() rewrite function

The following example renames the .app.name into .container if the
.app.name exists. Otherwise, it does nothing.

```config
rewrite r_rewrite_rename {
    rename(".app.name" ".container");
};
```
