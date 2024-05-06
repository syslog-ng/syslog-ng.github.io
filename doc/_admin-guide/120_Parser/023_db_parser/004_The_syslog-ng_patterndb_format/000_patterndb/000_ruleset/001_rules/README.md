---
title: 'Element: rules'
short_title: rules
id: adm-parser-db-elem-rules
---

## Location

/ patterndb / ruleset / rules

## Description

A container element for the rules of the ruleset.

## Attributes

N/A

## Children

- *rule*

### Example

```xml
<rules>
    <rule provider='me' id='182437592347598' class='system'>
        <patterns>
            <pattern>Accepted @QSTRING:SSH.AUTH_METHOD: @ for@QSTRING:SSH_USERNAME: @from\ @QSTRING:SSH_CLIENT_ADDRESS: @port @NUMBER:SSH_PORT_NUMBER:@ ssh2</pattern>
        </patterns>
    </rule>
</rules>
```
