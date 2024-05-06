---
title: 'sun-streams: Collecting messages on Sun Solaris'
short_title: sun-streams
id: adm-src-sun
description: >-
    Solaris uses its STREAMS framework to send messages to the syslogd
    process. Solaris 2.5.1 and above uses an IPC called door in addition
    to STREAMS, to confirm the delivery of a message. The syslog-ng
    application supports the IPC mechanism via the door() option (see
    below).
---

**NOTE:** The sun-streams() driver must be enabled when the syslog-ng
application is compiled (see **./configure --help**).
{: .notice--info}

The sun-streams() driver has a single required argument specifying the
STREAMS device to open, and the door() option. For the list of available
optional parameters, see
[[sun-streams() source options]]. 

**NOTE:** Starting with version 3.7, the syslog-ng OSEsystem() driver
automatically extracts the msgid from the message (if available), and
stores it in the .solaris.msgid macro. To extract the msgid from the
message without using the system()driver, use the
**extract-solaris-msgid()** parser. You can find the exact source of
this parser in the [syslog-ng OSE GitHub repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/solaris/plugin.conf).
{: .notice--info}

**Declaration**

```config
sun-streams(<name_of_the_streams_device> door(<filename_of_the_door>));
```

### Example: Using the sun-streams() driver

```config
source s_stream {
    sun-streams("/dev/log" door("/etc/.syslog_door"));
};
```
