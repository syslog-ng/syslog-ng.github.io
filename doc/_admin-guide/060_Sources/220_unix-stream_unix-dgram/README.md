---
title: 'unix-stream, unix-dgram: Collecting messages from UNIX domain sockets'
short_title: unix-stream, unix-dgram
id: adm-src-unix
description: >-
    The unix-stream() and unix-dgram() drivers open an AF_UNIX socket and
    start listening on it for messages. The unix-stream() driver is
    primarily used on Linux and uses SOCK_STREAM semantics (connection
    oriented, no messages are lost), while unix-dgram() is used on BSDs and
    uses SOCK_DGRAM semantics: this may result in lost local messages if
    the system is overloaded.
---

To avoid denial of service attacks when using connection-oriented
protocols, the number of simultaneously accepted connections should be
limited. This can be achieved using the max-connections() parameter. The
default value of this parameter is quite strict, you might have to
increase it on a busy system.

Both unix-stream and unix-dgram have a single required argument that
specifies the filename of the socket to create. For the list of
available optional parameters, see
[[unix-stream() and unix-dgram() source options]]

**Declaration**

```config
unix-stream(filename [options]);
unix-dgram(filename [options]);
```

**NOTE:** syslogd on Linux originally used SOCK_STREAM sockets, but some
distributions switched to SOCK_DGRAM around 1999 to fix a possible DoS
problem. On Linux you can choose to use whichever driver you like as
syslog clients automatically detect the socket type being used.
{: .notice--info}

## Example: Using the unix-stream() and unix-dgram() drivers

```config
source s_stream {
    unix-stream("/dev/log" max-connections(10));
};

source s_dgram {
    unix-dgram("/var/run/log");
};
```
