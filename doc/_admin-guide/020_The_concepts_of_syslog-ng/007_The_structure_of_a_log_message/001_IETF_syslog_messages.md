---
title: IETF-syslog messages
id: adm-struct-ietf
description: >-
    This section describes the format of a syslog message, according to the
    [IETF-syslog protocol](https://tools.ietf.org/html/rfc5424). 
---

A syslog message consists of the following parts:

- [[HEADER|adm-struct-ietf#the-header-message-part]] (includes the [[PRI|adm-struct-ietf#the-pri-message-part]] as well)
- [[STRUCTURED-DATA|adm-struct-ietf#the-structured-data-message-part]]
- [[MSG|adm-struct-ietf#the-msg-message-part]]

The following is a sample syslog message (source: <https://tools.ietf.org/html/rfc5424>):

><34>1 2003-10-11T22:14:15.003Z mymachine.example.com su - ID47 - BOM'su root' failed for lonvick on /dev/pts/8

The message corresponds to the following format:

>\<priority\>VERSION ISOTIMESTAMP HOSTNAME APPLICATION PID MESSAGEID STRUCTURED-DATA MSG

- Facility is 4, severity is 2, so PRI is 34.

- The VERSION is 1.

- The message was created on 11 October 2003 at 10:14:15pm UTC, 3
    milliseconds into the next second.

- The message originated from a host that identifies itself as
    \"mymachine.example.com\".

- The APP-NAME is \"su\" and the PROCID is unknown.

- The MSGID is \"ID47\".

- The MSG is \"\'su root\' failed for lonvick\...\", encoded in UTF-8.

- In this example, the encoding is defined by the BOM:

    The byte order mark (BOM) is a Unicode character used to signal the
    byte-order of the message text.

- There is no STRUCTURED-DATA present in the message, this is
    indicated by \"-\" in the STRUCTURED-DATA field.

The HEADER part of the message must be in plain ASCII format, the
parameter values of the STRUCTURED-DATA part must be in UTF-8, while the
MSG part should be in UTF-8. The different parts of the message are
explained in the following sections.

## The PRI message part

The PRI part of the syslog message (known as Priority value) represents
the Facility and Severity of the message. Facility represents the part
of the system sending the message, while severity marks its importance.
The Priority value is calculated by first multiplying the Facility
number by 8 and then adding the numerical value of the Severity.

{% include doc/admin-guide/facility-severity.md %}

## The HEADER message part

The HEADER part contains the following elements:

- *VERSION*: Version number of the syslog protocol standard. Currently
    this can only be 1.

- *ISOTIMESTAMP*: The time when the message was generated in the ISO
    8601 compatible standard timestamp format
    (yyyy-mm-ddThh:mm:ss+-ZONE), for example:
    2006-06-13T15:58:00.123+01:00.

- *HOSTNAME*: The machine that originally sent the message.

- *APPLICATION*: The device or application that generated the message

- *PID*: The process name or process ID of the syslog application that
    sent the message. It is not necessarily the process ID of the
    application that generated the message.

- *MESSAGEID*: The ID number of the message.

**NOTE:** The syslog-ng application supports other timestamp formats as
well, like ISO, or the PIX extended format. The timestamp used in the
IETF-syslog protocol is derived from RFC3339, which is based on ISO8601.
For details, see the ts-format() option in [[Global options]].
{: .notice--info}

The syslog-ng OSE application will truncate the following fields:

- If *APP-NAME* is longer than 48 characters it will be truncated to
    48 characters.

- If *PROC-ID* is longer than 128 characters it will be truncated to
    128 characters.

- If *MSGID* is longer than 32 characters it will be truncated to 32
    characters.

- If *HOSTNAME* is longer than 255 characters it will be truncated to
    255 characters.

## The STRUCTURED-DATA message part

The STRUCTURED-DATA message part may contain meta- information about the
syslog message, or application-specific information such as traffic
counters or IP addresses. STRUCTURED-DATA consists of data blocks
enclosed in brackets (*\[\]*). Every block includes the ID of the block,
and one or more *name=value* pairs. The syslog-ng application
automatically parses the STRUCTURED-DATA part of syslog messages, which
can be referenced in macros (for details, see [[Macros of syslog-ng OSE]].

An example STRUCTURED-DATA block looks like:

>\[exampleSDID@0 iut="3" eventSource="Application" eventID="1011"\]\[examplePriority@0 class="high"\]

## The MSG message part

The MSG part contains the text of the message itself. The encoding of
the text must be UTF-8 if the BOM1 character is present in the message.
If the message does not contain the BOM character, the encoding is
treated as unknown. Usually messages arriving from legacy sources do not
include the BOM character. CRLF characters will not be removed from the
message.

The byte order mark (BOM) is a Unicode character used to signal the
byte-order of the message text.
