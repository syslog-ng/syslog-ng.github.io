---
title: The {{ site.product.short_name }} manual page
id: adm-man-syslogng
description: >-
    syslog-ng --- syslog-ng system logger application
---

## Synopsis

syslog-ng \[options\]

## Description

This manual page is only an abstract.

The {{ site.product.short_name }} application is a flexible and highly scalable system
logging application. Typically, {{ site.product.short_name }} is used to manage log
messages and implement centralized logging, where the aim is to collect
the log messages of several devices on a single, central log server. The
different devices - called {{ site.product.short_name }} clients - all run {{ site.product.short_name }},
and collect the log messages from the various applications, files, and
other sources. The clients send all important log messages to the remote
{{ site.product.short_name }} server, where the server sorts and stores them.

## Options

- \--caps

    Run {{ site.product.short_name }} process with the specified POSIX capability flags.

  - If the \--no-caps option is not set, {{ site.product.short_name }} has been
        compiled with the \--enable-linux-caps compile option, and the
        host supports CAP\_SYSLOG, {{ site.product.short_name }} uses the following
        capabilities: cap\_net\_bind\_service, cap\_net\_broadcast,
        cap\_net\_raw, cap\_dac\_read\_search, cap\_dac\_override,
        cap\_chown, cap\_fowner=p cap\_syslog=ep

  - If the \--no-caps option is not set, and the host does not
        support CAP\_SYSLOG, {{ site.product.short_name }} uses the following
        capabilities: cap\_net\_bind\_service, cap\_net\_broadcast,
        cap\_net\_raw, cap\_dac\_read\_search, cap\_dac\_override,
        cap\_chown, cap\_fowner=p cap\_sys\_admin=ep

    For example:

        /opt/syslog-ng/sbin/syslog-ng -Fv --caps cap_sys_admin,cap_chown,cap_dac_override,cap_net_bind_service,cap_fowner=pi

    Note that the capabilities are not case sensitive, the following
    command is also good: /opt/syslog-ng/sbin/syslog-ng -Fv \--caps
    CAP\_SYS\_ADMIN,CAP\_CHOWN,CAP\_DAC\_OVERRIDE,CAP\_NET\_BIND\_SERVICE,CAP\_FOWNER=pi

    For details on the capability flags, see the following man
    pages: \>cap\_from\_text(3) and \>capabilities(7)

- \--cfgfile \<file\> or -f \<file\>

    Use the specified configuration file.

- \--chroot \<dir\> or -C \<dir\>

    Change root to the specified directory. The configuration file is
    read after chrooting so, the configuration file must be available
    within the chroot. That way it is also possible to reload the
    {{ site.product.short_name }} configuration after chrooting. However, note that the
    \--user and \--groupoptions are resolved before chrooting.

- \--check-startup

    Available in {{ site.product.short_name }} 4.5 and later versions.

    This option can be used to perform a complete configuration initialization with {{ site.product.short_name }}, then exit with the exit code indicating the result. This option can also be used to check if the configuration is semantically valid and that {{ site.product.short_name }} can actually start. (The `--syntax-only` option catches only syntactical errors.)

    Furthermore, `--check-startup` can also be used in a Kubernetes environment, to run it as a dedicated configuration check container.

    **NOTE:** This option is higly likely to fail if another {{ site.product.short_name }} instance running in the background, since it initializes several processes, for example network listeners. In such a case the network address would already be in use.
    {: .notice--info}
    
- \--control \<file\> or -c\<file\>

    Set the location of the {{ site.product.short_name }} control socket. Default
    value: \>/var/run/syslog-ng.ctl

- \--debug or -d

    Start {{ site.product.short_name }} in debug mode.

- \--default-modules

    A comma-separated list of the modules that are loaded automatically.
    Modules not loaded automatically can be loaded by including the
    @module \<modulename\> statement in the {{ site.product.short_name }} configuration
    file. Available only in {{ site.product.short_name }} version 4.1 and later.

