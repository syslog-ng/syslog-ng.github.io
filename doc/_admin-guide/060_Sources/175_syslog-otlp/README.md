---
title: 'syslog-ng-otlp() source'
short_title: syslog-ng-otlp
id: adm-src-otlp
description: >-
    In syslog-ng OSE 4.4 and later versions, the syslog-ng-otlp() source and destination make it possible to transfer the internal representation of log messages between syslog-ng OSE instances, using the OpenTelemetry protocol. The syslog-ng-otlp() utilizes the OpenTelemetry protocol for efficient and reliable log message transmission instead of the traditional syslog-ng() drivers, which rely on simple TCP connections.
---

Advantages of using `syslog-ng-otlp()`:
* The `workers()` option makes the scaling of the driver flexible.
* An integrated application layer acknowledgement is available.
* Google service authentication (ADC or ALTS), and improved load balancing are supported.

### Example: Configure syslog-ng-otlp() source on the receiver node

```config
source s_syslog_ng_otlp {
  syslog-ng-otlp(port(4317));
};
```
