## kafka-logging()

| Accepted values: | disabled \| trace \| kafka |
| Default:         | disabled |

*Description:* This option allows you to control how internal Kafka logs appear in the {{ site.product.short_name }} logs.

- disabled: Disables internal Kafka log messages in the {{ site.product.short_name }} logs.
- trace: Logs all internal Kafka messages at the `trace` level of {{ site.product.short_name }}.
- kafka: Logs internal Kafka messages using log levels mapped to those of {{ site.product.short_name }}.  

**NOTE:** The internal Kafka logging level itself can be configured using the config() Kafka options. For details, refer to the librdkafka documentation.  
{: .notice--info}
