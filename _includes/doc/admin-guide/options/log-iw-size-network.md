When the max-connections() option is configured, log-iw-size() is split among the active connections (except for UDP-based connections). If max-connections() is not set, log-iw-size() is divided by 10, which is the default max-connections() value. The calculated value becomes the initial window size for each connection.\
For best performance when receiving logs from {{ site.product.short_name }} clients, ensure that this window size exceeds the flush-lines() value configured on the client destinations.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Changing the value of log-iw-size() while keep-alive() is enabled affects only newly established connections; existing keep-alive connections will continue using the previous log-iw-size() value. To apply the new log-iw-size() setting to all connections, you must restart the syslog-ng service — a simple configuration reload is NOT sufficient.\
If the source receives data over the UDP protocol, always restart the syslog-ng service after modifying the log-iw-size() value for the changes to take effect.
{: .notice--warning}
