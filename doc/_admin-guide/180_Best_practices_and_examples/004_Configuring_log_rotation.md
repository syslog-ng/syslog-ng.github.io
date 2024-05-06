---
title: Configuring log rotation
id: adm-pract-rotate
---

The syslog-ng OSE application does not rotate logs by itself. To use
syslog-ng OSE for log rotation, consider the following approaches:

## Use logrotate together with syslog-ng OSE

- It is ideal for workstations or when processing fewer logs.

- It is included in most distributions by default.

- Less scripting is required, only logrotate has to be configured
    correctly.

- Requires frequent restart (syslog-ng OSE must be reloaded/restarted
    when the files are rotated). After rotating the log files, reload
    syslog-ng OSE using the **syslog-ng-ctl reload** command, or use
    another method to send a SIGHUP to syslog-ng OSE.

- The statistics collected by syslog-ng OSE, and the correlation
    information gathered with Pattern Database, are lost with each
    restart.

## Separate incoming logs based on time, host or other information

- It is ideal for central log servers, where regular restart of
    syslog-ng OSE is unfavorable.

- Requires shell scripts or cron jobs to remove old logs.

- It can be done by using macros in the destination name (in the
    filename, directory name, or the database table name). (For details
    on using macros, see [[Templates and macros]]

### Example: File destination for log rotation

This sample file destination configuration stores incoming logs in files
that are named based on the current year, month and day, and places
these files in directories that are named based on the hostname:

```config
destination d_sorted {
    file(
        "/var/log/remote/${HOST}/${YEAR}_${MONTH}_${DAY}.log"
        create-dirs(yes)
    );
};
```

### Example: Command for cron for log rotation

This sample command for cron removes files older than two weeks from the
/var/log/remote directory:

```bash
find /var/log/remote/ -daystart -mtime +14 -type f -exec rm {} \;
```
