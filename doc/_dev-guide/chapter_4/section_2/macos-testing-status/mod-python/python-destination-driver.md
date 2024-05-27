---
title: python() Destination Driver
description: >-
  The Python destination allows you to write your own destination in Python. You
  can import external Python modules to process the messages, and send them to
  other services or servers.
id: dev-macos-mod-sup-python-dest
---

### Important Information <a href="#important-information" id="important-information"></a>

* The Python block must be a top-level block in the {{ site.product.short_name }} configuration file.\

* If you store the Python code in a separate Python file and only include it in the {{ site.product.short_name }} configuration file, make sure that the PYTHON\_PATH environment variable includes the path to the Python file, and export the PYTHON\_PATH environment variable.\

* Starting with 3.26, {{ site.product.short_name }} assigns a persist name to Python sources and destinations. The persist name is generated from the class name. If you want to use the same Python class multiple times in your {{ site.product.short_name }} configuration, add a unique persist-name() to each source or destination, otherwise {{ site.product.short_name }} will not start.

Python destinations consist of two parts. The first is a {{ site.product.short_name }} destination object that you define in your {{ site.product.short_name }} configuration and use in the log path. This object references a Python class, which is the second part of the Python destination. The Python class processes the log messages it receives, and can do virtually anything that you can code in Python. You can either embed the Python class into your {{ site.product.short_name }} configuration file, or store it in an external Python file.\
\
For this test, we will embed the Python class into the configuration file.

### Status <a href="#status" id="status"></a>

| Architecture | Status |
| ------------ | ------ |
| x86          | Works  |
| ARM          | Works  |

### Configuration File Used <a href="#configuration-file-used" id="configuration-file-used"></a>

```config
@version: 3.33
@include "scl.conf"

​destination console{
  file(/dev/stdout);
};

​source s_python{
  python(
    class("TestPython")
      options(
        "option1" "value1",
        "option2" "value2"
      )
    );
  };

  ​python {
    from syslogng import LogSource
    from syslogng import LogMessage
    import time​class

    TestPython(LogSource):

    def init(self, options): # optional
      print("init")
      print(options)
      self.exit = False
      return True​

    def deinit(self): # optional
      print("deinit")

    def run(self): # mandatory
      print("run")
      while not self.exit:
        # Must create a message
        msg = LogMessage("this is a log message from Python Source")
        self.post_message(msg)
        time.sleep(1)

    def request_exit(self): # mandatory
      print("exit")
      self.exit = True
  };

  ​log {
    source(s_python);
    destination(console);
  };
```

### Proof <a href="#proof" id="proof"></a>
