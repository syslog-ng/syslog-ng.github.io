---
title: wildcard\_file() Source Driver
description: >-
  The wildcard-file() source collects log messages from multiple plain-text
  files from multiple directories.The syslog-ng OSE application notices if a
  file is renamed or replaced with a new file.
id: dev-macos-mod-sup-wildcard
---

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### Important Information

When syslog-ng OSE is restarted, it records the position of the last sent log message in the persist file, and continues to send messages from this position after the restart. The location of the persist file depends on the package you installed syslog-ng OSE from.&#x20;

### How to test

To test the wildcard\_file source driver, we will use it to display the contents of multiple files that we create. Steps taken will be demonstrated in the proof images.&#x20;

#### Configuration File Used

```config
@version: 3.31
@include "scl.conf"

source s_files {
    wildcard-file(
        base-dir("/Users/yash/Documents")
        filename-pattern("*.txt")
        recursive(no)
        follow-freq(1)
    );
};

destination console{
    file(/dev/stdout);
};

log {
    source(s_files);
    destination(console);
};
```

#### Proof

![Testing wildcard\_file() with macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-14 at 6.39.54 PM.png>)

![Testing wildcard\_file() with macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-20 at 11.51.53 AM.png>)
