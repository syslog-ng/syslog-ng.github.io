## template()

|  Type:|      string|
|Default:|   A format conforming to the default logfile format. |

*Description:* Specifies a template defining the logformat to be used in
the destination. Macros are described in
[[Macros of syslog-ng OSE]]. Please note that for network destinations it might not be appropriate to change the template as it changes the on-wire format of the syslog protocol which
might not be tolerated by stock syslog receivers (like syslogd or
syslog-ng itself). For network destinations make sure the receiver can
cope with the custom format defined.
