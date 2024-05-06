---
title: 'stdout: Send messages to standard output'
short_title: stdout
id: am-dest-stdout
description: >-
    Available in syslog-ng OSE 4.4 or later versions.

    The stdout() destination driver sends messages to the standard output.
---

**Declaration**

```config
log {
    source{ stdin(); };
    destination{ stdout(); };
};
```
