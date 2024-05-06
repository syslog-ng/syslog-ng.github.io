---
title: pseudofile
description: >-
  The pseudofile() destination driver is a very simple driver, aimed at
  delivering messages to special files. It opens and closes the file after each
  write operation, instead of keeping it open.
id: dev-macos-mod-sup-pseudofile
---

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### Testing <a href="#testing" id="testing"></a>

The pseudofile() driver has a single required argument, specifying a filename, that is, the file to write messages to, including the path.

{: .notice--info}
Note: The pseudofile() driver does not support templates in the filename.

#### Configuration file used <a href="#configuration-file-used" id="configuration-file-used"></a>

```config
@version: 3.33
@include "scl.conf"

source custom
{
    example-msg-generator(
        num(20)
        freq(5)
        template("Message to Terminal using Pseudofile")
    );
};

destination d_pseudofile {
    pseudofile("/dev/stdout" template("${ISODATE} ${HOST} ${MESSAGE}\n"));
};


log {
    source(custom);
    destination(d_pseudofile);
};
```

### Proof

![pseudofile() driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-15 at 8.43.44 PM.png>)

![pseudofile() driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-15 at 8.45.09 PM.png>)
