Starting with version 3.19, you can specify multiple URLs, for example,
url("site1" "site2"). In this case, syslog-ng OSE sends log messages
to the specified URLs in a load-balance fashion. This means that
syslog-ng OSE sends each message to only one URL. For example, you can
use this to send the messages to a set of ingestion nodes or indexers of
your SIEM solution if a single node cannot handle the load. Note that
the order of the messages as they arrive on the servers can differ from
the order syslog-ng OSE has received them, so use load-balancing only if
your server can use the timestamp from the messages. If the server uses
the timestamp when it receives the messages, the order of the messages
will be incorrect.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
If you set multiple URLs in the url() option, set the **persist-name()**
option as well to avoid data loss.
{: .notice--warning}

Starting with version syslog-ng OSE version 3.22, you can use any of the
following formats to specify multiple URLs:

```config
url("server1", "server2", "server3"); # comma-separated strings
url("server1" "server2" "server3"); # space-separated strings
url("server1 server2 server3"); # space-separated within a single string
```
