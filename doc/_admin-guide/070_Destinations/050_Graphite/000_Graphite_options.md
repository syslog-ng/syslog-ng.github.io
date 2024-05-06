---
title: graphite() destination options
srv: Graphite server
port: '2003'
id: adm-dest-graphite-opt
---

The graphite() destination has the following options:

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host.md %}

{% include doc/admin-guide/options/port.md %}

## payload()

| Type:    | parameter list of the payload() option |
| Default: |     empty string                       |

*Description:* The payload() option allows you to select which value
pairs to forward to graphite.

The syntax of payload is different from the syntax of value-pairs():
use the command-line syntax used in the Template functions of syslog-ng OSE
format-json template function.
For details on using the payload() option, see graphite-output.

**NOTE:** If left empty, there is no data to be forwarded to Graphite.
{: .notice--info}