- \--enable-core

    Enable {{ site.product.short_name }} to write core files in case of a crash to help
    support and debugging.

- \--fd-limit \<number\>

    Set the minimal number of required file descriptors (fd-s). This
    sets how many files {{ site.product.short_name }} can keep open simultaneously. Default
    value: 4096. Note that this does not override the global ulimit
    setting of the host.

- \--foreground or -F

    Do not daemonize, run in the foreground. When running in the
    foreground, {{ site.product.short_name }} starts from the current directory (${CWD})
    so it can create core files (normally, {{ site.product.short_name }} starts
    from \>${PREFIX}/var).

- \--group \<group\> or -g \<group\>

    Switch to the specified group after initializing the configuration
    file.

- \--help or -h

    Display a brief help message.

- \--module-registry

    Display the list and description of the available modules. Note that
    not all of these modules are loaded automatically, only the ones
    specified in the \--default-modules option. Available only in
    {{ site.product.short_name }} 4 F1 and later.

- \--no-caps

    Run {{ site.product.short_name }} as root, without capability-support. This is the
    default behavior. On Linux, it is possible to run {{ site.product.short_name }} as
    non-root with capability-support if {{ site.product.short_name }} was compiled with
    the \--enable-linux-caps option enabled. (Run syslog-ng \--version
    to display the list of enabled build parameters.)

    To run {{ site.product.short_name }} with specific capabilities, use the \--caps
    option.

- \--persist-file \<persist-file\> or -R \<persist-file\>

    Set the path and name of the \>syslog-ng.persist file where the
    persistent options and data are stored.

- \--pidfile \<pidfile\> or -p \<pidfile\>

    Set path to the `PID` file where the pid of the main process is
    stored.

- \--preprocess-into \<output-file\>

    After processing the configuration file and resolving included files
    and variables, write the resulting configuration into the specified
    output file. Available only in {{ site.product.short_name }} 4 F1 and later.

- \--process-mode \<mode\>

    Sets how to run {{ site.product.short_name }}: in the foreground (mainly used for
    debugging), in the background as a daemon, or in safe-background
    mode. By default, {{ site.product.short_name }} runs in safe-background mode. This mode
    creates a supervisor process called supervising {{ site.product.short_name }}, that
    restarts {{ site.product.short_name }} if it crashes.

- \--stderr or -e

    Log internal messages of {{ site.product.short_name }} to stderr. Mainly used for
    debugging purposes in conjunction with the \--foreground option. If
    not specified, {{ site.product.short_name }} will log such messages to its internal
    source.

- \--syntax-only or -s

    Verify that the configuration file is syntactically correct and
    exit.

- \--user \<user\> or -u \<user\>

    Switch to the specified user after initializing the configuration
    file (and optionally chrooting). Note that it is not possible to
    reload the {{ site.product.short_name }} configuration if the specified user has no
    privilege to create the \>/dev/log file.

- \--verbose or -v

    Enable verbose logging used to troubleshoot {{ site.product.short_name }}.

- \--version or -V

    Display version number and compilation information, and also the
    list and short description of the available modules. For detailed
    description of the available modules, see the \--module-registry
    option. Note that not all of these modules are loaded automatically,
    only the ones specified in the \--default-modulesoption.

- \--worker-threads

    Sets the number of worker threads {{ site.product.short_name }} can use, including
    the main {{ site.product.short_name }} thread. Note that certain operations in
    {{ site.product.short_name }} can use threads that are not limited by this option.
    This setting has effect only when {{ site.product.short_name }} is running in
    multithreaded mode. Available only in {{ site.product.short_name }} 4 F1 and later.
    See The {{ site.product.short_name }} 7 Administrator Guide for details.

## Files

/opt/syslog-ng/

/opt/syslog-ng/etc/syslog-ng.conf

{% include doc/admin-guide/manpages-footnote.md %}
