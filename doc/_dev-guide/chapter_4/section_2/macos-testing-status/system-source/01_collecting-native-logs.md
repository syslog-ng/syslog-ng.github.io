---
title: Collecting native macOS logs
description:  >-
      This post explains how you can collect native macOS log messages using
      two new sources darwin-oslog() and darwin-oslog-stream()
id: dev-macos-native-logs
---

## Collecting native macOS system logs

Two new sources have been added on macOS darwin-oslog() and darwin-oslog-stream()

darwin-oslog() replaced the earlier file source based solution with a native OSLog
framework based one, and is automatically used in the system() source on darwin
platform if the **darwinosl** plugin is presented.

This plugin is available only on macOS 10.15 Catalina and above, the first version
that has the OSLog API.

### darwin-oslog()

This is a native OSLog Framework based source to read logs from the local store of
the unified logging system on darwin OSes.
For more info, see [oslog](https://developer.apple.com/documentation/oslog?language=objc)

#### The following parameters can be used for customization:

- `filter-predicate()`
  - string value, which can be used to filter the log messages natively
  - default value: `(eventType == 'logEvent' || eventType == 'lossEvent' || eventType == 'stateEvent' || eventType == 'userActionEvent') && (logType != 'debug')`
  - for more details, see
    - `man log`
    - [predicate syntax](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html)
- `go-reverse()`
  - boolean value, setting to `yes` will provide a reverse-ordered log list
        (from latest to oldest)
  - default value: `no`
- `do-not-use-bookmark()`
  - boolean value, setting to `yes` will prevent {{ site.product.short_name }} from continuing to
        feed the logs from the last remembered position after a (re-)start, which means,
        depending on the other settings, the feed will always start from the end/beginning
        of the available log list
  - default value: `no`, which means {{ site.product.short_name }} will attempt to continue feeding from
        the last remembered log position after a (re-)start
- `max-bookmark-distance()`
  - integer value, maximum distance in seconds that far an earlier bookmark can point
        backward, e.g. if {{ site.product.short_name }} was stopped for 10 minutes and max-bookmark-distance
        is set to 60 then {{ site.product.short_name }} will start feeding the logs only from the last 60
        seconds at startup, 9 minutes of logs 'will be lost'
  - default value: `0`, which means no limit
- `read-old-records()`
  - boolean value, controls if {{ site.product.short_name }} should start reading logs from the oldest
        available at first start (or if no bookmark can be found)
  - default value: `no`
- `log-fetch-delay()`
  - integer value, controls how much time {{ site.product.short_name }} should wait between reading/sending
        log messages, this is a fraction of a second, where wait_time = 1 second / n, so,
        e.g. n=1 means that only about 1 log will be read and sent in each second,
        and n=1 000 000 means only 1 microsecond (the allowed minimum value now!)
        will be the delay between read/write attempts
  - Use with care, though lower delay time can increase log feed performance, at the
        same time could lead to a heavy system load!
  - default value: `10 000`
- `log-fetch-retry-delay()`
  - integer value, controls how many seconds {{ site.product.short_name }} will wait before a repeated
        attempt to read/send once it's out of available logs
  - default value: `1`
- `log-fetch-limit()`
  - integer value, that limits the number of logs {{ site.product.short_name }} will send in one run
  - default value: `0`, which means no limit

NOTE: the persistent OSLog store is not infinite, depending on your system setting usually,
it keeps about 7 days of logs on disk, so it could happen that the above options cannot
operate the way you expect, e.g. if {{ site.product.short_name }} was stopped for about more then a week it
could happen that will not be able to restart from the last saved bookmark position
(as that might not be presented in the persistent log anymore)
{: .notice}

### darwin-oslog-stream()

This is a wrapper around the OS command line "log stream" command that can provide a live
log stream feed. Unlike in the case of `darwin-oslog()` the live stream can contain
non-persistent log events too, so take care, there might be a huge number of log events
every second that could put an unusual load on the device running {{ site.product.short_name }} with this source.
Unfortunately, there's no public API to get the same programmatically, so this one is
implemented using a program() source.

#### Possible parameters:

- `params()`
  - a string that can contain all the possible params the macOS `log` tool can accept
  - see `log --help stream` for full reference, and `man log` for more details
  - IMPORTANT: the parameter `--style` is used internally (defaults to `ndjson`), so it
      cannot be overridden, please use other sysylog-ng features (templates, rewrite rules, etc.)
      for final output formatting
  - default value: `--type log --type trace --level info --level debug`,
      you can use \``def-osl-stream-params`\` for referencing it if you wish to keep the
      defaults when you add your own
