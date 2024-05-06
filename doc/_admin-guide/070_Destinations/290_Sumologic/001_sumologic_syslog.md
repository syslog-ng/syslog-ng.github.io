---
title: sumologic-syslog()
id: adm-dest-sumologic-syslog
description: >-
  The sumologic-http() and sumologic-syslog() destinations send log
  messages to [Sumo Logic](https://www.sumologic.com/), a cloud-based log
  management and security analytics service.
---

Using the sumologic-syslog() destination, you can send data (both in
JSON and in non-JSON format) to the Sumo Logic service.

For more information about the sumologic-http() destination, see
[[sumologic-http()]].

## Sending data using the sumologic-syslog() destination

The following example illustrates how you can use the sumologic-syslog()
destination to send data to your Sumo Logic account.

```config
log {
  source { system(); };

  destination{
    sumologic-syslog(token("USER-TOKEN-AS-PROVIDED-BY-sumologic")
      deployment("ENDPOINT")
      tls(peer-verify(required-trusted) ca-dir('/etc/syslog-ng/ca.d'))
    );
  };
};
```

## Sending JSON data using the sumologic-syslog destination

The following example illustrates how you can use the sumologic-syslog()
destination to send JSON data to your Sumo Logic account.

```config
log {
  source{ system(); };

  destination{
    sumologic-syslog(token("USER-TOKEN-AS-PROVIDED-BY-sumologic")
      deployment("ENDPOINT")
      tls(peer-verify(required-trusted) ca-dir('/etc/syslog-ng/ca.d'))
      template("$(format-json --scope all-nv-pairs)")
    );
  };
};
```
