---
title: Looking up GeoIP2 data from IP addresses
id: adm-enrich-geoip
description: >-
  The syslog-ng OSE application can lookup IP addresses from an offline
  GeoIP2 database, and make the retrieved data available in name-value
  pairs. Depending on the database used, you can access country code,
  longitude, and latitude information and so on.
---

The syslog-ng OSE application works with the Country and the City
version of the GeoIP2 database, both free and the commercial editions.
The syslog-ng OSE application works with the mmdb (GeoIP2) format of
these databases. Other formats, like csv are not supported.

**NOTE:** To access longitude and latitude information, download the City
version of the [GeoIP2](https://www.maxmind.com/en/geoip2-databases)
database.
{: .notice--info}

There are two types of GeoIP2 databases available.

- *GeoLite2 City:*

  - free of charge

  - less accurate

- *GeoIP2 City:*

  - has to be purchased

  - more accurate

Unzip the downloaded database (for example, to the
/usr/share/GeoIP2/GeoIP2City.mmdb file). This path will be used later in
the configuration.

Starting with version 3.24, syslog-ng OSE tries to automatically detect
the location of the database. If that is successful, the database()
option is not mandatory.
