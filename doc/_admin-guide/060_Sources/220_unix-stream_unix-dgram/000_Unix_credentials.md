---
title: UNIX credentials and other metadata
id: adm-src-unix-meta
description: >-
    Starting with syslog-ng OSE 3.6, the unix-stream() and unix-dgram()
    sources automatically extract the available UNIX credentials and other
    metainformation from the received log messages.
---

The syslog-ng OSE application can extract the following information on 
Linux and FreeBSD platforms (examples show the value of the macro for the `su - myuser`
command). Similar information is available for the
[[systemd-journal source]].  

| Macro             | Description                                     |
|---|---|
| ${.unix.cmdline} | The name (without the path) and command-line options of the executable belonging to the PID that sent the message. For example, su - myuser |
| ${.unix.exe}     | The path of the executable belonging to the PID that sent the message. For example, /usr/bin/su |
| ${.unix.gid}     | The group ID (GID) corresponding to the UID of the application that sent the log message. Note that this is the ID number of the group, not its human-readable name. For example, 0         |
| ${.unix.pid}     | The process ID (PID) of the application that sent the log message. For example, 774.         |
|                   | Note that on every UNIX platforms, if the system() source uses sockets, it will overwrite the PID macro with the value of ${.unix.pid}, if it is available. |
| ${.unix.uid}     | The user ID (UID) of the application that sent the log message. Note that this is the ID number of the user, not its human-readable name. For example, 0     |
