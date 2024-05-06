---
title: Macros of syslog-ng OSE
id: adm-temp-macro-ose
description: >-
    The following macros are available in syslog-ng OSE.
---

> ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
> These macros are available when syslog-ng OSE successfully
> parses the incoming message as a syslog message, or you use
> some other parsing method and map the parsed values to these
> macros.  
>  
> If you are using the flags(no-parse) option, then syslog message parsing is
> completely disabled, and the entire incoming message is treated as
> the ${MESSAGE} part of a syslog message.  
> In this case, syslog-ng OSE generates a new syslog header
> (timestamp, host, and so on) automatically. Note that even
> though flags(no-parse) disables message parsing, some flags can
> still be used, for example, the no-multi-line flag.
{: .notice--warning}

## ${AMPM}

Typically used together with the ${HOUR12} macro,
${AMPM} returns the period of the day: AM for hours before mid day and
PM for hours after mid day. In reference to a 24-hour clock format, AM
is between 00:00-12:00 and PM is between 12:00-24:00. 12AM is midnight.
Available in syslog-ng OSE 3.4 and later.

## ${BSDTAG}

Facility/priority information in the format used by the
FreeBSD syslogd: a priority number followed by a letter that indicates
the facility. The priority number can range from **0** to **7**. The
facility letter can range from **A** to **Y**, where A corresponds to
facility number zero (LOG_KERN), B corresponds to facility 1
(LOG_USER), and so on.

## Custom macros

CSV parsers and pattern databases can also define macros
from the content of the messages, for example, a pattern database rule
can extract the username from a login message and create a macro that
references the username. For details on using custom macros created with
CSV parsers and pattern databases, see
[[parser: Parse and segment structured messages]] and
[[Using parser results in filters and templates]], respectively.

## ${DATE}, ${C_DATE}, ${R_DATE}, ${S_DATE}

Date of the message using the BSD-syslog style timestamp
format (month/day/hour/minute/second, each expressed in two digits).
This is the original syslog time stamp without year information, for
example: Jun 13 15:58:00.

## ${DAY}, ${C_DAY}, ${R_DAY}, ${S_DAY}

The day the message was sent.

## ${DESTIP}

When used, the output specifies the local IP address of the
source from which the message originates.

For an example use case when using the macro is recommended, see
[[Example use case: using the $DESTIP, the $DESTPORT, and the $PROTO macros]]

## ${DESTPORT}

When used, the output specifies the local port of the
source from which the message originates.

For an example use case when using the macro is recommended, see
[[Example use case: using the $DESTIP, the $DESTPORT, and the $PROTO macros]].

## ${FACILITY}

The name of the facility (for example, kern) that sent
the message.

## ${FACILITY_NUM}

The numerical code of the facility (for example, 0) that
sent the message.

## ${FILE_NAME}

Name of the log file (including its path) from where
syslog-ng OSE received the message (only available if syslog-ng OSE
received the message from a [[file|adm-src-file]]
or a [[wildcard-file|adm-src-wild]]).  
If you need only the path or the filename, use the
dirname and basename template functions.

## ${FULLDATE}, ${C_FULLDATE}, ${R_FULLDATE}, ${S_FULLDATE}

A nonstandard format for the date of the message using
the same format as ${DATE}, but including the year as well, for
example: **2006 Jun 13 15:58:00**.

## ${FULLHOST}

{% include doc/admin-guide/host-macro.md macro = '$FULLHOST' %}

## ${FULLHOST_FROM}

{% include doc/admin-guide/host-from-macro.md macro = '$FULLHOST' %}

## ${HOUR}, ${C_HOUR}, ${R_HOUR}, ${S_HOUR}

The hour of day the message was sent.

## ${HOUR12}, ${C_HOUR12}, ${R_HOUR12}, ${S_HOUR12}

The hour of day the message was sent in 12-hour clock
format. See also the ${AMPM} macro. 12AM is midnight. Available in
syslog-ng OSE 3.4 and later.

## ${HOST}

{% include doc/admin-guide/host-macro.md macro = '$HOST' %}

## ${HOST_FROM}

{% include doc/admin-guide/host-from-macro.md macro = '$HOST' %}

## ${ISODATE}, ${C_ISODATE}, ${R_ISODATE}, ${S_ISODATE}

Date of the message in the ISO 8601 compatible standard
timestamp format (yyyy-mm-ddThh:mm:ss+-ZONE), for example:
2006-06-13T15:58:00.123+01:00. If possible, it is recommended to use
${ISODATE} for timestamping. Note that syslog-ng can produce fractions
of a second (for example, milliseconds) in the timestamp by using the
frac-digits() global or per-destination option.

