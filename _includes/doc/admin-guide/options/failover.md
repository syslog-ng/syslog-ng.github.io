## failover()

*Description:* Available only in {{ site.product.name }} version
3.17 and later. For details about how client-side failover works, see
Client-side failover.  

failover() has the following sub-options:

### failback()

{% include doc/admin-guide/options/failback-modes.md %}

The above described valid failback() sub-option defaults are:

#### tcp-probe-interval()

|   Type:| integer|
|Default:|      60|

#### successful-probes-required()

|   Type:| integer|
|Default:|       3|

#### Example: Specifying failover servers for syslog() destinations

The following example specifies two failover servers for a simple
syslog() destination uses the UDP protocol.

```config
destination d_syslog_tcp{
    syslog("10.100.20.40"
        transport("udp")
        port(6514)
        failover(
            servers("10.2.3.4", "myfailoverserver")
        )
    );
};
```

The following example specifies a failover server for a network()
destination that uses TLS encryption.

```config
destination d_syslog_tls{
    network("10.100.20.40"
        transport("tls")
        port(6514)
        failover(
            servers("10.2.3.4", "myfailoverserver")
            failback(successful-probes-required(2) tcp-probe-interval(10))
        )
        tls(peer-verify(required-trusted)
        ca-dir('/opt/syslog-ng/etc/syslog-ng/keys/ca.d/')
        key-file('/opt/syslog-ng/etc/syslog-ng/keys/client_key.pem')
        cert-file('/opt/syslog-ng/etc/syslog-ng/keys/client_certificate.pem'))
    );
};
```

### servers()

| Type: | list of IP addresses and fully-qualified domain names|
| Default:  | empty                            |

*Description:* Specifies a secondary destination server where log messages are sent if the primary server becomes     inaccessible. To list several failover servers, separate the address of the servers with comma. By default, {{ site.product.short_name }} waits for the a server before switching to the next failover server is set in the time-reopen() option.  
If failback() is not set, {{ site.product.short_name }} does not attempt to return to the primary server even if it becomes available. In case the failover server fails, {{ site.product.short_name }} attempts to connect the next failover server in the list in round-robin fashion.  

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
The failover servers must be accessible on the same port as the primary server.
{: .notice--warning}
