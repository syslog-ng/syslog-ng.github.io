---
title: 'Element: rules'
short_title: rules
id: adm-parser-db-elem-rules
description: >-
    A container element for the rules of the ruleset.
---

## Location

/ patterndb / ruleset / rules

## Attributes

N/A

## Children

- *rule*: A rule that contains the message patterns and classification data
    used to recognize matching log messages. For details, see Element: rule.

### Example

```xml
<rules>
    <rule provider='me' id='182437592347598' class='system'>
        <patterns>
            <pattern>Accepted @QSTRING:SSH_AUTH_METHOD: @ for@QSTRING:SSH_USERNAME: @from\ @QSTRING:SSH_CLIENT_ADDRESS: @port @NUMBER:SSH_PORT_NUMBER:@ ssh2</pattern>
        </patterns>
    </rule>
</rules>
```
