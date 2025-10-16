---
title: 'file: Storing messages in plain-text files'
short_title: file
id: adm-dest-file
description: >-
    The file driver is one of the most important destination drivers in
    syslog-ng. It allows to output messages to the specified text file, or
    to a set of files.
---

The destination filename may include macros which get expanded when the
message is written, thus a simple file() driver may create several
files: for example, {{ site.product.short_name }} can store the messages of client hosts
in a separate file for each host. For more information on available
macros see Macros of {{ site.product.short_name }}.  
If the expanded filename refers to a directory which does not exist, it
will be created depending on the create-dirs() setting (both global and
a per destination option).

The file() has a single required parameter that specifies the filename
that stores the log messages. For the list of available optional
parameters, see file() destination options.

**Declaration**

```config
file(filename options());
```

### Example: Using the file() driver

```config
destination d_file { file("/var/log/messages"); };
```

### Example: Using the file() driver with macros in the file name and a template for the message

```config
destination d_file {
    file("/var/log/${YEAR}.${MONTH}.${DAY}/messages"
            template("${HOUR}:${MIN}:${SEC} ${TZ} ${HOST} [${LEVEL}] ${MESSAGE}\n")
            template-escape(no));
};
```

**NOTE:** When using this destination, update the configuration of your log
rotation program to rotate these files. Otherwise, the log files can
become very large. See [[Configuring log rotation]] for available options.
{: .notice--info}

Also, after rotating the log files, reload {{ site.product.short_name }} using the
syslog-ng-ctl reload command, or use another method to send a SIGHUP to
{{ site.product.short_name }}.
{: .notice--info}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Since the state of each created file must be tracked by {{ site.product.short_name }}, it consumes
some memory for each file. If no new messages are written to a file within 60
seconds (controlled by the time-reap() global option), it is closed, and its
state is freed. Exploiting this, a DoS attack can be mounted against the system.
If the number of possible destination files and its needed memory is more than
the amount available on the {{ site.product.short_name }} server. The most suspicious macro is
${PROGRAM}, where the number of possible variations is rather high.
Do not use the ${PROGRAM} macro in insecure environments.
{: .notice--warning}
