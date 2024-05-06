---
title: 'metrics-probe'
short_title: metrics-probe()
id: adm-metrics-probe
description: >-
  Available in syslog-ng OSE 4.1.1 or later versions.

  metrics-probe() is a special parser that counts the messages passing through the
  log path, and creates labeled stat-counters based on the fields of these messages.
---

The names of the keys and the labels can be configured. The keys are automatically
prefixed with the `syslogng_` string. Templates can be used in the values of the
labels.

The minimal configuration creates counters with the syslogng_classified_events_total
key, labels app, host, program, and source.

### Example: minimal configuration

```config
parser p_metrics_probe {
  metrics-probe();
  # Same as:
  #
  # metrics-probe(
  #   key("classified_events_total")
  #   labels(
  #     "app" => "${APP}"
  #     "host" => "${HOST}"
  #     "program" => "${PROGRAM}"
  #     "source" => "${SOURCE}"
  #   )
  # );
};
```

This configuration results the following counters:

```config
syslogng_classified_events_total{app="example-app", host="localhost", program="baz", source="s_local_1"} 3
syslogng_classified_events_total{app="example-app", host="localhost", program="bar", source="s_local_1"} 1
syslogng_classified_events_total{app="example-app", host="localhost", program="foo", source="s_local_1"} 1
```

The metrics can be queried by running the following command:

```config
syslog-ng-ctl stats prometheus
```

In the following example, the metrics-probe() parser creates a counter called
`syslogng_custom_key` that counts messages that have their `custom_label_name_1`
field set to foobar, and for these messages it creates separate counters based
on the value of the `custom_label_name_2` field.

### Example: counter

```config
parser p_metrics_probe {
  metrics-probe(
 key("custom_key")  # adds "syslogng_" prefix => "syslogng_custom_key"
 labels(
   "custom_label_name_1" => "foobar"
   "custom_label_name_2" => "${.custom.field}"
 )
  );
};
```

This configuration results the following counters:

```config
syslogng_custom_key{custom_label_name_1="foobar", custom_label_name_2="bar"} 1
syslogng_custom_key{custom_label_name_1="foobar", custom_label_name_2="foo"} 1
syslogng_custom_key{custom_label_name_1="foobar", custom_label_name_2="baz"} 3
```

In syslog-ng OSE 4.4 and later versions, it is possible to create Dynamic labels
as well.
