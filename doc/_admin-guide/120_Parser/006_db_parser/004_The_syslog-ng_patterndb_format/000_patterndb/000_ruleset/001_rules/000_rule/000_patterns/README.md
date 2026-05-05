---
title: 'Element: patterns'
short_title: patterns
id: adm-parser-db-elem-patterns-rule
description: >-
    An element containing the patterns of the rule. If a *\<patterns\>*
    element contains multiple *\<pattern\>* elements, the class of the
    *\<rule\>* is assigned to every syslog message matching any of the
    patterns.
---

## Location

/ patterndb / ruleset / rules / rule / patterns

## Attributes

N/A

## Children

The *\<patterns\>* element can contain one or more *\<pattern\>* child elements.

- *pattern*: A pattern describing a log message that should be matched by the rule.
    The pattern uses {{ site.product.short_name }}'s pattern syntax with macros to
    capture and extract parts of the log message into named fields. For example:

    ```xml
    <pattern>+ ??? root-</pattern>
    ```

### Example

```xml
<patterns>
    <pattern>Accepted @QSTRING:SSH_AUTH_METHOD: @ for@QSTRING:SSH_USERNAME: @from\ @QSTRING:SSH_CLIENT_ADDRESS: @port @NUMBER:SSH_PORT_NUMBER:@ ssh2</pattern>
</patterns>
```
