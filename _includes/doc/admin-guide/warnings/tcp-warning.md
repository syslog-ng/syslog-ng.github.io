>![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
>The tcp-keepalive-time(), tcp-keepalive-probes(), and tcp-keepalive-intvl() options only work on platforms which support the TCP_KEEPCNT, TCP_KEEPIDLE,and TCP_KEEPINTVL setsockopts. Currently, this is Linux.
>
>A connection that has no traffic is closed after tcp-keepalive-time() + tcp-keepalive-intvl() * tcp-keepalive-probes() seconds.
{: .notice--warning}
