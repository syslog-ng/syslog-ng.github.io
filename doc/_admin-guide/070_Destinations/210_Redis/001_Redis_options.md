---
title: redis() destination options
srv: Redis server
port: '6379'
id: adm-dest-redis-opt
---

The redis() destination has the following options:

## auth()

|  Type:  | string |
| Default: |  N/A|

*Description:* The password used for authentication on a
password-protected Redis server. Available in syslog-ng OSE version 3.10
and later.

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

## command()

|  Type:  |    comma-separated list of strings (\"\<redis-command\>\", \"\<first-command-parameter\>\", \"\<second-command-parameter\>\", \"\<third-command-parameter\>\")|
|Default: |  empty string|

*Description:* The [Redis command](https://redis.io/commands) to
execute, for example, LPUSH, INCR, or HINCRBY. Using the HINCRBY command
with an increment value of 1 allows you to create various statistics.
For example, the **command("HINCRBY" "${HOST}/programs"
"${PROGRAM}" "1")** command counts the number of log messages on
each host for each program.

Note the following points when using the redis() destination:

- You can use macros and templates in the parameters of the Redis
    command.

- Currently you can use only one command in a redis() destination.

- The syslog-ng OSE application ignores the return value of the
    command. If the Redis server returns an error, syslog-ng OSE closes
    the connection.

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host.md %}

{% include doc/admin-guide/options/port.md %}

{% include doc/admin-guide/options/retries.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/workers.md %}
