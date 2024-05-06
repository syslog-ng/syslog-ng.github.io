The possible Facility values (between 0 and 23) and Severity values
(between 0 and 7) each correspond to a message type (see **Table 1: syslog Message Facilities**), or a message importance level (see **Table 2:** syslog Message Severities).

**NOTE:** Facility codes may slightly vary between different platforms. The
syslog-ng Open Source Edition (syslog-ng OSE) application accepts
Facility codes as numerical values as well.
{: .notice--info}

The following table lists possible Facility values.

**Table 1:** syslog-ng message facilities

  |Numerical Code|   Facility|
  |-----------------|--------|
  |0                |kernel messages|
  |1                |user-level messages|
  |2                |mail system|
  |3                |system daemons|
  |4                |security/authorization messages|
  |5                |messages generated internally by syslogd|
  |6                |line printer subsystem|
  |7                |network news subsystem|
  |8                |UUCP subsystem|
  |9                |clock daemon|
  |10               |security/authorization messages|
  |11               |FTP daemon|
  |12               |NTP subsystem|
  |13               |log audit|
  |14               |log alert|
  |15               |clock daemon|
  |16-23            |locally used facilities (local0-local7)|

**Table 2:** syslog-ng message severities

The following table lists possible Severity values.

  |Numerical Code|   Severity|
  |----------------|------------------------------------------|
  |0                |Emergency: system is unusable|
  |1                |Alert: action must be taken immediately|
  |2                |Critical: critical conditions|
  |3                |Error: error conditions|
  |4                |Warning: warning conditions|
  |5                |Notice: normal but significant condition|
  |6                |Informational: informational messages|
  |7                |Debug: debug-level messages|

