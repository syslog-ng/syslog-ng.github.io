---
title: 'internal: Collecting internal messages'
short_title: internal
id: adm-src-int
description: >-
    All messages generated internally by syslog-ng use this special source.
---

To collect warnings, errors and notices from syslog-ng itself, include
this source in one of your source statements.

```config
internal()
```

The syslog-ng application will issue a warning upon startup if none of
the defined log paths reference this driver.

## Example: Using the internal() driver

```config
source s_local { internal(); };
```

## Message types

The syslog-ng OSE application sends the following message types from the internal() source

- *fatal*: Priority value: critical (2), Facility value: syslog (5)

- *error*: Priority value: error (3), Facility value: syslog (5)

- *warning*: Priority value: warning (4), Facility value: syslog (5)

- *notice*: Priority value: notice (5), Facility value: syslog (5)

- *info*: Priority value: info (6), Facility value: syslog (5)
