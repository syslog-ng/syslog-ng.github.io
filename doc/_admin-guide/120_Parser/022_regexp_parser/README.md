---
title: Regular expression (regexp) parser
short_title: Regular expression parser
id: adm-parser-regexp
description: >-
    The syslog-ng OSE application can parse fields from a message with the
    help of regular expressions. This can be also achieved with the match()
    filter, by setting the store-matches flag, but the regexp-parser()
    offers more flexibility, like multiple patterns and setting the prefix
    of the created name-value pairs.
---

**NOTE:** The regexp-parser() can create additional name-value pairs only if
\"named capture groups\" are used in the regular expression, for example
(?\<test\_field\>\\w+). For more information, see \"named capture
groups\" in [PCRE
documentation](https://www.pcre.org/current/doc/html/pcre2pattern.html#SEC16).
{: .notice--info}

For more information about regular expressions in syslog-ng OSE, see
[[Regular expressions]].
For example:

**Declaration**

```config
parser p_regexp {
    regexp-parser(
    patterns( ... )
    );
};
```

### Example: Using a regexp-parser()

In the following example, the incoming log message is the following:

>Apr 20 11:09:46 test_field -> test_value

The regexp-parser inserts the .regexp. prefix before all extracted
name-value pairs. The destination is a file, that uses the format-json
template function. Every name-value pair that begins with a dot (.)
character will be written to the file (dot-nv-pairs). The log line
connects the source, the parser and the destination.

```config
source s_network {
    network(
        port(21514)
        flags(no-parse)
    );
};
parser p_regexp {
    regexp-parser(
        patterns(".*test_field -> (?<test_field>.*)$")
        prefix(".regexp.")
    );
};
destination d_file {
    file(
        "/tmp/test.json"
        template("$(format-json --scope dot-nv-pairs)\n")
    );
};
log {
    source(s_network);
    parser(p_regexp);
    destination(d_file);
};
```

You can also define the parser inline in the log path.

```config
source s_network {
    network(
        port(21514)
        flags(no-parse)
    );
};
destination d_file {
    file(
        "/tmp/test.json"
        template("$(format-json --scope dot-nv-pairs)\n")
    );
};
log {
    source(s_network);
    parser{
        regexp-parser(
            patterns(".*test_field -> (?<test_field>.*)$")
            prefix(".regexp.")
        );
    };
    destination(d_file);
};
```

You can set multiple patterns:

```config
parser p_regexp {
    regexp-parser(
        patterns(".*test_field -> (?<test_field>.*)$", ".*other_format: (?<foo>.*)$")
        prefix(".regexp.")
    );
};
```
