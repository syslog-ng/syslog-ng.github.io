---
title: Options of geoip2 parsers
parser: geoip2
id: adm-enrich-geoip-opt
---

The geoip2 parser has the following options.

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-prefix.md %}

## database()

*Description:* Path to the GeoIP2 database to use. This works with
absolute and relative paths as well. Note that syslog-ng OSE must have
the required privileges to read this file. Do not modify or delete this
file while syslog-ng OSE is running, it can crash syslog-ng OSE.

Starting with version 3.24, syslog-ng OSE tries to automatically detect
the location of the database. If that is successful, the database()
option is not mandatory.
