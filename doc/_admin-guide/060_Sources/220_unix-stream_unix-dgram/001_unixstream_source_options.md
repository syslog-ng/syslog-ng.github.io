---
title: unix-stream() and unix-dgram() source options
max_conn_default: '256'
perm: '0666'
id: adm-src-unix-opt
---

These two drivers behave similarly: they open an AF_UNIX socket and
start listening on it for messages. The following options can be
specified for these drivers:

{% include doc/admin-guide/options/create-dirs.md %}

{% include doc/admin-guide/options/encoding.md %}

{% include doc/admin-guide/options/source-flags.md %}

## group()

|  Type:|      string|
|Default:|   root|

*Description:* Sets the gid of the socket.

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host-override.md %}

{% include doc/admin-guide/options/keep-alive.md %}

{% include doc/admin-guide/options/keep-timestamp.md %}

{% include doc/admin-guide/options/listen-backlog.md %}

{% include doc/admin-guide/options/log-fetch-limit.md %}

{% include doc/admin-guide/options/log-iw-size.md %}

{% include doc/admin-guide/options/log-msg-size.md %}

{% include doc/admin-guide/options/log-prefix.md %}

{% include doc/admin-guide/options/max-connections.md %}

Cannot be used with unix-dgram().

{% include doc/admin-guide/options/optional.md %}

## owner()

|  Type:|      string|
|Default:|   root|

*Description:* Sets the uid of the socket.

{% include doc/admin-guide/options/pad-size.md %}

{% include doc/admin-guide/options/perm.md %}

{% include doc/admin-guide/options/program-override.md %}

{% include doc/admin-guide/options/so-keepalive.md %}

{% include doc/admin-guide/options/so-rcvbuf.md %}

{% include doc/admin-guide/options/so-reuseport.md %}

{% include doc/admin-guide/options/tags.md %}

{% include doc/admin-guide/options/time-zone.md %}
