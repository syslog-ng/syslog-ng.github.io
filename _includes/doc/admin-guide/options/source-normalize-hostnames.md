## normalize-hostnames()

|  Accepted values: |  yes \| no|
|Default:           |no|

*Description:* If enabled (**normalize-hostnames(yes)**), syslog-ng OSE
converts the hostnames to lowercase.

**NOTE:** This setting applies only to hostnames resolved from DNS. It has
no effect if the keep-hostname() option is enabled, and the message
contains a hostname.
{: .notice--info}
