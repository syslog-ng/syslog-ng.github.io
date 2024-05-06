---
title: Transferring your logs to Elasticsearch using GeoIP2
id: adm-enrich-geoip-transfer
description: >-
   If you are transferring your log messages into Elasticsearch, use the
   following rewrite rule to combine the longitude and latitude information
   into a single value (called geoip2.location), and set the mapping in
   Elasticsearch accordingly. Do not forget to include the rewrite in your
   log path. These examples assume that you used prefix(\"geoip2.\")
   instead of the default for the geoip2 parser. 
---

For details on
transferring your log messages to Elasticsearch, see
elasticsearch-http: Sending messages to Elasticsearch HTTP Bulk API.

```config
rewrite r_geoip2 {
   set(
      "${geoip2.location.latitude},${geoip2.location.longitude}",
      value( "geoip2.location2" ),
      condition(not "${geoip2.location.latitude}" == "")
   );
};
```

In your Elasticsearch configuration, set the appropriate mappings:

```json
{
   "mappings" : {
      "_default_" : {
         "properties" : {
            "geoip2" : {
               "properties" : {
                  "location2" : {
                     "type" : "geo_point"
                  }
               }
            }
         }
      }
   }
}
```
