---
title: darwin-oslog() source options
id: adm-src-darw-osl-opt
description: >-
    The darwin-oslog() source is based on the native OSLog Framework to read logs from the local store of the unified logging system on Darwin OSes. The {{ site.product.short_name }} system() source automatically uses this new source on Darwin platforms if the `darwinosl` plugin is available. This plugin is available only on macOS 10.15 Catalina and later versions. The 10.15 version is the first to support the OSLog API.
---

**NOTE:** The persistent OSLog store keeps about 7 days of logs on the disk.
{: .notice--info}

The `darwin-oslog()` source has the following options.

{% include doc/admin-guide/options/chain-hostnames.md %}

{% include doc/admin-guide/options/chain-hostname.md %}

{% include doc/admin-guide/options/default-facility.md %}

{% include doc/admin-guide/options/default-priority.md %}

{% include doc/admin-guide/options/disable-bookmarks.md %}

{% include doc/admin-guide/options/dns-cache.md %}

## filter-predicate()

|Type:|     string|
|Default:|`(eventType == 'logEvent' || eventType == 'lossEvent' || eventType == 'stateEvent' || eventType == 'userActionEvent') && (logType != 'debug')`|

*Description:* String for native macOS log message filtering using predicates. For example, the following predicate selects AirDrop logs: `subsystem=="com.apple.sharing" and category=="AirDrop"`

## go-reverse()

|Type:|     boolean|
|Default:| no|

*Description:* If set to `yes`, the logs are processed in reverse order (latest to oldest).

{% include doc/admin-guide/options/format.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host-override.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/ignore-saved-bookmarks.md %} (depending on the setting of the go-reverse() and the read-old-records() options.

{% include doc/admin-guide/options/deprecated-options.md old='do-not-use-bookmark()' new='ignore-saved-bookmarks()' %}

{% include doc/admin-guide/options/keep-hostname.md %}

{% include doc/admin-guide/options/keep-timestamp.md %}

{% include doc/admin-guide/options/internal.md %}

{% include doc/admin-guide/options/log-fetch-delays.md %}

{% include doc/admin-guide/options/log-fetch-limit.md %}

## max-bookmark-distance()

|Type:|     integer|
|Default:| 0 (unlimited) in seconds|

*Description:* The maximum distance in seconds that a bookmark can point backward. That is, if {{ site.product.short_name }} is stopped for 10 minutes (600 seconds) and `max-bookmark-distance()` is set to `60`, then {{ site.product.short_name }} starts reading the logs from 60 seconds before the startup, missing 9 minutes (540 seconds) worth of logs.

{% include doc/admin-guide/options/normalize-hostnames.md %}

{% include doc/admin-guide/options/program-override.md %}

{% include doc/admin-guide/options/read-old-records.md %}

{% include doc/admin-guide/options/tags.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/use-dns.md %}

{% include doc/admin-guide/options/use-fqdn.md %}

{% include doc/admin-guide/options/sdata-prefix.md %}

{% include doc/admin-guide/options/use-syslogng-pid.md %}
