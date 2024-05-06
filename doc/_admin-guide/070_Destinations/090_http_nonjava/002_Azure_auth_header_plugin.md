---
title: The Azure auth header plugin
id: adm-dest-http-nonjava-azure
description: >-
  This section describes the syslog-ng Open Source Edition (syslog-ng OSE)
  application's Azure auth header plugin.

  For more information about modules in syslog-ng OSE, see
  Modules in syslog-ng Open Source Edition (syslog-ng OSE).
---

## The Azure auth header plugin

The Azure auth header plugin is a signal-slot mechanism-based syslog-ng
OSE module that generates authorization headers for applications that
connect to Microsoft Azure.

## Defining the Azure auth header plugin

You can define the Azure auth header plugin by the following:

```config
azure-auth-header(
  method("POST")
  path("/api/logs")
  content-type("application/json")
  workspace-id("<workspace-id>")
  secret("<auth-secret>")
)
```

## Options

**NOTE:** All these options are mandatory. They are used as input for the
method that calculates the authorization header.
{: .notice--info}
