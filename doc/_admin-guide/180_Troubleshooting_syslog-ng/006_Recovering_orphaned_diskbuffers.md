---
title: Recover data from orphaned diskbuffer files
id: adm-debug-diskbuff-recover
description: >-
    When you change the configuration of a {{ site.product.short_name }} host that uses
    disk-based buffering (also called disk queue), {{ site.product.short_name }} may start
    new disk buffer files for the destinations that you have changed. In
    this case, {{ site.product.short_name }} abandons the old disk queue files. If there
    were unsent log messages in the disk queue files, these messages remain
    in the disk queue files, and will not be sent to the destinations.
---
