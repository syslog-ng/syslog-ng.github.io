---
title: The philosophy of syslog-ng
id: adm-conc-phil
description: >-
    Typically, syslog-ng is used to manage log messages and implement
    centralized logging, where the aim is to collect the log messages of
    several devices on a single, central log server.
---

The different devices --- called syslog-ng clients --- all run syslog-ng,
and collect the log messages from the various applications, files, and
other *sources*. The clients send all important log messages to the
remote syslog-ng server, which sorts and stores them.
