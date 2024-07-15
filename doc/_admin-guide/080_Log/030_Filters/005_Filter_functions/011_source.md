---
title: source()
id: adm-log-filters-source
description: >-
    This section describes source() filter function in {{ site.product.short_name }}.
---

*Synopsis:* source id

*Description:* Select messages of a source statement. This filter can be
used in embedded log statements if the parent statement contains
multiple source groups --- only messages originating from the selected
source group are sent to the destination of the embedded log statement.
