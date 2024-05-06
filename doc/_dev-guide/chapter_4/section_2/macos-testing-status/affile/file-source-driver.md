---
title: file() Source Driver
description: >-
  The file() source driver is used to collect log messages from plain-text
  files, for example, from the logfiles of an Apache webserver.
id: dev-macos-mod-sup-file-source
---

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### How to Test

File() drivers are at the very core of syslog-ng. Chances are you are already using them for displaying output to your console. To test the file source driver, we will use it to display the contents of a file that we create.&#x20;

> Note: For this test, please create a new file and add a few lines of text in it. In this instance, we will assume the file is called "test.txt"

We can use the file() source driver as a source for log messages instead of internal() or system(). To do so, we just need to use:

```config
source s_file {
    file("/var/log/messages");    #On Linux
    file("/var/log/system.log");  #On macOS
};
```

#### Configuration File Used

```config
@version: 3.31
@include "scl.conf"

source s_file {
    file("/Users/yash/Documents/test.txt");
    #Enter your path here ^
};

destination console{
    file(/dev/stdout);
};

log {
    source(s_file);
    destination(console);
};
```

#### Proof

![file() source driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-14 at 1.17.20 PM.png>)

![file() source driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-20 at 11.40.25 AM.png>)
