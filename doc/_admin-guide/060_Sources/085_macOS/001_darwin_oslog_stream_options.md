---
title: darwin-oslog-stream() source options
id: adm-src-darw-osl-str-opt
description: >-
    This source is a wrapper around the OS command line log stream command that provides a live log stream feed. Unlike the `darwin-oslog()` source, the live stream can contain non-persistent log events as well. This might result in a large number of log events per second.
---

The `darwin-oslog-stream()` source only has the following option.

## params()

|Type:|     string|
|Default:| `--type log --type trace --level info --level debug`|

*Description:* A string that can contain all the possible params the macOS log tool can accept. The source uses the `–style` internally (defaults to ndjson), so use templates or rewrite rules to format the final output. Use the `def-osl-stream-params` string to reference the default values when extending them with custom ones.

For a full reference, see the output of the `log --help stream` and `man log` commands.