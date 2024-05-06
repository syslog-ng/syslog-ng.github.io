---
title: afsocket
description: >-
  The afsocket module provides socket based transports for syslog-ng, such as
  the udp(), tcp() and syslog() drivers. This module is compiled with SSL
  support.
id: dev-macos-mod-sup-afsocket
---

This module contains the following plugins:

|                                Plugin                               |    Status    |
| :-----------------------------------------------------------------: | :----------: |
|           [Network ( Source )](network-source-driver)               |    Tested    |
|      [Network ( Destination )](network-destination-driver)          |    Tested    |
|      [Syslog ( Source )](syslog-source-destination-driver)          |    Tested    |
|    [Syslog ( Destination )](syslog-source-destination-driver)       |    Tested    |
|                  [TLS Encryption](tls-encryption/)                  |    Tested    |
|         [unix-stream (Source)](unix-stream-source-driver)           |    Tested    |
|    [unix-stream (Destination)](unix-stream-destination-driver)      |    Tested    |
|    [unix-dgram (Source)](unix-dgram-source-destination-driver)      |    Tested    |
| [unix-dgram (Destination)](unix-dgram-source-destination-driver)    |    Tested    |
|                      Systemd-syslog ( Source )                      | Incompatible |
|                       TCP (Source/Destination)                      |   Obsolete   |
|                      TCP6 (Source/Destination)                      |   Obsolete   |
|                       UDP (Source/Destination)                      |   Obsolete   |
|                      UDP6 (Source/Destination)                      |   Obsolete   |
