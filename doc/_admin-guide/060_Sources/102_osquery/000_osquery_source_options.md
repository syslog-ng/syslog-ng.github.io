---
title: osquery() source options
id: adm-src-osquery-opt
description: >-
    This section describes the options of the osquery() source in {{ site.product.short_name }}.
---

The osquery() driver has the following options.

{% include doc/admin-guide/options/chain-hostnames.md %}

## file()

|Type:|      path|
|Default: |  /var/log/osquery/osqueryd.results.log|

*Description:* The log file of osquery that stores the results of
periodic queries. The {{ site.product.short_name }} application reads the messages from
this file.

{% include doc/admin-guide/options/format.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/internal.md %}

{% include doc/admin-guide/options/normalize-hostnames.md %}

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/options/sdata-prefix.md %}

{% include doc/admin-guide/options/use-syslogng-pid.md %}

### Default value

.osquery. option.
