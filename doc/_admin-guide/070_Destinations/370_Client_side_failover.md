---
title: Client-side failover
id: adm-dest-failover
description: >-
     syslog-ng OSE can detect if the remote server of a network destination
     becomes inaccessible, and start sending messages to a secondary server.
     You can configure multiple failover servers, so if the secondary server
     becomes inaccessible as well, syslog-ng OSE switches to the third server
     in the list, and so on. If there are no more failover servers left,
     syslog-ng OSE returns to the beginning of a list and attempts to connect
     to the primary server.
---

The primary server is the address you provided in the destination driver
configuration and it has a special role. syslog-ng OSE nominates this
destination over the failover servers, and handles it as the primary
address.

When syslog-ng OSE starts up, it always connects to the primary server
first. In the failover() option there is a possibility to customize the
failover modes.

Depending on how you set the failback() option, syslog-ng OSE behaves as
follows:

- **round-robin mode**: If failback() is not set, syslog-ng OSE does
    not attempt to return to the primary server even if it becomes
    available. In case the failover server fails, syslog-ng OSE attempts
    to connect the next failover server in the list in round-robin
    fashion.

    Example: round-robin mode

    In the following example syslog-ng OSE handles the logservers in
    round-robin fashion if the primary logserver becomes inaccessible
    (therefore failback() option is not set).

     ```config
     destination d_network {
          network(
               "primary-server.com"
               port(601)
               failover( servers("failover-server1", "failover-server2") )
          );  
     };
     ```

- **failback mode**: If failback() is set, syslog-ng OSE attempts to
    return to the primary server.

    After syslog-ng OSE connects a secondary server during a failover,
    it sends a probe every tcp-probe-interval() seconds towards the
    primary server. If the primary logserver responds with a TCP ACK
    packet, the probe is successful. When the number of successful
    probes reaches the value set in the successful-probes-required()
    option, syslog-ng OSE tries to connect the primary server using the
    last probe.

    **NOTE:** syslog-ng OSE always waits for the result of the last probe
    before sending the next message. So if one connection attempt takes
    longer than the configured interval, that is, it waits for
    connection time out, you may experience longer intervals between
    actual probes.
    {: .notice--info}

    Example: failback mode

    In the following example syslog-ng OSE attempts to return to the
    primary logserver, as set in the failback() option: it will check if
    the server is accessible every tcp-probe-interval() seconds, and
    reconnect to the primary logserver after three successful connection
    attempts.

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

If syslog-ng OSE is restarted, it attempts to connect the primary
server.

If syslog-ng OSE uses TLS-encryption to communicate with the remote
server, syslog-ng OSE checks the certificate of the failover server as
well. The certificates of the failover servers should match their domain
names or IP addresses --- for details, see
[[Encrypting log messages with TLS]].
Note that when mutual authentication is used, the syslog-ng OSE client sends the
same certificate to every server.

The primary server and the failover servers must be accessible with the
same communication method: it is not possible to use different
destination drivers or options for the different servers.

**NOTE:** Client-side failover works only for TCP-based connections
(including TLS-encrypted connections), that is, the syslog() and
network() destination drivers (excluding UDP transport).
Client-side failover is not supported in the sql() driver, even though
it may use a TCP connection to access a remote database.
{: .notice--info}

For details on configuring failover servers, see
[[network() destination options]] and
[[syslog() destination options]].
