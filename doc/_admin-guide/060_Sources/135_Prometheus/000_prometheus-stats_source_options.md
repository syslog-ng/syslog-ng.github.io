---
title: prometheus-stats() source options
id: adm-src-prometheus-stats-opt
description: >-
    The prometheus-stats() sources directly can serve the output of syslog-ng-ctl stats and syslog-ng-ctl query to a Prometheus Scraper. Unlike the prometheus-stats-dont-log() that suppresses log messages from incoming scraper requests, the prometheus-stats() logs the unparsed messages, storing incoming scraper HTTP requests in the MSG field.
---

Technically, both sources are specialized versions of the network() source. See the network() source options for details.

These drivers have the following additional options:

## stat-type()

|Accepted values:| query \| stats |
|Default:        | stats |

*Description:* The stat type you wish to provide in the response to a Prometheus Scraper request, just like for the syslog-ng-ctl command line tool.

## stat-query()

|Accepted values:| regular expression |
|Default:        |  |

*Description:* The query regex string that can be used to filter the output of a `query` type request.

## scrape-freq-limit()

|Accepted values:| number |
|Default:        | 0 |

*Description:* Limits the frequency of repeated scraper requests to the specified number of seconds. Any repeated request within this period will be ignored. A value of 0 means no limit.

## single-instance()

|Accepted values:| yes \| no |
|Default:        | no |

*Description:* If set to `yes` only one scraper connection and request will be allowed at once.
