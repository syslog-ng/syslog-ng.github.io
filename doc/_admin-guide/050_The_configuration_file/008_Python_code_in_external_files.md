---
title: Python code in external files
id: adm-conf-python
description: >-
    You can extend and customize syslog-ng OSE easily by writing destinations
    parsers, template functions, and sources in Python.
---

Instead of writing Python code into your syslog-ng OSE configuration
file, you can store the Python code for your Python object in an
external file. That way, it is easier to write, maintain, and debug the
code. You can store the Python code in any directory in your system, but
make sure to include it in your Python path.

When referencing a Python class from an external file in the class()
option of a Python block in the syslog-ng OSE configuration file, the
class name must include the name of the Python file containing the
class, without the path and the .py extension. For example, if the
MyDestination class is available in the
/etc/syslog-ng/etc/pythonexample.py file, use

```config
class("pythonexample.MyDestination"):

    destination d_python_to_file {
        python(
            class("pythonexample.MyDestination")
        );
    };
    log {
        source(src);
        destination(d_python_to_file);
    };
```

{% include doc/admin-guide/notes/python-persist.md %}

If you store the Python code in a separate Python file and only include
it in the syslog-ng OSE configuration file, make sure that the
PYTHON_PATH environment variable includes the path to the Python file,
and export the PYTHON\_PATH environment variable. For example, if you
start syslog-ng OSE manually from a terminal and you store your Python
files in the /opt/syslog-ng/etc directory, use the following command:
`export PYTHONPATH=/opt/syslog-ng/etc`.

In production, when syslog-ng OSE starts on boot, you must configure
your startup script to include the Python path. The exact method depends
on your operating system. For recent Red Hat Enterprise Linux, Fedora,
and CentOS distributions that use systemd, the systemctl command sources
the /etc/sysconfig/syslog-ng file before starting syslog-ng OSE. (On
openSUSE and SLES, /etc/sysconfig/syslog file.) Append the following
line to the end of this file:
`PYTHONPATH="<path-to-your-python-file>"`, for example,
`PYTHONPATH="/opt/syslog-ng/etc"`.

To help debugging and troubleshooting your Python code, you can send log
messages to the internal() source of syslog-ng OSE. For details, see
[[Logging from your Python code]].
