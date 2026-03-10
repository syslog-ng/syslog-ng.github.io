---
title: Notes about the configuration syntax and parsing
id: adm-conf-syn-notes
description: >-
    Things to consider when editing a {{ site.product.short_name }}
    configuration file. 
---

When you are editing the {{ site.product.short_name }} configuration file, note the
following points:

- The configuration file can contain a maximum of 6665 source destination / log elements.

- The configuration file parser can internally stack a maximum of 20,000 token elements by default.
    This should normally be sufficient, but if you receive the `Too many tokens found during parsing. Consider setting a higher value for the SYSLOG_NG_CONFIG_MAX_STACK_DEPTH environment variable (default: 20,000) and restarting {{ site.product.short_name }}`
    error message when {{ site.product.short_name }} starts, you can try increasing
    the stack size using the mentioned `SYSLOG_NG_CONFIG_MAX_STACK_DEPTH` environment variable.

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** Be cautious when setting a higher value for `SYSLOG_NG_CONFIG_MAX_STACK_DEPTH`, as it increases memory consumption during parsing and potentially at runtime as well (because the increased max stack depth allows larger configuration files, which likely require more memory).
    {: .notice--danger}

- When writing the names of options and parameters (or other reserved
    words), the hyphen (-) and underscore (_) characters are
    equivalent, for example, **max-connections(10)** and
    **max_connections(10)** are both correct.

- Numbers can be prefixed with + or - to indicate positive or negative
    values. Numbers beginning with zero (0) or 0x are treated as octal
    or hexadecimal numbers, respectively.

    Starting with {{ site.product.short_name }} version 3.5, you can use suffixes for
    kilo-, mega-, and gigabytes. Use the Kb, Mb, or Gb suffixes for the
    base-10 version, and Kib, Mib, or Gib for the base-2 version. That
    is, 2MB means 2000000, while 2MiB means 2097152. For example, to set
    the log-msg-size() option to 2000000 bytes, use
    **log-msg-size(2Mb)**.

- You can use commas (,) to separate options or other parameters for
    readability, {{ site.product.short_name }} completely ignores them. The following
    declarations are equivalent:

    ```config
    source s_demo_stream {
        unix-stream("<path-to-socket>" max-connections(10) group(log));
    };
    
    source s_demo_stream {
        unix-stream("<path-to-socket>", max-connections(10), group(log));
    };
    ```  

- When enclosing object IDs (for example, the name of a destination)
    between double-quotes (\"mydestination\"), the ID can include
    whitespace as well, for example:

    ```config
    source "s demo stream" {
        unix-stream("<path-to-socket>" max-connections(10) group(log));
    };
    ```

- For notes on using regular expressions, see Regular expressions.

- You can use if {}, elif {}, and else {} blocks to configure
    conditional expressions. For details, see
    [[if-else-elif: Conditional expressions]].
