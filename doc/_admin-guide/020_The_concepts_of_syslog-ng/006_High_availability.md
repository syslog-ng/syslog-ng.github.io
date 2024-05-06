---
title: High availability support
id: adm-conc-ha
description: >-
    Multiple syslog-ng servers can be run in fail-over mode. The syslog-ng
    application does not include any internal support for this, as
    clustering support must be implemented on the operating system level. 
---

A tool that can be used to create UNIX clusters is Heartbeat (for details,
see [this page](http://www.linux-ha.org/wiki/Main_Page/)).
