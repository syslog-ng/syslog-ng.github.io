---
title: 'Splunk destination'
short_title: Splunk
id: adm-dest-splunk-hec
description: >-
    In {{ site.product.short_name }} versions older than 4.2, use the [[http() destination|adm-dest-http-nonjava]].  
    In version older than 3.8, use the [[program() destination|adm-dest-program]].
---

For details on forwarding log messages to Splunk with {{ site.product.short_name }} see the following posts on the Splunk blog:

* syslog-ng and HEC: Scalable Aggregated Data Collection in Splunk

* Using syslog-ng with Splunk

From version 4.2 {{ site.product.short_name }} can send messages to the Splunk HTTP Event Collector(HEC). For details, see splunk-hec-event: Send log messages to Splunk HEC.
