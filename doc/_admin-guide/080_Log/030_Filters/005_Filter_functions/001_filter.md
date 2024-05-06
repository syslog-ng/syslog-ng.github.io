---
title: filter()
id: adm-log-filters-filter
---

*Synopsis:* filter(filtername)

*Description:* Call another filter rule and evaluate its value. For example:

```config
filter demo_filter { host("example") and match("deny" value("MESSAGE")) };
filter inverted_demo_filter { not filter(demo_filter) }
```
