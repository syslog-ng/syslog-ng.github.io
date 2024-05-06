---
title: pipe() destination options
id: adm-dest-pipe-opt
---

This driver sends messages to a named pipe like /dev/xconsole.

The pipe() destination has the following options:

{% include doc/admin-guide/options/create-dirs.md %}

{% include doc/admin-guide/options/destination-flags.md %}

{% include doc/admin-guide/options/flush-lines.md %}

{% include doc/admin-guide/options/frac-digits.md %}

## group()

|  Type:|      string|
  |Default:|   Use the global settings|

*Description:* Set the group of the created file to the one specified.
To preserve the original properties of an existing file, use the option
without specifying an attribute: group().

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/mark-freq.md %}

{% include doc/admin-guide/options/mark-mode.md %}

## owner()

|  Type:|      string|
  |Default:|   Use the global settings|

*Description:* Set the owner of the created file to the one specified.
To preserve the original properties of an existing file, use the option
without specifying an attribute: owner().

{% include doc/admin-guide/options/pad-size.md %}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Hazard of data loss! If the size of the incoming message is larger
than the previously set pad-size() value, syslog-ng will truncate
the message to the specified size. Therefore, all message content
above that size will be lost.
{: .notice--danger}

{% include doc/admin-guide/options/perm.md %}

{% include doc/admin-guide/options/suppress.md %}

{% include doc/admin-guide/options/template-logformat.md %}

{% include doc/admin-guide/options/template-escape.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reap.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/ts-format.md %}
