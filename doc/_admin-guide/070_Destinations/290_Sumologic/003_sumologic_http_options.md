---
title: sumologic-http() destination options
id: adm-dest-sumologic-http-opt
---


The sumologic-http() destination supports all
[[HTTP destination options]].
In addition, the sumologic-http() destination also has the following
options.

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

## collector()

|  Type:|      string|
  |Default:|   empty|

*Description:* The Cloud Syslog Cloud Token that you received from the
Sumo Logic service while [configuring your cloud syslog
source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#configure-a-cloud%C2%A0syslog%C2%A0source).

For details on the option in the destination\'s declaration, see
[[Declaration for the sumologic-http() destination|adm-dest-sumologic-http]].

{% include doc/admin-guide/options/deployment.md %}

{% include doc/admin-guide/options/headers.md %}

**NOTE:** The headers() option is a required option for the sumologic-http()
destination.
{: .notice--info}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/tls.md %}
