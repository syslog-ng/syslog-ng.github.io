---
title: 'Element: examples'
short_title: examples
id: adm-parser-db-elem-examples
---

## Location

/ patterndb / ruleset / rules / rule / patterns / examples

## Description

OPTIONAL --- A container element for sample log messages that should be
recognized by the pattern. These messages can be used also to test the
patterns and the parsers.

## Attributes

N/A

## Children

- *example*

### Example

```xml
<examples>
    <example>
        <test_message>Accepted password for sampleuser from 10.50.0.247 port 42156 ssh2</test_message>
        <test_values>
            <test_value name="SSH.AUTH_METHOD">password</test_value>
            <test_value name="SSH_USERNAME">sampleuser</test_value>
            <test_value name="SSH_CLIENT_ADDRESS">10.50.0.247</test_value>
            <test_value name="SSH_PORT_NUMBER">42156</test_value>
        </test_values>
    </example>
</examples>
```
