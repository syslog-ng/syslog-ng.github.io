---
title: General recommendations
id: adm-pract-general
---

This section provides general tips and recommendations on using
syslog-ng. Some of the recommendations are detailed in the sections
below:

- Do not base the separation of log messages in different files on the
    facility parameter. As several applications and processes can use
    the same facility, the facility does not identify the application
    that sent the message. By default, the facility parameter is not
    even included in the log message itself. In general, sorting the log
    messages into several different files can make finding specific log
    messages difficult. If you must create separate log files, use the
    application name.

- Standard log messages include the local time of the sending host,
    without any time zone information. It is recommended to replace this
    timestamp with an ISODATE timestamp, because the ISODATE format
    includes the year and timezone as well. To convert all timestamps to
    the ISODATE format, include the following line in the syslog-ng
    configuration file:

    ```config
    options {ts-format(iso) ; };
    ```

- Resolving the IP addresses of the clients to domain names can
    decrease the performance of syslog-ng. For details, see
    [[Using name resolution in syslog-ng]].
