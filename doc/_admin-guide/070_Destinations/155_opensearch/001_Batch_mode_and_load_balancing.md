---
title: Batch mode and load balancing with OpenSearch
driver: 'opensearch'
id: adm-dest-batch-opensearch
description: >-
    The opensearch() destination automatically sends multiple log messages in a
    single HTTP request, increasing the rate of messages that Elasticsearch
    deployment can consume. For further configuration options of batch mode,
    see the following section.
---

{% include doc/admin-guide/batch-mode.md %}

{% include doc/admin-guide/http-batch-mode-example.md %}

## Load balancing between multiple Opensearch indexers

{% include doc/admin-guide/http-load-balancing.md %}

{% include doc/admin-guide/http-load-balancing-example.md %}
