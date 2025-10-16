---
title: Configuring log rotation
id: adm-pract-rotate
description: >- 
    This chapter describes how to use {{ site.product.short_name }} for log rotation, making use of builtin options
    and external tools.
---

Log rotation is traditionally only applicable to files and, consequently,
to file destination drivers in {{ site.product.short_name }}. Consider the following approaches:

## Use builtin logrotate() option of file destination driver

- It is available starting with {{ site.product.short_name }} version 4.10 or later.

- It is performed based on file sizes.

- No additional configuration files are required - log rotation is configured
    with the rest of {{ site.product.short_name }}. For details, see [[file() destination options]].

## Separate incoming logs based on time, host or other information

- It is ideal for central log servers, where regular restart of
    {{ site.product.short_name }} is unfavorable.

- Requires shell scripts or cron jobs to remove old logs.

- It can be done by using macros in the destination name (in the
    filename, directory name, or the database table name). (For details
    on using macros, see Templates and macros)

## Use logrotate together with {{ site.product.short_name }}

- It is ideal for workstations or when processing fewer logs.

- It is included in most distributions by default.

- Less scripting is required, only logrotate has to be configured
    correctly.

- Requires frequent restart ({{ site.product.short_name }} must be reloaded/restarted
    when the files are rotated). After rotating the log files, reload
    {{ site.product.short_name }} using the **syslog-ng-ctl reload** command, or use
    another method to send a SIGHUP to {{ site.product.short_name }}. Alternatively,
    starting from {{ site.product.short_name }} version 3.13 or later **syslog-ng-ctl reopen**
    may be used to signal file destination drivers to open log files again without stopping
    or interrupting the rest of configured log pipes. 

- The statistics collected by {{ site.product.short_name }}, and the correlation
    information gathered with Pattern Database, are lost with each
    restart.

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
