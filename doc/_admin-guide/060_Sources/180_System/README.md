---
title: 'system: Collecting the system-specific log messages of a platform'
short_title: system
id: adm-src-system
description: >-
    Starting with version 3.2, syslog-ng OSE can automatically collect the
    system-specific log messages of the host on a number of platforms using
    the system() driver. If the system() driver is included in the
    syslog-ng OSE configuration file, syslog-ng OSE automatically adds the
    following sources to the syslog-ng OSE configuration.
---

**NOTE:** syslog-ng OSE versions 3.2-3.3 used an external script to generate
the system() source, but this was problematic in certain situations, for
example, when the host used a strict AppArmor profile. Therefore, the
system() source is now generated internally in syslog-ng OSE.
{: .notice--info}

The system() driver is also used in the default configuration file of
syslog-ng OSE. For details on the default configuration file, see
Example: The default configuration file of syslog-ng
OSE. Starting with syslog-ng OSE version 3.6, you can use the **system-expand**
command-line utility (which is a shell script, located in the
modules/system-source/ directory) to display the configuration that the
system() source will use.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
If syslog-ng OSE does not recognize the platform it is installed on, it does not
add any sources.
{: .notice--warning}

Starting with version 3.6, syslog-ng OSE parses messages complying with
the [Splunk Common Information Model(CIM)](http://docs.splunk.com/Documentation/CIM/latest/User/Overview)
and marked with @cim as JSON messages (for example, the ulogd from the
netfilter project can emit such messages). That way, you can forward
such messages without losing any information to CIM-aware applications
(for example, Splunk).

| Platform     | Message source                                       |
|---|---|
| AIX          |     unix-dgram("/dev/log");                          |
| FreeBSD      |     unix-dgram("/var/run/log");                      |
|              |     unix-dgram("/var/run/logpriv" perm(0600));       |
|              |     file("/dev/klog" follow-freq(0) program-override("kernel") flags(no-parse)); |
|              | For FreeBSD versions earlier than 9.1, follow-freq(1) is used.                              |
| GNU/kFreeBSD |     unix-dgram("/var/run/log");                      |
|              |     file("/dev/klog" follow-freq(0) program-override("kernel")); |
| HP-UX        |     pipe("/dev/log" pad-size(2048));                 |
| Linux        |     unix-dgram("/dev/log");                          |
|              |     file("/proc/kmsg" program-override("kernel") flags(kernel)); |
|              | Note that on Linux, the so-rcvbuf() option of the system() source is automatically set to 8192.        |
|              | If the host is running under systemd, syslog-ng OSE reads directly from the systemd journal file using the systemd-journal() source.                        |
|              | If the kernel of the host is version 3.5 or newer, and /dev/kmsg is seekable, syslog-ng OSE will use that instead of /proc/kmsg, using the multi-line-mode(indented), keep-timestamp(no), and the format(linux-kmsg)options.                      |
|              | If syslog-ng OSE is running in a jail or a Linux Container (LXC), it will not read from the /dev/kmsg or /proc/kmsg files.                                 |
| macOS        |     file("/var/log/system.log" follow-freq(1));      |
|              | **NOTE:** Starting with version 3.7, the syslog-ng OSE system() driver automatically extracts the msgid  from the message (if available), and stores it in the .solaris.msgid macro. To extract the msgid from the message without using the system()driver, use the **extract-solaris-msgid()** parser. You can find the exact source of this parser in the [syslog-ng OSE GitHub repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/solaris/plugin.conf).|
| NetBSD       |     unix-dgram("/var/run/log");                      |
|              | NOTE: Starting with version 3.7, the syslog-ng OSE system() driver automatically extracts the msgid  from the message (if available), and stores it in the .solaris.msgid macro. To extract the msgid from the message without using the system()driver, use the **extract-solaris-msgid()** parser. You can find the exact source of this parser in the [syslog-ng OSE GitHub repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/solaris/plugin.conf). |
| Solaris 8    |     sun-streams("/dev/log");                         |
|              | NOTE: Starting with version 3.7, the syslog-ng OSE system() driver automatically extracts the msgid  from the message (if available), and stores it in the .solaris.msgid macro. To extract the msgid from the message without using the system()driver, use the **extract-solaris-msgid()** parser. You can find the exact source of this parser in the [syslog-ng OSE GitHub repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/solaris/plugin.conf). |
| Solaris 9    | sun-streams("/dev/log" door("/etc/.syslog_door")); |
|              | NOTE: Starting with version 3.7, the syslog-ng OSE system() driver automatically extracts the msgid  from the message (if available), and stores it in the .solaris.msgid macro. To extract the msgid from the message without using the system()driver, use the **extract-solaris-msgid()** parser. You can find the exact source of this parser in the [syslog-ng OSE GitHub repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/solaris/plugin.conf). |
| Solaris 10   |  sun-streams("/dev/log" door("/var/run/syslog_door")); |
|              | NOTE: Starting with version 3.7, the syslog-ng OSE system() driver automatically extracts the msgid  from the message (if available), and stores it in the .solaris.msgid macro. To extract the msgid from the message without using the system()driver, use the **extract-solaris-msgid()** parser. You can find the exact source of this parser in the [syslog-ng OSE GitHub repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/solaris/plugin.conf). |
