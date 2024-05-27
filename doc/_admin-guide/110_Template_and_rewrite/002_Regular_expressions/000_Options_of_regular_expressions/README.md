---
title: Options of regular expressions
id: adm-temp-regexp-opt
description: >-
    This chapter lists regular expressions supported by {{ site.product.short_name }} Open
    Source Edition ({{ site.product.short_name }}) and their available supported type() and
    flags() options.
---

By default, {{ site.product.short_name }} uses PCRE-style regular expressions. To use
other expression types, add the **type()** option after the regular
expression.

The {{ site.product.short_name }} application supports the following regular expression
type() options:

- Perl Compatible Regular Expressions (pcre)

- Literal string searches (string)

- Glob patterns without regular expression support (glob)
