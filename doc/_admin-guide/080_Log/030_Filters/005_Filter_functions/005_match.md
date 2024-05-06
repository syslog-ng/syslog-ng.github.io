---
title: match()
id: adm-log-filters-match
---

*Synopsis:* match(regexp) \| match(regexp value(\"MACRO\")) \| match(regexp template(\"MACROS\"))

*Description:* Match a regular expression to the headers and the message
itself (that is, the values returned by the MSGHDR and MSG macros). Note
that in syslog-ng version 2.1 and earlier, the match() filter was
applied only to the text of the message, excluding the headers. This
functionality has been moved to the message() filter.

To limit the scope of the match to a specific part of the message
(identified with a macro), use the **match(regexp value(\"MACRO\"))**
syntax. Do not include the \$ sign in the parameter of the value()
option.

The value() parameter accepts both built-in macros and user-defined ones
created with a parser or using a pattern database. For details on macros
and parsers, see [[Templates and macros]],
[[Parsing messages with comma-separated and similar values]],
and [[Using parser results in filters and templates]].

Starting with version 3.22, the match() filter can work on templates as
well. This means that you can a match against an expression combined of
macros, instead of a single macro. Note that when using a template, you
must reference macros with the \$ sign (unlike when using the value()
parameter). For example:

```config
match("^my-regular-expression" template("${HOST}|${PROGRAM}${PID}|${MESSAGE}"));
```

Using a template with a single macro is equivalent with using the
value() parameter. For example, the following two lines are equivalent:

```config
match("^my-regular-expression" value("MESSAGE"));
match("^my-regular-expression" template("${MESSAGE}"));
```
