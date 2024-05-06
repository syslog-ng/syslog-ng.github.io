---
title: Global options
log_msg_size_default: '65536'
flush_lines: '100'
log_fifo_size: '10000'
dir_group: 'root'
dir_owner: 'root'
dir_perm: '-1'
on_error: 'drop-message'
id: adm-global-opt
---


The following options can be specified in the options statement, as
described in Global options of syslog-ng OSE.  

## bad-hostname()

|  Accepted values:|   regular expression|
  |Default:|           no|

*Description:* A regexp containing hostnames which should not be handled
as hostnames.

## chain-hostnames()

|  Accepted values:|   yes \| no|
  |Default:|           no|

*Description:* Enable or disable the chained hostname format. If a
client sends the log message directly to the syslog-ng OSE server, the
chain-hostnames() option is enabled on the server, and the client sends
a hostname in the message that is different from its DNS hostname (as
resolved from DNS by the syslog-ng OSE server), then the server can
append the resolved hostname to the hostname in the message (separated
with a / character) when the message is written to the destination.

For example, consider a client-server scenario with the following
hostnames: client-hostname-from-the-message,
client-hostname-resolved-on-the-server, server-hostname. The hostname of
the log message written to the destination depends on the
keep-hostname() and the chain-hostnames() options. How keep-hostname()
and chain-hostnames() options are related is described in the following
table.

<table border>
    <tr>
        <td colspan=2 rowspan=2/>
        <td colspan=4><b>keep-hostname() setting on the server</b></td>
    </tr>
    <tr>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr>
        <td rowspan=2>chain-hostnames() setting on the server</td>
        <td>yes</td>
        <td>client-hostname-from-the-message</td>
        <td>client-hostname-from-the-message/client-hostname-resolved-on-the-server</td>
    </tr>
    <tr>
            <td>no</td>
            <td>client-hostname-from-the-message</td>
            <td>client-hostname-resolved-on-the-server</td>
    </tr>
</table>

If the log message is forwarded to the syslog-ng OSE server via a
syslog-ng OSE relay, the hostname depends on the settings of the
keep-hostname() and the chain-hostnames() options both on the syslog-ng
OSE relay and the syslog-ng OSE server.

For example, consider a client-relay-server scenario with the following
hostnames: client-hostname-from-the-message,
client-hostname-resolved-on-the-relay,
client-hostname-resolved-on-the-server,
relay-hostname-resolved-on-the-server. How keep-hostname() and
chain-hostnames() options are related is described in the following
table.

<table border>
    <tr>
        <td colspan=4 rowspan=4/>
        <td colspan=4><b>chain-hostnames() setting on the server</b></td>
    </tr>
    <tr>
        <td colspan=2>yes</td>
        <td colspan=2>no</td>
    </tr>
    <tr>
        <td colspan=2>keep-hostname() setting on the server</td>
        <td colspan=2>keep-hostname() setting on the server</td>
    </tr>
    <tr>
        <td>yes</td>
        <td>no</td>
        <td>yes</td>
        <td>no</td>
    </tr>
    <tr valign=top>
        <td rowspan=4>chain-hostnames() setting on the relay</td>
        <td rowspan=2>yes</td>
        <td rowspan=2>keep-hostname() setting on the relay</td>
        <td>yes</td>
        <td>client-hostname-from-the-message</td>
        <td>client-hostname-from-the-message / relay-hostname-resolved-on-the-server</td>
        <td>client-hostname-from-the-message</td>
        <td rowspan=4>relay-hostname-resolved-on-the-server</td>
    </tr>
    <tr valign=top>
        <td>no</td>
        <td>client-hostname-from-the-message-client / relay-hostname-resolved-on-the-relay</td>
        <td>client-hostname-from-the-message-client / relay-hostname-resolved-on-the-relay / relay-hostname-resolved-on-the-server</td>
        <td>client-hostname-from-the-message-client / relay-hostname-resolved-on-the-relay</td>
    </tr>
    <tr valign=top>
        <td rowspan=2>no</td>
        <td rowspan=2>keep-hostname() setting on the relay</td>
        <td>yes</td>
        <td>client-hostname-from-the-message</td>
        <td>client-hostname-from-the-message / relay-hostname-resolved-on-the-server</td>
        <td>client-hostname-from-the-message</td>
    </tr>
    <tr valign=top>
        <td>no</td>
        <td>client-hostname-resolved-on-the-relay</td>
        <td>client-hostname-resolved-on-the-relay / relay-hostname-resolved-on-the-server</td>
        <td>client-hostname-resolved-on-the-relay</td>
    </tr>
