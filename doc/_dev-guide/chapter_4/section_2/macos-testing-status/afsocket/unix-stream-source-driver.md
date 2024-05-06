---
title: unix-stream() Source Driver
description: >-
  The unix-stream() driver open an AF_UNIX socket and start listening on it for
  messages. The unix-stream() driver uses SOCK_STREAM semantics.
id: dev-macos-mod-sup-unix-stream-src
---

### Important Information

In the official documentation, `/dev/log` is the default entry for system logging. This, in fact, is a **socket**, not a regular file or a pipe. MacOS, however, uses `/var/run/syslog`  for the same. This needs to be kept in mind while referring to the documentation.

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### Configuration File Used

```config
@version: 3.31
@include "scl.conf"

options {
    stats-freq(10);
    time-reopen(10);
};

source s_stream {
    unix-stream("/var/run/syslog");
};

destination console{
    file(/dev/stdout);
};

log {
    source(s_stream);
    destination(console);
};
```

### Proof

![unix-stream() source driver tested using netcat on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-12 at 6.02.44 PM.png>)

> Note : unix-stream() does not support multiple lines as the record separator is the NL character, so if you embed "\n" in the log message, they will become separate messages.

![unix-stream() source driver tested using netcat on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-12 at 6.07.55 PM.png>)
