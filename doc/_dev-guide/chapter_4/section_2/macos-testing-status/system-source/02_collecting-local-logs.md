---
title: Collecting local macOS logs
description: >-
  This post explains how you can collect local log messages and provides some
  details about the integration problems.
id: dev-macos-local-logs
---

An oversimplification of what the system() source does internally is that it reads the files where the given operating system's stores the logs. Unfortunately, the mapping for the same does not exist anymore for modern macOS operating systems, that resulted in a temporary solution in syslog-ng earlier.&#x20;

On macOS, log files are stored in multiple locations.&#x20;

* `"~Library/Logs"` is your current Mac user account's user-specific application log folder.
* `"/Library/Logs"` is the system-wide application log folder.
* `"/var/log/syslog.log"` generally contains logs for low-level system services and kernel logs. (These are the log files one is primarily concerned with)&#x20;

Given that the expected behavior of system() source is to display system and kernel logs, to achieve this using a file() source driver, earlier syslog-ng versions simply implemented the macOS system() source via: \
\
`file("/var/log/system.log" follow-freq(1));`

While reading this regular text file (`/var/log/system.log`) can be a good workaround for macOS, but the original intention with `system()` source is to replace the given system's syslog implementation and receive messages directly, or in case that's not possible (for example with systemd-journal), just read system logs in a native manner.&#x20;

In this specific case, `/var/log/system.log` is a filtered textual _output_ of Apple's syslogd and not obtained through native methods, also contains nowadays a very limited set of useful information.

MacOS uses its own structured/binary logging mechanism called [ASL](https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages\_iPhoneOS/man3/asl.3.html), which is a replacement for the standard `syslog()` interface on other operating systems. ASL provides a slew of read/query/search methods as well.&#x20;

Work on this front isn't being done as this will soon be deprecated in favour of a higher level [OSlog](https://developer.apple.com/documentation/oslog) facility, therefore the darwin-oslog() native macOS OSLog module is added and become the default system() source on macOS 10.15 Catalina and above.&#x20;
