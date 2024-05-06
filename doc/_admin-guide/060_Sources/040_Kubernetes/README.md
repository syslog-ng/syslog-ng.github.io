---
title: 'kubernetes: Collecting and parsing the Kubernetes CRI (Container Runtime Interface) format'
short_title: kubernetes
id: adm-src-k8s
description: >-
    The kubernetes() source collects container logs managed by the Kubelet.
    The kubernetes() source is available in syslog-ng OSE version 3.37 and
    later.
---

By default, it reads the /var/log/containers folder and extracts both
Kubernetes metadata and the log content.

**Declaration**

```config
kubernetes(
    base-dir("<pathname>")
);
```
