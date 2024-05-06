---
title: 'pipe: Collecting messages from named pipes'
short_title: pipe
id: adm-src-pipe
description: >-
    The pipe driver opens a named pipe with the specified name and listens
    for messages. It is used as the native message delivery protocol on
    HP-UX.
---

The pipe driver has a single required parameter, specifying the filename
of the pipe to open. For the list of available optional parameters, see
[[pipe() source options]].

**Declaration**

```config
pipe(filename);
```

**NOTE:** As of syslog-ng Open Source Edition 3.0.2, pipes are created
automatically. In earlier versions, you had to create the pipe using the
**mkfifo(1)** command.
{: .notice--info}

Pipe is very similar to the file() driver, but there are a few
differences, for example, pipe() opens its argument in read-write mode,
therefore it is not recommended to be used on special files like
/proc/kmsg.

>![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
>  
>- It is not recommended to use pipe() on anything else than real pipes.
>  
>- By default, syslog-ng OSE uses the **flags(no-hostname)** option for pipes,  
>   meaning that syslog-ng OSE assumes that the log messages received from the  
>   pipe do not contain the hostname field. If your messages do contain the 
>   hostname field, use **flags(expect-hostname)**.
{: .notice--warning}

### Example: Using the pipe() driver

```config
source s_pipe {
    pipe("/dev/pipe" pad-size(2048));
};
```
