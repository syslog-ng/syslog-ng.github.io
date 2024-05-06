---
title: Why is syslog-ng needed?
id: adm-intro-why
description: >-
    Log messages contain information about the events happening on the
    hosts. Monitoring system events is essential for security and system
    health monitoring reasons.
---

The original syslog protocol separates messages based on the priority of
the message and the facility sending the message. These two parameters
alone are often inadequate to consistently classify messages, as many
applications might use the same facility, and the facility itself is not
even included in the log message. To make things worse, many log
messages contain unimportant information. The syslog-ng application
helps you to select only the really interesting messages, and forward
them to a central server.

Company policies or other regulations often require log messages to be
archived. Storing the important messages in a central location greatly
simplifies this process.
