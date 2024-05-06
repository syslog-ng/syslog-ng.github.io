---
title: Metrics and counters of syslog-ng OSE
id: adm-stats-metrics
---

You can list all active metrics on your syslog-ng OSE host using the
following command (this lists the metrics, without their current
values): **syslog-ng-ctl query list \"\*\"**

To list the metrics and their values, use the following command:
**syslog-ng-ctl query get \"\*\"**

The displayed metrics have the following structure.

1. The type of the object (for example, dst.file, tag, src.facility)

2. The ID of the object used in the syslog-ng configuration file, for
    example, d\_internal or source.src\_tcp. The \#0 part means that
    this is the first destination in the destination group.

3. The instance ID (destination) of the object, for example, the
    filename of a file destination, or the name of the application for a
    program source or destination.

4. The status of the object. One of the following:

    - **a** - active. At the time of quering the statistics, the source or
        the destination was still alive (it continuously received
        statistical data).

    - **d** - dynamic. Such objects may not be continuously available, for
        example, like statistics based on the sender\'s hostname. These
        counters only appear above a certain value of stats-level()
        global option:

        - host: source host, from stats-level(2)

        - program: program, from stats-level(3)

        - sender: sender host, from stats-level(3)

        Example: Dynamic counters

        The following example contains 6 different dynamic values: a
        sender, a host, and four different programs.

        >src.sender;;localhost;d;processed;4
        >src.sender;;localhost;d;stamp;1509121934
        >src.program;;P-18069;d;processed;1
        >src.program;;P-18069;d;stamp;1509121933
        >src.program;;P-21491;d;processed;1
        >src.program;;P-21491;d;stamp;1509121934
        >src.program;;P-9774;d;processed;1
        >src.program;;P-9774;d;stamp;1509121919
        >src.program;;P-14737;d;processed;1
        >src.program;;P-14737;d;stamp;1509121931
        >src.host;;localhost;d;processed;4
        >src.host;;localhost;d;stamp;1509121934

        To avoid performance issues or even overloading syslog-ng OSE,
        you might want to limit the number of registered dynamic
        counters in the message statistics. To do this, configure the
        [[stats-max-dynamics()]]
        global option.

    - **o** - This object was once active, but stopped receiving messages.
        (For example, a dynamic object may disappear and become orphan.)

        **NOTE:** The syslog-ng OSE application stores the statistics of the
        objects when syslog-ng OSE is reloaded. However, if the
        configuration of syslog-ng OSE was changed since the last
        reload, the statistics of orphaned objects are deleted.
        {: .notice--info}

5. The connections statistics counter displays the number of
    connections tracked by syslog-ng OSE for the selected source driver.

    Example: sample configuration and statistics output

    The following configuration will display the following syslog-ng-ctl
    statistics output:

    Configuration:

    ```config
    source s_network { 
        tcp( 
        port(8001)  
        ); 
    };
    ```

    Statistics output:

    >src.tcp;s_network#0;tcp,127.0.0.5;a;processed;1
    >src.tcp;s_network#0;tcp,127.0.0.1;a;processed;3
    >src.tcp;s_network;afsocket_sd.(stream,AF_INET(0.0.0.0:8001));a;connections;2

