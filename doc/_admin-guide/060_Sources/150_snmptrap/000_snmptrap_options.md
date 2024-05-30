---
title: snmptrap() source options
fn_source: snmptrapd
fn_logs: traps
id: adm-src-snmp-opt
---

The snmptrap() driver has the following options. Only the filename()
option is required, the others are optional.

{% include doc/admin-guide/options/filename.md %}

In addition to traps, the log of snmptrapd may contain other messages
(for example, daemon start/stop information, debug logs) as well.
Currently {{ site.product.short_name }} discards these messages.

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/options/prefix.md %}

Default value: .snmp. option.

## set-message-macro()

|Accepted value:| yes \| no |
|Default:|   yes|

*Description:* The snmptrap() source automatically parses the traps into
name-value pairs, so you can handle the content of the trap as a
structured message. Consequently, you might not even need the
MESSAGE part of the log message. If set-message-macro() is set to
**no**, {{ site.product.short_name }} leaves the `MESSAGE` part empty. If
set-message-macro() is set to **yes**, {{ site.product.short_name }} generates a regular
log message from the trap.
