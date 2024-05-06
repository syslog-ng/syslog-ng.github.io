---
title: 'splunk-hec-event: Send log messages to Splunk HEC'
id: adm-dest-splunk-hec-event
description: >-
  In version 4.2 and later versions it is possible to send messages to the Splunk HTTP Event Collector(HEC).
---

### Prerequisites

* HEC must be enabled on the Splunk deployment.

* A token must be created for syslog-ng OSE to be used in the token() destination option. Use the syslog source type when creating the token.

For more information, see [Set up and use HTTP Event Collector in Splunk Web](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector).

## HEC events API

The splunk-hec-event() destination feeds [Splunk through the HEC Events API](https://docs.splunk.com/Documentation/Splunk/9.0.4/RESTREF/RESTinput#services.2Fcollector.2Fevent.2F1.0).

Minimal configuration:

```config
destination d_splunk_hec_event {
  splunk-hec-event(
    url("https://localhost:8088")
    token("70b6ae71-76b3-4c38-9597-0c5b37ad9630")
  );
};
```

Additional options:

```config
event()
index()
source()
sourcetype()
host()
time()
default-index()
default-source()
default-sourcetype()
fields()
extra-headers()
extra-queries()
content-type()
```

`event()` accepts a template, that defines the content of the log message sent to Splunk. Default value: `${MSG}`

`index()`, `source()`, `host()`, and `time()` accept templates, and define the respective fields for each log message based on the set template.

`default-index()`, `default-source()`, and `default-sourcetype()` accept literal strings, and are used as fallback values if a log message doesn’t set these fields. These values are passed to the URL as query parameters, so they don’t inflate the body of the HTTP request for each message in the batch, which saves bandwidth.

`fields()` accepts a template, that is forwarded as additional indexing metadata to Splunk.

`extra-headers()`, `extra-queries()`, and `content-type()` are additional HTTP request options.

## HEC raw API

The `splunk-hec-raw()` destination feeds Splunk via the [HEC raw API](https://docs.splunk.com/Documentation/Splunk/9.0.4/RESTREF/RESTinput#services.2Fcollector.2Fraw.2F1.0).

Minimal configuration:

```config
destination d_splunk_hec_raw {
  splunk-hec-raw(
    url("https://localhost:8088")
    token("70b6ae71-76b3-4c38-9597-0c5b37ad9630")
    channel("05ed4617-f186-4ccd-b4e7-08847094c8fd")
  );
};
```

The options of the `splunk-hec-raw()` destination are similar to the [[splunk-hec-event()]] destination, however, the `channel()` option is mandatory. The `channel()` option must be a globally unique channel identifier (GUID), this ID differentiates the data from different clients. Note that Splunk does not generate this ID, you must create it for yourself. When Splunk sees a new channel identifier, it creates a new channel.

Use the `template()` option to set the content of the log message sent to Splunk. Avoid using the `event()` option, that is used in the [[splunk-hec-event()]] destination.
