---
title: 'map-value-pairs: Rename value-pairs to normalize logs'
short_title: map-value pairs
id: adm-temp-map-value
description: >-
    The map-value-pairs() parser allows you to map existing name-value pairs
    to a different set of name-value pairs. You can rename them in bulk,
    making it easy to use for log normalization tasks (for example, when you
    parse information from different log messages, and want to convert them
    into a uniform naming scheme). You can use the normal value-pairs expressions,
    similarly to value-pairs based destinations.
---

Available in syslog-ng OSE version 3.10 and later.

**Declaration**

```config
parser parser_name {
    map-value-pairs(
        <list-of-value-pairs-options>
    );
};
```

### Example: Map name-value pairs

The following example creates a new name-value pair called username,
adds the hashed value of the .apache.username to this new name-value
pair, then adds the webserver prefix to the name of every name-value
pair of the message that starts with .apache

```config
parser p_remap_name_values {
    map-value-pairs(
        pair("username", "'($sha1 $.apache.username)")
        key('.apache.*' rekey(add-prefix("webserver")))
    );
};
```
