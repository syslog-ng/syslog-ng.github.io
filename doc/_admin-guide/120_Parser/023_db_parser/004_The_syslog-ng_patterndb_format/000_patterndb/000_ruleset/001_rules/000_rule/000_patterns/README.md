---
title: 'Element: patterns'
short_title: patterns
id: adm-parser-db-elem-patterns-rule
---

## Location

/ patterndb / ruleset / rules / rule / patterns

## Description

An element containing the patterns of the rule. If a *\<patterns\>*
element contains multiple *\<pattern\>* elements, the class of the
*\<rule\>* is assigned to every syslog message matching any of the
patterns.

## Attributes

N/A

## Children

- *pattern*: A pattern describing a log message. This element is also
    called message pattern. For example:

    ```xml
    <pattern>+ ??? root-</pattern>
    ```

    **NOTE:** Support for XML entities is limited, you can use only the
    following entities: **&amp; &lt; &gt; &quot; &apos;**. User-defined
    entities are not supported.
    {: .notice--info}

- *description*: OPTIONAL --- A description of the pattern or the log
    message matching the pattern.

- *urls*

- *values*

- *examples*

### Example

```xml
<patterns>
    <pattern>Accepted @QSTRING:SSH.AUTH_METHOD: @ for@QSTRING:SSH_USERNAME: @from\ @QSTRING:SSH_CLIENT_ADDRESS: @port @NUMBER:SSH_PORT_NUMBER:@ ssh2</pattern>
</patterns>
```
