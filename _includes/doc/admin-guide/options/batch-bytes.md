## batch-bytes()

|  Accepted values:|   number \[bytes\]|
|Default:| {{ page.batch_bytes | default: 'none'}} |

*Description:* Sets the maximum size of payload in a batch. If the size
of the messages reaches this value, syslog-ng OSE sends the batch to the
destination even if the number of messages is less than the value of the
batch-lines() option.

Note that if the batch-timeout() option is enabled and the queue becomes
empty, syslog-ng OSE flushes the messages only if batch-timeout()
expires, or the batch reaches the limit set in batch-bytes().

Available in syslog-ng OSE version 3.19 and later.
