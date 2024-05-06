---
title: facility()
id: adm-log-filters-facility
---

*Synopsis:* facility(\<facility-name\>) or facility(\<facility-code\>) or facility(\<facility-name\>..\<facility-name\>)

*Description:* Match messages having one of the listed facility codes.

The facility() filter accepts both the name and the numerical code of
the facility or the importance level. Facility codes 0-23 are predefined
and can be referenced by their usual name. Facility codes above 24 are
not defined.

You can use the facility filter the following ways:

- Use a single facility name, for example, **facility(user)**

- Use a single facility code, for example, **facility(1)**

- Use a facility range (works only with facility names), for example,
    **facility(local0..local5)**

The syslog-ng application recognizes the following facilities: (Note
that some of these facilities are available only on specific platforms.)

| Numerical Code  |Facility name   |Facility|
| ----------------|----------------|------------|
| 0               |kern            |kernel messages|
| 1               |user            |user-level messages|
| 2               |mail            |mail system|
| 3               |daemon          |system daemons|
| 4               |auth            |security/authorization messages|
| 5               |syslog          |messages generated internally by syslogd|
| 6               |lpr             |line printer subsystem|
| 7               |news            |network news subsystem|
| 8               |uucp            |UUCP subsystem|
| 9               |cron            |clock daemon|
| 10              |authpriv        |security/authorization messages|
| 11              |ftp             |FTP daemon|
| 12              |ntp             |NTP subsystem|
| 13              |security        |log audit|
| 14              |console         |log alert|
| 15              |solaris-cron    |clock daemon|
| 16-23           |local0..local7  |locally used facilities (local0-local7)|
