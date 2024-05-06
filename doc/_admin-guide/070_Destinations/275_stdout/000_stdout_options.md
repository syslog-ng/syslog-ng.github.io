---
title: stdout() options
id: adm-opt-stdout
---
The following options are available for an stdout destiantion.

{% include doc/admin-guide/options/destination-flags.md %}

{% include doc/admin-guide/options/flush-lines.md %}

## flush-timeout()

| Type:|  time [milliseconds]|
|  Default: |  10 000 milliseconds|

*Description:* Specifies the time syslog-ng OSE waits for lines to accumulate in the output buffer. The syslog-ng OSE application sends flushes to the destinations evenly. The timer starts when the first message arrives to the buffer, so if only few messages arrive, syslog-ng OSE sends messages to the destination at most once every [[flush-timeout()]] seconds.

{% include doc/admin-guide/options/frac-digits.md %}

{% include doc/admin-guide/options/local-time-zone.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/mark-freq.md %}

{% include doc/admin-guide/options/mark-mode.md %}

{% include doc/admin-guide/options/pad-size.md %}

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/options/send-time-zone.md %}

{% include doc/admin-guide/options/suppress.md %}

{% include doc/admin-guide/options/template-macro.md %}

{% include doc/admin-guide/options/template-escape.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/ts-format.md %}













