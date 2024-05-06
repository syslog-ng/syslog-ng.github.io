---
title: Logging from your Python code
id: adm-conf-python-log
description: >-
    You can extend and customize syslog-ng OSE easily by writing destinations, parsers,
    template functions, and sources in Python.  
---

To debug and troubleshoot your Python code, syslog-ng OSE allows you to
use the logger() method to send log messages to the
[[internal() source|adm-src-int]] of syslog-ng OSE.  
That way the diagnostic messages of your Python code are treated
the same way as other such log messages of syslog-ng OSE. This has the
following benefits:

- The logger() method respects the log level settings of syslog-ng
    OSE. You can write error, warning, info, debug, and trace level
    messages.

- You can follow what your Python code is doing even if syslog-ng OSE
    is running as a daemon in the background.

Logging to the internal() source is available in syslog-ng OSE version
3.20 and later.

To send log messages to the internal() source from Python

1. Add the following import to your Python code:

    ```python
    import syslogng
    ```

2. Create a logger object:

    ```python
        logger = syslogng.Logger()
    ```

3. Use the logger object in your Python code, for example:

    ```python
    logger.info("This is a sample log message send from the Python code.")
    ```

    You can use the following log levels: logger.error, logger.warning,
    logger.info, logger.debug, logger.trace

4. Make sure that your syslog-ng OSE configuration includes the
    internal() source, for example:

```config
    source s_internal { internal(); };
    destination d_internal { file("/var/log/internal.txt"); };
    log {source(s_internal); destination(d_internal); };
```
