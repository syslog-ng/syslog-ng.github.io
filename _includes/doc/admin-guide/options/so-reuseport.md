## so-reuseport()

|  Type:|      yes or no|
  |Default:|   no|

*Description:* Enables SO_REUSEPORT on systems that support it. When
enabled, the kernel allows multiple UDP sockets to be bound to the same
port, and the kernel load-balances incoming UDP datagrams to the
sockets. The sockets are distributed based on the hash of (srcip, dstip,
srcport, dstport), so the same listener should be receiving packets from
the same endpoint. For example:

```config
source {
        udp(so-reuseport(1) port(2000) persist-name("udp1"));
        udp(so-reuseport(1) port(2000) persist-name("udp2"));
        udp(so-reuseport(1) port(2000) persist-name("udp3"));
        udp(so-reuseport(1) port(2000) persist-name("udp4"));
};
```
