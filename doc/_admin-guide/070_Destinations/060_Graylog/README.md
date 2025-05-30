---
title: 'graylog2(): Sending logs to Graylog'
short_title: graylog2
id: adm-dest-graylog
description: >-
  You can use the graylog2() destination and a Graylog Extended Log Format
  (GELF) template to send syslog messages to
  Graylog.
---

You can forward simple name-value pairs where the name starts with a dot
or underscore. If names of your name-value pairs include dots other than
the first character, you should use JSON formatting directly instead of
the GELF template and send logs to a raw TCP port in Graylog, which can
then extract fields from nested JSON. Version 3.21 and later also
supports TLS-encrypted connection to the Graylog server.

**Declaration**

```config
graylog2();
```

### Example: Using the graylog2() driver

You can send syslog messages to Graylog using the **graylog2()**
destination. The graylog2() destination uses the GELF template, the
native data format of Graylog.

1. On the Graylog side, configure a GELF TCP input. For more
    information, see the relevant Graylog
    documentation.

2. On the {{ site.product.short_name }} side, configure the name or IP address of the host
    running Graylog.

  ```config
  destination d_graylog {
    graylog2(
      host("172.16.146.142")
      transport(tcp)
    );
  };
  ```

  If you parsed your messages using {{ site.product.short_name }}, the template also
  forwards any name-value pairs where the name starts with a dot or
  underscore.

**NOTE:** If there is a dot in a field name other than the first character,
{{ site.product.short_name }} creates nested JSON while formatting the message. Nested JSON
is not automatically parsed in GELF messages.
{: .notice--info}

## Sending nested JSON to Graylog

While sending nested JSON inside GELF is possible, it is not convenient.
If you use parsing and normalization in {{ site.product.short_name }} and dot notation in
field names, use pure JSON instead of GELF to forward your messages.

1. On the Graylog side, create a new raw TCP input.

2. Still in Graylog, once the raw TCP input is ready, add a JSON
    extractor to it.

3. On the {{ site.product.short_name }} side, use a network destination combined with a
    template utilizing format-json as shown in the example below:

  ```config
  destination d_jsontcp {
    network(
      "172.16.146.142"
      port("5555")
      transport(tcp)
      template("$(format-json --scope all-nv-pairs)\n")
    );
  };
  ```
