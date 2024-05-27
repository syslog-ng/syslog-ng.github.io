---
title: Modules in {{ site.product.name }}
short_title: Modules in syslog-ng
id: adm-modules
description: >-
    To increase its flexibility and simplify the development of additional
    modules, the {{ site.product.short_name }} application is modular.
---

The majority of {{ site.product.short_name }}'s functionality is in separate modules.
As a result, it is also possible to fine-tune the resource requirements
of {{ site.product.short_name }} (for example, by loading only the modules that are actually
used in the configuration, or simply omitting modules that are not used but require
large amount of memory).

Each module contains one or more plugins that add some functionality to
{{ site.product.short_name }} (for example, a destination or a source driver).

- To display the list of available modules, run the **syslog-ng --version** command.

- To display the description of the available modules, run the
    **syslog-ng --module-registry** command.

- To customize which modules {{ site.product.short_name }} automatically loads when
    {{ site.product.short_name }} starts, use the **--default-modules** command-line
    option of {{ site.product.short_name }}.

- To request loading a module from the {{ site.product.short_name }} configuration
    file, see Loading modules.  

For details on the command-line parameters of {{ site.product.short_name }} mentioned in
the previous list, see the {{ site.product.short_name }} man page at
The {{ site.product.short_name }} manual page.
