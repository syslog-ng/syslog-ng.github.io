## normalize-hostnames()

|   Type:|       `yes`, `no`|
|Default:|              `no`|

*Description:* If this option is set to `yes` (`normalize-hostnames(yes)`), {{ site.product.short_name }} converts the hostnames to lowercase. This setting only applies to hostnames resolved from DNS. It has no effect if the `keep-hostname()` option is enabled, and the message contains a hostname.
|  Accepted values: |  yes \| no|
|Default:           |no|

**NOTE:** This setting applies only to hostnames resolved from DNS. It has
no effect if the keep-hostname() option is enabled, and the message
contains a hostname.
{: .notice--info}
