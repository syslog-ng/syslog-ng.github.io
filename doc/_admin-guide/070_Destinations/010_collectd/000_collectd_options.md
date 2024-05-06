---
title: collectd() destination options
id: adm-dest-collectd-opt
---

The collectd() destination has the following options. The plugin() and
type() options are required options. You can also set other options of
the underlying unix-stream() driver (for example, socket buffer size).

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/flush-lines.md %}

{% include doc/admin-guide/options/frac-digits.md %}

{% include doc/admin-guide/options/hook.md %}

## host()

|Type:| string, macro, or template|
|Default:|   \${HOST}|

*Description:* The hostname that is passed to collectd. By default,
syslog-ng OSE uses the host from the log message as the hostname.

## interval()

|Type:|      integer|
|Default:  | 60|

*Description:* The interval in which the data is collected.

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/keep-alive.md %}

## plugin()

|Type:|      string|
|Default:||

*Description:* The name of the plugin that submits the data to collectd.

For example:

```config
plugin("${PROGRAM}"),
```

## plugin-instance()

|Type: | string|
|Default:   ||

*Description:* The name of the plugin-instance that submits the data to
collectd.

## socket()

|Type:|      path|
|Default:|   /var/run/collectd-unixsock|

*Description:* The path to the socket of collectd. For details, see the
[collectd-unixsock(5) manual page](https://collectd.org/documentation/manpages/collectd-unixsock.5.shtml).

{% include doc/admin-guide/options/so-broadcast.md %}

{% include doc/admin-guide/options/so-keepalive.md %}

{% include doc/admin-guide/options/so-rcvbuf.md %}

{% include doc/admin-guide/options/so-sndbuf.md %}

{% include doc/admin-guide/options/suppress.md %}

{% include doc/admin-guide/options/throttle.md %}

## type()

|Type:     | string or template|
|Default:||

*Description:* Identifies the type and number of values passed to
collectd. For details, see the [types.db manual page]
(https://collectd.org/documentation/manpages/types.db.5.shtml).  

For example:

```config
type("gauge"),
```

## type-instance()

|Type:|      string|
|Default:   ||

*Description:* For example:

```config
type-instance("seqnum"),
```

## values()

|Type:|      string, macro, or template|
|Default: |  U|

*Description:* Colon-separated list of the values to send to collectd.
For example:

```config
values("${SEQNUM}"),
```
