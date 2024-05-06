---
title: 'unix-stream, unix-dgram: Sending messages to UNIX domain sockets'
short_title: unix-stream, unix-dgram
id: adm-dest-unix
description: >-
    The unix-stream() and unix-dgram() drivers send messages to a UNIX
    domain socket in either SOCK_STREAM or SOCK_DGRAM mode.
---

Both drivers have a single required argument specifying the name of the
socket to connect to. For the list of available optional parameters, see
[[unix-stream() and unix-dgram() destination options]].

**Declaration**

```config
unix-stream(filename [options]);
unix-dgram(filename [options]);
```

### Example: Using the unix-stream() driver

```config
destination d_unix_stream { unix-stream("/var/run/logs"); };
```
