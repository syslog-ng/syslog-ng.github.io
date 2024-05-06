---
title: Using filters
id: adm-log-filters-using
description: >-
    Filters perform log routing within syslog-ng: a message passes the
    filter if the filter expression is true for the particular message. If a
    log statement includes filters, the messages are sent to the
    destinations only if they pass all filters of the log path. For example,
    a filter can select only the messages originating from a particular
    host. Complex filters can be created using filter functions and logical
    boolean expressions.
---

To define a filter, add a filter statement to the syslog-ng
configuration file using the following syntax:

```config
filter <identifier> { <filter_type>("<filter_expression>"); };
```

Then use the filter in a log path, for example:

```config
log {
    source(s1);
    filter(<identifier>);
    destination(d1); 
};
```

You can also define the filter inline. For details, see
[[Defining configuration objects inline]].  

## Example: A simple filter statement

The following filter statement selects the messages that contain the
word deny and come from the host example.

```config
filter demo_filter { 
    host("example") and match("deny" value("MESSAGE"))
};

log {
    source(s1);
    filter(demo_filter);
    destination(d1);
};
```

The following example does the same, but defines the filter inline.

```config
log {
    source(s1);
    filter { host("example") and match("deny" value("MESSAGE")) };
    destination(d1);
};
```
