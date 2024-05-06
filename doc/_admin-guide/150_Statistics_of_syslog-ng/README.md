---
title: Statistics of syslog-ng
id: adm-stats
description: >-
    The syslog-ng OSE application collects various statistics and measures
    different metrics about the messages it receives and delivers. These
    metrics are collected into different counters, depending on the
    configuration of syslog-ng OSE. The stats-level()
    global option determines exactly which statistics syslog-ng OSE collects.
    You can access these statistics and metrics using the following methods.
---

## Recommended: Structured, selective methods

- Using the syslog-ng-ctl
    query command.

    For further information about using syslog-ng-ctl commands, see
    [[The syslog-ng manual pages]].

## Legacy: Unstructured, bulk methods

- Using the internal() source.

- Using the syslog-ng-ctl stats command.

    For further information about using syslog-ng-ctl commands, see
    [[The syslog-ng manual pages]].

- Use the socat application:

    ```bash
    echo STATS \| socat -vv UNIX-CONNECT:/opt/syslog-ng/var/run/syslog-ng.ctl -
    ```

- If you have an OpenBSD-style netcat application installed, use the

    ```bash
    echo STATS \| nc -U /opt/syslog-ng/var/run/syslog-ng.ctl
    ```

    command. Note that the netcat included in most Linux distributions
    is a GNU-style version that is not suitable to query the statistics
    of syslog-ng.
