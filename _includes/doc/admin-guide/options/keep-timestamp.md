## keep-timestamp()

|Accepted values:| yes \| no|
|Default:|   yes|

*Description:* Specifies whether {{ site.product.short_name }} should accept the timestamp
received from the sending application or client. If disabled, the time
of reception will be used instead. This option can be specified
globally, and per-source as well. The local setting of the source
overrides the global option if available.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** To use the S_ macros,
the keep-timestamp() option must be enabled (this is the default behavior of {{ site.product.short_name }}).
{: .notice--warning}
