---
title: Configuring multithreading
id: adm-multithread-config
description: >-
    Starting with version 3.6, syslog-ng OSE runs in multithreaded mode by
    default. 
---

You can enable multithreading in syslog-ng OSE using the
following methods:

- Globally using the **threaded(yes)** option.

- Separately for selected sources or destinations using the
    **flags(\"threaded\")** option.

## Example: Enabling multithreading

To enable multithreading globally, use the threaded option:

```config
options {
    threaded(yes) ;
};
```

To enable multithreading only for a selected source or destination, use
the **flags(\"threaded\")** option:

```config
source s_tcp_syslog {
    network(
        ip(127.0.0.1)
        port(1999)
        flags("syslog-protocol", "threaded")
    );
};
```
