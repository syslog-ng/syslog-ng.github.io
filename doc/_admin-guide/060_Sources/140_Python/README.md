---
title: Writing Python sources
short_title: python
id: adm-src-python
description: >-
    The Python source allows you to write your own source in Python. You can
    import external Python modules to receive or fetch the messages. Since
    many services have a Python library, the Python source makes integrating
    syslog-ng OSE very easy and quick.
---

You can write two different type of sources in Python:

- Server-style sources that receives messages. Write server-style
    sources if you want to use an event-loop based, nonblocking server
    framework in Python, or if you want to implement a custom loop.

- Fetcher-style sources that actively fetch messages. In general,
    write fetcher-style sources (for example, when using simple blocking
    APIs), unless you explicitly need a server-style source.
