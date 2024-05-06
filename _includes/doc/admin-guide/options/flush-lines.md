## flush-lines()

|  Type:|      number|
|Default:|   {{ page.flush_lines | default: 'Use global setting (exception: for http() destination, the default is 1).' }}|

*Description:* Specifies how many lines are flushed to a destination at
a time. The syslog-ng OSE application waits for this number of lines to
accumulate and sends them off in a single batch. Increasing this number
increases throughput as more messages are sent in a single batch, but
also increases message latency.

The syslog-ng OSE application flushes the messages if it has sent
flush-lines() number of messages, or the queue became empty. If you stop
or reload syslog-ng OSE or in case of network sources, the connection
with the client is closed, syslog-ng OSE automatically sends the unsent
messages to the destination.

For optimal performance when sending messages to an syslog-ng OSE
server, make sure that the value of flush-lines() is smaller than the
window size set in the log-iw-size() option in the source of your
server.