</table>

The chain-hostnames() option can interfere with the way syslog-ng OSE
counts the log source hosts. As a result, syslog-ng OSE falsely
perceives several hosts logging to the central server, especially if the
clients sends a hostname in the message that is different from its real
hostname (as resolved from DNS). Disable the **chain-hostnames()**
option on your log sources to avoid any problems related to license
counting.

## check-hostname()

|  Accepted values:|   yes \| no|
|Default:|           no|

*Description:* Enable or disable checking whether the hostname contains
valid characters.

{% include doc/admin-guide/options/create-dirs.md %}

## custom-domain()

**NOTE:** This global option works only if the use-fqdn() global option is set to yes.
{: .notice--info}

|Accepted values:|   string|
|Default:         |  empty string|

*Description:* Use this option to specify a custom domain name that is
appended after the short hostname to receive the fully qualified domain
name (FQDN). This option affects every outgoing message: eventlog
sources, file sources, MARK messages and internal messages of syslog-ng
OSE.

- If the hostname is a short hostname, the custom domain name is
    appended after the hostname (for example, mypc becomes
    mypc.customcompany.local).

- If the hostname is an FQDN, the domain name part is replaced with
    the custom domain name (for example, if the FQDN in the forwarded
    message is mypc.mycompany.local and the custom domain name is
    customcompany.local, the hostname in the outgoing message becomes
    mypc.customcompany.local).

{% include doc/admin-guide/options/dir-options.md %}

## dns-cache()

|  Accepted values:|   yes \| no|
|Default:|           yes|

*Description:* Enable or disable DNS cache usage.

**NOTE:** This option has no effect if the keep-hostname() option is enabled
(keep-hostname(yes)) and the message contains a hostname.
{: .notice--info}

## dns-cache-expire()

|  Accepted values:|   number|
|Default:|           3600|

*Description:* Number of seconds while a successful lookup is cached.

## dns-cache-expire-failed()

|  Accepted values:|   number|
  |Default:|           60|

*Description:* Number of seconds while a failed lookup is cached.

## dns-cache-hosts()

|  Accepted values:|   filename|
|Default:|           unset|

*Description:* Name of a file in /etc/hosts format that contains static
IP-\>hostname mappings. Use this option to resolve hostnames locally
without using a DNS. Note that any change to this file triggers a reload
in syslog-ng and is instantaneous.

## dns-cache-size()

|  Accepted values:|   number of hostnames|
|Default:|           1007|

*Description:* Number of hostnames in the DNS cache.

## file-template()

|  Accepted values:|   string|
|Default:|           |

*Description:* Specifies a template that file-like destinations use by
default. For example:

```config
template t_isostamp { template("$ISODATE $HOST $MSGHDR$MSG\n"); };
options { file-template(t_isostamp); };
```

{% include doc/admin-guide/options/flush-lines.md %}

{% include doc/admin-guide/options/frac-digits.md %}

## group()

|  Accepted values:|   groupid|
|Default:|           root|

*Description:* The default group of output files. By default, syslog-ng
changes the privileges of accessed files (for example, /dev/null) to
**root.root 0600**. To disable modifying privileges, use this option
with the **-1** value.

{% include doc/admin-guide/options/jvm-options.md %}

{% include doc/admin-guide/options/keep-hostname.md %}

