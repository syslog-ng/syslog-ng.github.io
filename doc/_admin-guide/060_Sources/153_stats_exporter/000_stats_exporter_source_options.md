---
title: stats-exporter() source options
id: adm-src--stats-exporter-opt
description: >-
    The stats-exporter() sources directly can serve the output of syslog-ng-ctl stats and syslog-ng-ctl query to an HTTP Scraper. Unlike the stats-exporter-dont-log() that suppresses log messages from incoming scraper requests, the stats-exporter() logs the unparsed messages, storing incoming scraper HTTP requests in the MSG field.
---

Technically, both sources are specialized versions of the network() source. For more options and details, see the network() source options.

>**NOTE:** A destination is not required for this source to work; the stats-exporter() sources will respond to the scraper regardless of whether a destination is present in the log path.
{: .notice--info}

These drivers have the following additional options:

## stat-type()

|Accepted values:| query \| stats |
|Default:        | stats |

*Description:* This option sets the desired stat type to be produced in response to an HTTP Scraper request. This method operates like the syslog-ng-ctl command line tool.

## stat-query()

|Accepted values:| regular expression |
|Default:        |  |

*Description:* This option sets the query regex string which can be used to filter the output of a `query` type request.

## stat-format()

|Accepted values:| csv \| kv \| prometheus |
|Default:        | prometheus |

*Description:* This option specifies the format of the statistics output in HTTP responses, similar to the options available in syslog-ng-ctl. The available formats are the following:

- `csv` – comma-separated values format
- `kv` – key-value pairs, one per line
- `prometheus` – Prometheus-compatible exposition format

## stats-without-orphaned()

|Accepted values:| yes \| no |
|Default:        | no |

*Description:* If this option is set to `yes`, the output of a `stats` type request will not include abandoned counters, similar to the `without-orphaned-metrics` option available in `syslog-ng-ctl`.

## stats-with-legacy()

|Accepted values:| yes \| no |
|Default:        | no |

*Description:* If this option is set to `yes`, the output of a `stats` type request — only when using the `prometheus` format — will not include legacy counters, similar to the `with-legacy-metrics` option available in `syslog-ng-ctl`.

## scrape-pattern()

|Accepted values:| regular expression |
|Default:        | `GET /metrics*` |

*Description:* This option sets the pattern used to match the HTTP header of incoming scraping requests. A stat response will be generated and sent only if the header matches the one set in the `scrape-pattern()` option.

## scrape-freq-limit()

|Accepted values:| number |
|Default:        | `0` |

*Description:* This option limits the frequency of repeated scraper requests to the specified number of seconds. Any repeated request within this period will be ignored. A set value of `0` means no limit.

## single-instance()

|Accepted values:| yes \| no |
|Default:        | no |

*Description:* If this option is set to `yes`, only one scraper connection and request will be allowed at once.
