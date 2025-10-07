---
title: Listing configuration options
id: adm-mod-list
description: >-
    Starting with {{ site.product.short_name }} 3.25, you can use the syslog-ng-cfg-helper
    utility to list the available options of configuration objects. For
    example, you can list all the options that can be set in the file
    source, and so on.
---

The syslog-ng-cfg-helper utility has the following options:

- The following command lists the contexts that the utility supports.

    ```bash
    syslog-ng-cfg-helper
    ```

    **NOTE:** Currently, sources and destinations are supported.
    {: .notice--info}

- The following command lists the available drivers of a context:

    ```bash
    syslog-ng-cfg-helper -c <source|destination>
    ```

- The following command lists the available options of a specific
    driver and specifies the context and the driver:

    ```bash
    syslog-ng-cfg-helper -c <source|destination> -d <driver>
    ```

    For example, to list the options of the kafka() destination
    driver:

    ```bash
    syslog-ng-cfg-helper -c destination -d kafka
    ```

    The output includes the available options of the driver in
    alphabetical order, and the type of the option. For example:

    ```config
    kafka-c(
        batch-lines(<nonnegative-integer>)
        batch-timeout(<positive-integer>)
        bootstrap-servers(<string>)
        config(
            <empty>
            <string> <string-or-number>
            <string> => <string-or-number>
            <string>(<string-or-number>)
        )
        disk-buffer(
            capacity-bytes(<number>)
            compaction(<yesno>)
            dir(<string>)
            capacity-bytes(<number>)
            flow-control-window-bytes(<nonnegative-integer>)
            flow-control-window-size(<nonnegative-integer>)
            front-cache-size(<nonnegative-integer>)
            flow-control-window-size(<nonnegative-integer>)
            flow-control-window-bytes(<nonnegative-integer>)
            prealloc(<yesno>)
            front-cache-size(<nonnegative-integer>)
            reliable(<yesno>)
            truncate-size-ratio(<nonnegative-float>)
        )
        fallback-topic(<string>)
        flags(
            <empty>
            <string>
        )
        flush-timeout-on-reload(<nonnegative-integer>)
        flush-timeout-on-shutdown(<nonnegative-integer>)
        frac-digits(<nonnegative-integer>)
        hook-commands(
            setup(<string>)
            shutdown(<string>)
            startup(<string>)
            teardown(<string>)
        )
        internal(<yesno>)
        key(<template-content>)
        local-time-zone(<string>)
        log-fifo-size(<positive-integer>)
        message(
            <template-content>
            <template-reference>
        )
        on-error(<string>)
        persist-name(<string>)
        poll-timeout(<nonnegative-integer>)
        retries(<positive-integer>)
        send-time-zone(<string>)
        sync-send(<yesno>)
        template-escape(<yesno>)
        throttle(<nonnegative-integer>)
        time-reopen(<positive-integer>)
        time-zone(<string>)
        topic(<template-content>)
        ts-format(<string>)
        worker-partition-key(<template-content>)
        workers(<positive-integer>)
    )
    ```

    **NOTE:** The script caches the list of the options, so if you want to
    rebuild the database, you have to use the -r option.
    {: .notice--info}
