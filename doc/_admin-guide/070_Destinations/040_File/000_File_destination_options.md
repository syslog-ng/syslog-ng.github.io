---
title: file() destination options
d_flags: 'no-multi-line, syslog-protocol, threaded'
id: adm-dest-file-opt
---

The file() driver outputs messages to the specified text file, or to a
set of files. The file() destination has the following options:

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** When
creating several thousands separate log files, syslog-ng Open Source Edition
(syslog-ng OSE) might not be able to open the required number of files.
This might happen for example, when using the \${HOST} macro in the
filename while receiving messages from a large number of hosts. To overcome
this problem, adjust the --fd-limit command-line parameter of syslog-ng OSE
or the global ulimit parameter of your host. For setting the --fd-limit
command-line parameter ofsyslog-ng OSE see the The syslog-ng manual page.
For setting the ulimit parameter of the host, see the documentation
of your operating system.
{: .notice--warning}

{% include doc/admin-guide/options/create-dirs.md %}

{% include doc/admin-guide/options/dir-options.md %}

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/destination-flags.md %}

- *threaded*: The threaded flag enables multithreading for the
    destination. For details on multithreading, see
    [[Multithreading and scaling in syslog-ng OSE]].

    **NOTE:** The file destination uses multiple threads only if the
    destination filename contains macros.
    {: .notice--info}

{% include doc/admin-guide/options/flush-lines.md %}

{% include doc/admin-guide/options/frac-digits.md %}

## fsync()

|  Type:|      yes or no|
  |Default:|   no|

*Description:* Forces an fsync() call on the destination fd after each
write.

**NOTE:** Enabling this option may seriously degrade performance.
{: .notice--info}

{% include doc/admin-guide/options/hook.md %}

## group()

|  Type:|      string|
  |Default:|   Use the global settings|

*Description:* Set the group of the created file to the one specified.
To preserve the original properties of an existing file, use the option
without specifying an attribute: group().

{% include doc/admin-guide/options/local-time-zone.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/mark-freq.md %}

{% include doc/admin-guide/options/mark-mode.md %}

## overwrite-if-older()

|  Type:|      number (seconds)|
  |Default:|   0|

*Description:* If set to a value higher than 0, syslog-ng OSE checks
when the file was last modified before starting to write into the file.
If the file is older than the specified amount of time (in seconds),
then syslog-ng removes the existing file and opens a new file with the
same name. In combination with for example, the \${WEEKDAY} macro, this
can be used for simple log rotation, in case not all history has to be
kept. (Note that in this weekly log rotation example if its Monday
00:01, then the file from last Monday is not seven days old, because it
was probably last modified shortly before 23:59 last Monday, so it is
actually not even six days old. So in this case, set the
overwrite-if-older() parameter to a-bit-less-than-six-days, for example,
to **518000** seconds.

## owner()

|  Type:|      string|
  |Default:|   Use the global settings|

*Description:* Set the owner of the created file to the one specified.
To preserve the original properties of an existing file, use the option
without specifying an attribute: owner().

{% include doc/admin-guide/options/pad-size.md %}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Hazard of data loss! If the size of the incoming message is larger
than the previously set pad-size() value, syslog-ng will truncate
the message to the specified size. Therefore, all message content
above that size will be lost.
{: .notice--danger}

{% include doc/admin-guide/options/perm.md %}

{% include doc/admin-guide/options/suppress.md %}

## symlink-as()

|  Type:|      Filename|
  |Default:|   N/A|

*Description:* The configured file name will be used as a symbolic link
to the last created file by file destination.

### Example: symlink-as()

An example when time-based macro is used:

```config
file("/var/log/cron.${YEAR}${MONTH}" symlink-as("/var/log/cron"));
```

In this case the /var/log/cron should point to the current month.

**NOTE:** The symlink uses the same permissions as the file destination.
{: .notice--info}

{% include doc/admin-guide/options/template-logformat.md %}

{% include doc/admin-guide/options/template-escape.md %}

{% include doc/admin-guide/options/time-reap.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/time-zone.md %}

{% include doc/admin-guide/options/ts-format.md %}
