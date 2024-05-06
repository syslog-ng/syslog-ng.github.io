## batch-lines()

|  Type:|      number|
|Default:| {{ page.batch_lines | default:'1' }}|

*Description:* Specifies how many lines are flushed to a destination in
one batch. The syslog-ng OSE application waits for this number of lines
to accumulate and sends them off in a single batch. Increasing this
number increases throughput as more messages are sent in a single batch,
but also increases message latency.

For example, if you set batch-lines() to 100, syslog-ng OSE waits for
100 messages.

If the batch-timeout() option is disabled, the syslog-ng OSE application
flushes the messages if it has sent batch-lines() number of messages, or
the queue became empty. If you stop or reload syslog-ng OSE or in case
of network sources, the connection with the client is closed, syslog-ng
OSE automatically sends the unsent messages to the destination.

Note that if the batch-timeout() option is enabled and the queue becomes
empty, syslog-ng OSE flushes the messages only if batch-timeout()
expires, or the batch reaches the limit set in batch-lines().

For optimal performance, make sure that the syslog-ng OSE source that
feeds messages to this destination is configured properly: the value of
the log-iw-size() option of the source must be higher than the
batch-lines()\*workers() of the destination. Otherwise, the size of the
batches cannot reach the batch-lines() limit.
