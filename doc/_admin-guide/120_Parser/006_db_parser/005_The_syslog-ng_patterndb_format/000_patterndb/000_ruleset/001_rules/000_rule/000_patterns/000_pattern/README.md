---
title: 'Element: pattern'
short_title: pattern
id: adm-parser-db-elem-pattern-in-patterns
description: >-
    A pattern describing a log message that should be matched by the rule.
    The pattern uses {{ site.product.short_name }}'s pattern syntax with macros for
    capturing parts of the log message.
---

## Location

/ patterndb / ruleset / rules / rule / patterns / pattern

The *\<patterns\>* element may contain one or more *\<pattern\>* elements.

## Attributes

N/A

## Children

N/A (plain text content)

## Content

The text content of the *\<pattern\>* element contains the actual pattern used to match log messages.

The pattern uses {{ site.product.short_name }}'s pattern syntax, which supports:

- **Macros**: `@MACRONAME:field.name:@` or `@QSTRING:field.name:delimiter@` to capture
  and extract parts of the message into named fields
- **Literals**: Text that must match exactly
- **Wildcards**: `?` (single character), `*` (multiple characters)

For detailed information about pattern syntax and parsers, see Using pattern parsers, and Pattern parsers of {{ site.product.short_name }}.

<div class="notice--info" markdown="1" style="font-size: inherit;">
**NOTE:** For special character escaping in patterns:
- XML entities supported: **&amp; &lt; &gt; &quot; &apos;**
- For the @ character, use `@@` (syslog-ng special notation), for example: `user@@example.com`

User-defined XML entities are not supported.
</div>

## Example

A simple pattern matching a basic log message:

```xml
<pattern>+ ??? root-</pattern>
```

A more complex pattern with macros to capture SSH authentication data:

```xml
<pattern>Accepted @STRING:SSH_AUTH_METHOD:-_@ for @STRING:SSH_USERNAME:._-@ from @IPvANY:SSH_CLIENT_ADDRESS@ port @NUMBER:SSH_PORT_NUMBER@ ssh2</pattern>
```

A pattern with @ character escaping:

```xml
<pattern>user@@example.com logged in from @QSTRING:CLIENT_IP: @</pattern>
```
