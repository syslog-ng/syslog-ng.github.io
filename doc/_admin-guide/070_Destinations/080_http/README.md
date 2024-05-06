---
title: Posting messages over HTTP
short_title: http
id: adm-dest-http
description: >-
    Version 3.7 of syslog-ng OSE can directly post log messages to web
    services using the HTTP protocol. Error and status messages received
    from the HTTP server are forwarded to the internal logs of syslog-ng
    OSE. 
---

The current implementation has the following limitations:

- This destination is only supported on the Linux platform.

- Only HTTP connections are supported, HTTPS is not.

- This destination requires Java. For an http destination that does
    not use Java, see http: Posting messages over HTTP without
    Java.

**Declaration**

```config
java(
    class-path("/syslog-ng/install_dir/lib/syslog-ng/java-modules/*.jar")
    class-name("org.syslog_ng.http.HTTPDestination")

    option("url", "http://<server-address>:<port-number>")

);
```

### Example: Sending log data to a web service

The following example defines an http destination.

```config
destination d_http {
    java(
        class-path("/syslog-ng/install_dir/lib/syslog-ng/java-modules/*.jar")
        class-name("org.syslog_ng.http.HTTPDestination")

        option("url", "http://192.168.1.1:80")
    );
};

log
    { source(s_file); destination(d_http); flags(flow-control); };
```

**NOTE:** If you delete all Java destinations from your configuration and
reload syslog-ng, the JVM is not used anymore, but it is still running.
If you want to stop JVM, stop syslog-ng and then start syslog-ng again.
{: .notice--info}
