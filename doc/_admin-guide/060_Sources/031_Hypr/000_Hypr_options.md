---
title: hypr-audit-trail() and hypr-app-audit-trail() source options
id: adm-src-hypr-opt
---

The `hypr-audit-trail()` and `hypr-app-audit-trail()` sources have the following options:

{% include doc/admin-guide/options/chain-hostnames.md %}

## url()

|  Type:   |      url|
|  Default:|         |

*Description:* A custom URL for Hypr API access ("https://\<custom domain\>.hypr.com")

## bearer-token()

|  Type:   |    token|
|  Default:|         |

*Description:* The base64 encoded authentication token from Hypr.

{% include doc/admin-guide/options/format.md %}

{% include doc/admin-guide/options/internal.md %}

## page-size()

|  Type:   |    number|
|  Default:|       100|

*Description:* Defines the number of results to return in a single page (optional).

## initial-hours()

|  Type:   |   number(hours)|
|  Default:|               4|

*Description:* Defines the number of hours to search backward on initial fetch (optional).

## application-skip-list()

|  Type:   |   rpAppId list|
|  Default:| `HYPRDefaultApplication`, `HYPRDefaultWorkstationApplication`|

*Description:* The list of rpAppIds not to retrieve from Hypr (optional).

## log-level()

|  Type:   |   string|
|  Default:|   `INFO`|

The following values are available for log-level():

* `DEBUG`
* `INFO`
* `WARNING`
* `ERROR`
* `CRITICAL`

## flags()

|  Type:   |   string|
|  Default:|   |

*Description:* The flags passed to the source, can be used for example to disable message parsing with flags(no-parse) (optional).

## ignore-persistence()

|  Type:   |   boolean|
|  Default:|   `no`|

*Description:* This option can be set to ignore the saved value in the persist file, and start querying from the current time (optional).

{% include doc/admin-guide/options/normalize-hostnames.md %}

{% include doc/admin-guide/options/sdata-prefix.md %}