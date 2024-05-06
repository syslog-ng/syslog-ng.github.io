---
title: The flags() options of regular expressions
id: adm-temp-regexp-flags
description: >-
  Similarly to the type() options, the flags() options are also optional
  within regular expressions.
---

The following list describes each type() option's flags() options.

## Literal string searches

Literal string searches have the following flags() options:

{% include doc/admin-guide/options/template-flags-global.md %}

{% include doc/admin-guide/options/template-flags-ignore-case.md %}

### prefix

During the matching process, patterns (also called search expressions)
are matched against the input string starting from the beginning of the
input string, and the input string is matched only for the maximum
character length of the pattern. The initial characters of the pattern
and the input string must be identical in the exact same order, and the
pattern\'s length is definitive for the matching process (that is, if
the pattern is longer than the input string, the match will fail).

#### Example: matching / non-matching patterns for the input string \'exam\'

For the input string \'exam\',

- the following patterns will match:

  - \'ex\' (the pattern contains the initial characters of the input
        string in the exact same order)

  - \'exam\' (the pattern is an exact match for the input string)

- the following patterns will not match:

  - \'example\' (the pattern is longer than the input string)

  - \'hexameter\' (the pattern\'s initial characters do not match
        the input string\'s characters in the exact same order, and the
        pattern is longer than the input string)

{% include doc/admin-guide/options/template-flags-store-matches.md %}

{% include doc/admin-guide/notes/convert-match-var.md %}

### substring

The given literal string will match when the pattern is found within the
input. Unlike flags(\"prefix\"), the pattern does not have to be
identical with the given literal string.

## Perl Compatible Regular Expressions (PCRE)

Starting with syslog-ng OSE version 3.1, PCRE expressions are supported
on every platform. If the type() parameter is not specified, syslog-ng
OSE uses PCRE regular expressions by default.

The following example shows the structure of PCRE-style regular
expressions in use.

### Example: Using PCRE regular expressions

```config
rewrite r_rewrite_subst {
    subst("a*", "?", value("MESSAGE") flags("utf8" "global"));
};
```

PCRE-style regular expressions have the following flags() options:

### disable-jit

Switches off the [just-in-time compilation function for PCRE regular
expressions](https://www.pcre.org/current/doc/html/pcre2jit.html).

### dupnames

Allows [using duplicate names for named
subpatterns](https://www.pcre.org/original/doc/html/pcrepattern.html#SEC16).

Configuration example:

```config
filter { match("(?<DN>foo)|(?<DN>bar)" value(MSG) flags(store-matches, dupnames)); };
...
destination { file(/dev/stdout template("$DN\n")); };
```

{% include doc/admin-guide/options/template-flags-global.md %}

{% include doc/admin-guide/options/template-flags-ignore-case.md %}

### newline

When configured, it changes the newline definition used in PCRE regular
expressions to accept either of the following:

- a single carriage-return

- linefeed

- the sequence carriage-return and linefeed (\\r, \\n and \\r\\n,
    respectively)

This newline definition is used when the circumflex and dollar patterns
(\^ and \$) are matched against an input. By default, PCRE interprets
the linefeed character as indicating the end of a line. It does not
affect the \\r, \\n or \\R characters used in patterns.

{% include doc/admin-guide/options/template-flags-store-matches.md %}

{% include doc/admin-guide/notes/convert-match-var.md %}

### unicode

Uses Unicode support for UTF-8 matches: UTF-8 character sequences are
handled as single characters.

### utf8

An alias for the unicode flag.

## Glob patterns without regular expression support

There are no supported flags() options for glob patterns without regular
expression support.
