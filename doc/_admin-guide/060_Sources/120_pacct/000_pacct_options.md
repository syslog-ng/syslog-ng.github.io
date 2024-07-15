---
title: pacct() options
id: adm-src-pacct-opt
description: >-
    This section describes the options of the pacct() source in {{ site.product.short_name }}.
---

The pacct() driver has the following options:

## file()

|  Type:     |filename with path|
|  Default:  | /var/log/account/pacct|

*Description:* The file where the process accounting logs are stored ---
{{ site.product.short_name }} reads accounting messages from this file.

{% include doc/admin-guide/options/follow-freq.md %}

{% include doc/admin-guide/options/hook.md %}
