Starting with version 3.19, you can specify multiple URLs, for example,
`url("site1" "site2")` for high availability and load distribution.
{{ site.product.short_name }} distributes worker threads evenly across the specified URLs
and automatically removes failed targets from rotation. Each message batch is sent
to only one URL. Failed targets are automatically retried after the time-reopen() interval.

Starting with version {{ site.product.short_name }} version 3.22, you can use any of the
following formats to specify multiple URLs:

```config
url("server1", "server2", "server3"); # comma-separated strings
url("server1" "server2" "server3"); # space-separated strings
url("server1 server2 server3"); # space-separated within a single string
```

**NOTE:** The order of messages as they arrive on the servers can differ from
the order {{ site.product.short_name }} received them due to parallel processing across
multiple targets. Use load-balancing only if your server uses timestamps from the messages
themselves rather than arrival time.
{: .notice--info}

**NOTE:** Set workers() to at least the number of URLs to ensure all targets are utilized.
For example, with three URLs, use `workers(3)` or greater.
{: .notice--info}

**CAUTION:** Always set persist-name() when using multiple URLs to prevent data loss
if the URL list changes.
{: .notice--warning}

For detailed information about the load balancing algorithm, failure handling, URL templating,
and configuration best practices, see HTTP Load Balancer in Details.

