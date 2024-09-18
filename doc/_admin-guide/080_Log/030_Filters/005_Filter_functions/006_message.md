---
title: message()
id: adm-log-filters-message
description: >-
    This section describes message() filter function in {{ site.product.short_name }}.
---

*Synopsis:* message(regexp)

*Description:* Match a regular expression to the text of the log
message, excluding the headers (that is, the value returned by the ${MSG}
macros). Note that in {{ site.product.short_name }} version 2.1 and earlier, this
functionality was performed by the match() filter.