**NOTE:** As syslog-ng OSE is precise up to the microsecond, when the
frac-digits() option is set to a value higher than 6, syslog-ng OSE will
truncate the fraction seconds in the timestamps after 6 digits.
{: .notice--info}

## ${ISOWEEK}, ${C_ISOWEEK}, ${R_ISOWEEK}, ${S_ISOWEEK}

The number of week according to the ISO 8601 standard.
Note that the ${WEEK} macro that has been available in returns a
non-standard week number that can differ from the value returned by the
${ISOWEEK} macro.

Available in 3.24 and later.

## ${LEVEL_NUM}

The priority (also called severity) of the message,
represented as a numeric value, for example, 3. For the textual
representation of this value, use the ${LEVEL} macro. See PRIORITY or
LEVEL for details.

## ${LOGHOST}

The hostname of the computer running syslog-ng OSE.

- In version 3.24 and later: the ${LOGHOST} macro returns the
    fully-qualified domain name (FQDN) only if the use-fqdn() option is
    set to yes, and the hostname otherwise.

- In earlier versions: the ${LOGHOST} macro returns the
    fully-qualified domain name (FQDN).

## ${MESSAGE}

Text contents of the log message without the program name
and pid. The program name and the pid together are available in the
MSGHDR and ${PID} macros.

If you are using the flags(no-parse) option, then syslog message parsing
is completely disabled, and the entire incoming message is treated as
the ${MESSAGE} part of a syslog message. In this case, syslog-ng OSE
generates a new syslog header (timestamp, host, and so on)
automatically. Note that even though flags(no-parse) disables message
parsing, some flags can still be used, for example, the no-multi-line
flag.

The ${MSG} macro is an alias of the ${MESSAGE} macro: using ${MSG} in
syslog-ng OSE is equivalent to ${MESSAGE}.

Note that before syslog-ng version 3.0, the ${MESSAGE} macro included
the program name and the pid. In syslog-ng 3.0, the ${MESSAGE} macro
became equivalent with the ${MSGONLY} macro.

## ${MIN}, ${C_MIN}, ${R_MIN}, ${S_MIN}

The minute the message was sent.

## ${MONTH}, ${C_MONTH}, ${R_MONTH}, ${S_MONTH}

The month the message was sent as a decimal value,
prefixed with a zero if smaller than 10.

## ${MONTH_ABBREV}, ${C_MONTH_ABBREV}, ${R_MONTH_ABBREV}, ${S_MONTH_ABBREV}

The English abbreviation of the month name (3 letters).

## ${MONTH_NAME}, ${C_MONTH_NAME}, ${R_MONTH_NAME}, ${S_MONTH_NAME}

The English name of the month name.

## ${MONTH_WEEK}, ${C_MONTH_WEEK}, ${R_MONTH_WEEK}, ${S_MONTH_WEEK}

The number of the week in the given month (0-5). The week
with numerical value 1 is the first week containing a Monday. The days
of month before the first Monday are considered week 0. For example, if
a 31-day month begins on a Sunday, then the 1st of the month is week 0,
and the end of the month (the 30th and 31st) is week 5.

## ${MSEC}, ${C_MSEC}, ${R_MSEC}, ${S_MSEC}

The millisecond the message was sent.

Available in syslog-ng OSE version 3.4 and later.

## ${MSG}

The ${MSG} macro is an alias of the ${MESSAGE} macro, using ${MSG} in
syslog-ng OSE is equivalent to ${MESSAGE}. For details on this macro,
see MESSAGE.

## ${MSGHDR}

The name and the PID of the program that sent the log
message in PROGRAM\[PID\]: format. Includes a trailing whitespace. Note
that the macro returns an empty value if both the PROGRAM and PID fields
of the message are empty.

## ${MSGID}

A string specifying the type of the message in
IETF-syslog (RFC5424-formatted) messages. For example, a firewall might
use the ${MSGID} \"TCPIN\" for incoming TCP traffic and the ${MSGID}
\"TCPOUT\" for outgoing TCP traffic. By default, syslog-ng OSE does not
specify this value, but uses a dash (-) character instead. If an
incoming message includes the ${MSGID} value, it is retained and
relayed without modification.

## ${MSGONLY}

Message contents without the program name or pid.
Starting with syslog-ng OSE 3.0, the following macros are equivalent:
${MSGONLY}, ${MSG}, ${MESSAGE}. For consistency, use the ${MESSAGE}
macro. For details, see MESSAGE.