{% include doc/admin-guide/options/keep-timestamp.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

## log-level()

|  Accepted values:|   default, verbose, debug, trace|
|Default:|           default|

This option is available in syslog-ng OSE version 4.0 and later versions.

*Description:* Controls the own internal log level of syslog-ng OSE. Corresponds to setting the internal log level using syslog-ng-ctl or the command line options of syslog-ng (the -d, -v, and -t ). Setting the log level in the configuration makes it easier to control logging in containerized environments where changing command line options is more problematic.

Higher log-levels automatically include messages from lower log-levels:

- default: Normal log messages.

- verbose: Normal and verbose log messages.

- debug: Include debug messages of syslog-ng OSE.

- trace: Include trace messages of how messages are processed.

**Example:**

```options {
    log-level(debug);
};```

{% include doc/admin-guide/options/log-msg-size.md %}

## mark() (DEPRECATED)

|  Accepted values:|   number|
  |Default:|           1200|

*Description:* The mark-freq() option is an alias for the deprecated
mark() option. This is retained for compatibility with syslog-ng version
1.6.x.

{% include doc/admin-guide/options/mark-freq.md %}

{% include doc/admin-guide/options/mark-mode.md %}

{% include doc/admin-guide/options/source-normalize-hostnames.md %}

{% include doc/admin-guide/options/on-error.md %}

## owner()

|  Accepted values:|   userid|
|Default:|           root|

*Description:* The default owner of output files. If set, syslog-ng
changes the owner of accessed files (for example, /dev/null) to this
value, and the permissions to the value set in the perm() option.

Starting with version 3.16, the default value of this option is -1, so
syslog-ng OSE does not change the ownership, unless explicitly
configured to do so.

## pass-unix-credentials()

|  Accepted values:|   yes \| no|
|Default:|           yes|

*Description:* Enable syslog-ng OSE to collect UNIX credential
information (that is, the PID, user ID, and group of the sender process)
for messages received using UNIX domain sockets. Available only in
syslog-ng Open Source Edition 3.7 and later. Note that collecting UNIX
credential information from sockets in high-traffic environments can be
resource intensive, therefore pass-unix-credentials() can be disabled
globally, or separately for each source.

{% include doc/admin-guide/options/perm.md %}

## proto-template()

|  Accepted values:|   name of a template|
|Default:|           The default message format of the used protocol|

*Description:* Specifies a template that protocol-like destinations (for
example, network() and syslog()) use by default. For example:

```config
template t_isostamp { template("$ISODATE $HOST $MSGHDR$MSG\n"); };
options { proto-template(t_isostamp); };
```

## recv-time-zone()

|  Accepted values:|   name of the timezone, or the timezone offset|
  |Default:|           local timezone|

*Description:* Specifies the time zone associated with the incoming
messages, if not specified otherwise in the message or in the source
driver.  

{% include doc/admin-guide/examples/timezone.md %}

{% include doc/admin-guide/options/send-time-zone.md %}

## stats()

Available in syslog-ng OSE 4.1 and later versions.

*Description:* The stats() option is an aggregated collection of statistic-related sub-options.

**Example:**

```config
options {
    stats(
        freq(1)
        level(1)
        lifetime(1000)
        max-dynamics(10000)
        syslog-stats(yes)
    );
};
```

The following sub-options are available within the stats() option:

- freq()

|  Accepted values:|   number|
|Default:|           600|

- level()

|  Accepted values:|   0, 1, 2, 3|
|Default:|           0|

*Description:* Specifies the detail of statistics syslog-ng collects about the processed messages.

- Level 0 collects only statistics about the sources and destinations.

- Level 1 contains details about the different connections and log files, but has a slight memory overhead.

- Level 2 contains detailed statistics based on the hostname.

- Level 3 contains detailed statistics based on various message parameters like facility, severity, or tags.

**NOTE:** Level 2 and 3 increase the memory requirements and CPU load. For details on message statistics, see [[Statistics of syslog-ng]].

- max-dynamics()

|  Accepted values:|   number|
|Default:|           N/A|

*Description:* To avoid performance issues or even overloading syslog-ng OSE (for example, if a script starts to send logs from different IP addresses to syslog-ng OSE), you might want to limit the number of registered dynamic counters in the message statistics. For details on message statistics, see [[Statistics of syslog-ng]].

- **Unlimited dynamic counters:**

    If this option is not used, dynamic counters are not limited. This can be useful in cases where you are extremely interested in dynamic counters, and use these statistics extensively.

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** In some cases, there might be even millions of dynamic counters.

- **Limited dynamic counter clusters:**

    To limit dynamic counters, enter a number, and only a maximum of <number> counters will be registered in the statistics.

    In practice, this means dynamic counter clusters. A program name produces one dynamic counter cluster, that can include several counters, such as processed, stamp, and so on.

    **Example: Limiting dynamic counter clusters 1:**

    If stats-max-dynamics() is set to 1, and 2 programs send messages, only one of these programs will be tracked in the dynamic counters, but it will have more than one counters.


    **Example: Limiting dynamic counter clusters 2:**

    If you have 500 clients, and set stats-max-dynamics() to 1000, you will have enough number of counters reserved for these clients, but at the same time, you limit the use of your resources and therefore protect your system from being overloaded.

- **No dynamic counters:**

    To disable dynamic counters completely, set the value of this option to 0. This is the recommended value if  statistics are not used, or if dynamic counters are irrelevant (for example, the number of logs arriving from programs).

**NOTE:** If a lower value is set to stats-max-dynamics() (or, any limiting value, if this option has not been configured before) and syslog-ng OSE is restarted, the changes are only applied after stats-freq() time has passed. That is, the previously allocated dynamic clusters are only removed after this time.

## syslog-stats()

|  Accepted values:|   yes, no, auto|
|Default:|           auto|

Available in syslog-ng OSE 4.1 and later versions.

*Description:* Configures the behavior of counting messages based on different syslog fields, like SEVERITY, FACILITY, ${HOST}.

Possible values:

- yes: Enable syslog stats.

- no: Disable syslog stats.

- auto: Use the settings of the stats-level() option.

## stats-freq() (DEPRECATED)

This is a deprecated legacy option. Use the stats() option.

## stats-level() (DEPRECATED)

This is a deprecated legacy option. Use the stats() option.

## stats-max-dynamics() (DEPRECATED)

This is a deprecated legacy option. Use the stats() option.

## sync() or sync-freq() (DEPRECATED)

This is a deprecated legacy option. Use the stats() option.

## threaded()

|  Accepted values:|   yes\|no|
  |Default:|           yes|

*Description:* Enable syslog-ng OSE to run in multithreaded mode and use
multiple CPUs. Available only in syslog-ng Open Source Edition 3.3 and
later. Note that setting **threaded(no)** does not mean that syslog-ng
OSE will use only a single thread. For details, see
[[Multithreading and scaling in syslog-ng OSE]].

{% include doc/admin-guide/options/time-reap.md %}

{% include doc/admin-guide/options/time-reopen.md %}

## time-sleep() (DEPRECATED)

|  Accepted values:|   number|
  |Default:|           0|

*Description:* The time to wait in milliseconds between each invocation
of the poll() iteration.

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/trim-large-messages.md %}

{% include doc/admin-guide/options/ts-format.md %}

{% include doc/admin-guide/options/use-dns.md %}

{% include doc/admin-guide/options/use-fqdn.md %}

## use-rcptid()

|  Accepted values:|   yes \| no|
|Default:|           no|

*Description:* When the use-rcptid global option is set to **yes**,
syslog-ng OSE automatically assigns a unique reception ID to every
received message. You can access this ID and use it in templates via the
\${RCPTID} macro. The reception ID is a monotonously increasing 48-bit
integer number, that can never be zero (if the counter overflows, it
restarts with 1).

## use-uniqid()

|  Accepted values:|   yes \| no|
|Default:|           no|

*Description:* This option enables generating a globally unique ID. It
is generated from the HOSTID and the RCPTID in the format of
HOSTID@RCPTID. It has a fixed length: 16+@+8 characters. You can
include the unique ID in the message by using the macro. For details,
see UNIQID.

Enabling this option automatically generates the HOSTID. The HOSTID is a
persistent, 32-bits-long cryptographically secure pseudo random number,
that belongs to the host that the syslog-ng is running on. If the
persist file is damaged, the HOSTID might change.

Enabling this option automatically enables the RCPTID functionality. For
details, see RCPTID
