---
title: Client-side failover
id: adm-dest-failover
description: >-
     {{ site.product.short_name }} can detect if the remote server of a network destination
     becomes inaccessible, and start sending messages to a secondary server.
     You can configure multiple failover servers, so if the secondary server
     becomes inaccessible as well, {{ site.product.short_name }} switches to the third server
     in the list, and so on. If there are no more failover servers left,
     {{ site.product.short_name }} returns to the beginning of a list and attempts to connect
     to the primary server.
---

The primary server is the address you provided in the destination driver
configuration and it has a special role. {{ site.product.short_name }} nominates this
destination over the failover servers, and handles it as the primary
address.

{% include doc/admin-guide/options/failback-modes.md %}

If {{ site.product.short_name }} is restarted, it attempts to connect the primary
server.

If {{ site.product.short_name }} uses TLS-encryption to communicate with the remote
server, {{ site.product.short_name }} checks the certificate of the failover server as
well. The certificates of the failover servers should match their domain
names or IP addresses --- for details, see
Encrypting log messages with TLS.
Note that when mutual authentication is used, the {{ site.product.short_name }} client sends the
same certificate to every server.

The primary server and the failover servers must be accessible with the
same communication method: it is not possible to use different
destination drivers or options for the different servers.

**NOTE:** Client-side failover is not supported in the sql() driver.
{: .notice--info}

For details on configuring failover servers, see
network() destination options and
syslog() destination options.
