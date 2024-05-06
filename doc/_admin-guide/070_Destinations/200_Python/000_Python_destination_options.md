---
title: python() destination options
batch_lines: '25'
python_class: MyPythonDestination
class_type: destination
id: adm-dest-python-opt
description: >-
    The Python destination allows you to write your own destination in
    Python. The python() destination has the following options. The class()
    option is mandatory. For details on writing destinations in Python, see
    python: writing custom Python destinations.
---

{% include doc/admin-guide/options/batch-bytes.md %}

This option does not have any effect unless the flush() method is
implemented in the destination.

{% include doc/admin-guide/options/batch-lines.md %}

This option does not have any effect unless the flush() method is
implemented in the destination.

{% include doc/admin-guide/options/batch-timeout.md %}

{% include doc/admin-guide/options/python-class.md %}

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/frac-digits.md %}

{% include doc/admin-guide/options/loaders.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/on-error.md %}

{% include doc/admin-guide/options/python-options.md %}

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/notes/python-persist.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/value-pairs-short.md %}

You can use this option to limit which name-value pairs are passed to
the Python code for each message. Note that if you use the value-pairs()
option, the Python code receives the specified value-pairs as a Python
dict. Otherwise, it receives the message object. In the following
example, only the text of the log message is passed to Python.

```config
destination d_python_to_file {
    python(
        class("pythonexample.TextDestination")
        value-pairs(key(MESSAGE))
    );
};
```
