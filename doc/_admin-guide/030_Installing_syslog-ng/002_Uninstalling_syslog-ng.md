---
title: Uninstalling {{ site.product.short_name }}
id: adm-inst-uninst
description: >-
	This chapter gives you instructions about the uninstallation of {{ site.product.short_name }}.
---

If you need to uninstall {{ site.product.short_name }} for some reason, you have the
following options:

- *If you have installed {{ site.product.short_name }} from a .deb package*: Execute
    the **dpkg -r syslog-ng** command to remove {{ site.product.short_name }}, or the **dpkg
    -P syslog-ng** command to remove {{ site.product.short_name }} and the configuration
    files as well. Note that removing {{ site.product.short_name }} does not restore the
    syslog daemon used before syslog-ng.

- *If you have installed {{ site.product.short_name }} from an .rpm package*: Execute
    the **rpm -e syslog-ng** command to remove {{ site.product.short_name }}. Note that
    removing {{ site.product.short_name }} does not restore the syslog daemon used
    before {{ site.product.short_name }}.

- *If you have compiled {{ site.product.short_name }} from source*: Execute the **sudo
    make uninstall** command to remove {{ site.product.short_name }}. Note that removing
    {{ site.product.short_name }} does not restore the syslog daemon used before
    {{ site.product.short_name }}.
