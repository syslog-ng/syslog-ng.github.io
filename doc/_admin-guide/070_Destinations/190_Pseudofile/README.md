---
title: pseudofile() destination
short_title: pseudofile
id: adm-dest-pseudo
description: >-
    The pseudofile() destination driver is a very simple driver, aimed at
    delivering messages to special files such as files in the /proc, /dev or
    /sys directories. It opens and closes the file after each write
    operation, instead of keeping it open. It does not append further data.
    It does not support templates in the filename, and does not have a
    queue, processing is performed immediately as read by the source.
    Therefore, no loss is possible, but it takes CPU time from the source,
    so it is not adequate in high-traffic situations.
---

**Declaration**

```config
pseudofile(filename options());
```
