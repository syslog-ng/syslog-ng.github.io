---
title: 'MacOS sources: darwin-oslog() and  darwin-oslog-stream'
short_title: MacOS sources
id: adm-src-macOS
description: >-
    In {{ site.product.short_name }} 4.6 and later versions, it is possible to collect logs on macOS with the native OSLog framework using the `darwin-oslog()` and `darwin-oslog-stream()` source drivers.
---

* `darwin-oslog()`: This source builds on the native OSLog framework, instead of the earlier file-source based solution.
* `darwin-oslog-stream()`: This source provides a live log stream feed.
