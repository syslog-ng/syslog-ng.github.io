## tcp-keepalive-intvl()

|  Type:|      number \[seconds\]|
|Default:|   10|

*Description:* Specifies the interval (number of seconds) between
subsequential keepalive probes, regardless of the traffic exchanged in
the connection. This option is equivalent to
/proc/sys/net/ipv4/tcp_keepalive_intvl.  

{% include doc/admin-guide/warnings/tcp-keepalive-options.md %}

## tcp-keepalive-probes()

|  Type:|      number|
|Default:|   6|

*Description:* Specifies the number of unacknowledged probes to send
before considering the connection dead. This option is equivalent to
/proc/sys/net/ipv4/tcp_keepalive_probes.  

{% include doc/admin-guide/warnings/tcp-keepalive-options.md %}

## tcp-keepalive-time()

|  Type:|      number \[seconds\]|
  |Default:|   60|

*Description:* Specifies the interval (in seconds) between the last data
packet sent and the first keepalive probe. This option is equivalent to
/proc/sys/net/ipv4/tcp_keepalive_time.  

{% include doc/admin-guide/warnings/tcp-keepalive-options.md %}
