---
title: BSD-syslog or legacy-syslog messages
id: adm-struct-bsd
description: >-
    This section describes the format of a syslog message, according to the
    [legacy-syslog or BSD-syslog protocol](https://tools.ietf.org/search/rfc3164).
---

A syslog message consists of the following parts:

- [[PRI|adm-struct-bsd#the-pri-message-part]]
- [[HEADER|adm-struct-bsd#the-header-message-part]]
- [[MSG|adm-struct-bsd#the-msg-message-part]]

The total message cannot be longer than 1024 bytes.

The following is a sample syslog message:

><133>Feb 25 14:09:07 webserver syslogd: restart

The message corresponds to the following format:

>\<priority\>timestamp hostname application: message

The different parts of the message are explained in the following
sections.

**NOTE:** The syslog-ng Open Source Edition (syslog-ng OSE) application
supports longer messages as well. For details, see the log-msg-size()
option in [[Global options]].
However, it is not recommended to enable messages larger than the packet
size when using UDP destinations.
{: .notice--info}

## The PRI message part

This section describes the PRI message part of a syslog message, according to the
[legacy-syslog or BSD-syslog protocol](https://tools.ietf.org/search/rfc3164).

The PRI part of the syslog message (known as Priority value) represents
the Facility and Severity of the message. Facility represents the part
of the system sending the message, while Severity marks its importance.

### PRI formula

The Priority value is calculated using the following formula:

>\<PRI\> = ( \<facility\> * 8) + \<severity\>

That is, you first multiply the Facility number by 8, and then add the
numerical value of the Severity to the multiplied sum.

### Example: the correlation between facility value, severity value, and the Priority value in the PRI message part

The following example illustrates a sample syslog message with a sample
PRI field (that is, Priority value):

>\<133\> Feb 25 14:09:07 webserver syslogd: restart

In this example, \<133\> represents the PRI field (Priority value). The
syslog message\'s Facility value is 16, and the Severity value is 5.

Substituting the numerical values into the \<PRI\> = ( \<facility\> \*
8) + \<severity\> formula, the results match the Priority value in our
example:

\<133\> = ( \<16\> \* 8) + \<5\>.

### Facility and Severity values

{% include doc/admin-guide/facility-severity.md %}

## The HEADER message part

This section describes the HEADER message part of a syslog message, according to the [legacy-syslog or BSD-syslog protocol](https://tools.ietf.org/search/rfc3164).

The HEADER message part contains a timestamp and the hostname (without
the domain name) or the IP address of the device. The timestamp field is
the local time in the *Mmm dd hh:mm:ss* format, where:

- *Mmm* is the English abbreviation of the month: Jan, Feb, Mar, Apr,
    May, Jun, Jul, Aug, Sep, Oct, Nov, Dec.

- *dd* is the day of the month on two digits. If the day of the month
    is less than 10, the first digit is replaced with a space. (for
    example, *Aug 7*.)

- *hh:mm:ss* is the local time. The hour (hh) is represented in a
    24-hour format. Valid entries are between 00 and 23, inclusive. The
    minute (mm) and second (ss) entries are between 00 and 59 inclusive.

**NOTE:** The syslog-ng Open Source Edition (syslog-ng OSE) application
supports other timestamp formats as well, like ISO, or the PIX extended
format. For details, see the [[ts-format()]] option in [[Global options]].
{: .notice--info}

## The MSG message part

This section describes the MSG message part of a syslog message, according to
the [legacy-syslog or BSD-syslog protocol](https://tools.ietf.org/search/rfc3164).

The MSG part contains the name of the program or process that generated
the message, and the text of the message itself. The MSG part is usually
in the following format: *program\[pid\]: message text*.
