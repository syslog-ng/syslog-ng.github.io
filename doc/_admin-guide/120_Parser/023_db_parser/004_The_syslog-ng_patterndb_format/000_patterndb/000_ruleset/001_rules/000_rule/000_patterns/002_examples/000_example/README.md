---
title: 'Element: example'
short_title: example
id: adm-parser-db-elem-example
---

## Location

/ patterndb / ruleset / rules / rule / patterns / examples / example

## Description

OPTIONAL --- A container element for a sample log message.

## Attributes

N/A

## Children

- *test\_message*: OPTIONAL --- A sample log message that should match
    this pattern. For example:

    ```xml
    <test_message program="myapplication">Content filter has been enabled</test_message>
    ```

  - *program*: The program pattern of the test message. For example:

    ```xml
    <test_message program="proftpd">ubuntu (::ffff:192.168.2.179[::ffff:192.168.2.179]) - FTP session closed.</test_message>
    ```

- *test\_values*: OPTIONAL --- A container element to test the results
    of the parsers used in the pattern.

  - *test\_value*: OPTIONAL --- The expected value of the parser
        when matching the pattern to the test message. For example:

    ```xml
    <test_value name=".dict.ContentFilter">enabled</test_value>
    ```

    - *name*: The name of the parser to test.

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
