---
title: Log path flags
id: adm-log-path-flags
description: >-
    Flags influence the behavior of syslog-ng, and the way it processes
    messages. The following flags may be used in the log paths, as described
    in Log paths.
---

## Table 12: Log statement flags

| Flag           | Description                                        |
|---|---|
| catchall       | This flag means that the source of the message is ignored, only the filters of the log path are taken into account when matching messages. A log statement using the catchall flag processes every message that arrives to any of the defined sources.                                           |
| drop-unmatched | This flag means that the message is dropped along a log path when it does not match a filter or is discarded by a parser. Without using the drop-unmatched flag, syslog-ng OSE would continue to process the message along alternative paths.|
| fallback       | This flag makes a log statement \'fallback\'. Fallback log statements process messages that were not processed by other, \'non-fallback\' log statements. Processed means that every filter of a log path matched the message. Note that in the case of embedded log paths, the message is considered to be processed if it matches the filters of the outer log path, even if it does not match the filters of the embedded log path. For details, see [[Example: Using log path flags]]. |
| final          | This flag means that the processing of log messages processed by the log statement ends here, other log statements appearing later in the configuration file will not process the messages processed by the log statement labeled as \'final\'. Note that this does not necessarily mean that matching messages will be stored only once, as there can be matching log statements processed before the current one (syslog-ng OSE evaluates log statements in the order they appear in the configuration file). Processed means that every filter of a log path matched the message. Note that in the case of embedded log paths, the message is considered to be processed if it matches the filters of the outer log path, even if it does not match the filters of the embedded log path. For details, see [[Example: Using log path flags]]. |
| flow-control   | Enables flow-control to the log path, meaning that syslog-ng will stop reading messages from the sources of this log statement if the destinations are not able to process the messages at the required speed. If disabled, syslog-ng will drop messages if the destination queues are full. If enabled, syslog-ng will only drop messages if the destination queues/window sizes are improperly sized. For details, see                           [[Managing incoming and outgoing messages with flow-control]].|

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
The final, fallback, and catchall flags apply only for the
top-level log paths, they have no effect on embedded log paths.
{: .notice--warning}

## Example: Using log path flags

Let\'s suppose that you have two hosts (myhost\_A and myhost\_B) that
run two applications each (application\_A and application\_B), and you
collect the log messages to a central syslog-ng server. On the server,
you create two log paths:

- one that processes only the messages sent by myhost\_A, and

- one that processes only the messages sent by application\_A.

This means that messages sent by application\_A running on myhost\_A
will be processed by both log paths, and the messages of application\_B
running on myhost\_B will not be processed at all.

- If you add the final flag to the first log path, then only this log
    path will process the messages of myhost\_A, so the second log path
    will receive only the messages of application\_A running on
    myhost\_B.

- If you create a third log path that includes the fallback flag, it
    will process the messages not processed by the first two log paths,
    in this case, the messages of application\_B running on myhost\_B.

- Adding a fourth log path with the catchall flag would process every
    message received by the syslog-ng server.

    ```config
    log { source(s_localhost); destination(d_file); flags(catchall); };
    ```

The following example shows a scenario that can result in message loss.
Do NOT use such a configuration, unless you know exactly what you are
doing. The problem is if a message matches the filters in the first part
of the first log path, syslog-ng OSE treats the message as
\'processed\'. Since the first log path includes the final flag,
syslog-ng OSE will not pass the message to the second log path (the one
with the fallback flag). As a result, syslog-ng OSE drops messages that
do not match the filter of the embedded log path.

```config
# Do not use such a configuration, unless you know exactly what you are doing.

log {
    source(s_network);
    # Filters in the external log path.
    # If a message matches this filter, it is treated as 'processed'
    filter(f_program);
    filter(f_message);
    log {
        # Filter in the embedded log path.
        # If a message does not match this filter, it is lost, it will not be processed by the 'fallback' log path
        filter(f_host);
        destination(d_file1);
    };
    flags(final);
};

log {
    source(s_network);
    destination(d_file2);
    flags(fallback);
};
```

## Example: Using the drop-unmatched flag

In the following example, if a log message arrives whose \$MSG part does
not contain the string foo, then syslog-ng OSE will discard the message
and will not check compliance with the second if condition.

```config
...

if {
    filter { message('foo') };
    flags(drop-unmatched)
};

if {
    filter { message('bar') };
};

...
```

(Without the drop-unmatched flag, syslog-ng OSE would check if the
message complies with the second if condition, that is, whether or not
the message contains the string bar .)
