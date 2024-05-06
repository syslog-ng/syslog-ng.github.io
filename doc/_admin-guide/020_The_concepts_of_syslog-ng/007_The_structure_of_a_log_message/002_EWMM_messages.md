---
title: Enterprise-wide message model (EWMM)
id: adm-struct-ewmm
description: >-
    The following section describes the structure of log messages using the
    Enterprise-wide message model or EWMM message format.
---

The Enterprise-wide message model or EWMM allows you to deliver
structured messages from the initial receiving syslog-ng component right
up to the central log server, through any number of hops. It does not
matter if you parse the messages on the client, on a relay, or on the
central server, their structured results will be available where you
store the messages. Optionally, you can also forward the original raw
message as the first syslog-ng component in your infrastructure has
received it, which is important if you want to forward a message for
example, to a SIEM system. To make use of the enterprise-wide message
model, you have to use the [[syslog-ng() destination|adm-dest-syslogng]]
on the sender side, and the [[default-network-drivers() source|adm-src-def-netw]]
on the receiver side.

The following is a sample log message in EWMM format.

><13>1 2018-05-13T13:27:50.993+00:00 my-host @syslog-ng - - -  
>{"MESSAGE":"<34>Oct 11 22:14:15 mymachine su: 'su root' failed for username on  
>/dev/pts/8","HOST_FROM":"my-host","HOST":"my-host","FILE_NAME":"/tmp/in","._TAGS":".source.s_file"}

The message has the following parts:

- The header of the complies with the
    [[IETF-syslog messages]] RFC5424 message format,
    where the PROGRAM field is set to @syslog-ng, and the SDATA field is empty.

- The MESSAGE part is in JSON format, and contains the actual message,
    as well as any name-value pairs that syslog-ng OSE has attached to
    or extracted from the message. The \${.\_TAGS} field contains the
    identifier of the syslog-ng source that has originally received the
    message on the first syslog-ng node.

To send a message in EWMM format, you can use the
[[syslog-ng() destination driver|adm-dest-syslogng]],
or the [[format-ewmm() template function|adm-temp-func#format-ewmm]].

To receive a message in EWMM format, you can use the
[[default-network-drivers() source driver|adm-src-def-netw]],
or the [[ewmm-parser()|adm-parser-ewmm]] parser.
