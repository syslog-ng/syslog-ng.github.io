---
title: 'pipe: Sending messages to named pipes'
short_title: Pipe
id: adm-dest-pipe
description: >-
    The pipe() driver sends messages to a named pipe like /dev/xconsole.

    The pipe driver has a single required parameter, specifying the filename
    of the pipe to open. The filename can include macros. For the list of
    available optional parameters, see pipe() destination options.
---

**Declaration**

```config
pipe(filename);
```

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Caution: Starting with syslog-ng OSE 3.0.2, pipes are created automatically.
In earlier versions, you had to create the pipe using the mkfifo(1) command.
{: .notice--warning}

### Example: Using the pipe() driver

```config
destination d_pipe { pipe("/dev/xconsole"); };
```
