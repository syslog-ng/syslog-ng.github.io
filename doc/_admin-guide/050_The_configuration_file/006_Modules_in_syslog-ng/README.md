---
title: Modules in syslog-ng Open Source Edition
short_title: Modules in syslog-ng
id: adm-modules
description: >-
    To increase its flexibility and simplify the development of additional
    modules, the syslog-ng OSE application is modular.
---

The majority of syslog-ng OSE's functionality is in separate modules.
As a result, it is also possible to fine-tune the resource requirements
of syslog-ng OSE (for example, by loading only the modules that are actually
used in the configuration, or simply omitting modules that are not used but require
large amount of memory).

Each module contains one or more plugins that add some functionality to
syslog-ng OSE (for example, a destination or a source driver).

- To display the list of available modules, run the **syslog-ng --version** command.

- To display the description of the available modules, run the
    **syslog-ng --module-registry** command.

- To customize which modules syslog-ng OSE automatically loads when
    syslog-ng OSE starts, use the **--default-modules** command-line
    option of syslog-ng OSE.

- To request loading a module from the syslog-ng OSE configuration
    file, see [[Loading modules]].  

For details on the command-line parameters of syslog-ng OSE mentioned in
the previous list, see the syslog-ng OSE man page at
[[The syslog-ng manual page]].
