---
title: Arr log source
short_title: Arr logs
id: adm-src-arr
description: >-
    In syslog-ng OSE 4.7 and later versions it is possible to collect logs of the [Lidarr, Prowlarr, Radarr, Readarr, and Sonarr](https://github.com/Servarr/Wiki) (referred to as “*Arr” or “*Arrs”) applications.
---

The new arr() sources are the following:

* lidarr()
* prowlarr()
* radarr()
* readarr()
* sonarr()
* whisparr()

### Example: minimal config of arr sources

```config
source s_radarr {
    radarr(
    dir("/path/to/my/radarr/log/dir")
    );
};
```

The logging module is stored in the &lt;prefix&gt;&lt;module&gt; name-value pair, for example: `.radarr.module` => `ImportListSyncService`.

The prefix can be modified with the `prefix()` option.

This driver is a reusable configuration snippet. For details on using or writing such configuration snippets, see Reusing configuration blocks. The source of this configuration snippet can be accessed on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/arr/arr.conf).
