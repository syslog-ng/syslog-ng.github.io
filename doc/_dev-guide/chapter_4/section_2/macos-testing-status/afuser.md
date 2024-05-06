---
title: afuser
description: >-
  The afuser module has only one driver, that is the usertty() destination
  driver. The usertty() driver sends messages to a user terminal.
id: dev-macos-mod-sup-afuser
---

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### Testing <a href="#testing" id="testing"></a>

The usertty() driver has a single required argument, specifying a username who should receive a copy of matching messages. Use the asterisk \* to specify every user currently logged in to the system.

{: .notice--info}
Note : The usertty() does not have any further options nor does it support templates.

#### Configuration file used <a href="#configuration-file-used" id="configuration-file-used"></a>

```config
@version: 3.33
@include "scl.conf"

source custom
{
    example-msg-generator(
        num(20)
        freq(5)
        template("Message to Terminal")
    );
};

destination d_usertty {
    usertty("*");
};


log {
    source(custom);
    destination(d_usertty);
};

```

### Proof

![usertty() driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-15 at 8.22.48 PM.png>)

![usertty() driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-15 at 8.34.14 PM.png>)
