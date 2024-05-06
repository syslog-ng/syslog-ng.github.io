## keep-alive()

|  Type:|      positive integer number (in seconds)|
  |Default:|   60|

*Description:* Specifies the number of seconds that syslog-ng OSE keeps
the connection between the broker and clients open in case there is no
message traffic. When keep-alive() number of seconds pass, the
connection is terminated, and you have to reconnect.

On the MQTT side, the keep alive function provides a workaround method
to access connections that are still open.
