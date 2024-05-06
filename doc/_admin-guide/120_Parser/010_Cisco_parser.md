---
title: Cisco parser
parser: cisco
id: adm-parser-cisco
---

The Cisco parser can parse the log messages of various Cisco devices.

{% include doc/admin-guide/parser-intro.md %}

The parser can parse variations of the following
message format:

>\<pri\>(sequence: )?(origin-id: )?(timestamp? timezone?: )?%msg

For example:

><189>29: foo: *Apr 29 13:58:40.411: %SYS-5-CONFIG_I: Configured from console by console
><190>30: foo: *Apr 29 13:58:46.411: %SYS-6-LOGGINGHOST_STARTSTOP: Logging to host 192.168.1.239 stopped - CLI initiated
><190>31: foo: *Apr 29 13:58:46.411: %SYS-6-LOGGINGHOST_STARTSTOP: Logging to host 192.168.1.239 started - CLI initiated
><189>32: 0.0.0.0: *Apr 29 13:59:12.491: %SYS-5-CONFIG_I: Configured from console by console
><189>32: foo: *Apr 29 13:58:46.411: %SYSMGR-STANDBY-3-SHUTDOWN_START: The System Manager has started the shutdown procedure.

**NOTE:** Not every Cisco log message conforms to this format. If you find a
message that the cisco-parser() cannot properly parse, [contact
Support](https://www.syslog-ng.com/support/), so we can improve the
parser.
{: .notice--info}

The syslog-ng OSE application normalizes the parsed log messages into
the following format:

>${MESSAGE}=%FAC-SEV-MNEMONIC: message  
>${HOST}=origin-id

By default, the Cisco-specific fields are extracted into the following
name-value pairs:\${.cisco.facility}, \${.cisco.severity},
\${.cisco.mnemonic}. You can change the prefix using the **prefix**
option.

**Declaration**

```config
@version: 3.38
@include "scl.conf"
log {
    source { udp(flags(no-parse)); };
    parser { cisco-parser(); };
    destination { ... };
};
```

Note that you have to disable message parsing in the source using the
**flags(no-parse)** option for the parser to work.

The cisco-parser() is actually a reusable configuration snippet
configured to parse Cisco messages. For details on using or writing such
configuration snippets, see [[Reusing configuration blocks]].
You can find the source of this configuration
snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/cisco/plugin.conf).

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-prefix.md %}
