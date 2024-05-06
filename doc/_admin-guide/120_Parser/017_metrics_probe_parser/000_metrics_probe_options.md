---
title: 'metrics-probe options'
id: adm-parser-metrics-opt
---

## increment()

| Type: | integer or template |
| Default: | 1 |

Available in syslog-ng OSE 4.2 and later versions.

This option sets a template, which resolves to a number that defines the increment
of the counter. The following example defines a counter called
`syslogng_input_event_bytes_total`, and increases its value with the size of
the incoming message (in bytes).

```config
metrics-probe(
    key("input_event_bytes_total")
    labels(
        "cluster" => "`cluster-name`"
        "driver" => "kubernetes"
        "id" => "${SOURCE}"
        "namespace" => "${`prefix`namespace_name}"
        "pod" => "${`prefix`pod_name}"
    )
    increment("${RAWMSG_SIZE}")
);
```

## key()

| Type: | string |
| Default: | classified_events_total |

This option defines the name of the counter to create. Note that the value of
this option is always prefixed with `syslogng_`, for example `key("my-custom-key")`
becomes `syslogng_my-custom-key`.

## labels()

| Type: |  |
| Default: | See the description |

This option defines the labels used to create separate counters, based on the
fields of the messages processed by metrics-probe(). Use the following format:

```config
labels(
 "name-of-the-label-in-the-output" => "field-of-the-message"
)
```

### Default value

```config
labels(
 "app" => "${APP}"
 "host" => "${HOST}"
 "program" => "${PROGRAM}"
 "source" => "${SOURCE}"
)
```

This configuration results the following counters:

```config
syslogng_classified_events_total{app="example-app", host="localhost", program="baz", source="s_local_1"} 3
```

## Dynamic labels

Available in syslog-ng OSE 4.4 and later versions.

Dynamic labelling makes it possible to use every available [[value-pairs()]] option
in the labels, for example, [[key()]], [[rekey()]], [[pair()]], or [[scope()]].

### Example

```config
metrics-probe(
 key("foo")
 labels(
 static-label" => "bar"
 key(".my_prefix.*" rekey(shift-levels(1)))
 )
);
```

```config
syslogng_foo{static_label="bar",my_prefix_baz="anotherlabel",my_prefix_foo="bar",my_prefix_nested_axo="flow"} 4
```

## level()

| Type: | integer (0-3) |
| Default: | 0 |

Available in syslog-ng OSE 4.2 or later versions.

This option sets the stats level of the generated metrics.

**NOTE:** Drivers configured with internal(yes) register their metrics on level 3.
Due to this, if an SCL is created, the built-in metrics of the driver can be disabled,
metrics can be created manually using metrics-probe().
{: .notice--info}