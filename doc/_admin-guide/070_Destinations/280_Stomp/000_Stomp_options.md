---
title: stomp() destination options
srv: STOMP server
id: adm-dest-stomp-opt
---

The stomp() driver publishes messages using the Simple (or Streaming)
Text Oriented Message Protocol (STOMP).

The stomp() destination has the following options:

## ack()

|  Type:|      yes \| no|
  |Default:|   no|

*Description:* Request the STOMP server to acknowledge the receipt of
the messages. If you enable this option, then after sending a message,
syslog-ng OSE waits until the server confirms that it has received the
message. This delay can seriously limit the performance of syslog-ng OSE
if the message rate is high, and the server cannot acknowledge the
messages fast enough.

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

## body()

|  Type:|      string|
  |Default:|   empty string|

*Description:* The body of the STOMP message. You can also use macros
and templates.

## destination()

|  Type:|      string|
  |Default:|   /topic/syslog|

*Description:* The name of the destination (message queue) on the STOMP
server. It can include macros and templates.

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host.md %}

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/persistent.md %}

{% include doc/admin-guide/options/port.md %}

{% include doc/admin-guide/options/retries.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/username.md %}

{% include doc/admin-guide/options/value-pairs-short.md %}
