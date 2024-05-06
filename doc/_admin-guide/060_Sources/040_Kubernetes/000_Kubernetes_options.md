---
title: kubernetes() source options
id: adm-src-k8s-opt
---

The kubernetes() source has the following options:

## base-dir()

|  Type:|      path without filename|
|  Default:|   /var/log/containers|

*Description:* The path to the directory that contains the log files,
for example, **base-dir(\"/var/log/pods\")**.

## cluster-name()

| Type: |     string|
|Default: |  k8s|

*Description:*The name of the Kubernetes cluster.

{% include doc/admin-guide/options/prefix.md %}

The prefix() option is optional and its default value is ".k8s.".
