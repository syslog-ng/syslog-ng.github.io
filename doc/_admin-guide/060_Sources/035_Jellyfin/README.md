---
title: Jellyfin log source
short_title: Jellyfin
id: adm-src-jfin
description: >-
    In {{ site.product.short_name }} 4.7 and later versions it is possible to use the `jellyfin()` source to read Jellyfin logs from its log file output.
---

### Example: minimal configuration of jellyfin()

```config
source s_jellyfin {
    jellyfin(
    base-dir("/path/to/jellyfin/root/log/dir")
    filename-pattern("log_*.log")
    );
};
```

The `jellyfin()` source can use wildcard-file() source options, since it is based on the `wildcard-file()` source.

The `jellyfin()` driver is a reusable configuration snippet. For more information on using configuration snippets, see Reusing configuration blocks. The source of this configuration snippet can be accessed as the Jellyfish config file on GitHub.

For more information about Jellyfin logs, see the Jellyfin Main Configuration and Jellyfin Log Directory section in the Jellyfin documentation.
