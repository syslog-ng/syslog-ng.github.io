---
title: sumologic-http()
id: adm-dest-sumologic-http
description: >-
  The sumologic-http() and sumologic-syslog() destinations send log
  messages to [Sumo Logic](https://www.sumologic.com/), a cloud-based log
  management and security analytics service.
---

Using the sumologic-http() destination, you can send data to the Sumo
Logic service by utilizing a [Hosted Collector hosted by Sumo
Logic](https://help.sumologic.com/03Send-Data/Hosted-Collectors).

For more information about the sumologic-http() destination, see
[[sumologic-syslog()]].

## Sending data using the sumologic-http() destination

The following example sends every log from the system() source to your
Sumo Logic account.

```config
log {
  source { system(); };

  destination {
    sumologic-http(
      collector("UNIQUE-HTTP-COLLECTOR-CODE-AS-PROVIDED-BY-sumologic")
      deployment("ENDPOINT")
      tls(peer-verify(yes) ca-dir('/etc/syslog-ng/ca.d'))
    );
  };
};
```
