---
title: 'Using wildcards, special characters, and regular expressions in
  filters'
short_title: Using wildcards in filters
id: adm-log-filters-regexp
description: >-
  The host(), match(), and program() filter functions accept regular
  expressions as parameters. The exact type of the regular expression to
  use can be specified with the type() option. By default, syslog-ng OSE
  uses PCRE regular expressions.
---

In regular expressions, the asterisk (**\***) character means 0, 1, or
any number of the previous expression. For example, in the **f\*ilter**
expression the asterisk means 0 or more f letters. This expression
matches for the following strings: ilter, filter, ffilter, and so on. To
achieve the wildcard functionality commonly represented by the asterisk
character in other applications, use **.\*** in your expressions, for
example, **f.\*ilter**.

Alternatively, if you do not need regular expressions, only wildcards,
use **type(glob)** in your filter:

## Example: Filtering with widcards

The following filter matches on hostnames starting with the myhost
string, for example, on myhost-1, myhost-2, and so on.

```config
filter f_wildcard {host("myhost*" type(glob));};
```

For details on using regular expressions in syslog-ng OSE, see Using
wildcards, special characters, and regular expressions in filters.

To filter for special control characters like the carriage return (CR),
use the **\\r** escape prefix in syslog-ng OSE version 3.0 and 3.1. In
syslog-ng OSE 3.2 and later, you can also use the \\x escape prefix and
the ASCII code of the character. For example, to filter on carriage
returns, use the following filter:

```config
filter f_carriage_return {match("\x0d" value ("MESSAGE"));};
```
