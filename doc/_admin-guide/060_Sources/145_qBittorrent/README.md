---
title: qBittorrent log source
short_title: qBittorrent
id: adm-src-qbit
description: >-
    In syslog-ng OSE 4.6 and later versions it is possible to collect logs of the [qBittorrent](https://www.qbittorrent.org/) application.
---

```config
source s_qbittorrent {
  qbittorrent(
    dir("/path/to/qbittorrent-root-log-dir")
  );
};
```

To configure the source, specify the root log directory of qBittorrent in the `dir()` parameter. The root log directory can be accessed by selecting **Tools** &#62; **Preferences** &#62; **Behavior** &#62; **Log file** &#62; **Save path** in the qBittorrent application. Otherwise, the `qbittorrent()` source has the same parameters as the [[file() source|adm-src-file-opt]].

The `qbittorrent()` driver is a reusable configuration snippet. For details on using or writing such configuration snippets, see Reusing configuration blocks. The source of this configuration snippet can be accessed on [GitHub](https://github.com/syslog-ng/syslog-ng/tree/master/scl/qbittorrent).
