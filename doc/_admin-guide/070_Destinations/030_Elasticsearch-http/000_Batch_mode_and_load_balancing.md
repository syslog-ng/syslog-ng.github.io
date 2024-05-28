---
title: Batch mode and load balancing with ElasticSearch
id: adm-dest-est-http-batch
description: >-
    The elasticsearch-http() destination automatically sends multiple log
    messages in a single HTTP request, increasing the rate of messages that
    your Elasticsearch deployment can consume. For details on adjusting and
    fine-tuning the batch mode of the elasticsearch-http() destination, see
    the following section.
---

{% include doc/admin-guide/batch-size.md %}

### Example: HTTP batch mode

In the following example, a batch consists of 100 messages, or a maximum
of 512 kilobytes, and is sent every 20 seconds (20000 milliseconds).

```config
destination d_elasticsearch-http {
    elasticsearch-http(url("http://your-elasticsearch-server:9200/_bulk")
        index("<elasticsearch-index-to-store-messages>")
        type("")
        url("http://your-elasticsearch-server:9200/_bulk")
        batch-lines(100)
        batch-bytes(512Kb)
        batch-timeout(10000)
    );
};
```

### Load balancing between multiple Elasticsearch indexers

{% include doc/admin-guide/load-balancing.md %}

### Example: HTTP load balancing

The following destination sends log messages to 3 different
Elasticsearch indexer nodes. Each node is assigned a separate worker
thread. A batch consists of 100 messages, or a maximum of 512 kilobytes,
and is sent every 20 seconds (20000 milliseconds).

```config
destination d_elasticsearch-http {
    elasticsearch-http(url("http://your-elasticsearch-server1:9200/_bulk" "http://your-elasticsearch-server2:9200/_bulk" "http://your-elasticsearch-server3:9200/_bulk")
        batch-lines(100)
        batch-bytes(512Kb)
        batch-timeout(20000)
        persist-name("d_elasticsearch-http-load-balance")
    );
};
```

If you are using load-balancing (that is, you have configured multiple
servers in the url() option), increase the number of worker threads at
least to the number of servers. For example, if you have set three URLs
(url("site1", "site2", "site3")), set the workers() option to 3 or
more.
