---
title: osquery() source options
id: adm-src-osquery-opt
---

The osquery() driver has the following options.

## file()

|Type:|      path|
|Default: |  /var/log/osquery/osqueryd.results.log|

*Description:* The log file of osquery that stores the results of
periodic queries. The syslog-ng OSE application reads the messages from
this file.

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/prefix.md %}

### Default value

.osquery. option.
