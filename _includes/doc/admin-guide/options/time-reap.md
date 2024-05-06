## time-reap()

|  Accepted values:|   number (seconds)|
|Default:|           60 or 0, see description for details|

*Description:* The time to wait in seconds before an idle destination
file or pipe is closed. Note that only destination files having macros
in their filenames are closed automatically.

Starting with version 3.23, the way how time-reap() works is the
following.

1. If the time-reap() option of the destination is set, that value is
    used, for example:

    ```config
    destination d_fifo {
        pipe(
            "/tmp/test.fifo",
            time-reap(30)  # sets time-reap() for this destination only
        );
    };
    ```

2. If the time-reap() option of the destination is not set, and the
    destination does not use a template or macro in its filename or
    path, time-reap() is automatically set to 0. For example:

    ```config
    destination d_fifo {
        pipe(
            "/tmp/test.fifo",
        );
    };
    ```

3. Otherwise, the value of the global time-reap() option is used, which
    defaults to 60 seconds.
