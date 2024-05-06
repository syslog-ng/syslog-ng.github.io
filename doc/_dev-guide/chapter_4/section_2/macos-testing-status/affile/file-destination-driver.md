---
title: file() Destination Driver
description: >-
  The file driver is one of the most important destination drivers in syslog-ng.
  It allows to output messages to the specified text file, or to a set of files.
id: dev-macos-mod-sup-file-dest
---

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### How to Test

File() drivers are at the very core of syslog-ng. Chances are you are already using them for displaying output to your console. To test the file destination driver, we will use it to store a custom message in a file and then checking the contents of the file.

File() destination driver is also used to display any output on the console. The code snippet is shown below.&#x20;

```config
destination console{
    file(/dev/stdout);
};
```

#### Configuration File Used

```config
@version: 3.31
@include "scl.conf"

source custom{
    example-msg-generator( num(5) template("Random Message") );
};

destination d_file{
    file("/Users/yash/Documents/test.txt" perm(0755));
};

log {
    source(custom);
    destination(d_file);
};
```

#### Proof

![file() destination driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-14 at 1.30.12 PM.png>)

![file() destination driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-20 at 11.42.33 AM.png>)
