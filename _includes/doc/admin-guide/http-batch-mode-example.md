### Example: {{ page.driver }}() batch mode

In the following example, a batch containing 100 messages, or a maximum of 512 kilobytes, and is sent every 20 seconds (20000 milliseconds).

```config
   destination d_{{ page.driver }} {
        {{ page.driver }}(
            url("http://your-server:9200/_bulk")
            index("<index-to-store-messages>")
            batch-lines(100)
            batch-bytes(512Kb)
            batch-timeout(10000)
        );
    };
```
