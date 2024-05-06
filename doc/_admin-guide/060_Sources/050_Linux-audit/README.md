---
title: 'linux-audit: Collecting messages from Linux audit logs'
short_title: linux_audit
id: adm-src-linux
description: >-
    It reads and automatically parses the Linux audit logs. You can override
    the file name using the filename() parameter and the prefix for the
    created name-value pairs using the prefix() parameter. Any additional
    parameters are passed to the file source.
---

**NOTE:** Most recent Linux distributions enable Security-Enhanced Linux
(SELinux) or AppArmor as a security measure. If enabled, these
technologies might disable access to the Linux Audit log file by
default. Consult their manuals to enable Linux Audit log access for
syslog-ng OSE.
{: .notice--info}

**Declaration**

```config
linux-audit(options);
```

## Example: Using the linux-audit() driver

```config
source s_auditd {
    linux-audit(
        prefix("test.")
        hook-commands(
            startup("auditctl -w /etc/ -p wa")
            shutdown("auditctl -W /etc/ -p wa")
        )
    );
};
```
