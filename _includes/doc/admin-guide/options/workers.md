## workers()

|  Type:|      integer|
|Default:| {{ page.workers | default: '1' }}|

*Description:* Specifies the number of worker threads (at least 1) that
syslog-ng OSE uses to send messages to the server. Increasing the number
of worker threads can drastically improve the performance of the
destination.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Hazard of data loss! When you use more than one worker threads together with disk-based buffering, syslog-ng OSE creates a separate disk buffer for each worker thread. This means that decreasing the number of workers can result in losing data currently stored in the disk buffer files. Do not decrease the number of workers when the disk buffer files are in use.
{: .notice--danger}

If you are using load-balancing (that is, you have configured multiple
servers in the url() option), increase the number of worker threads at
least to the number of servers. For example, if you have set three URLs
(url("site1", "site2", "site3")), set the workers() option to 3 or
more.
