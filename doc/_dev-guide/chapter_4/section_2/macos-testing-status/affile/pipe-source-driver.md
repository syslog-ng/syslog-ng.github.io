---
title: pipe() Source Driver
description: >-
  The pipe source driver opens a named pipe with the specified name and listens
  for messages. It is used as the native message delivery protocol on HP-UX.
id: dev-macos-mod-sup-source-drv
---

### Important Information

Pipe is very similar to the file() driver, but there are a few differences, for example, pipe() opens its argument in read-write mode, therefore it is not recommended to be used on special files like /proc/kmsg. In fact, it is not recommended to use pipe() on anything else than real pipes.

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### How to Test

To test the pipe() source driver, we can create a pipe using the mkfifo command. The mkfifo command basically lets you create FIFOs (a.k.a named pipes). Following is the syntax of the command:

```config
mkfifo [OPTION]... NAME...
```

#### Configuration File Used

```config
@version: 3.31
@include "scl.conf"

source s_pipe {
    pipe("/Users/yash/Documents/myPipe");
};

destination console{
    file(/dev/stdout);
};

log {
    source(s_pipe);
    destination(console);
};
```

#### Proof

![pipe() source driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-14 at 7.59.54 PM.png>)

![pipe() source driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-20 at 11.47.47 AM.png>)
