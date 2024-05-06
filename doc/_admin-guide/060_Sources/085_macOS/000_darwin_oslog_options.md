---
title: darwin-oslog() source options
id: adm-src-darw-osl-opt
description: >-
    The `darwin-oslog()` source is based on the native [OSLog Framework](https://developer.apple.com/documentation/oslog?language=objc) to read logs from the local store of the unified logging system on darwin OSes. The syslog-ng OSE `system()` source automatically uses this new source on darwin platforms if the `darwinosl` plugin is available. This plugin is available only on macOS 10.15 Catalina and later versions. The 10.15 version is the first to support the OSLog API.
---

**NOTE:** The persistent OSLog store keeps about 7 days of logs on the disk.
{: .notice--info}

The `darwin-oslog()` source has the following options.

## filter-predicate()

|Type:|     string|
|Default:|`(eventType == 'logEvent' || eventType == 'lossEvent' || eventType == 'stateEvent' || eventType == 'userActionEvent') && (logType != 'debug')`|

*Description:* String for [native macOS log message filtering using predicates](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html). For example, the following predicate selects AirDrop logs: `subsystem=="com.apple.sharing" and category=="AirDrop"`

## do-not-use-bookmark()

|Type:|     boolean|
|Default:| `no`|

*Description:* By default, syslog-ng OSE continues to read the logs from the last remembered position after a restart. If this option is set to `yes`, it always starts reading from the end or beginning of the available log list (depending on the setting of the `go-reverse()` option.

## fetch-delay()

|Type:|     integer|
|Default:| `10000`|

*Description:* Sets the time syslog-ng OSE waits between reading and sending log messages. The dimension of this parameter is a fraction of a second, where `wait_time = 1 second / <defined value>`, so setting `1` would result that only about 1 log is sent in each second, and `1000000` means only 1 microsecond is the delay between read/write attempts. The maximum value of this parameter is `1000000`.

**NOTE:** Increasing the value of this parameter (which lowers delay time) can increase log feed performance, but at could increase system load.
{: .notice--info}


## fetch-retry-delay()

|Type:|     integer|
|Default:| `1`|

*Description:* Controls how many seconds syslog-ng OSE spends idle before checking for new logs, in case no new logs were read the last time.

## go-reverse()

|Type:|     boolean|
|Default:| `no`|

*Description:* If set to `yes`, the logs are processed in reverse order (latest to oldest).

## log-fetch-limit

**NOTE:** This option is currently disabled due to an [OSLog API bug](https://openradar.appspot.com/radar?id=5597032077066240).
{: .notice--info}

|Type:|     integer|
|Default:| `0`(unlimited)|

*Description:* The maximum number of messages fetched from a source with a single poll loop. The destination queues might fill up before `flow-control` could stop reading if the defined `log-fetch-limit()` value is too high.

## max-bookmark-distance()

|Type:|     integer|
|Default:| `0`(unlimited) [seconds]|

*Description:* The maximum distance in seconds that a bookmark can point backwards. That is, if syslog-ng OSE is stopped for 10 minutes (600 seconds) and `max-bookmark-distance()` is set to `60`, then syslog-ng OSE starts reading the logs from 60 seconds before the startup, missing 9 minutes (540 seconds) worth of logs.

## read-old-records()

|Type:|     boolean|
|Default:| `no`|

*Description:* If set to yes, syslog-ng OSE starts reading logs starting from the oldest available log when the system starts, or if there are no bookmarks present.
