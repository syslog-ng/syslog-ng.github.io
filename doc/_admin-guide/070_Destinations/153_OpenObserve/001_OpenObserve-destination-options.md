---
title: openobserve-log() destination options 
id: adm-dest-opobs-opt
description: >-
    The following options are specific to the `openobserve-log()` destination. 
---

**NOTE:** Since this destination is based on the `http()` destination, the options of the `http()` destination can be used as well if necessary. The `openobserve-log()` destination automatically configures some of these `http()` destination options as required by the OpenObserve Ingest API.

## organization()

|  Type:|      string|
|  Default:|   `"default"`|

*Description:* The name of the [OpenObserve](https://openobserve.ai/docs/user-guide/organizations/) organization where syslog-ng OSE sends the data.

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/port.md %}

## record()

|  Type:|      string|
|  Default:|   `"--scope rfc5424 --exclude DATE --key ISODATE @timestamp=${ISODATE}"`|

*Description:* A JSON object representing key-value pairs sent to OpenObserve, formatted as syslog-ng OSE value-pairs. By default, the `openobserve-log()` destination sends the RFC5424 fields as attributes. If you want to send different fields, override the default content of the `record()` field.

## stream()

|  Type:|      string|
|  Default:|   `"default"`|

*Description:* The [OpenObserve](https://openobserve.ai/docs/user-guide/streams/) stream where syslog-ng OSE sends the data, for example, `your-example-stream`.

## user()

|  Type:|      string|
|  Default:|   |

*Description:* The username of the account, for example, `root@example.com`.

## url()

|  Type:|      string|
|  Default:|   |

*Description:* Defines the base URL of the OpenObserve Ingest API. The actual URL is constructed from the base URL and some other options of the destination: `url():port()/api/organization()/stream()/_json`.