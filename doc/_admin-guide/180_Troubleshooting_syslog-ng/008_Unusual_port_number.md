---
title: No logs after specifying an unusual port number
short_title: Unusual port number
id: adm-debug-unusual-port
description: >-
    Security-Enhanced Linux (SELinux) is a set of kernel and user-space
    tools enforcing strict access control policies. SELinux rules in Linux
    distributions cover all aspects of the {{ site.product.short_name }} configuration coming in
    the {{ site.product.short_name }} package available in the distribution. But as soon as an
    unusual port number or directory name is specified in the configuration,
    {{ site.product.short_name }} fails to work even with a completely legitimate configuration.
---

By default, SELinux only allows connections to the default syslog ports.
When you have to use any other port for some reason, sending logs to
that port will not work. For details on how to fix this issue, see
section Using a different portin the blog post titled
Using {{ site.product.short_name }} with SELinux in enforcing mode.
