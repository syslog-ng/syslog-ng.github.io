---
title: darwin-oslog() source options
id: adm-src-darw-osl-opt
description: >-
    The `darwin-oslog()` source is based on the native OSLog Framework to read logs from the local store of the unified logging system on Darwin OSes. The {{ site.product.short_name }} `system()` source automatically uses this new source on Darwin platforms if the `darwinosl` plugin is available. This plugin is available only on macOS 10.15 Catalina and later versions. The 10.15 version is the first to support the OSLog API.
---

**NOTE:** The persistent OSLog store keeps about 7 days of logs on the disk.
{: .notice--info}

The `darwin-oslog()` source has the following options.

## filter-predicate()

|Type:|     string|
|Default:|`(eventType == 'logEvent' || eventType == 'lossEvent' || eventType == 'stateEvent' || eventType == 'userActionEvent') && (logType != 'debug')`|

*Description:* String for native macOS log message filtering using predicates. For example, the following predicate selects AirDrop logs: `subsystem=="com.apple.sharing" and category=="AirDrop"`

## do-not-use-bookmark()

|Type:|     boolean|
|Default:| `no`|

*Description:* By default, {{ site.product.short_name }} continues to read the logs from the last remembered position after a restart. If this option is set to `yes`, it always starts reading from the end or beginning of the available log list (depending on the setting of the `go-reverse()` and the `read-old-records()` options.

## go-reverse()

|Type:|     boolean|
|Default:| `no`|

*Description:* If set to `yes`, the logs are processed in reverse order (latest to oldest).

{% include doc/admin-guide/options/log-fetch-delays.md %}

{% include doc/admin-guide/options/log-fetch-limit.md %}

## max-bookmark-distance()

|Type:|     integer|
|Default:| `0`(unlimited) [seconds]|

*Description:* The maximum distance in seconds that a bookmark can point backward. That is, if {{ site.product.short_name }} is stopped for 10 minutes (600 seconds) and `max-bookmark-distance()` is set to `60`, then {{ site.product.short_name }} starts reading the logs from 60 seconds before the startup, missing 9 minutes (540 seconds) worth of logs.

## read-old-records()

|Type:|     boolean|
|Default:| `no`|

*Description:* If set to yes, {{ site.product.short_name }} starts reading logs from the oldest available entry when the system starts, or if no bookmarks are present.
