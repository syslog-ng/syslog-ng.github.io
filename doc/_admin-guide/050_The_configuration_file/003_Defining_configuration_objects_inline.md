---
title: Defining configuration objects inline
id: adm-conf-inline
description: >-
    Starting with syslog-ng OSE 3.4, you can define configuration objects
    inline, where they are actually used, without having to define them in a
    separate placement. This is useful if you need an object only once, for
    example, a filter or a rewrite rule. Every object can be defined inline:
    sources, destinations, filters, parsers, rewrite rules, and so on.
---

To define an object inline, use braces instead of parentheses.  
That is, instead of `<object-type> (<object-id>);`,
 you use `<object-type>{<object-definition>};`

## Example: Using inline definitions

The following two configuration examples are equivalent. The first one
uses traditional statements, while the second uses inline definitions.

```config
source s_local {
    system();
    internal();
};

destination d_local {
    file("/var/log/messages");
};

log {
    source(s_local);
    destination(d_local);
};

log {
    source {
        system();
        internal();
    };
    destination {
        file("/var/log/messages");
    };
};
```
