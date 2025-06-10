---
title: stats-exporter() source options
id: adm-src--stats-exporter-opt
description: >-
    The stats-exporter() sources directly can serve the output of syslog-ng-ctl stats and syslog-ng-ctl query to a HTTP Scraper. Unlike the stats-exporter-dont-log() that suppresses log messages from incoming scraper requests, the stats-exporter() logs the unparsed messages, storing incoming scraper HTTP requests in the MSG field.
---

Technically, both sources are specialized versions of the network() source. See the network() source options for details.

>**NOTE:** A destination is not required for this source to work; the `stats-exporter()` sources will respond to the scraper regardless of whether a destination is present in the log path.
{: .notice--info}

These drivers have the following additional options:

## stat-type()

|Accepted values:| query \| stats |
|Default:        | stats |

*Description:* The stat type you wish to provide in the response to a HTTP Scraper request, just like for the syslog-ng-ctl command line tool.

## stat-query()

|Accepted values:| regular expression |
|Default:        |  |

*Description:* The query regex string that can be used to filter the output of a `query` type request.

## stat-format()

|Accepted values:| csv \| kv \| prometheus |
|Default:        | prometheus |

*Description:* Specifies the format of the statistics output in HTTP responses, similar to the options available in syslog-ng-ctl. The available formats are:

- csv – comma-separated values format
- kv – key-value pairs, one per line
- prometheus – Prometheus-compatible exposition format

## scrape-pattern()

|Accepted values:| regular expression |
|Default:        | GET /metrics* |

*Description:* The pattern used to match the HTTP header of incoming scraping requests. A stat response will be generated and sent only if the header matches the scrape-pattern().

## scrape-freq-limit()

|Accepted values:| number |
|Default:        | 0 |

*Description:* Limits the frequency of repeated scraper requests to the specified number of seconds. Any repeated request within this period will be ignored. A value of 0 means no limit.

## single-instance()

|Accepted values:| yes \| no |
|Default:        | no |

*Description:* If set to `yes` only one scraper connection and request will be allowed at once.
