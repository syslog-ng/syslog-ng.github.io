---
title: 'pacct: Collecting process accounting logs on Linux'
short_title: pacct
id: adm-src-pacct
description: >-
    Starting with version 3.2, syslog-ng OSE can collect process accounting
    logs on Linux systems.Process accounting is the method of recording and
    summarizing commands executed on Linux, for example, the commands being
    run, the user who executed the command, CPU time used by the process,
    exit code, and so on. When process accounting (also called pacct) is
    enabled on a system, the kernel writes accounting records to the
    /var/log/account/pacct file (might vary between different Linux
    distributions).
---

To use the pacct() driver, the following conditions must be met:

- The syslog-ng OSE application must be compiled with the
    *--enable-pacct* option. Execute the `syslog-ng -V` command to check if
    your binary supports process accounting.

- The pacctformat plugin must be loaded. By default, syslog-ng OSE
    automatically loads the available modules.

- The scl.conf file must be included in your syslog-ng configuration:

    ```config
    @include "scl.conf"
    ```

- Process accounting must be running on the host. You can enable it
    with the **accton** command.

The pacct() driver parses the fields of the accounting logs and
transforms them into name-value pairs. The fields are defined in the
manual page of the accounting log file (man acct), syslog-ng OSE
prepends every field with the .pacct. prefix. For example, the
**ac_uid** field that contains the id of the user who started the
process will be available under the $.pacct.ac_uid name. These can be
used as macros in templates, in filters to select specific messages, and
so on.

To use the pacct() driver, use the following syntax.

```config
@version: 3.38
@include "scl.conf"

source s_pacct { pacct(); };
...
log { source(s_pacct); destination(...); };
```

The pacct() driver is actually a reusable configuration snippet
configured to handle Linux accounting logs. For details on using or
writing such configuration snippets, see
[[Reusing configuration blocks]].  
You can find the source of the pacct configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/pacct/plugin.conf).
