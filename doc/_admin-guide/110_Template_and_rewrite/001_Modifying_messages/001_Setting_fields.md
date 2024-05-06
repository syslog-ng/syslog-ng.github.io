---
title: Setting message fields to specific values
id: adm-temp-set
---

To set a field of the message to a specific value, you have to:

- define the string to include in the message, and

- select the field where it should be included.

You can set the value of available macros, for example, HOST, MESSAGE,
PROGRAM, or any user-defined macros created using parsers (for details,
see [[parser: Parse and segment structured messages]] and
[[db-parser: Process message content with a pattern database (patterndb)]].
Note that the rewrite operation completely replaces any previous value of that field.

{% include doc/admin-guide/notes/hard-macros.md %}

Use the following syntax:

**Declaration**

```config
rewrite <name_of_the_rule> {
    set("<string to include>", value(<field name>));
};
```

### Example: Setting message fields to a particular value

The following example sets the HOST field of the message to myhost.

```config
rewrite r_rewrite_set{
    set("myhost", value("HOST"));
};
```

The following example appends the \"suffix\" string to the MESSAGE
field:

```config
rewrite r_rewrite_set{
    set("$MESSAGE suffix", value("MESSAGE"));
};
```

For details on rewriting SDATA fields, see
[[Creating custom SDATA fields]].
You can also use the following options in rewrite rules that use the
set() operator.

```config
rewrite <name_of_the_rule> {
    set("<string to include>", value(<field name>), on-error("fallback-to-string");
};
```

**NOTE:** The severity and facility fields can only be set by the
set-severity() rewrite functions.
{: .notice--info}

For more information, see [[Setting severity with the set-severity() rewrite function]].
