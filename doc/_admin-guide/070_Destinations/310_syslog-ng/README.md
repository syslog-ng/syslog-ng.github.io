---
title: 'syslog-ng(): Forward logs to another syslog-ng node'
short_title: syslog-ng
id: adm-dest-syslogng
description: >-
    The syslog-ng() destination driver forwards log messages to another
    syslog-ng node in EWMM format.
---

The [[Enterprise-wide message model (EWMM)]] 
allows you to deliver structured messages from the initial
receiving syslog-ng component right up to the central log server,
through any number of hops. It does not matter if you parse the messages
on the client, on a relay, or on the central server, their structured
results will be available where you store the messages. Optionally, you
can also forward the original raw message as the first syslog-ng
component in your infrastructure has received it, which is important if
you want to forward a message for example, to a SIEM system. To make use
of the enterprise-wide message model, you have to use the syslog-ng()
destination on the sender side, and the
[[default-network-drivers() source]] on the receiver side.

The syslog-ng() destination driver is available in version 3.16 and
later. The node that receives this message must use the
[[default-network-drivers() source]]
to properly handle the messages.

The following is a sample log message in EWMM format.

> <13>1 2018-05-13T13:27:50.993+00:00 my-host @syslog-ng - - -
> {"MESSAGE":"<34>Oct 11 22:14:15 mymachine su: 'su root' failed for username on
> /dev/pts/8","HOST_FROM":"my-host","HOST":"my-host","FILE_NAME":"/tmp/in","._TAGS":".source.s_file"}

**Declaration**

```config
destination d_ewmm {
    syslog-ng(server("192.168.1.1"));
};
```

Note in this driver you have to set the address of the destination
server using the server() parameter (in some other destinations, this
parameter does not have an explicit name).
