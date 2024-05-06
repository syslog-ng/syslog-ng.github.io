---
title: 'wildcard-file: Collecting messages from multiple text files'
short_title: wildcard-file
id: adm-src-wild
description: >-
    The wildcard-file() source collects log messages from multiple
    plain-text files from multiple directories. The wildcard-file() source
    is available in syslog-ng OSE version 3.10 and later.
---

The syslog-ng OSE application notices if a file is renamed or replaced
with a new file, so it can correctly follow the file even if logrotation
is used. When syslog-ng OSE is restarted, it records the position of the
last sent log message in the persist file, and continues to send
messages from this position after the restart. The location of the
persist file depends on the package you installed syslog-ng OSE from,
typically it is /var/lib/syslog-ng/syslog-ng.persist or
/var/lib/syslog-ng/syslog-ng.persist.

**Declaration**

```config
wildcard-file(
    base-dir("<pathname>")
    filename-pattern("<filename>")
);
```

Note the following important points:

- You can use the **\*** and **?** wildcard characters in the filename
    (the filename-pattern() option), but not in the path (the base-dir()
    option).

{% include doc/admin-guide/warnings/multiple-wildcards.md %}

- When using wildcards, syslog-ng OSE monitors every matching file (up
    to the limit set in the max-files() option), and can receive new log
    messages from any of the files. However, monitoring (polling) many
    files (that is, more than ten) has a significant overhead and may
    affect performance. On Linux this overhead is not so significant,
    because syslog-ng OSE uses the inotify feature of the kernel. Set
    the **max-files()** option at least to the number of files you want
    to monitor. If the wildcard-file source matches more files than the
    value of the max-files() option, it is random which files will
    syslog-ng OSE actually monitor. The default value of max-files()
    is 100.

- If the message does not have a proper syslog header, syslog-ng OSE
    treats messages received from files as sent by the user facility.
    Use the **default-facility()** and **default-priority()** options in
    the source definition to assign a different facility if needed.

- For every message that syslog-ng OSE reads from the source files,
    the path and name of the file is available in the
    `${FILE_NAME} macro`.

Required parameters: base-dir(), filename-pattern(). For the list of
available optional parameters, see wildcard-file() source options.

### Example: Using the wildcard-file() driver

The following example monitors every file with the .log extension in the
/var/log directory for log messages.

```config
source s_files {
    wildcard-file(
        base-dir("/var/log")
        filename-pattern("*.log")
        recursive(no)
        follow-freq(1)
    );
};
```
