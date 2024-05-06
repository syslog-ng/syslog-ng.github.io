---
title: Enabling reliable disk-based buffering
id: adm-log-diskbuff-reliable
---

To enable reliable disk-based buffering, use the
**disk-buffer(reliable(yes))** parameter in the destination. Use
reliable disk-based buffering if you do not want to lose logs in case of
reload/restart, unreachable destination or syslog-ng OSE crash. This
solution provides a slower, but reliable disk-buffer option. It is
created and initialized at startup and gradually grows as new messages
arrive. The filename of the reliable disk buffer file is the following:
\<syslog-ng path\>/var/syslog-ng-00000.rqf.

## Example: Example for using reliable disk-based buffering

```config
destination d_BSD {
    network("127.0.0.1"
        port(3333)
        disk-buffer(
            mem-buf-size(10000)
            disk-buf-size(2000000)
            reliable(yes)
        )
    );
};
```

For details on the differences between normal and reliable disk-based
buffering, see also [[About disk queue files]].
