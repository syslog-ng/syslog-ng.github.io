---
title: Batch mode and load balancing with ElasticSearch
driver: 'elasticsearch-http'
id: adm-dest-est-http-batch
description: >-
    The elasticsearch-http() destination automatically sends multiple log
    messages in a single HTTP request, increasing the rate of messages that
    your Elasticsearch deployment can consume. For details on adjusting and
    fine-tuning the batch mode of the elasticsearch-http() destination, see
    the following section.
---

{% include doc/admin-guide/batch-mode.md %}

{% include doc/admin-guide/http-batch-mode-example.md %}

## Load balancing between multiple Elasticsearch indexers

{% include doc/admin-guide/http-load-balancing.md %}

{% include doc/admin-guide/http-load-balancing-example.md %}
