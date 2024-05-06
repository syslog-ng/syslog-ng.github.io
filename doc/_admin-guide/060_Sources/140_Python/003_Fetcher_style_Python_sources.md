---
title: 'python-fetcher: writing fetcher-style Python sources'
short_title: Fetcher-style Python sources
id: adm-src-python-fetcher
description: >-
    This section describes fetcher-style sources. For details on
    server-style sources, see python: writing server-style Python sources.
---

{% include doc/admin-guide/python-blocks-generic.md %}

**Declaration**

Python sources consist of two parts. The first is a syslog-ng OSE source
object that you define in your syslog-ng OSE configuration and use in
the log path. This object references a Python class, which is the second
part of the Python source. The Python class receives or fetches the log
messages, and can do virtually anything that you can code in Python. You
can either embed the Python class into your syslog-ng OSE configuration
file, or [[store it in an external Python file]].

```config
source <name_of_the_python_source>{
    python-fetcher(
        class("<name_of_the_python_class_executed_by_the_source>")
    );
};

python {
from syslogng import LogFetcher
from syslogng import LogMessage

class <name_of_the_python_class_executed_by_the_source>(LogFetcher):
    def init(self, options): # optional
        print("init")
        print(options)
        return True

    def deinit(self): # optional
        print("deinit")

    def open(self): # optional
        print("open")
        return True

    def fetch(self): # mandatory
        print("fetch")
        # return LogFetcher.FETCH_ERROR,
        # return LogFetcher.FETCH_NOT_CONNECTED,
        # return LogFetcher.FETCH_TRY_AGAIN,
        # return LogFetcher.FETCH_NO_DATA,
        return LogFetcher.FETCH_SUCCESS, msg

    def request_exit(self):
        print("request_exit")
        # If your fetching method is blocking, do something to break it
        # For example, if it reads a socket: socket.shutdown()

    def close(self): # optional
        print("close")
};
```

## Methods of the python-fetcher() source

Fetcher-style Python sources must be inherited from the
syslogng.LogFetcher class, and must implement at least the fetch method.
Multiple inheritance is allowed, but only for pure Python super classes.

For fetcher-style Python sources, syslog-ng OSE handles the event loop
and the scheduling automatically. You can use simple blocking
server/client libraries to receive or fetch logs.

You can retrieve messages using the **fetch()** method.

{% include doc/admin-guide/python-init.md %}

### open(self) method (optional)

The open(self) method opens the resources required for the source, for
example, it initiates a connection to the target service. It is called
after init() when syslog-ng OSE is started or reloaded. If fetch()
returns with an error, syslog-ng OSE calls the close() and open()
methods before trying to fetch a new message.

If open() fails, it should return the False value. In this case,
syslog-ng OSE retries it every time-reopen() seconds. By default, this
is 1 second for Python sources and destinations, the value of
time-reopen() is not inherited from the global option. For details, see
[[Error handling in the python() destination]].

### fetch(self) method (mandatory)

Use the **fetch** method to fetch messages and pass them to the log
paths.

For details on parsing messages, see
[[Python LogMessage API]].  

The fetch method must return one of the following values:

- LogFetcher.FETCH_ERROR: Fetching new messages failed, syslog-ng OSE
    calls the close and open methods.

- LogFetcher.FETCH_NO_DATA: There was not any data available. The
    source waits before calling the fetch method again. The wait time is
    equal to time-reopen() by default, but you can override it by
    setting the fetch-no-data-delay() option in the source.

- LogFetcher.FETCH_NOT_CONNECTED: Could not access the source,
    syslog-ng OSE calls the open method.

- LogFetcher.FETCH_SUCCESS, msg: Post the message returned as the
    second argument.

- LogFetcher.FETCH_TRY_AGAIN: The fetcher could not provide a
    message this time, but will make the source call the fetch method as
    soon as possible.

### request_exit(self) method (optional)

If you use blocking operations within the fetch() method, use
request_exit() to interrupt those operations (for example, to shut down
a socket), otherwise syslog-ng OSE is not able to stop. Note that
syslog-ng OSE calls the request_exit method from a thread different
from the source thread.

### close(self) method (optional)

Close the connection to the target service. Usually it is called right
before deinit() when stopping or reloading syslog-ng OSE. It is also
called when fecth() fails.

{% include doc/admin-guide/python-deinit.md %}
