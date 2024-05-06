---
title: Enabling memory buffering
id: adm-log-diskbuff-memory
---

To enable memory buffering, use the **log-fifo-size()** parameter in the
destination. All destination drivers can use memory buffering. Use
memory buffering if you want to send logs to destinations where
disk-based buffering is not available. Or if you want the fastest
solution, and if syslog-ng OSE crash or network downtime is never
expected. In these cases, losing logs is possible. This solution does
not use disk-based buffering, logs are stored only in the memory.

## Example: Example for using memory buffering

```config
destination d_BSD {
    network("127.0.0.1"
        port(3333)
        log-fifo-size(10000)
    );
};
```
