---
title: program() Destination Driver
description: >-
  The program() driver starts an external application or script and sends the
  log messages to its standard input (stdin).
id: dev-macos-mod-sup-prog_dest
---

### Important Information

Usually, every message is a single line (ending with a newline character), which your script can process. Make sure that your script runs in a loop and keeps reading the standard input — it should not exit. (If your script exits, syslog-ng OSE tries to restart it.)

### Status <a href="#status" id="status"></a>

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### How to Test <a href="#how-to-test" id="how-to-test"></a>

To test the program() destination driver, we will make a shell script that receives input and stores it into a file or displays it on the console. Then, using the program destination driver, we will pass a custom message to this script and see the results in the file.&#x20;

> Note: The script is started by the driver, and in case of a exit, it is restarted automatically.

#### Shell Script <a href="#shell-script" id="shell-script"></a>

```shell
#!/bin/sh
while read line ; do
echo $line >> /Users/yash/Documents/test.txt
done
```

#### Configuration File Used <a href="#configuration-file-used" id="configuration-file-used"></a>

```config
@version: 3.31
@include "scl.conf"

source custom
{
    example-msg-generator(
        num(20)
        freq(2)
        template("Random Message")
    );
};

destination d_prog {
    program("/Users/yash/Documents/script");
};


log {
    source(custom);
    destination(d_prog);
};
```

#### Proof

![Testing program() destination on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-15 at 2.23.06 PM.png>)

![Testing program() destination on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-20 at 12.06.18 PM.png>)
