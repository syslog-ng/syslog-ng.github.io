## listen-backlog()

|  Type:|      integer|
|Default:|   256|

*Description:* Available only for stream based transports (unix-stream,
tcp, tls). In TCP, connections are treated incomplete until the
three-way handshake is completed between the server and the client.
Incomplete connection requests wait on the TCP port for the listener to
accept the request. The listen-backlog() option sets the maximum number
of incomplete connection requests. For example:

```config
source s_network {
    network(
        ip("192.168.1.1")
        transport("tcp")
        listen-backlog(2048)
        );
};
```
