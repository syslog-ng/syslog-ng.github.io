---
title: OpenTelemetry parser
parser: OpenTelemetry
id: adm-parser-optel
description: >-
    The {{ site.product.short_name }} application does not parse the fields of the incoming messages into name-value pairs. It is only capable of forwarding messages using the OpenTelemetry destination. To parse the fields into name-value pairs, use the `opentelemetry()` parser.
---

This parser parses the fields into name-value pairs starting with the `.otel.` prefix.

* The type of the message is stored in `.otel.type`. Accepted values:
  * `log`
  * `metric`
  * `span`
* Resource information is mapped into `.otel.resource.<...>`. Examples:
  * `.otel.resource.dropped_attributes_count`
  * `.otel.resource.schema_url`
* Scope information is mapped into `.otel.scope.<...>`. Examples:
  * `.otel.scope.name`
  * `.otel.scope.schema_url`
* The fields of log records are mapped into `.otel.log.<...>`. Examples:
  * `.otel.log.body`
  * `.otel.log.severity_text`
* The fields of metrics are mapped into `.otel.metric.<...>`. Example:
  * `.otel.metric.name`
  * `.otel.metric.unit` 
  * The type of the metric is mapped into `.otel.metric.data.type`. Possible values: 
    * `gauge`
    * `sum`
    * `histogram`
    * `exponential_histogram`
    * `summary`
  * The actual data is mapped into `.otel.metric.data.<type>.<...>`. Example:
    * `.otel.metric.data.gauge.data_points.0.time_unix_nano`
* The fields of traces are mapped into `.otel.span.<...>`. Example:
  * `.otel.span.name`
  * `.otel.span.trace_state`
  Repeated fields have an index, for example, `.otel.span.events.5.time_unix_nano`.

For more information on the parsed fields, the OpenTelemetry proto files can be accessed on GitHub.

## Mapping data types

String, bool, int64, double, and bytes values are mapped to their respective syslog-ng OSE name-value type, for example, `.otel.resource.attributes.string_key` becomes a string value.

The mapping of AnyValue type fields is limited.

`ArrayValue` and `KeyValueList` types are stored serialized with the `protobuf` type. 

**NOTE:** `protobuf` and bytes types are only available, unless explicitly type cast. For example, `bytes(${.otel.log.span_id})`. When using template functions, use --include-bytes, for example, `$({format-json} .otel.* --include-bytes)`. In the case of `$({format-json})`, the content is base64-encoded into the bytes content.
{: .notice--info}
