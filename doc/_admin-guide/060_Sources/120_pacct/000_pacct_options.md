---
title: pacct() options
id: adm-src-pacct-opt
description: >-
    This section describes the options of the pacct() source in {{ site.product.short_name }}.
---

The pacct() driver has the following options:

{% include doc/admin-guide/options/chain-hostnames.md %}

## file()

|  Type:     |filename with path|
|  Default:  | /var/log/account/pacct|

*Description:* The file where the process accounting logs are stored ---
{{ site.product.short_name }} reads accounting messages from this file.

{% include doc/admin-guide/options/follow-freq.md %}

{% include doc/admin-guide/options/format.md %}

{% include doc/admin-guide/options/internal.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/normalize-hostnames.md %}

{% include doc/admin-guide/options/sdata-prefix.md %}

{% include doc/admin-guide/options/use-syslogng-pid.md %}
