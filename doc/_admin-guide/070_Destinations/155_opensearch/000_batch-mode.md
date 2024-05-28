---
title: Batch mode and load balancing with OpenSearch
id: adm-dest-batch-opensearch
description: >-
    The opensearch() destination automatically sends multiple log messages in a
    single HTTP request, increasing the rate of messages that Elasticsearch
    deployment can consume. For further configuration options of batch mode,
    see the following section.
---

{% include doc/admin-guide/batch-size.md %}

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

{% include doc/admin-guide/load-balancing.md %}

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

If load-balancing is used (meaning, multiple servers are configured in the url() option), increase the number of worker threads at least to match the number of servers. For example, if you have set three URLs (`url("site1", "site2", "site3")`), set the workers() option to three or greater.
