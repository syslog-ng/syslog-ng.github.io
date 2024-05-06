---
title: Triggering actions for identified messages
id: adm-parser-db-trigger
description: >-
    The syslog-ng OSE application can generate (trigger) messages
    automatically if certain events occur, for example, a specific log
    message is received, or the correlation timeout of a message expires.
    Basically, you can define messages for every pattern database rule that
    are emitted when a message matching the rule is received. Triggering
    messages is often used together with message correlation, but can also
    be used separately. When used together with message correlation, you can
    also create a new correlation context when a new message is received.
---

The generated message is injected into the same place where the
db-parser() statement is referenced in the log path. To post the
generated message into the internal() source instead, use the
**inject-mode()** option in the definition of the parser.

## Example: Sending triggered messages to the internal() source

To send the generated messages to the internal source, use the
**inject-mode(internal)** option:

```config
parser p_db {
    db-parser(
        file("mypatterndbfile.xml")
        inject-mode(internal)
    );
};
```

To inject the generated messages where the pattern database is
referenced, use the **inject-mode(pass-through)** option:

```config
parser p_db {
    db-parser(
        file("mypatterndbfile.xml")
        inject-mode(pass-through)
    );
};
```

The generated message must be configured in the pattern database rule.
It is possible to create an entire message, use macros and values
extracted from the original message with pattern database, and so on.

## Example: Generating messages for pattern database matches

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

## Example: Generating messages with inherited values

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

### Example: Creating a new context from an action

In syslog-ng OSE version 3.8 and newer, you can create a new context as
an action. For details, see
[[Element: create-context]]. 
The following example creates a new context whenever the rule matches.
The new context receives **1000** as ID, and **program** as scope, and
the content set in the \<message\> element of the \<create-context\>
element.

```xml
<rule provider='test' id='12' class='violation'>
    <patterns>
    <pattern>simple-message-with-action-to-create-context</pattern>
    </patterns>
    <actions>
    <action trigger='match'>
        <create-context context-id='1000' context-timeout='60' context-scope='program'>
        <message inherit-properties='context'>
            <values>
            <value name='MESSAGE'>context message</value>
            </values>
        </message>
        </create-context>
    </action>
    </actions>
</rule>
```

For details on configuring actions, see the description of the pattern
database format.
