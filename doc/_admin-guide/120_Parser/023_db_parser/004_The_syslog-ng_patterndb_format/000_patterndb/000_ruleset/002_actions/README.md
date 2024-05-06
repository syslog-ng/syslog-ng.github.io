---
title: 'Element: actions'
short_title: actions
id: adm-parser-db-elem-actions
---

## Location

/ patterndb / ruleset / actions

## Description

OPTIONAL --- A container element for actions that are performed if a
message is recognized by the pattern. For details on actions, see
[[Triggering actions for identified messages]].

## Attributes

N/A

## Children

- *action*

### Example: Generating messages for pattern database matches

When inserted in a pattern database rule, the following example
generates a message when a message matching the rule is received.

```xml
<actions>
    <action>
        <message>
            <values>
                <value name="MESSAGE">A log message from ${HOST} matched rule number $.classifier.rule_id</value>
            </values>
        </message>
    </action>
</actions>
```

To inherit the properties and values of the triggering message, set the
inherit-properties attribute of the \<message\> element to TRUE. That
way the triggering log message is cloned, including name-value pairs and
tags. If you set any values for the message in the \<action\> element,
they will override the values of the original message.

### Example: Generating messages with inherited values

The following action generates a message that is identical to the
original message, but its \$PROGRAM field is set to
overriding-original-program-name

```xml
<actions>
    <action>
        <message inherit-properties='TRUE'>
            <values>
                <value name="PROGRAM">overriding-original-program-name</value>
            </values>
        </message>
    </action>
</actions>
```
