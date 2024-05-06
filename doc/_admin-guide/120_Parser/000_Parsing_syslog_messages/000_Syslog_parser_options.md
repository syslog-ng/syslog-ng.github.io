---
title: Options of syslog-parser() parsers
id: adm-parser-opt
---

The syslog-parser() has the following options:

{% include doc/admin-guide/options/default-facility.md %}

{% include doc/admin-guide/options/default-priority.md %}

## drop-invalid()

|Accepted values:|    yes \| no|
|Default: |  no|

*Description:* This option determines how the syslog-parser() affects
messages when parsing fails.

If you set drop-invalid() to **yes**, syslog-parser() will drop the
message if the parsing fails.

If you set drop-invalid() to **no**, the parsing error triggers
syslog-parser() to rewrite and extend the original log message with the
following additional information:

- It prepends the following message to the contents of the \$MESSAGE
    field: Error processing log message.

- It sets the contents of the \$PROGRAM field to syslog-ng.

- It sets the contents of the facility field to syslog.

- It sets the contents of the severity field to error.

**NOTE:** With the drop-invalid(no) option syslog-parser() will work in the
same way as the sources which receive syslog-protocol/BSD-format
messages.
{: .notice--info}

### Example: enabling the drop-invalid() option

```config
parser p_syslog {  syslog-parser(drop-invalid(yes)); };
```

{% include doc/admin-guide/options/source-flags.md %}

{% include doc/admin-guide/options/template-macro.md %}
