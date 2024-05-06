---
title: message()
id: adm-log-filters-message
---

*Synopsis:* message(regexp)

*Description:* Match a regular expression to the text of the log
message, excluding the headers (that is, the value returned by the MSG
macros). Note that in syslog-ng version 2.1 and earlier, this
functionality was performed by the match() filter.
