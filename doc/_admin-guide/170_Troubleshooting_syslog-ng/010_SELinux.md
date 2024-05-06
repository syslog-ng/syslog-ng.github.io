---
title: SELinux prevents syslog-ng OSE from using the execmem access on a process
short_title: Using execmem prevented by SELinux
id: adm-debug-selinux
---

If you are using a recent enough PCRE library, syslog-ng OSE will
automatically use the JIT of the regexp engine, which will result in a
similar error:

>setroubleshoot [21631 ] : SELinux is preventing <syslog-ng path> from using the execmem access on a process. (...)
>python [21631 ] : SELinux is preventing <syslog-ng path> from using the execmem access on a process.

To resolve this issue, switch off the PCRE JIT compile function by using
the `disable-jit`
option in the given filter or rewrite rule of your configuration.
