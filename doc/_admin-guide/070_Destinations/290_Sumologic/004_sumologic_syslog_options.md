---
title: sumologic-syslog() destination options
port: '6514'
srv: 'Sumo Logic server'
token: 'Cloud Syslog Cloud Token'
provider: 'Sumo Logic service'
id: adm-dest-sumologic-syslog-opt
---

The sumologic-syslog() destination supports all
[[network() destination options]].

In addition, the sumologic-syslog() destination also has the following
options.

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/options/deployment.md %}

{% include doc/admin-guide/options/port.md %}

## tag()

|  Type:|      string list|
  |Default:|   \"tag\"|

*Description:* Optional. This option specifies the list of tags to add
as the tags fields of Sumo Logic messages. If not specified, syslog-ng
OSE automatically adds the tags already assigned to the message. If you
set the tag() option, only the tags you specify will be added to the
messages.

{% include doc/admin-guide/options/tls.md %}

{% include doc/admin-guide/options/token.md %} while
[configuring your cloud syslog source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#configure-a-cloud%C2%A0syslog%C2%A0source).

Required option.
