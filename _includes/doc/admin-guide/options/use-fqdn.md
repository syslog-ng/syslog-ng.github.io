## use-fqdn()

|Accepted values:| yes \| no|
|Default:|no|

*Description:* Use this option to add a Fully Qualified Domain Name
(FQDN) instead of a short hostname. You can specify this option either
globally or per-source. The local setting of the source overrides the
global option if available.

**TIP:** Set use-fqdn() to yes if you want to use the custom-domain() global
option.
{: .notice--info}

**NOTE:** This option has no effect if the keep-hostname() option is enabled
(keep-hostname(yes)) and the message contains a hostname.
{: .notice--info}