---
title: 'systemd-journal: Collecting messages from the systemd-journal system log storage'
short_title: systemd-journal
id: adm-src-systemd-journal
description: >-
    The systemd-journal() source is used on various Linux distributions,
    such as RHEL (from RHEL7) and CentOS. The systemd-journal() source
    driver can read the structured name-value format of the journald system
    service, making it easier to reach the custom fields in the message. By
    default, syslog-ng OSE adds the .journald. prefix to the name of every
    parsed value. For a list and description of name-value pairs that
    journald provides, see the documentation of journald for your platform
    (for example, man systemd.journal-fields).
---

The systemd-journal() source driver is designed to read only local
messages through the systemd-journal API. It is not possible to set the
location of the journal files, or the directories.

**NOTE:** The log-msg-size() option is not applicable for this source. Use
the **max-field-size()** option instead.
{: .notice--info}

>**NOTE:** This source will not handle the following cases:
>  
- Corrupted journal file
- Incorrect journal configuration
- Any other journald-related bugs
{: .notice--info}

**NOTE:** If you are using RHEL-7, the default source in the configuration
is systemd-journal() instead of unix-dgram(\"/dev/log\") and
file(\"/proc/kmsg\"). If you are using unix-dgram(\"/dev/log\") or
unix-stream(\"/dev/log\") in your configuration as a source, syslog-ng
OSE will revert to using systemd-journal() instead.
{: .notice--info}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Only one systemd-journal() source can be configured in the configuration file.
If there is more than one systemd-journal() source configured, syslog-ng OSE
will not start.
{: .notice--warning}

**Declaration**

```config
systemd-journal(options);
```

### Example: Sending all fields through syslog protocol using the systemd-journal() driver

To send all fields through the syslog protocol, enter the prefix in the
following format: "**.SDATA.\<name\>**".

```config
@version: 3.38

source s_journald {
    systemd-journal(prefix(".SDATA.journald."));
};

destination d_network {
    syslog("server.host");
};

log {
    source(s_journald);
    destination(d_network);
};
```

### Example: Filtering for a specific field using the systemd-journal() driver

```config
@version: 3.38

source s_journald {
    systemd-journal(prefix(".SDATA.journald."));
};

filter f_uid {"${.SDATA.journald._UID}" eq "1000"};

destination d_network {
    syslog("server.host");
};

log {
    source(s_journald);
    filter(f_uid);
    destination(d_network);
};
```

### Example: Sending all fields in value-pairs using the systemd-journal() driver

```config
@version: 3.38

source s_local {
    systemd-journal(prefix("journald."));
};

destination d_network {
    network("server.host" template("$(format_json --scope rfc5424 --key journald.*)\n"));
};

log {
    source(s_local);
    destination(d_network);
};
```

The journal contains credential information about the process that sent
the log message. The syslog-ng OSE application makes this information
available in the following macros:

|Journald field| syslog-ng predefined macro|
|---|---|
|  MESSAGE   | $MESSAGE|
| _HOSTNAME | $HOST |
| _PID    | $PID|
| _COMM or SYSLOG_IDENTIFIER|   \$PROGRAM|
||  If both _COMM and SYSLOG_IDENTIFIER exists, syslog-ng OSE uses SYSLOG_IDENTIFIER|
|SYSLOG_FACILITY  | $FACILITY_NUM |
|PRIORITY          | $LEVEL_NUM |
