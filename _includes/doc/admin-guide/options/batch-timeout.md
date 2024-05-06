## batch-timeout()

|  Type:|      time in milliseconds|
|Default:| {{ page.batch_timeout | default: '-1 (disabled)' }}|

*Description:* Specifies the time syslog-ng OSE waits for lines to
accumulate in the output buffer. The syslog-ng OSE application sends
batches to the destinations evenly. The timer starts when the first
message arrives to the buffer, so if only few messages arrive, syslog-ng
OSE sends messages to the destination at most once every batch-timeout()
milliseconds.
