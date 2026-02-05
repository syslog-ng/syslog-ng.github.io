---
title: kubernetes() source options
id: adm-src-k8s-opt
description: >-
    This section describes the options of the kubernetes() source in {{ site.product.short_name }}.
---

The kubernetes() source has the following options:

## base-dir()

|  Type:|      path without filename|
|  Default:|   /var/log/containers|

*Description:* The path to the directory that contains the log files,
for example, **base-dir(\"/var/log/pods\")**.

{% include doc/admin-guide/options/chain-hostnames.md %}

## cluster-name()

| Type: |     string|
|Default: |  k8s|

*Description:*The name of the Kubernetes cluster.

{% include doc/admin-guide/options/format.md %}

{% include doc/admin-guide/options/internal.md %}

{% include doc/admin-guide/options/normalize-hostnames.md %}

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/options/sdata-prefix.md %}

The prefix() option is optional and its default value is ".k8s.".
