---
title: Location of the {{ site.product.short_name }} configuration file
id: adm-conf-loc
description: >-
    This section describes the location of {{ site.product.short_name }} configuration file.
---

To configure {{ site.product.short_name }}, edit the syslog-ng.conf file with any
regular text editor application.

The location of the configuration file depends on how you installed
{{ site.product.short_name }}. Native packages of a platform (like the ones downloaded
from Linux repositories) typically place the configuration file under
the **/etc/syslog-ng/** directory.

The configuration file location can also be specified using the `--cfgfile <file>` or `-f <file>` startup options. For all supported command-line options, see the {{ site.product.short_name }} manual page.
