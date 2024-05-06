---
title: Write your own custom destination in Java or Python
short_title: Custom destinations
id: adm-dest-custom
description: >-
    The syslog-ng OSE application is open source, so if you have the
    necessary programming skills, you can extend it if its features are not
    adequate for your particular environment or needs. You can write
    destinations and other extensions to syslog-ng OSE in C (the main
    language of syslog-ng OSE), or using its language bindings, for example,
    Java or Python.
---

- For details on extending syslog-ng OSE in Python, see
    [[python: writing custom Python destinations]].

- For details on extending syslog-ng OSE in Java, see the Getting started with implementing Java destinations

**NOTE:** If you delete all Java destinations from your configuration and
reload syslog-ng, the JVM is not used anymore, but it is still running.
If you want to stop JVM, stop syslog-ng and then start syslog-ng again.
{: .notice--info}
