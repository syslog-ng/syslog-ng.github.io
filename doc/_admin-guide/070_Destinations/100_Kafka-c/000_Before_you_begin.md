---
title: Before you begin
id: adm-dest-kafkac-begin
description: >-
    This section describes the prerequisites and restrictions for using the
    kafka destination in the new C implementation, and important information
    about the declaration of the destination.
---

## Prerequisites and restrictions

- This destination is only supported on the Linux platform.

- Since the new C implementation uses the librdkafka client library,
    the kafka destination has less memory usage than the previous Java
    implementation (which uses the official Java Kafka producer).

- The log messages of the underlying client libraries are available in
    the internal() source of {{ site.product.short_name }}.

- If you used the Java implementation before, see
    Shifting from Java implementation to C implementation.

- The {{ site.product.short_name }} kafka destination supports all properties of the
    official Kafka producer. For details, see the librdkafka documentation.

- For the list of options, see
    [[Options of the kafka() destination&#8217;s C implementation|adm-dest-kafkac-opt]].

**Declaration**

```config
kafka(
    bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
    topic("{MYTOPIC}")

);
```

### Example: Sending log data to Apache Kafka

The following example defines a kafka destination in the new C
implementation, using only the required parameters.

```config
@define kafka-implementation kafka-c 
@include "scl.conf"

destination d_kafka {
    kafka-c(
    bootstrap-servers("1.2.3.4:9092,192.168.0.2:9092")
    topic("{MYTOPIC}")
    );
};
```
