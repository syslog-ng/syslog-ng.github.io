## hook-commands()

*Description:* This option makes it possible to execute external
programs when the relevant driver is initialized or torn down. The
hook-commands() can be used with all source and destination drivers with
the exception of the usertty() and internal() drivers.

**NOTE:** The {{ site.product.short_name }} application must be able to start and restart
the external program, and have the necessary permissions to do so. For
example, if your host is running AppArmor or SELinux, you might have to
modify your AppArmor or SELinux configuration to enable {{ site.product.short_name }} to
execute external applications.
{: .notice--info}

### Using the hook-commands() when {{ site.product.short_name }} starts or stops

To execute an external program when {{ site.product.short_name }} starts or stops, use
the following options:

#### startup()

|Type:|string|
|Default:|N/A|

*Description:* Defines the external program that is executed as {{ site.product.short_name }} starts.

#### shutdown()

|Type:|string|
|Default:|N/A|

*Description:* Defines the external program that is executed as {{ site.product.short_name }} stops.

### Using the hook-commands() when {{ site.product.short_name }} reloads

To execute an external program when the {{ site.product.short_name }} configuration is
initiated or torn down, for example, on startup/shutdown or during a
{{ site.product.short_name }} reload, use the following options:

#### setup()

|Type:|string|
|Default: |N/A|

*Description:* Defines an external program that is executed when the {{ site.product.short_name }} configuration is initiated, for example, on startup or during a {{ site.product.short_name }} reload.

#### teardown()

|Type:|string|
|Default:| N/A|

*Description:* Defines an external program that is executed when the {{ site.product.short_name }} configuration is stopped or torn down, for example, on shutdown or during a {{ site.product.short_name }} reload.

### Example: Using the hook-commands() with a network source

In the following example, the hook-commands() is used with the network()
driver and it opens an
iptables port automatically as
{{ site.product.short_name }} is started/stopped.

The assumption in this example is that the LOGCHAIN chain is part of a
larger ruleset that routes traffic to it. Whenever the {{ site.product.short_name }}
created rule is there, packets can flow, otherwise the port is closed.

```config
source {
    network(transport(udp)
        hook-commands(
          startup("iptables -I LOGCHAIN 1 -p udp --dport 514 -j ACCEPT")
          shutdown("iptables -D LOGCHAIN 1")
        )
      );
};
```
