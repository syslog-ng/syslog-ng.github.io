### Example: {{ page.driver }}() load balancing

The following destination sends log messages to three different indexer nodes. Each node has an assigned separate worker thread. A batch is defined to consist of 100 messages, or a maximum of 512 kilobytes, and is sent every 20 seconds (20000 milliseconds).

```config
   destination d_{{ page.driver }} {
        {{ page.driver }}(
            url("http://your-{{ page.driver }}-server1:9200/_bulk" "http://your-{{ page.driver }}-server2:9200/_bulk" "http://your-{{ page.driver }}-server3:9200/_bulk")
            batch-lines(100)
            batch-bytes(512Kb)
            batch-timeout(20000)
            persist-name("{{ page.driver }}-load-balance")
            workers(3)
        );
    };
```
