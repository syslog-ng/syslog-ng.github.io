---
title: Setting match variables with the set-matches() rewrite rule
short_title: Setting match variables
id: adm-temp-match
---

Match macros (**\$1, \$2, \... \$255**) are temporary variables. You can
use them for general purposes when operating with list-like items. For
example, the [[match()]] filter stores capture
group results in match variables when the store-matches flag is
set, or the [[JSON parser]] produces match variables
if the parsed JSON data is an array.

It is possible to set match variables in a single operation with the
set-matches() rewrite function. set-matches() uses syslog-ng OSE list
expressions to set **\$1, \$2, \... \$255**, so it can be considered as
a conversion function between syslog-ng OSE lists and match variables.

{% include doc/admin-guide/notes/convert-match-var.md %}

**TIP:** To reset match variables to be empty, use the unset-matches()
rewrite rule.
{: .notice--info}

**Declaration**

```config
rewrite <name_of_the_rule> {
    set-matches("<list-expression or list-based template function>");
};
```

### Example usage for the set-matches() rewrite function

In the following two examples, **\$1**, **\$2**, and **\$3** will be set
to **foo**, **bar**, and **baz**, respectively.

**Example using string:**

```config
rewrite {
    set-matches("foo,bar,baz");
};
```

**Example using a list template function:**

```config
rewrite {
    set-matches("$(explode ':' 'foo:bar:baz')");
};
```
