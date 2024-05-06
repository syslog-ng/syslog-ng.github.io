---
title: 'python(): writing server-style Python sources'
short_title: Server-style Python sources
id: adm-src-python-server
description: >-
    This section describes server-style sources. For details on
    fetcher-style sources, see python-fetcher: writing fetcher-style Python sources.
---

{% include doc/admin-guide/python-blocks-generic.md %}

{% include doc/admin-guide/notes/python-persist.md %}

**Declaration**

Python sources consist of two parts. The first is a syslog-ng OSE source
object that you define in your syslog-ng OSE configuration and use in
the log path. This object references a Python class, which is the second
part of the Python source. The Python class receives or fetches the log
messages, and can do virtually anything that you can code in Python. You
can either embed the Python class into your syslog-ng OSE configuration
file, or [[store it in an external Python file|adm-conf-python]].

```config
source <name_of_the_python_source>{
    python(
        class("<name_of_the_python_class_executed_by_the_source>")
        options(
            "option1" "value1",
            "option2" "value2"
        )
    );
};
 
python {
    from syslogng import LogSource
    from syslogng import LogMessage

    class <name_of_the_python_class_executed_by_the_source>(LogSource):
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
                msg = LogMessage("this is a log message")
                self.post_message(msg)

        def request_exit(self): # mandatory
            print("exit")
            self.exit = True
    };
```

## Methods of the python() source

Server-style Python sources must be inherited from the
syslogng.LogSource class, and must implement at least the run and
request_exit methods. Multiple inheritance is allowed, but only for
pure Python super classes.

You can implement your own event loop, or integrate the event loop of an
external framework or library, for example,
[KafkaConsumer](https://kafka-python.readthedocs.io/en/master/apidoc/KafkaConsumer.html),
[Flask](http://flask.pocoo.org/), [Twisted
engine](https://twistedmatrix.com/trac/), and so on.

To post messages, call LogSource::post_message() method in the run
method.

{% include doc/admin-guide/python-init.md %}

### run(self) method (mandatory)

Use the **run** method to implement an event loop, or start a server
framework or library. Create **LogMessage** instances in this method,
and pass them to the log paths by calling
**LogSource::post\_message()**.

Currently, run stops permanently if an unhandled exception happens.

For details on parsing and posting messages, see
[[Python LogMessage API]].

### request_exit(self) method (mandatory)

The syslog-ng OSE application calls this method when syslog-ng OSE is
shut down or restarted. The request_exit method must shut down the
event loop or framework, so the run method can return gracefully. If you
use blocking operations within the run() method, use **request_exit()**
to interrupt those operations and set an exit flag, otherwise syslog-ng
OSE is not able to stop. Note that syslog-ng OSE calls the request_exit
method from a thread different from the source thread.

{% include doc/admin-guide/python-deinit.md %}
