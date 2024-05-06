---
title: Managing and checking syslog-ng OSE service on Linux
id: adm-qs-service
description: >-
    This section describes how to start, stop and check the status of
    syslog-ng Open Source Edition (syslog-ng OSE) service on Linux.
---

## Starting syslog-ng OSE

To start syslog-ng OSE, execute the following command as root.

```bash
systemctl start syslog-ng
```

If the service starts successfully, no output will be displayed.

The following message indicates that syslog-ng OSE can not start (see
[[Checking syslog-ng OSE status]]):

Job for syslog-ng.service failed because the control process exited with
error code. See **systemctl status syslog-ng.service** and **journalctl
-xe** for details.

## Stopping syslog-ng OSE

To stop syslog-ng OSE

1. Execute the following command as root.

    ```bash
    systemctl stop syslog-ng
    ```

2. Check the status of syslog-ng OSE service (see [[Checking syslog-ng OSE status]]).

## Restarting syslog-ng OSE

To restart syslog-ng OSE, execute the following command as root.

```bash
systemctl restart syslog-ng
```

## Reloading configuration file without restarting syslog-ng OSE

To reload the configuration file without restarting syslog-ng OSE,
execute the following command as root.

```bash
systemctl reload syslog-ng
```

## Checking syslog-ng OSE status

To check the following status-related components, observe the
suggestions below.

### Checking the status of syslog-ng OSE service

To check the status of syslog-ng OSE service

1. Execute the following command as root.

    ```bash
    systemctl --no-pager status syslog-ng
    ```

2. Check the Active: field, which shows the status of syslog-ng OSE service. The following statuses are possible:

- **active (running)** - syslog-ng OSE service is up and running

    Example: syslog-ng OSE service active  

    > syslog-ng.service - System Logger Daemon  
    > Loaded: loaded (/lib/systemd/system/syslog-ng.service; enabled; vendor preset: enabled)  
    > Active: active (running) since Tue 2019-06-25 08:58:09 CEST; 5s ago  
    > Main PID: 6575 (syslog-ng)  
    > Tasks: 3  
    > Memory: 13.3M  
    > CPU: 268ms  
    > CGroup: /system.slice/syslog-ng.service  
    > 6575 /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core  

- **inactive (dead)** - syslog-ng service is stopped

    Example: syslog-ng OSE status inactive

    > syslog-ng.service - System Logger Daemon  
    > Loaded: loaded (/lib/systemd/system/syslog-ng.service; enabled; vendor preset: enabled)  
    > Active: inactive (dead) since Tue 2019-06-25 09:14:16 CEST; 2min 18s ago  
    > Process: 6575 ExecStart=/opt/syslog-ng/sbin/syslog-ng -F --no-caps --enable-core $SYSLOGNG_OPTIONS(code=exited, status=0/SUCCESS)  
    > Main PID: 6575 (code=exited, status=0/SUCCESS)  
    > Status: "Shutting down... Tue Jun 25 09:14:16 2019"  
    > Jun 25 09:14:31 as-syslog-srv systemd: Stopped System Logger Daemon.

### Checking the process of syslog-ng OSE

To check the process of syslog-ng OSE, execute one of the following commands.

```bash
ps u `pidof syslog-ng`
```

Expected output example:

> USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
>  
> syslogng 6709 0.0 0.6 308680 13432 ? Ss 09:17 0:00  
> /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core

```bash
ps axu | grep syslog-ng | grep -v grep
```

Expected output example:

> syslogng 6709 0.0 0.6 308680 13432 ? Ss 09:17 0:00  
> /opt/syslog-ng/libexec/syslog-ng -F --no-caps --enable-core

### Checking the internal logs of syslog-ng OSE**

The internal logs of syslog-ng OSE contains informal, warning and error messages.

By default, syslog-ng OSE log messages (generated on the internal() source) are written to **/var/log/messages**.

Check the internal logs of syslog-ng OSE for any issue.

### Message processing

The syslog-ng OSE application collects statistics about the number of processed messages on the different sources and destinations.

**NOTE:** When using syslog-ng-ctl stats, consider that while the output
is generally consistent, there is no explicit ordering behind the
command. Consequently, One Identity does not recommend creating
parsers that depend on a fix output order.
{: .notice--info}

If needed, you can sort the output with an external application, for
example, `| sort`.

### Central statistics

To check the central statistics, execute the following command to see the number of received and queued (sent) messages by syslog-ng OSE.

```bash
watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^center"
```

The output will be updated in every 2 seconds.

If the numbers are changing, syslog-ng OSE is processing the messages.

Example: output example

> Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep  
> ^center       Tue Jun 25 10:33:25 2019  
> center;;queued;a;processed;112  
> center;;received;a;processed;28  

### Source statistics

To check the source statistics, execute the following command to see the number of received messages on the configured sources.

```bash
watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^source"
```

The output will be updated in every 2 seconds.

If the numbers are changing, syslog-ng OSE is receiving messages on the sources.

Example: output example

> Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep  
> ^source      Tue Jun 25 10:40:50 2019  
> source;s_null;;a;processed;0  
> source;s_net;;a;processed;0  
> source;s_local;;a;processed;90  

### Destination statistics

To check the source statistics, execute the following command to see the number of received messages on the configured sources.

```bash
watch "/opt/syslog-ng/sbin/syslog-ng-ctl stats | grep ^destination"
```

The output will be updated in every 2 seconds.

If the numbers are changing, syslog-ng OSE is receiving messages on the sources.

Example: output example

> Every 2.0s: /opt/syslog-ng/sbin/syslog-ng-ctl stats | grep  
> ^destination      Tue Jun 25 10:41:02 2019  
> destination;d_logserver2;;a;processed;90  
> destination;d_messages;;a;processed;180  
> destination;d_logserver;;a;processed;90  
> destination;d_null;;a;processed;0  

**NOTE:** If you find error messages in the internal logs, messages are not
processed by syslog-ng OSE or you encounter any issue, you have the
following options:
{: .notice--info}

- Search for the error or issue in our [knowledge base](https://support.oneidentity.com/syslog-ng-premium-edition/kb).
- Check the [following knowledge base articles](https://support.oneidentity.com/syslog-ng-premium-edition/kb?k=troubleshooting&r=Topic%3ATroubleshooting) for further troubleshooting.
- [Open a support service request](https://support.oneidentity.com/) including the results.
