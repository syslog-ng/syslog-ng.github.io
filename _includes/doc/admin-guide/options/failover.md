## failover()

*Description:* Available only in syslog-ng Open Source Edition version
3.17 and later. For details about how client-side failover works, see
[[Client-side failover]].  

### servers()

| Type: | list of IP addresses and fully-qualified domain names|
| Default:  | empty                            |

*Description:* Specifies a secondary destination server where log messages are sent if the primary server becomes     inaccessible. To list several failover servers, separate the address of the servers with comma. By default, syslog-ng OSE waits for the a server before switching to the next failover server is set in the time-reopen() option.  
If failback() is not set, syslog-ng OSE does not attempt to return to the primary server even if it becomes available. In case the failover server fails, syslog-ng OSE attempts to connect the next failover server in the list in round-robin fashion.  

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
The failover servers must be accessible on the same port as the primary server.
{: .notice--warning}

### failback()

*Description:* Available only in syslog-ng Open Source Edition version 3.17 and later.

When syslog-ng OSE starts up, it always connects to the primary
server first. In the failover() option there is a possibility to
customize the failover modes.  
Depending on how you set the failback() option, syslog-ng OSE
behaves as follows:

- **round-robin mode**: If failback() is not set, syslog-ng OSE does not attempt to return to the primary server even if it becomes available. In case the failover server fails, syslog-ng OSE attempts to connect the next failover server in the list in round-robin fashion.

  Example: round-robin mode

  In the following example syslog-ng OSE handles the logservers in round-robin fashion if the primary logserver becomes   inaccessible (therefore failback() option is not set).

    ```config
    destination d_network {                                      
        network(                                                
            "primary-server.com"                               
            port(601)                                          

        failover( servers("failover-server1", "failover-server2") ) 
        );                                                           
    };                                                           
    ```

- **failback mode**: If failback() is set, syslog-ng OSE attempts to return to the primary server.

    After syslog-ng OSE connects a secondary server during a failover, it sends a probe every tcp-probe-interval() seconds towards the primary server. If the primary logserver responds with a TCP ACK packet, the probe is successful. When the number of successful probes reaches the value set in the            successful-probes-required() option, syslog-ng OSE tries to connect the primary server using the last probe.

    **NOTE:** syslog-ng OSE always waits for the result of the last probe before sending the next message. So if one connection attempt takes longer than the configured interval, that is, it waits for connection time out, you may experience longer intervals between actual probes.
    {: .notice--info}

    Example: failback mode

    In the following example syslog-ng OSE attempts to return to the primary logserver, as set in the failback() option: it will check if the server is accessible every tcp-probe-interval() seconds, and reconnect to the primary logserver after three successful connection attempts.

    ```config
    destination d_network_2 {
            network(                                                
                "primary-server.com"                               
                port(601)                                          
                failover(                                          
                                                                    
                    servers("failover-server1", "failover-server2") 
                    failback(                                     
                        successful-probes-required()             
                        tcp-probe-interval()                     
                    )                                             
                )                                                  
    );                                                           
    };                                                           
    ```

Default value for tcp-probe-interval(): 60 seconds  

Default value for successful-probes-required(): 3  

**NOTE:** This option is not available for the connection-less UDP protocol,
because in this case the client does not detect that the destination
becomes inaccessible.
{: .notice--info}

#### Example: Specifying failover servers for syslog() destinations

The following example specifies two failover servers for a simple
syslog() destination.

```config
destination d_syslog_tcp{
    syslog("10.100.20.40"
        transport("tcp")
        port(6514)
        failover-servers("10.2.3.4", "myfailoverserver")
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
        failover-servers("10.2.3.4", "myfailoverserver")
        tls(peer-verify(required-trusted)
        ca-dir('/opt/syslog-ng/etc/syslog-ng/keys/ca.d/')
        key-file('/opt/syslog-ng/etc/syslog-ng/keys/client_key.pem')
        cert-file('/opt/syslog-ng/etc/syslog-ng/keys/client_certificate.pem'))
    );
};
```
