---
title: 'Splunk destination'
short_title: Splunk
id: adm-dest-splunk-hec
description: >-
    In syslog-ng OSE versions older than 4.2, use the [[http() destination|adm-dest-http-nonjava]].  
    In version older than 3.8, use the [[program() destination|adm-dest-program]].
---

For details on forwarding log messages to Splunk with syslog-ng OSE see the following posts on the Splunk blog:

* [syslog-ng and HEC: Scalable Aggregated Data Collection in Splunk](https://www.splunk.com/blog/2017/03/30/syslog-ng-and-hec-scalable-aggregated-data-collection-in-splunk.html)

* [Using Syslog-ng with Splunk](https://www.splunk.com/blog/2016/03/11/using-syslog-ng-with-splunk/)

From version 4.2 syslog-ng OSE can send messages to the Splunk HTTP Event Collector(HEC). For details, see splunk-hec-event: Send log messages to Splunk HEC.