6. The type of the statistics:

    - **batch\_size\_avg**: When batching is enabled, then this shows the
        current average batch size of the given source or destination.

        **NOTE:** In version 3.36, syslog-ng OSE only supports the
        batch\_size\_avg for the http() destination.
        {: .notice--info}

    - **batch\_size\_max**: When batching is enabled, the value of
        batch\_size\_max shows the current largest batch size of the
        given source or destination.

        **NOTE:** In version 3.36, syslog-ng OSE only supports the
        batch\_size\_max for the http() destination.
        {: .notice--info}

    - **discarded**: The number of messages discarded by the given parser.
        These are messages that the parser could not parsed, and are
        therefore not processed. For example:

        >parser;demo_parser;;a;discarded;20

    - **dropped**: The number of dropped messages --- syslog-ng OSE could
        not send the messages to the destination and the output buffer
        got full, so messages were dropped by the destination driver, or
        syslog-ng OSE dropped the message for some other reason (for
        example, a parsing error).

    - **eps\_last\_1h**: The EPS value of the past 1 hour.

    - **eps\_last\_24h**: The EPS value of the past 24 hours.

    - **eps\_since\_start**: The EPS value since the current syslog-ng OSE
        start.

        >**NOTE:** When using the eps\_last\_1h, the eps\_last\_24h, and the
        >eps\_since\_start statistics, consider the following:
        >  
        >- EPS stands for \"event per second\", and in our case, a
            message received or sent counts as a single event.
        >  
        >- The eps\_last\_1h, the eps\_last\_24h, and the
            eps\_since\_start values are only approximate values.
        >  
        >- The eps\_last\_1h, the eps\_last\_24h, and the
            eps\_since\_start values are automatically updated every 60
            seconds.
        >  
        {: .notice--info}

    - **matched**: The number of messages that are accepted by a given
        filter. Available for filters and similar objects (for example,
        a conditional rewrite rule). For example, if a filter matches a
        specific hostname, then the matched counter contains the number
        of messages that reached the filter from this hosts.

        >filter;demo_filter;;a;matched;28

    - **memory\_usage**: The memory used by the messages in the different
        queue types (in bytes). This includes every queue used by the
        object, including memory buffers (log-fifo) and disk-based
        buffers (both reliable and non-reliable). For example:

        >dst.network;d_net#0;tcp,127.0.0.1:9999;a;memory_usage;0

        **NOTE:** The memory usage (size) of queues is not equal to the
        memory usage (size) of the log messages in syslog-ng OSE. A log
        message can be in multiple queues, thus its size is added to
        multiple queue sizes. To check the size of all log messages, use
        global.msg\_allocated\_bytes.value metric.
        {: .notice--info}

    - **msg\_size\_max**: The current largest message size of the given
        source or destination.

    - **msg\_size\_avg**: The current average message size of the given
        source or destination.

        >**NOTE:** When using the msg\_size\_avg and msg\_size\_max
        > statistics, consider that message sizes are calculated as follows:
        >  
        > - on the source side: the length of the incoming raw message
        > - on the destination side: the length of the outgoing formatted message
        {: .notice--info}

    - **not\_matched**: The number of messages that are filtered out by a
        given filter. Available for filters and similar objects (for
        example, a conditional rewrite rule). For example, if a filter
        matches a specific hostname, then the not\_matched counter
        contains the number of messages that reached the filter from
        other hosts, and so the filter discarded them.

        **NOTE:** Since the not\_matched metric applies to filters, and
        filters are expected to discard messages that do not match the
        filter condition, not\_matched messages are not included in the
        dropped metric of other objects.
        {: .notice--info}

        >filter;demo_filter;;a;not_matched;0

    - **processed**: The number of messages that successfully reached
        their destination driver.

        **NOTE:** Consider that a message that has successfully reached its
        destination driver does not necessarily mean that the
        destination driver successfully delivered the messages as well.
        For example, a message can be written to disk or sent to a
        remote server after reaching the destination driver.
        {: .notice--info}

    - **queued**: The number of messages passed to the message queue of
        the destination driver, waiting to be sent to the destination.

    - **stamp**: The UNIX timestamp of the last message sent to the
        destination.

    - **suppressed**: The number of suppressed messages (if the suppress()
        feature is enabled).

    - **written**: The number of messages successfully delivered to the
        destination. This value is calculated from other counters:
        written = processed - queued - dropped. That is, the number of
        messages syslog-ng OSE passed to the destination driver
        (processed) minus the number of messages that are still in the
        output queue of the destination driver (queued) and the number
        of messages dropped because of an error (dropped, for example,
        because syslog-ng OSE could not deliver the message to the
        destination and exceeded the number of retries).

        This metric is calculated from other metrics. You cannot reset
        this metric directly: to reset it, you have to reset the metrics
        it is calculated from.

    >**NOTE:** Consider that for syslog-ng OSE version 3.36, the following
    >statistics counters are only supported for the http() destination,
    >or the http() destination and all network() sources and
    >destinations, and all file() sources and destinations, respectively:
    >  
    >- msg\_size\_max
    >- msg\_size\_avg
    >- batch\_size\_max
    >- batch\_size\_avg
    >- eps\_last\_1h
    >- eps\_last\_24h
    >- eps\_since\_start
    {: .notice--info}

7. The number of such messages.

## Availability of statistics

Certain statistics are available only if the
[[stats-level()]] global option is set to a higher value.

- Level 0 collects only statistics about the sources and destinations.

- Level 1 contains details about the different connections and log
    files, but has a slight memory overhead.

- Level 2 contains detailed statistics based on the hostname.

- Level 3 contains detailed statistics based on various message
    parameters like facility, severity, or tags.

When receiving messages with non-standard facility values (that is,
higher than 23), these messages will be listed as other facility instead
of their facility number.

## Aggregated statistics

Aggregated statistics are available for different sources and
destinations from different levels and upwards:

||msg\_size\_avg| msg\_size\_max|   batch\_size\_avg|   batch\_size\_max |  eps\_last\_1h |  eps\_last\_24h|   eps_since_start|
|---|---|---|---|---|---|---|---|
|network() source and destination|from level 1|from level 1|counter N/A|counter N/A|from level 1|from level 1|from level 1|
|file() source and destination|from level 1|from level 1|counter N/A|counter N/A|from level 1|from level 1|from level 1|
|http() destination|from level 0 |from level 0|from level 0|from level 0|from level 0|from level 0|from level 0|
