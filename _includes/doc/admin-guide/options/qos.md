## qos()

| Type:            | number                                          |
| Default:         | 0                                               |
| Possible values: | 0 - at most once (the fastest option)           |
|                  | 1 - at least once (a much slower option than 0) |
|                  | 2 - exactly once (the slowest option)           |

*Description:* The [Quality of Service (QoS)
level](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels/)
in MQTT messaging is an agreement between sender and receiver on the
guarantee of delivering a message.
