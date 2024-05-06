---
title: Listing configuration options
id: adm-mod-list
description: >-
    Starting with syslog-ng OSE 3.25, you can use the syslog-ng-cfg-db.py
    utility to list the available options of configuration objects. For
    example, you can list all the options that can be set in the file
    source, and so on.
---

The syslog-ng-cfg-db.py utility has the following options:

- The following command lists the contexts that the utility supports.

    ```bash
    syslog-ng-cfg-db.py
    ```

    **NOTE:** Currently, sources and destinations are supported.
    {: .notice--info}

- The following command lists the available drivers of a context:

    ```bash
    syslog-ng-cfg-db.py -c <source|destination>
    ```

- The following command lists the available options of a specific
    driver and specifies the context and the driver:

    ```bash
    syslog-ng-cfg-db.py -c <source|destination> -d <driver>
    ```

    For example, to list the options of the kafka-c() destination
    driver:

    ```bash
    syslog-ng-cfg-db.py -c destination -d kafka-c
    ```

    The output includes the available options of the driver in
    alphabetical order, and the type of the option. For example:

    ```config
    destination kafka-c(
        bootstrap-servers/kafka-bootstrap-servers(<string>)
        client-lib-dir(<string>)
        config/option()
        config/option(<string> <arrow> <string-or-number>)
        config/option(<string> <string-or-number>)
        flush-timeout-on-reload(<number>)
        flush-timeout-on-shutdown(<number>)
        frac-digits(<number>)
        key(<string>)
        local-time-zone/time-zone(<string>)
        log-fifo-size(<number>)
        message/template(<string>)
        on-error(<string>)
        persist-name(<string>)
        poll-timeout(<number>)
        properties-file(<path>)
        send-time-zone(<string>)
        sync-send(<yesno>)
        throttle(<number>)
        time-zone(<string>)
        topic(<string>)
        ts-format(<string>)
        workers(<number>)
        config/option(
            <string>(<string-or-number>)
        )
        key(
            <identifier>(<string>)
        )
        message/template(
            <identifier>(<string>)
        )
    )
    ```

    **NOTE:** The script caches the list of the options, so if you want to
    rebuild the database, you have to use the -r option.
    {: .notice--info}
