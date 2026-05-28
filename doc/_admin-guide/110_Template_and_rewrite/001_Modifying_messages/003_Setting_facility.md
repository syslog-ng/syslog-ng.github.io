---
title: Setting the facility field with the set-facility() rewrite function
short_title: Setting facility
id: adm-temp-facility
description: >-
  It is possible to set the facility field with the set-facility() rewrite
  function. The set-facility() rewrite function rewrites only the facility
  part of the `PRIORITY` value in the message, while preserving the
  severity part.
---

{% include doc/admin-guide/notes/not-valid-param.md %}

**Declaration**

```config
log {
  source { system(); };
    if (program("postfix")) {
      rewrite { set-facility("mail"); };
    };
    destination { file("/var/log/mail.log"); };
    flags(flow-control);
};
```

## Parameters

The set-facility() rewrite function has a single, mandatory parameter
that can be defined as follows:

```config
set-facility( "parameter1" );
```

## Accepted values

The set-facility() rewrite function accepts the following values:

- numeric strings: \[0-127\]

- named values: kern, user, mail, daemon, auth, syslog, lpr, news,
  uucp, cron, authpriv, megasafe, ftp, ntp, security, console,
  solaris-cron, local0, local1, local2, local3, local4, local5,
  local6, local7

### Example usage for the set-facility() rewrite function

The following example can be used in production for the set-facility()
rewrite function.

```config
rewrite {
set-facility("mail");
set-facility("6");
set-facility("${.json.facility}");
};
```
