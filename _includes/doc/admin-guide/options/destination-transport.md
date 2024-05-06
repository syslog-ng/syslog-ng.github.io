## transport()

|Type:|      udp, tcp, or tls|
|Default:|   tcp|

*Description:* Specifies the protocol used to send messages to the
destination server.

If you use the udp transport, syslog-ng OSE automatically sends
multicast packets if a multicast destination address is specified. The
tcp transport does not support multicasting.
