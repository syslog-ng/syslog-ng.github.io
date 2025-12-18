---
title: 'syslog-ng-otlp() destination'
short_title: syslog-ng-otlp
id: adm-dest-sng-otlp
description: >-
    In {{ site.product.short_name }} 4.4 and later versions, the syslog-ng-otlp() source and destination make it possible to transfer the internal representation of log messages between {{ site.product.short_name }} instances, using the OpenTelemetry protocol. The syslog-ng-otlp() utilizes the OpenTelemetry protocol for efficient and reliable log message transmission instead of the traditional syslog-ng() drivers, which rely on simple TCP connections.
---

Advantages of using `syslog-ng-otlp()`:
* The `workers()` option makes the scaling of the driver flexible.
* An integrated application layer acknowledgement is available.
* Google service authentication (ADC or ALTS), and improved load balancing are supported.
* The syslog-ng-otlp() destination supports OAuth2 authentication via cloud-auth(oauth2()).

### Example: Configure syslog-ng-otlp() destination on the sender node

```config
destination d_syslog_ng_otlp {
  syslog-ng-otlp(url("your-receiver-syslog-ng-instance:4317"));
};
```

### Example: Configure syslog-ng-otlp() destination using OAuth2

```config
destination d_syslog_ng_otlp {
  syslog-ng-otlp(
    url("example.com:443")
    cloud-auth(
      oauth2(
        client_id("client-id")
        client_secret("client-secret")
        token_url("https://auth.example.com/token")
        scope("api-scope")
      )
    )
  );
};
```
