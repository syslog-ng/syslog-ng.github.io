---
title: Notes about the configuration syntax
id: adm-conf-syn-notes
---

When you are editing the syslog-ng configuration file, note the
following points:

- The configuration file can contain a maximum of 6665 source /
    destination / log elements.

- When writing the names of options and parameters (or other reserved
    words), the hyphen (-) and underscore (_) characters are
    equivalent, for example, **max-connections(10)** and
    **max_connections(10)** are both correct.

- Numbers can be prefixed with + or - to indicate positive or negative
    values. Numbers beginning with zero (0) or 0x are treated as octal
    or hexadecimal numbers, respectively.

    Starting with syslog-ng OSE version 3.5, you can use suffixes for
    kilo-, mega-, and gigabytes. Use the Kb, Mb, or Gb suffixes for the
    base-10 version, and Kib, Mib, or Gib for the base-2 version. That
    is, 2MB means 2000000, while 2MiB means 2097152. For example, to set
    the log-msg-size() option to 2000000 bytes, use
    **log-msg-size(2Mb)**.

- You can use commas (,) to separate options or other parameters for
    readability, syslog-ng completely ignores them. The following
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

- For notes on using regular expressions, see
    [[Regular expressions]].
- You can use if {}, elif {}, and else {} blocks to configure
    conditional expressions. For details, see
    [[if-else-elif: Conditional expressions]].
