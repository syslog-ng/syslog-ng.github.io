![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
The tcp-keepalive-time(), tcp-keepalive-probes(), and tcp-keepalive-intvl()
options only work on platforms which support the TCP_KEEPCNT, TCP_KEEPIDLE,
and TCP_KEEPINTVL setsockopts. Currently, this is Linux. A connection that
has no traffic is closed after
tcp-keepalive-time() + tcp-keepalive-intvl() \* tcp-keepalive-probes() seconds.
{: .notice--warning}

Available in syslog-ng OSE version 3.4 and later.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Prior to syslog-ng OSE 3.29, Syslog-ng uses the kernel default
values for the following socket options: TCP_KEEPCNT, TCP_KEEPIDLE,
and TCP_KEEPINTVL (Only applies to systems, where those options are supported.)
Unfortunately those default values are not optimal for a typical logging application.
You can return to the old behavior by setting those values to zero "0".
{: .notice--warning}
