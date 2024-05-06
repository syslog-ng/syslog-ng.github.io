---
title: program() Source Driver
description: >-
  The program driver starts an external application and reads messages from the
  standard output (stdout) of the application.
id: dev-macos-mod-sup-prog_source
---

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### How to Test

The program() source driver is mainly useful to receive log messages from daemons that accept incoming messages and convert them to log messages. To stimulate this, we will write a shell script and run it using program() driver.&#x20;

> Note: The script is started by the driver, and in case of a exit, it is restarted automatically.

#### Shell Script

```shell
#!/bin/bash
while true
do
    echo "Hi"
    sleep 1
done
```

#### Configuration File Used

```config
@version: 3.31
@include "scl.conf"

source s_program {
    program("/Users/yash/Documents/test.sh");
};

destination console{
    file(/dev/stdout);
};

log {
    source(s_program);
    destination(console);
};
```

#### Proof

![Program() Source Driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-15 at 1.45.21 PM.png>)

![Program() Source Driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-20 at 12.01.17 PM.png>)
