---
title: freebsd-audit() source options
id: adm-src-freebsd-audit-opt
description: >-
    The freebsd-audit() sources serve the output of the praudit command line tool to the log pipe for further processing.
---

Technically, this source is a specialized version of a program() source that uses the FreeBSD `praudit` command line tool to collect the audit logs. See the program() source options for more details.

This driver has a single additional option:

## params()

|Accepted values:| praudit options |
|Default:        | -p -l -x |

*Description:* The options to pass to the invoked `praudit` command line tool.
