---
title: Options of date-parser() parsers
id: adm-parser-date-opt
---

The date-parser() parser has the following options.

## flags()

|  Type:|      guess-timezone|
  |Default:|   empty string|

*guess-timezone*: Attempt to guess the timezone of the message if this
information is not available in the message. Works when the incoming
message stream is close to real time, and the timezone information is
missing from the timestamp. For example:

```config
date-parser(flags(guess-timezone));
```

## format()

|  Synopsis:|   format(string)|
  |Default:|    |

*Description:* Specifies the format how syslog-ng OSE should parse the
date. You can use the following format elements:

|%%|      PERCENT|
|%a|      day of the week, abbreviated|
|%A|      day of the week|
|%b|      month abbr|
|%B|      month|
|%c|      MM/DD/YY HH:MM:SS|
|%C|      ctime format: Sat Nov 19 21:05:57 1994|
|%d|      numeric day of the month, with leading zeros (eg 01..31)|
|%e|      like %d, but a leading zero is replaced by a space (eg  1..31)|
|%f|      microseconds, leading 0's, extra digits are silently discarded|
|%D|      MM/DD/YY|
|%G|      GPS week number (weeks since January 6, 1980)|
|%h|      month, abbreviated|
|%H|      hour, 24 hour clock, leading 0's)|
|%I|      hour, 12 hour clock, leading 0's)|
|%j|      day of the year|
|%k|      hour|
|%l|      hour, 12 hour clock|
|%L|      month number, starting with 1|
|%m|      month number, starting with 01|
|%M|      minute, leading 0's|
|%n|      NEWLINE|
|%o|      ornate day of month -- "1st", "2nd", "25th", etc.|
|%p|      AM or PM|
|%P|      am or pm (Yes %p and %P are backwards :)|
|%q|      Quarter number, starting with 1|
|%r|      time format: 09:05:57 PM|
|%R|      time format: 21:05|
|%s|      seconds since the Epoch, UCT|
|%S|      seconds, leading 0's|
|%t|      TAB|
|%T|      time format: 21:05:57|
|%U|      week number, Sunday as first day of week|
|%w|      day of the week, numerically, Sunday == 0|
|%W|      week number, Monday as first day of week|
|%x|      date format: 11/19/94|
|%X|      time format: 21:05:57|
|%y|      year (2 digits)|
|%Y|      year (4 digits)|
|%Z|      timezone in ascii. eg: PST|
|%z|      timezone in format -/+0000|

For example, for the date 01/Jan/2016:13:05:05 PST use the following
format string: **format(\"%d/%b/%Y:%H:%M:%S %Z\")**

## time-stamp()

| Accepted values:|   stamp \| recvd|
  |Default:|    stamp|

*Description:* Determines if the parsed date values are treated as sent
or received date. If you use time-stamp(), syslog-ng OSE adds the parsed
date to the S\_ macros (corresponding to the sent date). If you use
**time-zone(recvd)**, syslog-ng OSE adds the parsed date to the R\_
macros (corresponding to the received date).

{% include doc/admin-guide/options/time-zone.md %}

## value()

|  Type:|   string|
  |Default:|    |

This option is only available in syslog-ng OSE 4.0 and later versions.

*Description:* This option instructs the date-parser() to store the
timestamp in a name-value pair specified in value(), instead of editing
the timestamp value of the log message.
