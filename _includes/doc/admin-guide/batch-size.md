## Batch size

The batch-bytes(), batch-lines(), and batch-timeout() options of the
destination determine how many log messages syslog-ng OSE sends in a
batch. The batch-lines() option determines the maximum number of
messages syslog-ng OSE puts in a batch in. This can be limited based on
size and time:

- syslog-ng OSE sends a batch every batch-timeout() milliseconds, even
    if the number of messages in the batch is less than batch-lines().
    That way the destination receives every message in a timely manner
    even if suddenly there are no more messages.

- syslog-ng OSE sends the batch if the total size of the messages in
    the batch reaches batch-bytes() bytes.

To increase the performance of the destination, increase the number of
worker threads for the destination using the workers() option, or adjust
the batch-bytes(), batch-lines(), batch-timeout() options.
