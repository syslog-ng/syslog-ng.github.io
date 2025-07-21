---
title: wildcard-file() source options
src: wildcard-file
id: adm-src-wild-opt
description: >-
    This section describes the options of the wildcard-file() source in {{ site.product.short_name }}.
---

The wildcard-file() driver has the following options:

## base-dir()

{% include doc/admin-guide/notes/wildcard-option-warning.md %}

|Type:|      path without filename|
|Default:||

*Description:* The path to the directory that contains the log files to
monitor, for example, **base-dir(\"/var/log\")**. To monitor also the
subdirectories of the base directory, use the **recursive(yes)** option.
For details, see recursive().

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

{% include doc/admin-guide/notes/wildcard-option-warning.md %}

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

## exclude-pattern()

|Type:|filename without path|
|Default:||

*Description:* A filename to exclude from the filenames matched by **filename-pattern()**, without the path. You
can use the **\*** and **?** wildcard characters, as with **filename-pattern()**.

For example, if **filename-pattern("*.log")** matches the syslog.log and
syslog.1.log files, **exclude-pattern("*.?.log")** would skip reading syslog.1.log.

```config
source s_files {
    wildcard-file(
        base-dir("/var/log")
        filename-pattern("*.log")
        exclude-pattern("*.?.log")
        recursive(no)
        follow-freq(1)
    );
};
```

{% include doc/admin-guide/options/source-flags.md %}

{% include doc/admin-guide/options/follow-freq.md %}

{% include doc/admin-guide/options/follow-method.md %}

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

When using wildcards, {{ site.product.short_name }} monitors every matching file (up to
the limit set in the max-files() option), and can receive new log
messages from any of the files. However, monitoring (polling) many files
(that is, more than ten) has a significant overhead and may affect
performance. On Linux this overhead is not so significant, because
{{ site.product.short_name }} uses the inotify feature of the kernel. Set the
**max-files()** option at least to the number of files you want to
monitor. If the wildcard-file source matches more files than the value
of the max-files() option, it is random which files will {{ site.product.short_name }}
actually monitor. The default value of max-files() is 100.

## monitor-freq()

|Type:    | number |
|Default: | value of follow-freq() |

*Description:* Indicates how frequently changes to the source file creation, move, or deletion should be checked if monitor-method() is set to `poll`.\
Floating-point numbers (for example, **1.5**) can be used as well. Please note, for backward compatibility reasons, the default value of monitor-freq() is equal to the value of follow-freq().

{% include doc/admin-guide/warnings/file-source-follow-warning.md %}

## monitor-method()

|Accepted values:| auto \| inotify \| kqueue \| poll |
|Default:        | auto |

*Description:* If the platform supports `inotify`, {{ site.product.short_name }} uses it
automatically to detect the creation, move, or deletion of source files. If the platform
supports `kqueue`, that will be used. If neither is available, {{ site.product.short_name }}
polls the aforementioned file changes as set in the monitor-freq() option. To force {{ site.product.short_name }}
to poll the file changes even if `inotify` or `kqueue` is available, set this option to **poll**.

{% include doc/admin-guide/warnings/file-source-follow-warning.md %}

{% include doc/admin-guide/options/multi-line-garbage.md %}

{% include doc/admin-guide/options/multi-line-mode.md %}

{% include doc/admin-guide/options/multi-line-prefix.md %}

{% include doc/admin-guide/options/multi-line-suffix.md %}

{% include doc/admin-guide/options/multi-line-timeout.md %}

{% include doc/admin-guide/options/pad-size.md %}

{% include doc/admin-guide/options/program-override.md %}

## recursive()

|Accepted values:| yes \| no |
|Default: |  no|

*Description:* When enabled, {{ site.product.short_name }} monitors every subdirectory
of the path set in the base-dir()
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
        monitor-freq(0.5)
        follow-freq(1)
        log-fetch-limit(200)
    );
};
```

{% include doc/admin-guide/options/tags.md %}

{% include doc/admin-guide/options/time-zone.md %}
