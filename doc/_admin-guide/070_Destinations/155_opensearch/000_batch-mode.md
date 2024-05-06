---
title: Batch mode and load balancing with OpenSearch
id: adm-dest-batch-opensearch
description: >-
    The opensearch() destination automatically sends multiple log messages in a
    single HTTP request, increasing the rate of messages that Elasticsearch
    deployment can consume. For further configuration options of batch mode,
    see the following section.
---

## Batch size

The `batch-bytes()`, `batch-lines()`, and `batch-timeout()` options specify how many log messages syslog-ng OSE sends in a batch. The `batch-lines()` option defines the maximum number of messages syslog-ng OSE includes in a batch in. This can be limited based on size and time:

* syslog-ng OSE sends a batch in time intervals defined by `batch-timeout()` in milliseconds, even if the number of messages in the batch is less than the amount defined in `batch-lines()`. This way the destination receives every message in a properly even if the messages cease.
* syslog-ng OSE sends a batch if the total size of the messages in the batch reaches the amount specified in `batch-bytes()` in bytes.

To increase the performance of the destination, increase the number of worker threads for the destination using the [[workers()]] option, or adjust the [[batch-bytes()]], [[batch-lines()]], [[batch-timeout()]] options.

### Example: HTTP batch mode

In the following example, a batch containing 100 messages, or a maximum of 512 kilobytes, and is sent every 20 seconds (20000 milliseconds).

```config
   destination d_opensearch {
        opensearch(
            url("http://your-server:9200/_bulk")
            index("<index-to-store-messages>")
            batch-lines(100)
            batch-bytes(512Kb)
            batch-timeout(10000)
        );
    };
```

## Load balancing between multiple indexers

In syslog-ng OSE version 3.19 and later versions, multiple URLs can be specified, for example, `url("site1" "site2")`. In this case, syslog-ng OSE sends log messages to the defined URLs in a load-balanced method. This means that syslog-ng OSE forwards each message to a single URL. For example, this can be used to send the messages to a set of ingestion nodes or indexers of a SIEM solution if a single node cannot handle the load. The order of the messages arriving to the servers can differ from the order syslog-ng OSE has received them. Use load-balancing only if a server can use the timestamp from the messages. If the server uses the timestamp when it receives the messages, the resulting order of the messages is incorrect.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** If multiple URLs are set in the url() option, set the persist-name() option as well to avoid data loss.
{: .notice--warning}

In syslog-ng OSE version 3.22 and later versions, any of the following formats can be used to specify multiple URLs:

```config
   url("server1", "server2", "server3"); # comma-separated strings
    url("server1" "server2" "server3"); # space-separated strings
    url("server1 server2 server3"); # space-separated within a single string
```

### Example: HTTP load balancing

The following destination sends log messages to three different indexer nodes. Each node has an assigned separate worker thread. A batch is defined to consist of 100 messages, or a maximum of 512 kilobytes, and is sent every 20 seconds (20000 milliseconds).

```config
   destination d_opensearch {
        opensearch(
            url("http://your-elasticsearch-server1:9200/_bulk" "http://your-elasticsearch-server2:9200/_bulk" "http://your-elasticsearch-server3:9200/_bulk")
            batch-lines(100)
            batch-bytes(512Kb)
            batch-timeout(20000)
            persist-name("opensearch-load-balance")
        );
    };
```

If load-balancing is used (meaning, multiple servers are configured in the [[url()]] option), increase the number of worker threads at least to match the number of servers. For example, if you have set three URLs (`url("site1", "site2", "site3")`), set the workers() option to three or greater.
