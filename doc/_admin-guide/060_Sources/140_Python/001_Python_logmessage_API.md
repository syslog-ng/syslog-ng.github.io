---
title: Python LogMessage API
id: adm-src-python-logapi
description: >-
    The LogMessage API allows you to create LogMessage objects in Python
    sources, parse syslog messages, and set the various fields of the log
    message.
---

## LogMessage() method: Create log message objects

You can use the **LogMessage()** method to create a structured log
message instance. For example:

```python
from syslogng import LogMessage

# Initialize an empty message with default values (recvd timestamp, rcptid, hostid, ...)
msg = LogMessage()

# Initialize a message and set its ${MESSAGE} field to the specified argument
msg = LogMessage("string or bytes-like object") 
```

You can also explicitly set the different values of the log message. For
example:

```python
msg["MESSAGE"] = "message"
msg["HOST"] = "hostname"
```

You can set certain special field (timestamp, priority) by using
specific methods.

Note the following points when creating a log message:

- When setting the hostname, syslog-ng OSE takes the following
    hostname-related options of the configuration into account:
    chain-hostnames(), keep-hostname(), use-dns(), and use-fqdn().

- Python sources ignore the log-msg-size() option.

- The syslog-ng OSE application accepts only one message from every
    LogSource::post_message() or fetch() call, batching is currently
    not supported. If your Python code accepts batches of messages, you
    must pass them to syslog-ng OSE one-by-one. Similarly, if you need
    to split messages in the source, you must do so in your Python code,
    and pass the messages separately.

- Do not reuse or store LogMessage objects after posting (calling
    post_message()) or returning the message from fetch().

## parse() method: Parse syslog messages

The parse() method allows you to parse incoming messages as syslog
messages. By default, the parse() method attempts to parse the message
as an IETF-syslog (RFC5424) log message. If that fails, it parses the
log message as a BSD-syslog (RFC3164) log message. Note that syslog-ng
OSE takes the parsing-related options of the configuration into account:
flags(), keep-hostname(), recv-time-zone().

If keep-hostname() is set to **no**, syslog-ng OSE ignores the hostname
set in the message, and uses the IP address of the syslog-ng OSE host as
the hostname (to use the hostname instead of the IP address, set the
use-dns() or use-fqdn() options in the Python source).

>msg_ietf = LogMessage.parse('<165>1 2003-10-11T22:14:15.003Z mymachine.example.com  
>evntslog - ID47 [exampleSDID@32473 iut="3" eventSource="Application" eventID="1011"]  
>An application event log entry', self.parse_options)
>msg_bsd = LogMessage.parse('<34>Oct 11 22:14:15 mymachine su: \'su root\' failed for  
>lonvick on /dev/pts/8', self.parse_options)

## set_pri() method

You can set the priority of the message with the set_pri() method.

```python
msg.set_pri(165)
```

## set_timestamp() method

You can use the set_timestamp() method to set the date and time of the
log message.

```python
timestamp = datetime.fromisoformat("2018-09-11T14:49:02.100+02:00")
msg.set_timestamp(timestamp) # datetime object, includes timezone information
```

In Python 2, timezone information cannot be attached to the datetime
instance without using an external library. The syslog-ng OSE represents
naive datetime objects in UTC.
