---
title: Notes on reading kernel messages
id: adm-src-file-note
---

Note the following points when reading kernel messages on various
platforms.

- The kernel usually sends log messages to a special file (/dev/kmsg
    on BSDs, /proc/kmsg on Linux). The file() driver reads log messages
    from such files. The syslog-ng application can periodically check
    the file for new log messages if the follow-freq() option is set.

- On Linux, the klogd daemon can be used in addition to syslog-ng to
    read kernel messages and forward them to syslog-ng. klogd used to
    preprocess kernel messages to resolve symbols and so on, but as this
    is deprecated by ksymoops there is really no point in running both
    klogd and syslog-ng in parallel. Also note that running two
    processes reading /proc/kmsg at the same time might result in
    dead-locks.

- When using syslog-ng to read messages from the /proc/kmsg file,
    syslog-ng automatically disables the follow-freq() parameter to
    avoid blocking the file.

- To read the kernel messages on HP-UX platforms, use the following
    options in the source statement:

    ```config
    file("/dev/klog" program-override("kernel") flags(kernel) follow-freq(0));
    ```
