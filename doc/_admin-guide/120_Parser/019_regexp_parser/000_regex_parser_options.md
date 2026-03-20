---
title: Options of Regular expression parsers
parser: regexp
id: adm-parser-regexp-opt
description: >-
    This section describes the options of the regexp-parser() in {{ site.product.short_name }}.
---

The Regular expression parser has the following options.

{% include doc/admin-guide/options/regexp-flags.md %}

## patterns()

| Synopsis: | patterns("pattern1" "pattern2") |
| Mandatory: | yes |

*Description:* The regular expression patterns that you want to find a
match. regexp-parser() supports multiple patterns, and stops the
processing at the first successful match.

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-no-prefix.md %}

{% include doc/admin-guide/options/template-macro.md %}
