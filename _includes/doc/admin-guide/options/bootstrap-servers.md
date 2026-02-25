## bootstrap-servers()

|  Type:   | string |
|Default:  |  N/A   |
|Mandatory:|  yes   |

*Description:* Specifies the hostname or IP address of the Kafka server.
When specifying an IP address, IPv4 (for example, 192.168.0.1) or IPv6
(for example, \[::1\]) can be used as well. Use a colon (**:**) after
the address to specify the port number of the server. When specifying
multiple addresses, use a comma to separate the addresses, for example:

``` config
bootstrap-servers(
    "127.0.0.1:2525,remote-server-hostname:6464"
)
```
