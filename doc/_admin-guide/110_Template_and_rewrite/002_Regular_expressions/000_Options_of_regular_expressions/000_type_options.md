---
title: The type() options of regular expressions
id: adm-temp-regexp-type
description: >-
    By default, syslog-ng OSE uses PCRE-style regular expressions, which are
    supported on every platform starting with syslog-ng OSE version 3.1. To
    use other expression types, add the type() option after the regular
    expression.
---

The syslog-ng OSE application supports the following type() options:

## Perl Compatible Regular Expressions (pcre)

*Description:* Uses Perl Compatible Regular Expressions (PCRE). If the
type() parameter is not specified, syslog-ng OSE uses PCRE regular
expressions by default.

For more information about the flags() options of PCRE regular
expressions, see [[The flags() options of regular expressions]].

## Literal string searches (string)

*Description:* Matches the strings literally, without regular expression
support. By default, only identical strings are matched. For partial
matches, use the **flags(\"prefix\")** or the **flags(\"substring\")**
flags.

For more information about the flags() options of literal string
searches, see [[The flags() options of regular expressions]].

## Glob patterns without regular expression support (glob)

*Description:* Matches the strings against a pattern containing \* and ?
wildcards, without regular expression and character range support. The
advantage of glob patterns to regular expressions is that globs can be
processed much faster.

- \*: matches an arbitrary string, including an empty string

- ?: matches an arbitrary character

- The wildcards can match the / character.

- You cannot use the \* and ? literally in the pattern.
