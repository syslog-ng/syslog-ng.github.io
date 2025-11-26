## config()

|  Type: | key-value pairs |
|Default:| N/A |

*Description:* You can use this option to set the properties of the kafka {{ include.kafka_type }}.

The {{ site.product.short_name }} kafka {{ include.type }} supports all properties of the official Kafka {{ include.kafka_type }}. For details, see the librdkafka documentation.

The syntax of the config() option is the following:

``` config
config( 
  “key1” => “value1” 
  “key2” => “value2” 
)
```

**NOTE:** The following kafka {{ include.kafka_type }} config options are protected and cannot be overriden in the `config()` list: {{ include.protected_options }}
{: .notice--info}
