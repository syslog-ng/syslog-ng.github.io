---
title: Enabling normal disk-based buffering
id: adm-log-diskbuff-normal
---

If the reliable() option is not set, by default a normal disk-buffer is
created. To explicitly enable the normal disk-buffer option, use the
disk-buffer(reliable(no)) parameter in the destination. Use the normal
disk-buffer option if you want a solution that is faster than the
reliable disk-buffer option. In this case, the process will be less
reliable and it is possible to lose logs in case of syslog-ng OSE crash.
The filename of the normal disk-buffer file is the following:
\<syslog-ng path\>/var/syslog-ng-00000.qf.

## Example: Example for using normal disk-based buffering

When using the disk-buffer plugin:

```config
destination d_BSD {
    network("127.0.0.1"
        port(3333)
        disk-buffer(
            mem-buf-length(10000)
            disk-buf-size(2000000)
            reliable(no)
        )
    );
};
```

For details on the differences between normal and reliable disk-based
buffering, see also [[About disk queue files]].
