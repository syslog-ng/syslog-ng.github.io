---
title: Referring to parts of the message as a macro
id: adm-enrich-geoip-macro
---

You can refer to the separated parts of the message using the key of the
value as a macro. For example, if the message contains
KEY1=value1,KEY2=value2, you can refer to the values as \${KEY1} and
\${KEY2}.

for example, if the default prefix (.geoip2) is used, you can determine
the country code using **\${.geoip2.country.iso\_code}**.

To look up all keys:

1. Install the **mmdb-bin** package.

    After installing this package, you will be able to use the
    **mmdblookup** command.

    **NOTE:** The name of the package depends on the Linux distribution. The
    package mentioned in this example is on Ubuntu.
    {: .notice--info}

2. Create a dump using the following command: **mmdblookup \--file
    GeoLite2-City.mmdb \--ip \<your-IP-address\>**

    The resulting dump file will contain the keys that you can use.

For a more complete list of keys, you can also check the 
[GeoIP2 City and Country CSV Databases](https://dev.maxmind.com/geoip/geoip2/geoip2-city-country-csv-databases/).
However, note that the syslog-ng OSE application works with the mmdb
(GeoIP2) format of these databases. Other formats, like csv are not
supported.
