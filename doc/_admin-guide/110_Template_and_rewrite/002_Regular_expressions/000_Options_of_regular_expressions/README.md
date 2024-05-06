---
title: Options of regular expressions
id: adm-temp-regexp-opt
description: >-
    This chapter lists regular expressions supported by syslog-ng Open
    Source Edition (syslog-ng OSE) and their available supported type() and
    flags() options.
---

By default, syslog-ng OSE uses PCRE-style regular expressions. To use
other expression types, add the **type()** option after the regular
expression.

The syslog-ng OSE application supports the following regular expression
type() options:

- Perl Compatible Regular Expressions (pcre)

- Literal string searches (string)

- [[Glob patterns without regular expression support (glob)]]
