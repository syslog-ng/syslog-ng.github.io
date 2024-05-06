## log-fetch-limit()

| Type: |     number|
|Default:|   100|

*Description:* The maximum number of messages fetched from a source
during a single poll loop. The destination queues might fill up before
flow-control could stop reading if [[log-fetch-limit()]] is too high.
