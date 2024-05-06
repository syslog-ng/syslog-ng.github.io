---
title: systemd-journal() source options
facility_default: 'local0'
priority_default: 'notice'
src: 'systemd-journal()'
id: adm-src-systemd-journal-opt
---

The systemd-journal() driver has the following options:

{% include doc/admin-guide/options/default-facility.md %}

{% include doc/admin-guide/options/default-priority.md %}

## default-level()

|Type:      |string|
|Default:   |notice|

*Description:* The default level value if the PRIORITY entry does not
exist.

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host-override.md %}

{% include doc/admin-guide/options/keep-hostname.md %}

## match-boot()

|  Type:  |    `yes`, `no`|
|  Default: |  `no`|

This option is available in syslog-ng OSE 4.1 and later versions.

*Description:* If this option is set to `yes`, syslog-ng OSE fetches only which relate to the current boot. Every message generated in the previous boot is ignored.

## matches()

|  Type:  |    string|
|  Default: |  |

This option is available in syslog-ng OSE 4.1 and later versions.

*Description:* This option specifies one or more filters to be applied on the journal fields. This options application is similar to `journalctl`.

### Example:

```config
matches(
    "_COMM" => "systemd"
    )
```

## max-field-size()

|  Type:  |    number (characters)|
|  Default: |  65536|

*Description:* The maximum length of a field's value.

## namespace()

|  Type:    |  string|
|  Default: |  "*" |

*Description:* The namespace() option works exactly the same way as [the
respective option of the Journalctl command line tool](https://www.freedesktop.org/software/systemd/man/journalctl.html#--namespace=NAMESPACE).

The following modes of operation are available:

- If you do not specify the namespace() option in your configuration,
    or if you specify an empty string, the systemd-journal() source
    reads and displays log data from all namespaces.

- If you specify the namespace() option as namespace("*"), the
    systemd-journal() source reads and displays log data from all
    namespaces, interleaved.

- If `namespace(<specified-namespace>)` is specified, the
    systemd-journal() source only reads and displays log data from the
    specified namespace.

- If the namespace identifier is prefixed with "+" when you specify
    your namespace() option, the systemd-journal()source only reads and
    displays log data from the specified namespace and the default
    namespace, interleaved.

*Syntax:* `namespace(string)`

**NOTE:** Starting with syslog-ng OSE version 4.4, multiple systemd-journal()
sources can be configured. When configuring multiple sources, each systemd
namespace must be unique.
{: .notice--info}

### Example: configuration examples for using the namespace() option

The following configuration example uses the default value for the
namespace() option:

```config
source s_journal
{ 
  systemd-journal(namespace("*"));
};
```

The following configuration example uses a prefixed namespace identifier
in the namespace() option:

```config
source s_journal
{ 
  systemd-journal(namespace("+foobar"));
};
```

**NOTE:** Namespace support was introduced to the Journalctl command line
tool in Systemd version 2.45. The syslog-ng OSE application supports the
namespace() option from version 3.29. For further information about
namespaces on the Systemd side, see [Journal
Namespaces](<https://www.freedesktop.org/software/systemd/man/systemd-journald.service.html#Journal> Namespaces).
{: .notice--info}

## prefix()

|  Type: |     string|
|  Default: |  .journald.|

*Description:* If this option is set, every non-built-in mapped names
get a prefix (for example: ".SDATA.journald."). By default, syslog-ng
OSE adds the .journald. prefix to every value.

## read-old-records()

|  Accepted values:|  yes \| no|
|Default:|   yes|

*Description:* If set to **yes**, syslog-ng OSE will start reading the
records from the beginning of the journal, if the journal has not been
read yet. If set to **no**, syslog-ng OSE will read only the new
records. If the source has a state in the persist file, this option will
have no effect.

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/use-fqdn.md %}
