---
title: Apache access log parser
id: adm-parser-apache
description: >-
    The Apache access log parser can parse the access log messages of the
    Apache HTTP Server. The syslog-ng OSE application can separate these log
    messages to name-value pairs. For details on using value-pairs in
    syslog-ng OSE see [[Structuring macros, metadata, and other value-pairs]].
    The apache-accesslog-parser() supports
    both the Common Log Format and the Combined Log Format of Apache (for
    details, see the [Apache HTTP Server
    documentation](https://httpd.apache.org/docs/2.4/logs.html#accesslog)).
---

The following is a sample log message:

>127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326

Starting with version 3.21, virtualhost and the port of the virtualhost
(vhost) is also supported, for example:

>foo.com:443 1.2.3.4 - - [15/Apr/2019:14:30:16 -0400] "GET /bar.html HTTP/2.0"  
>500 - "https://foo.com/referer.html" "Mozilla/5.0 ..."

The syslog-ng OSE application extracts every field into name-value
pairs, and adds the .apache. prefix to the name of the field.

**Declaration**

```config
parser parser_name {
    apache-accesslog-parser(
        prefix()
    );
};
```

The parser extracts the following fields from the messages: vhost, port,
clientip, ident, auth, timestamp, rawrequest, response, bytes, referrer,
and agent. The rawrequest field is further segmented into the verb,
request, and httpversion fields. The syslog-ng OSE
apache-accesslog-parser() parser uses the same naming convention as
Logstash.

### Example: Using the apache-accesslog-parser parser

In the following example, the source is a log file created by an Apache
web server. The parser automatically inserts the .apache. prefix before
all extracted name-value pairs. The destination is a file that uses the
format-json template function. Every name-value pair that begins with a
dot (.) character will be written to the file (dot-nv-pairs). The log
statement connects the source, the destination, and the parser.

```config
source s_apache {
    file(/var/log/access_log);
};

destination d_json {
    file(
        "/tmp/test.json"
        template("$(format-json .apache.*)\n")
    );
};

log {
    source(s_apache);
    parser { apache-accesslog-parser();};
    destination(d_json);
};
```

To use this parser, the scl.conf file must be included in your syslog-ng
OSE configuration:

```config
@include "scl.conf"
```

The apache-accesslog-parser() is actually a reusable configuration
snippet configured parse Apache access log messages. For details on
using or writing such configuration snippets, see
[[Reusing configuration blocks]]. You can find the source of
this configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/apache/apache.conf).
