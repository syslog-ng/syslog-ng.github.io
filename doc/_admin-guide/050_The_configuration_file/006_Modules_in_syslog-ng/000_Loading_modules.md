---
title: Loading modules
id: adm-mod-loading
description: >-
    The syslog-ng Open Source Edition application loads every available
    module during startup.
---

To load a module that is not loaded automatically, include the following
statement in the syslog-ng OSE configuration file:

```config
@module <module-name>
```

Note the following points about the @module statement:

- The @module statement is a top-level statement, that is, it cannot
    be nested into any other statement. It is usually used immediately
    after the @version statement.

- Every @module statement loads a single module: loading multiple
    modules requires a separate @module statement for every module.

- In the configuration file, the @module statement of a module must
    be earlier than the module is used.

>**NOTE:** To disable loading every module automatically, set the
>autoload-compiled-modules global variable to **0** in your configuration
>file:
>  
>```config
>@define autoload-compiled-modules 0
>```
>  
>Note that in this case you have to explicitly load the modules you want
>to use.
{: .notice--info}

## Use the @requires statement to ensure that the specified module is loaded

To ensure that a module is loaded, include the following statement in
the syslog-ng OSE configuration file or the external files included in
the configuration file:

```config
@requires <module-name>
```

>**NOTE:** If you include the @requires statement in the:
>  
>- syslog-ng OSE configuration file, syslog-ng OSE attempts to load the
>    required module. If it fails to load the module, syslog-ng OSE stops
>    and an error message is displayed.
>  
>- external files included in the configuration file, syslog-ng OSE
>    attempts to load the required module. If it fails to load the
>    module, only the external file is not processed.
>  
>Note that this is not true for modules marked as mandatory. You can make
>a dependency module mandatory by defining an error message after the
>`@requires <module-name>` statement, for example:
>  
>```config
>@requires http "The http() driver is required for elasticsearch-http(). 
>Install syslog-ng-mod-http to continue."
>```
>
{: .notice--info}
