The following points apply to using Python blocks in {{ site.product.short_name }} in
general:

- Python parsers and template functions are available in {{ site.product.short_name }}
    version 3.10 and later.

    Python destinations and sources are available in {{ site.product.short_name }}
    version 3.18 and later.

- Supported Python versions: 2.7 and 3.4+ (if you are using pre-built
    binaries, check the dependencies of the package to find out which
    Python version it was compiled with).

- The Python block must be a top-level block in the {{ site.product.short_name }}
    configuration file.

- If you store the Python code in a separate Python file and only
    include it in [[the {{ site.product.short_name }} configuration file|adm-conf-file]], make sure that
    the PYTHON_PATH environment variable includes the path to the
    Python file, and export the PYTHON_PATH environment variable. For
    example, if you start {{ site.product.short_name }} manually from a terminal and you
    store your Python files in the /opt/syslog-ng/etc directory, use the
    following command: **export PYTHONPATH=/opt/syslog-ng/etc**.

    In production, when {{ site.product.short_name }} starts on boot, you must configure
    your startup script to include the Python path. The exact method
    depends on your operating system. For recent Red Hat Enterprise
    Linux, Fedora, and CentOS distributions that use systemd, the
    systemctl command sources the /etc/sysconfig/syslog-ng file before
    starting {{ site.product.short_name }}. (On openSUSE and SLES, /etc/sysconfig/syslog
    file.) Append the following line to the end of this file:
    **PYTHONPATH="\<path-to-your-python-file\>"**, for example,
    **PYTHONPATH="/opt/syslog-ng/etc"**.

- The Python object is initiated every time when {{ site.product.short_name }} is
    started or reloaded.  

 {% include doc/admin-guide/warnings/python-reload.md %}  

- The Python block can contain multiple Python functions.

- Using Python code in {{ site.product.short_name }} can significantly decrease the
    performance of {{ site.product.short_name }}, especially if the Python code is slow.
    In general, the features of {{ site.product.short_name }} are implemented in C, and
    are faster than implementations of the same or similar features in
    Python.

- Validate and lint the Python code before using it. The {{ site.product.short_name }}
    application does not do any of this.

- Python error messages are available in the internal() source of
    {{ site.product.short_name }}.

- You can access the name-value pairs of {{ site.product.short_name }} directly
    through a message object or a dictionary.

- To help debugging and troubleshooting your Python code, you can send
    log messages to the internal() source of {{ site.product.short_name }}. For details,
    see Logging from your Python code.