## ${PID}

The PID of the program sending the message.

## ${PRI}

The priority and facility encoded as a 2 or 3 digit
decimal number as it is present in syslog messages.

## ${PRIORITY} or ${LEVEL}

The priority (also called severity) of the message, for
example, error. For the textual representation of this value, use the
${LEVEL} macro.

## ${PROGRAM}

The name of the program sending the message. Note that
the content of the ${PROGRAM} variable may not be completely trusted as
it is provided by the client program that constructed the message.

## ${PROTO}

Description: When used, the output specifies the protocol used on the
source from which the message originates.

For an example use case when using the macro is recommended, see
[[Example use case: using the $DESTIP, the $DESTPORT, and the $PROTO macros]].

## ${RAWMSG}

The original message as received from the client. Note
that this macro is available only in 3.16 and later, and only if
syslog-ng received the message using the
[[default-network-drivers()|adm-src-def-netw]] source,
or the source receiving the message has the
store-raw-message flag set.

## ${RCPTID}

When the use-rcptid global option is set to **yes**,
syslog-ng OSE automatically assigns a unique reception ID to every
received message. You can access this ID and use it in templates via the
${RCPTID} macro. The reception ID is a monotonously increasing 48-bit
integer number, that can never be zero (if the counter overflows, it
restarts with 1).

## ${RUNID}

An ID that changes its value every time syslog-ng OSE is
restarted, but not when reloaded.

## ${SDATA}, ${.SDATA.SDID.SDNAME}

The syslog-ng application automatically parses the
STRUCTURED-DATA part of IETF-syslog messages, which can be referenced in
macros. The ${SDATA} macro references the entire STRUCTURED-DATA part
of the message, while structured data elements can be referenced using
the ${.SDATA.SDID.SDNAME} macro.

>**NOTE:** When using STRUCTURED-DATA macros, consider the following:  
>  
>- When referencing an element of the structured data, the macro must
>    begin with the dot (.) character. For example,
>    **${.SDATA.timeQuality.isSynced}**.
>  
>- The SDID and SDNAME parts of the macro names are case sensitive:
>    **${.SDATA.timeQuality.isSynced}** is not the same as
>    **${.SDATA.TIMEQUALITY.ISSYNCED}**.
>  
{: .notice--info}

### Example: Using SDATA macros

