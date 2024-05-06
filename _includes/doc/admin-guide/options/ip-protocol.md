## ip-protocol()

|  Type:|      number|
  |Default:|   4|

*Description:* Determines the internet protocol version of the given
driver (network() or syslog()). The possible values are **4** and **6**,
corresponding to IPv4 and IPv6. The default value is ip-protocol(4).

Note that listening on a port using IPv6 automatically means that you
are also listening on that port using IPv4. That is, if you want to have
receive messages on an IP-address/port pair using both IPv4 and IPv6,
create a source that uses the ip-protocol(6). You cannot have two
sources with the same IP-address/port pair, but with different
ip-protocol() settings (it causes an Address already in use error).

For example, the following source receives messages on TCP, using the
network() driver, on every available interface of the host on both IPv4
and IPv6.

```config
source s_network_tcp { network( transport("tcp") ip("::") ip-protocol(6) port(601) ); };
```
