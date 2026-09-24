---
title: Structuring macros, metadata, and other value-pairs
id: adm-structuring-macros
description: >-
    Available in {{ site.product.short_name }} 3.3 and later.

    The {{ site.product.short_name }} application allows you to select and construct
    name-value pairs from any information already available about the log
    message, or extracted from the message itself.
---

You can directly use this structured information in components that consume
name-value pairs, for example:

- destinations such as [[amqp()|adm-dest-amqp]], [[mongodb()|adm-dest-mongodb]],
    and [[stomp()|adm-dest-stomp]];
- template functions such as [[format-json()|adm-temp-func#format-json]],
    [[format-welf()|adm-temp-func#format-welf]], and
    [[format-cef-extension()|adm-temp-func#format-cef-extension]];
- parsers and rewrite rules such as [[map-value-pairs()|adm-temp-map-value]]
    and [[groupset()|adm-spec-value-pairs#set-and-groupset-rewrite-rules]];
- other components that accept [[value-pairs()|adm-spec-value-pairs]] configuration.

In destinations and other configuration options, use the `value-pairs()`
syntax. Template functions that support value-pairs use a command-line-like
syntax instead, for example `--scope`, `--exclude`, `--key`, and `--pair`.

For the complete list of selection, exclusion, pair, and transformation
parameters, see the [[value-pairs options|adm-spec-value-pairs#value-pairs-options]]
reference.
