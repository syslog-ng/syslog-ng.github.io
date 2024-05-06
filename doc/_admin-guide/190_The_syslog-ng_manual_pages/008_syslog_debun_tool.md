---
title: The syslog-debun manual page
app: syslog-debun
id: adm-man-debun
---

## Name

syslog-debun --- syslog-ng DEBUg buNdle generator

## Synopsis

syslog-debun \[options\]

## Description

{% include doc/admin-guide/manpages-intro.md %}

The syslog-debun tool collects and saves information about your
syslog-ng OSE installation, making troubleshooting easier, especially if
you ask help about your syslog-ng OSE related problem.

## General Options

- -r

    Run syslog-ng-debun. Using this option is required to actually
    execute the data collection with syslog-ng-debun. It is needed to
    prevent accidentally running syslog-ng-debun.

- -h

    Display the help page.

- -l

    Do not collect privacy-sensitive data, for example, process tree,
    fstab, and so on. If you use with -d, then the following parameters
    will be used for debug mode:-Fev

- -R \<directory\>

    The directory where syslog-ng PE is installed instead of
    /opt/syslog-ng.

- -W \<directory\>

    Set the working directory, where the debug bundle will be saved.
    Default value: /tmp. The name of the created file is
    syslog.debun.\${host}.\${date}.\${3-random-characters-or-pid}.tgz

## Debug mode options

- -d

    Start syslog-ng OSE in debug mode, using the -Fedv \--enable-core
    options.

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
    Using this option under high message load may increase disk I/O
    during the debug, and the resulting debug bundle can be huge. To exit debug
    mode, press Enter.
    {: .notice--warning}

- -D \<options\>

    Start syslog-ng OSE in debug mode, using the specified command-line
    options. To exit debug mode, press Enter.

- -t \<seconds\>

    Run syslog-ng OSE in noninteractive debug mode for \<seconds\>, and
    automatically exit debug mode after the specified number of seconds.

- -w \<seconds\>

    Wait \<seconds\> seconds before starting debug mode.

## System call tracing

- -s

    Enable syscall tracing (strace -f or truss -f). Note that using -s
    itself does not enable debug mode, only traces the system calls of
    an already running syslog-ng OSE process. To trace system calls in
    debug mode, use both the -s and -d options.

## Packet capture options

Capturing packets requires a packet capture tool on the host. The
syslog-debun tool attempts to use tcpdump on most platforms, except for
Solaris, where it uses snoop.

- -i \<interface\>

    Capture packets only on the specified interface, for example, eth0.

- -p

    Capture incoming packets using the following filter: port 514 or
    port 601 or port 53

- -P \<options\>

    Capture incoming packets using the specified filter.

- -t \<seconds\>

    Run syslog-ng OSE in noninteractive debug mode for \<seconds\>, and
    automatically exit debug mode after the specified number of seconds.

### Examples

```bash
syslog-ng-debun -r
```

Create a simple debug bundle, collecting information about your
environment, for example, list packages containing the word: syslog, ldd
of your syslog-binary, and so on.

```bash
syslog-ng-debun -r -l
```

Similar to syslog-ng-debun -r, but without privacy-sensitive
information. For example, the following is NOT collected: fstab, df
output, mount info, ip / network interface configuration, DNS resolv
info, and process tree.

```bash
syslog-ng-debun -r -d
```

Similar to syslog-ng-debun -r, but it also stops syslog-ng OSE, then
restarts it in debug mode (-Fedv \--enable-core). To stop debug mode,
press Enter. The output of the debug mode collected into a separate
file, and also added to the debug bundle.

```bash
syslog-ng-debun -r -s
```

Trace the system calls (using strace or truss) of an already running
syslog-ng OSE process.

```bash
syslog-ng-debun -r -d -s
```

Restart syslog-ng OSE in debug mode, and also trace the system calls
(using strace or truss) of the syslog-ng OSE process.

```bash
syslog-ng-debun -r -p
```

Run packet capture (pcap) with the filter: port 514 or port 601 or port
53 Also waits for pressing Enter, like debug mode.

```bash
syslog-ng-debun -r -p -t 10
```

Noninteractive debug mode: Similar to syslog-ng-debun -r -p, but
automatically exit after 10 seconds.

```bash
syslog-ng-debun -r -P "host 1.2.3.4"  -D "-Fev --enable-core"
```

Change the packet-capturing filter from the default to host 1.2.3.4.
Also change debugging parameters from the default to -Fev
\--enable-core. Since a timeout (-t) is not given, waits for pressing
Enter.

```bash
syslog-ng-debun -r -p -d -w 5 -t 10
```

Collect pcap and debug mode output following this scenario:

- Start packet capture with default parameters (-p)

- Wait 5 seconds (-w 5)

- Stop syslog-ng

- Start syslog-ng OSE in debug mode with default parameters (-d)

- Wait 10 seconds (-t 10)

- Stop syslog-ng OSE debuging

- Start syslog-ng OSE

- Stop packet capturing

## Files

/opt/syslog-ng/bin/loggen

{% include doc/admin-guide/manpages-footnote.md %}
