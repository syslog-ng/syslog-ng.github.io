![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Long lasting stat requests can cause resource exhaustion, and performance degradation of the syslog-ng instance. Setting `single-instance(yes)` can help mitigate this risk by limiting the number of concurrent scraper requests to one.\
Same is true for `scrape-freq-limit()`, which can help mitigate the risk of repeated scraper requests by enforcing a minimum time interval between them.
{: .notice--warning}
