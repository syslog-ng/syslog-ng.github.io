---
title: 'program: Receiving messages from external applications'
short_title: program
id: adm-src-prog
description: >-
    The program driver starts an external application and reads messages
    from the standard output (stdout) of the application. It is mainly
    useful to receive log messages from daemons that accept incoming
    messages and convert them to log messages.
---

The program driver has a single required parameter, specifying the name
of the application to start.

**Declaration**

```config
program(filename);
```

### Example: Using the program() driver

```config
source s_program {
    program("/etc/init.d/mydaemon");
};
```

**NOTE:** The program is restarted automatically if it exits.
{: .notice--info}
