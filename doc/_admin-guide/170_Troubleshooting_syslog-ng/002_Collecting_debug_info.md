---
title: Collecting debugging information with strace, truss, or tusc
short_title: Collecting debugging info
id: adm-debug-info
description: >-
    To properly troubleshoot certain situations, it can be useful to trace
    which system calls {{ site.product.short_name }} performs. How this is performed depends
    on the platform running {{ site.product.short_name }}.
---

In general, note the following points:

- When {{ site.product.short_name }} is started, a supervisor process might stay in
    the foreground, while the actual {{ site.product.short_name }} daemon goes to the
    background. Always trace the background process.

- Apart from the system calls, the time between two system calls can
    be important as well. Make sure that your tracing tool records the
    time information as well. For details on how to do that, refer to
    the manual page of your specific tool (for example, strace on Linux,
    or truss on Solaris and BSD).

- Run your tracing tool in verbose mode, and if possible, set it to
    print long output strings, so the messages are not truncated.

- When using strace, also record the output of lsof to see which files
    are accessed.

The following are examples for tracing system calls of {{ site.product.short_name }} on some
platforms. The output is saved into the /tmp/syslog-ng-trace.txt file,
sufficed with the PID of the related {{ site.product.short_name }} process.The path of the
{{ site.product.short_name }} binary may be different for your installation, as
distribution-specific packages may use different paths.

- *Linux*

    ```bash
    strace -o /tmp/trace.txt -s256 -ff -ttT /opt/syslog-ng/sbin/syslog-ng -f /opt/syslog-ng/etc/syslog-ng.conf -Fdv
    ```

- *HP-UX*

    ```bash
    tusc -f -o /tmp/syslog-ng-trace.txt -T /opt/syslog-ng/sbin/syslog-ng
    ```

- *IBM AIX and Solaris*

    ```bash
    truss -f -o /tmp/syslog-ng-trace.txt -r all -w all -u libc:: /opt/syslog-ng/sbin/syslog-ng -d -d -d
    ```

**TIP:** To execute these commands on an already running {{ site.product.short_name }}
process, use the **-p \<pid\_of\_syslog-ng\>** parameter.
{: .notice--info}
