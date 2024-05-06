---
title: Options of Regular expression parsers
id: adm-parser-regexp-opt
---

The Regular expression parser has the following options.

{% include doc/admin-guide/options/source-flags.md %}

## patterns()

|  Synopsis:|    patterns(\"pattern1\" \"pattern2\")|
|  Mandatory:|   yes|

*Description:* The regular expression patterns that you want to find a
match. regexp-parser() supports multiple patterns, and stops the
processing at the first successful match.

{% include doc/admin-guide/options/prefix.md %}

This parser does not have a default prefix. To configure a custom
prefix, use the following format:

```config
parser p_regexp{
    regexp-parser(
        patterns( ... )
        prefix("myprefix.")
    );
};
```

{% include doc/admin-guide/options/template-macro.md %}
