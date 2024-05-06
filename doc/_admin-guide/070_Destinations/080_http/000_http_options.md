---
title: HTTP destination options
id: adm-dest-http-opt
---

The http destination of syslog-ng OSE can directly post log messages to
web services using the HTTP protocol. The http destination has the
following options. Some of these options are directly used by the Java
code underlying the http destination, therefore these options must be
specified in the following format:

```config
option("<option-name>", "<option-value>")
```

For example, option("url", "http://\<server-address\>:\<port-number\>\").
The exact format to use is indicated in the description of the option.

## Required options

The following options are required: url().

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

## class-name()

|  Type:|      string|
|  Default:|   N/A|

*Description:* The name of the class (including the name of the package)
that includes the destination driver to use.

For the http destination, use this option as
**class-name(\"org.syslog\_ng.http.HTTPDestination\")**.

{% include doc/admin-guide/options/client-lib-dir.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/jvm-options.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

## method()

|  Type:     | DELETE \| HEAD \| GET \| OPTIONS \| POST \| PUT \| TRACE |
|Default: |  PUT|

*Description:* Specifies the HTTP method to use when sending the message
to the server. Available in syslog-ng OSE version 3.7.2 and newer.

{% include doc/admin-guide/options/retries.md %}

{% include doc/admin-guide/options/template-logformat.md %}

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/timeout.md %}

## url()

|Type: |     URL|
|Default:||

*Description:* Specifies the hostname or IP address and optionally the
port number of the web service that can receive log data via HTTP. Use a
colon (**:**) after the address to specify the port number of the
server. You can also use macros, templates, and template functions in
the URL, for example:
http://host.example.com:8080/\${MACRO1}/\${MACRO2}/script\")
