---
title: Filter functions
id: adm-log-filters-functions
description: >-
    This section describes filter functions in {{ site.product.short_name }}.
---

The following functions may be used in the filter statement, as
described in Filters.  

## Table 14: Filter functions available in {{ site.product.short_name }}

|Name|Description|
|---|---|
|facility()| Filter messages based on the sending facility.|
|filter()|Call another filter function.|
|host()|Filter messages based on the sending host.|
|in-list()|File-based whitelisting and blacklisting.|
|level() or priority()|Filter messages based on their priority. |
|match()|Use a regular expression to filter messages based on a specified header or content field.|
|message()|Use a regular expression to filter messages based on their content.|
|netmask() or netmask6()|Filter messages based on the IP address of the sending host.|
|program()|Filter messages based on the sending application.|
|rate-limit() |Limits messages rate based on arbitrary keys in each message. |
|source()|Select messages of the specified {{ site.product.short_name }} source statement.|
|tags()|Select messages having the specified tag.|
|blank()|Filter messages where the specified value is blank (unset, empty, whitespace-only, empty list, or boolean false).|

