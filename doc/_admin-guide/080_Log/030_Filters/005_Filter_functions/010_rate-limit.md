---
title: rate-limit()
id: adm-log-filters-ratelimit
---

*Synopsis:* rate-limit(template(\$HOST) rate(5000))

*Description:* Limits messages rate based on arbitrary keys in each
message. The key will be resolved using the template() option. Each
resolution will be allowed to have the number of messages each second,
set by the rate() option. For example if template(\$HOST) and rate(5000)
are set, and there are 2 hosts sending messages to syslog-ng OSE, a
total of **10000** messages will be allowed by the rate-limit() filter,
**5000** from the first and **5000** from the second host. If template()
was not set instead, then **5000** messages would be allowed each
second, regardless of their content.

**NOTE:** In syslog-ng OSE version 3.35 the rate-limit() filter was called
throttle(). In syslog-ng OSE version 3.36 it got renamed to
rate-limit(), but throttle() is still available for backward
compatibility.
{: .notice--info}

**NOTE:** Like every other filter, messages unmatched (outside of the rate
limit) by the rate-limit() filter are dropped by default. Also, as every
filter can be used in channels or if conditions, the messages unmatched
can be caught and handled, like sent to a different destination, and so
on.
{: .notice--info}

## Example: Using the rate-limit() filter

The following example depicts the scenario described in the description
part of this section.

```config
filter f_rate_limit {
    rate-limit(
    template("$HOST")
    rate(5000)
    );
};
```

## Options of rate-limit() filter

The rate-limit() filter has the following options.

### rate()

|  Type:        |number|
|  Default:     |N/A|
|  Mandatory:   |yes|

*Description:* The number of messages for each unique macro resolution,
that will be let through (matched) by the filter each second.

### template()

|Type:    |  template|
|Default: |  empty string|

*Description:* The resolved template, that will be used to create unique
rate-limit token buckets.
