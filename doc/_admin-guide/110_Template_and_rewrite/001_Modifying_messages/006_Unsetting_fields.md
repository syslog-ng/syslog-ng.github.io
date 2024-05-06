---
title: Unsetting message fields
id: adm-temp-unset
description: >-
    You can unset macros or fields of the message, including any
    user-defined macros created using parsers (for details, see
    parser: Parse and segment structured messages and
    db-parser: Process message content with a pattern database (patterndb)
    Note that the unset operation completely deletes any previous value of
    the field that you apply it on.
---

{% include doc/admin-guide/notes/hard-macros.md %}

Use the following syntax:

**Declaration**

```config
rewrite <name_of_the_rule> {
    unset(value("<field-name>"));
};
```

### Example: Unsetting a message field

The following example unsets the HOST field of the message.

```config
rewrite r_rewrite_unset{
    unset(value("HOST"));
};
```

To unset a group of fields, you can use the **groupunset()** rewrite
rule.

## Declaration of group unset

```config
rewrite <name_of_the_rule> {
    groupunset(values("<expression-for-field-names>"));
};
```

### Example: Unsetting a group of fields

The following rule clears all SDATA fields:

```config
rewrite r_rewrite_unset_SDATA{
    groupunset(values(".SDATA.*"));
};
```
