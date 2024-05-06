---
title: python() Source Driver
description: >-
  The Python source allows you to write your own source in Python. You can
  import external Python modules to receive or fetch the messages.
id: dev-macos-mod-sup-python-src
---

### Important Information

* This is used for server-style sources that receive messages. Server-style sources are used for an event-loop based, nonblocking server framework in Python.\

* The Python block must be a top-level block in the syslog-ng OSE configuration file.\

* If you store the Python code in a separate Python file and only include it in the syslog-ng OSE configuration file, make sure that the PYTHON\_PATH environment variable includes the path to the Python file, and export the PYTHON\_PATH environment variable.\


Python sources consist of two parts. The first is a syslog-ng OSE source object that you define in your syslog-ng OSE configuration and use in the log path. This object references a Python class, which is the second part of the Python source. The Python class receives or fetches the log messages, and can do virtually anything that you can code in Python. You can either embed the Python class into your syslog-ng OSE configuration file, or store it in an external Python file.\
\
For this test, we will embed the Python class into the configuration file.&#x20;

### Status <a href="#status" id="status"></a>

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### Configuration File Used

```config
@version: 3.33
@include "scl.conf"

destination console{
    file(/dev/stdout);
};

source s_python{
    python(
        class("TestPython")
        options(
            "option1" "value1",
            "option2" "value2"
        )
    );
};

python {
from syslogng import LogSource
from syslogng import LogMessage
import time

class TestPython(LogSource):
    def init(self, options): # optional
        print("init")
        print(options)
        self.exit = False
        return True

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

log {
    source(s_python);
    destination(console);
};
```

### Proof

![Python Destination driver tested in macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-16 at 1.27.36 AM.png>)

![Python Destination driver tested in macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-08-16 at 1.32.19 AM.png>)
