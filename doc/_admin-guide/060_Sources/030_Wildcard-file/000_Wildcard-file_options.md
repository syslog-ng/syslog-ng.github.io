---
title: wildcard-file() source options
src: wildcard-file
id: adm-src-wild-opt
---

The wildcard-file() driver has the following options:

## base-dir()

|Type:|      path without filename|
|Default:||

*Description:* The path to the directory that contains the log files to
monitor, for example, **base-dir(\"/var/log\")**. To monitor also the
subdirectories of the base directory, use the **recursive(yes)** option.
For details, see [[recursive()]].

{% include doc/admin-guide/warnings/multiple-wildcards.md %}

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

{% include doc/admin-guide/options/default-facility.md %}

{% include doc/admin-guide/options/default-priority.md %}

{% include doc/admin-guide/options/encoding.md %}

## filename-pattern()

|Type:|filename without path|
|Default:||

*Description:* The filename to read messages from, without the path. You
can use the **\*** and **?** wildcard characters, without regular
expression and character range support. You cannot use the \* and ?
literally in the pattern.

For example, **filename-pattern("*.log")** matches the syslog.log and
auth.log files, but does not match the access_log file. The
filename-pattern("*log") pattern matches all three.

- \*

    matches an arbitrary string, including an empty string

- ?

    matches an arbitrary character

{% include doc/admin-guide/warnings/multiple-wildcards.md %}

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

{% include doc/admin-guide/options/source-flags.md %}

{% include doc/admin-guide/options/follow-freq.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/keep-timestamp.md %}

{% include doc/admin-guide/options/log-fetch-limit.md %}

{% include doc/admin-guide/options/log-iw-size.md %}

{% include doc/admin-guide/options/log-msg-size.md %}

{% include doc/admin-guide/options/log-prefix.md %}

## max-files()

|  Type: |     integer|
|Default: |100|

*Description:* Limits the number of files that the wildcard-file source
monitors.

When using wildcards, syslog-ng OSE monitors every matching file (up to
the limit set in the max-files() option), and can receive new log
messages from any of the files. However, monitoring (polling) many files
(that is, more than ten) has a significant overhead and may affect
performance. On Linux this overhead is not so significant, because
syslog-ng OSE uses the inotify feature of the kernel. Set the
**max-files()** option at least to the number of files you want to
monitor. If the wildcard-file source matches more files than the value
of the max-files() option, it is random which files will syslog-ng OSE
actually monitor. The default value of max-files() is 100.

## monitor-method()

|Accepted values:|      auto \| inotify \| poll|
|Default:|   auto|

*Description:* If the platform supports inotify, syslog-ng OSE uses it
automatically to detect changes to the source files. If inotify is not
available, syslog-ng OSE polls the files as set in the follow-freq()
option. To force syslog-ng OSE poll the files even if inotify is
available, set this option to **poll**.

{% include doc/admin-guide/options/multi-line-garbage.md %}

{% include doc/admin-guide/options/multi-line-mode.md %}

{% include doc/admin-guide/options/multi-line-prefix.md %}

{% include doc/admin-guide/options/multi-line-suffix.md %}

{% include doc/admin-guide/options/pad-size.md %}

{% include doc/admin-guide/options/program-override.md %}

## recursive()

|Accepted values:| yes \| no |
|Default: |  no|

*Description:* When enabled, syslog-ng OSE monitors every subdirectory
of the path set in the [[base-dir()]]
option, and reads log messages from files with matching filenames. The
recursive option can be used together with wildcards in the filename.

{% include doc/admin-guide/warnings/multiple-wildcards.md %}

### Example: Monitoring multiple directories

The following example reads files having the .log extension from the
/var/log/ directory and its subdirectories, including for example, the
/var/log/apt/history.log file.

```config
source s_file_subdirectories {
    wildcard-file(
        base-dir("/var/log")
        filename-pattern("*.log")
        recursive(yes)
        follow-freq(1)
        log-fetch-limit(100)
    );
};
```

{% include doc/admin-guide/options/tags.md %}

{% include doc/admin-guide/options/time-zone.md %}
