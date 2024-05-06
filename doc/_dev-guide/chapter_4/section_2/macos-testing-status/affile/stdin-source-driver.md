---
title: stdin() Source Driver
description: The stdin() driver collects messages from the standard input stream.
id: dev-macos-mod-sup-stdin
---

### Important Information

When the standard input stream is closed, syslog-ng stops and stdin() inherits all options from the file() source, including multi-line options, or flags(no-parse). The stdin() driver causes syslog-ng to exit once it hits end-of-file (EOF).

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### How to Test

To test the stdin() source driver, we run a very simple configuration file as shown below and then type into the terminal to simulate the standard input stream.&#x20;

#### Configuration File Used

```config
@version: 3.31
@include "scl.conf"

source std_inp{
    stdin();
};

destination console{
    file(/dev/stdout);
};

log {
    source(std_inp);
    destination(console);
};
```

#### Proof

![stdin() input tested on macOS (x86) ](<{{dev_img_folder}}/module-support/Screenshot 2021-06-14 at 8.21.42 PM.png>)

![stdin() input tested on macOS (ARM) ](<{{dev_img_folder}}/module-support/Screenshot 2021-08-20 at 11.52.54 AM.png>)
