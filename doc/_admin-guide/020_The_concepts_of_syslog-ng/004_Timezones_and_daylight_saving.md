---
title: Timezones and daylight saving
id: adm-conc-tz
description: >-
    The syslog-ng application receives the timezone and daylight saving
    information from the operating system it is installed on. If the
    operating system handles daylight saving correctly, so does syslog-ng.
---

The syslog-ng application supports messages originating from different
timezones. The original syslog protocol (RFC3164) does not include
timezone information, but syslog-ng provides a solution by extending the
syslog protocol to include the timezone in the log messages. The
syslog-ng application also enables administrators to supply timezone
information for legacy devices which do not support the protocol
extension.

## How syslog-ng OSE assigns timezone to the message

When syslog-ng OSE receives a message, it assigns timezone information
to the message using the following algorithm.

1. The sender application (for example, the syslog-ng client) or host
    specifies the timezone of the messages. If the incoming message
    includes a timezone it is associated with the message. Otherwise,
    the local timezone is assumed.

2. Specify the [[time-zone()]] parameter for the source driver that reads
    the message. This timezone will be associated with the messages only
    if no timezone is specified within the message itself. Each source
    defaults to the value of the
    [[recv-time-zone()]] global option. It is not
    possible to override only the timezone information of the
    incoming message, but setting the [[keep-timestamp()]] option to **no**
    allows syslog-ng OSE to replace the full timestamp (timezone
    included) with the time the message was received.

    **NOTE:** When processing a message that does not contain timezone
    information, the syslog-ng OSE application will use the timezone and
    daylight-saving that was effective when the timestamp was generated.  
    {: .notice--info}
    For example, the current time is 2011-03-11 (March 11, 2011) in the
    EU/Budapest timezone. When daylight-saving is active (summertime),
    the offset is +02:00. When daylight-saving is inactive (wintertime)
    the timezone offset is +01:00. If the timestamp of an incoming
    message is 2011-01-01, the timezone associated with the message will
    be +01:00, but the timestamp will be converted, because 2011-01-01
    meant winter time when daylight saving is not active but the current
    timezone is +02:00.
    {: .notice--info}

3. Specify the timezone in the destination driver using the [[time-zone()]]
    parameter. Each destination driver might have an associated timezone
    value: syslog-ng converts message timestamps to this timezone before
    sending the message to its destination (file or network socket).
    Each destination defaults to the value of the
    [[send-time-zone()]] global option.

    **NOTE:** A message can be sent to multiple destination zones. The syslog-ng
    application converts the timezone information properly for every individual
    destination zone.
    {: .notice--info}

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** If syslog-ng
    OSE sends the message is to the destination using the legacy-syslog protocol
    (RFC3164) which does not support timezone information in its timestamps,
    the timezone information cannot be encapsulated into the sent timestamp,
    so syslog-ng OSE will convert the hour:min values based on the explicitly
    specified timezone.
    {: .notice--warning}

4. If the timezone is not specified, local timezone is used.

5. When macro expansions are used in the destination filenames, the
    local timezone is used. (Also, if the timestamp of the received
    message does not contain the year of the message, syslog-ng OSE uses
    the local year.)

    **NOTE:** You can modify the timezone of the message using timezone-specific
    rewrite rules.  
    For details, see [[Rewrite the timezone of a message]].
    {: .notice--info}

## A note on timezones and timestamps

If the clients run syslog-ng, then use the ISO timestamp, because it
includes timezone information. That way you do not need to adjust the
[[recv-time-zone()]] parameter of syslog-ng.

If you want syslog-ng to output timestamps in Unix (POSIX) time format,
use the `S_UNIXTIME` and `R_UNIXTIME` macros. You do not need to
change any of the timezone related parameters, because the timestamp
information of incoming messages is converted to Unix time internally,
and Unix time is a timezone-independent time representation. (Actually,
Unix time measures the number of seconds elapsed since midnight of
Coordinated Universal Time (UTC) January 1, 1970, but does not count
leap seconds.)
