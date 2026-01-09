When {{ site.product.short_name }} starts up, it always connects to the primary server first. In the failover() option there is a possibility to customize the failover modes.

Depending on how you set the failback() option, {{ site.product.short_name }} behaves as follows:

- **round-robin mode**: If failback() is not set, {{ site.product.short_name }} does not attempt to return to the primary server even if it becomes available. In case the failover server fails, {{ site.product.short_name }} attempts to connect the next failover server in the list in round-robin fashion.

    Example: round-robin mode

    In the following example {{ site.product.short_name }} handles the logservers in round-robin fashion if the primary logserver becomes inaccessible (therefore failback() option is not set).

     ```config
     destination d_network {
          network(
               "primary-server.com"
               port(601)
               failover( servers("failover-server1", "failover-server2") )
          );  
     };
     ```

- **failback mode**: If failback() is set, {{ site.product.short_name }} attempts to return to the primary server.

  **WARNING:** The failback() option works properly only for TCP-based connections; do not use it with the connectionless UDP protocol.
  {: .notice--warning}

    After {{ site.product.short_name }} connects a secondary server during a failover, it sends a probe every tcp-probe-interval() seconds towards the primary server. If the primary logserver responds with a TCP ACK packet, the probe is successful. When the number of successful probes reaches the value set in the successful-probes-required() option, {{ site.product.short_name }} tries to connect the primary server using the last probe.

    **NOTE:** {{ site.product.short_name }} always waits for the result of the last probe before sending the next message. So if one connection attempt takes longer than the configured interval, that is, it waits for connection time out, you may experience longer intervals between actual probes.
    {: .notice--info}

    Example: failback mode

    In the following example {{ site.product.short_name }} attempts to return to the primary logserver, as set in the failback() option: it will check if the server is accessible every tcp-probe-interval() seconds, and reconnect to the primary logserver after three successful connection attempts.

     ```config
     destination d_network_2 {
          network(
               "primary-server.com"
               port(601)
               failover( 
                    servers("failover-server1", "failover-server2")
                    failback(
                         successful-probes-required(5)
                         tcp-probe-interval(10)
                    )
               )
          );  
     };
     ```
