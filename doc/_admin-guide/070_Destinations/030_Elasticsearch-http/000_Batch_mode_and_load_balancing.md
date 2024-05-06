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

## Batch size

The batch-bytes(), batch-lines(), and batch-timeout() options of the
destination determine how many log messages syslog-ng OSE sends in a
batch. The batch-lines() option determines the maximum number of
messages syslog-ng OSE puts in a batch in. This can be limited based on
size and time:

- syslog-ng OSE sends a batch every batch-timeout() milliseconds, even
    if the number of messages in the batch is less than batch-lines().
    That way the destination receives every message in a timely manner
    even if suddenly there are no more messages.

- syslog-ng OSE sends the batch if the total size of the messages in
    the batch reaches batch-bytes() bytes.

To increase the performance of the destination, increase the number of
worker threads for the destination using the workers() option, or adjust
the batch-bytes(), batch-lines(), batch-timeout() options.

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
