---
title: 'mqtt() destination: sending messages from a local network to an
  MQTT broker'
short_title: mqtt
id: adm-dest-mqtt
description: >-
  From version 3.33, you can use the mqtt() destination to publish
  messages to MQTT brokers.

  The mqtt() destination builds on the [MQTT protocol](https://www.hivemq.com/mqtt-protocol/),
  and uses its [client](https://www.hivemq.com/blog/seven-best-mqtt-client-tools/)
  and [broker](https://www.hivemq.com/hivemq/mqtt-broker/) entities.
---

**NOTE:** The rest of this chapter and its sections build on your
familiarity with the MQTT protocol, the concept of client and broker
entities, and how these entities function within an MQTT system.
{: .notice--info}

**Declaration**

```config
destination d_mqtt { 
  mqtt(
    topic("<topic-name>"), 
    address("tcp://localhost:<port-number>"),   
    fallback_topic("<fallback-topic-name>")
  ); 
}
```

### Example: Using the mqtt() destination in your configuration

The following example illustrates a mqtt() destination configured to
fetch messages from the localhost:4444 address, and send them to the
broker running on localhost:4445, using the mqtt test/test topic.

```config
@version: 3.32
@include "scl.conf"

  source s_net { 
    network(port(4444)
  ); 
};

  destination d_mqtt { 
    mqtt(topic("test/test"), address("tcp://localhost:4445"), fallback_topic("test/test")
  ); 
};
                                
log { 
  source(s_net); 
  destination( d_mqtt); 
};
```