For example, if a log message contains the following structured data:
**\[exampleSDID@0 iut=\"3\" eventSource=\"Application\"
eventID=\"1011\"\]\[examplePriority@0 class=\"high\"\]** you can use
macros like: **${.SDATA.exampleSDID@0.eventSource}** --- this would
return the Application string in this case.

## ${SEC}, ${C_SEC}, ${R_SEC}, ${S_SEC}

The second the message was sent.

## ${SEQNUM}

The ${SEQNUM} macro contains a sequence number for the
log message. The value of the macro depends on the scenario, and can be
one of the following:

- If syslog-ng OSE receives a message via the IETF-syslog protocol
    that includes a sequence ID, this ID is automatically available in
    the ${SEQNUM} macro.

- If the message is a Cisco IOS log message using the extended
    timestamp format, then syslog-ng OSE stores the sequence number from
    the message in this macro. If you forward this message the
    IETF-syslog protocol, syslog-ng OSE includes the sequence number
    received from the Cisco device in the ${.SDATA.meta.sequenceId}
    part of the message.

    **NOTE:** To enable sequence numbering of log messages on Cisco devices,
    use the following command on the device (available in IOS 10.0 and
    later): **service sequence-numbers**. For details, see the manual of
    your Cisco device.
    {: .notice--info}

- For locally generated messages (that is, for messages that are
    received from a local source, and not from the network), syslog-ng
    OSE calculates a sequence number when sending the message to a
    destination (it is not calculated for relayed messages).

  - The sequence number is not global, but per-destination.
        Essentially, it counts the number of messages sent to the
        destination.

  - This sequence number increases by one for every message sent to
        the destination. It not lost when syslog-ng OSE is reloaded, but
        it is reset when syslog-ng OSE is restarted.

  - This sequence number is added to every message that uses the
        IETF-syslog protocol (**${.SDATA.meta.sequenceId}**), and can
        be added to BSD-syslog messages using the **${SEQNUM}** macro.

**NOTE:** If you need a sequence number for every log message that syslog-ng
OSE receives, use the RCPTID macro.
{: .notice--info}

## ${SOURCE}

The identifier of the source statement in the syslog-ng
OSE configuration file that received the message. For example, if
syslog-ng OSE received the log message from the source s_local {
internal(); }; source statement, the value of the ${SOURCE} macro is
s_local. This macro is mainly useful for debugging and troubleshooting
purposes.

## ${SOURCEIP}

IP address of the host that sent the message to
syslog-ng. (That is, the IP address of the host in the
${FULLHOST_FROM} macro.) Please note that when a message traverses
several relays, this macro contains the IP of the last relay.

## ${STAMP}, ${R_STAMP}, ${S_STAMP}

A timestamp formatted according to the
[[Global options]] global or per-destination option.

## ${SYSUPTIME}

The time elapsed since the syslog-ng OSE instance was
started (that is, the uptime of the syslog-ng OSE process). The value of
this macro is an integer containing the time in 1/100th of the second.

Available in syslog-ng OSE version 3.4 and later.

## ${TAG}

The priority and facility encoded as a 2 digit
hexadecimal number.

## ${TAGS}

A comma-separated list of the tags assigned to the
message.

NOTE: Note that the tags are not part of the log message and are not
automatically transferred from a client to the server. For example, if a
client uses a pattern database to tag the messages, the tags are not
transferred to the server. A way of transferring the tags is to
explicitly add them to the log messages using a template and the
${TAGS} macro, or to add them to the structured metadata part of
messages when using the IETF-syslog message format.

When sent as structured metadata, it is possible to reference to the
list of tags on the central server, and for example, to add them to a
database column.

## ${TZ}, ${C_TZ}, ${R_TZ}, ${S_TZ}

An alias of the ${TZOFFSET} macro.

## ${TZOFFSET}, ${C_TZOFFSET}, ${R_TZOFFSET}, ${S_TZOFFSET}

The time-zone as hour offset from GMT, for example:
-07:00. In syslog-ng 1.6.x this used to be -0700 but as ${ISODATE}
requires the colon it was added to ${TZOFFSET} as well.

## ${UNIXTIME}, ${C_UNIXTIME}, ${R_UNIXTIME}, ${S_UNIXTIME}

Standard UNIX timestamp, represented as the number of
seconds since 1970-01-01T00:00:00.

## ${.tls.x509}

When using a transport that uses TLS, these macros
contain information about the peer\'s certificate. That way, you can use
information from the client certificate in filenames, database values,
or as other metadata. If you clients have their own certificates, then
these values are unique per client, but unchangeable by the client. The
following macros are available in syslog-ng OSE version 3.9 and later.

- .tls.x509_cn: The Common Name of the certificate.

- .tls.x509_o: The value of the Organization field.

- .tls.x509_ou: The value of the Organization Unit field.

## ${UNIQID}

A globally unique ID generated from the HOSTID and the
RCPTID in the format of HOSTID@RCPTID. For details, see
use-uniqid() and
RCPTID.

Available in syslog-ng OSE version 3.7 and later.

## ${USEC}, ${C_USEC}, ${R_USEC}, ${S_USEC}

The microsecond the message was sent.

Available in syslog-ng OSE version 3.4 and later.

## ${YEAR}, ${C_YEAR}, ${R_YEAR}, ${S_YEAR}

The year the message was sent.

## ${WEEK}, ${C_WEEK}, ${R_WEEK}, ${S_WEEK}

The week number of the year, prefixed with a zero for the
first nine weeks of the year. (The first Monday in the year marks the
first week.)

See also [[ISOWEEK, C_ISOWEEK, R_ISOWEEK, S_ISOWEEK]].

## ${WEEK_DAY_ABBREV}, ${C_WEEK_DAY_ABBREV}, ${R_WEEK_DAY_ABBREV}, ${S_WEEK_DAY_ABBREV}

The 3-letter English abbreviation of the name of the day
the message was sent, for example, Thu.

## ${WEEK_DAY}, ${C_WEEK_DAY}, ${R_WEEK_DAY}, ${S_WEEK_DAY}

The day of the week as a numerical value (1-7).

## ${WEEKDAY}, ${C_WEEKDAY}, ${R_WEEKDAY}, ${S_WEEKDAY}

These macros are deprecated, use WEEK_DAY_ABBREV, R_WEEK_DAY_ABBREV,
S_WEEK_DAY_ABBREV instead. The 3-letter name of the day of week the
message was sent, for example, Thu.

## ${WEEK_DAY_NAME}, ${C_WEEK_DAY_NAME}, ${R_WEEK_DAY_NAME}, ${S_WEEK_DAY_NAME}

The English name of the day.
