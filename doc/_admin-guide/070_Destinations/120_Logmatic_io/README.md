---
title: 'logmatic: Using Logmatic.io'
short_title: Logmatic
id: adm-dest-logmatic
description: >-
    The logmatic() destination sends log messages to the
    [Logmatic.io](https://logmatic.io/) Logging-as-a-Service provider. You
    can send log messages over TCP, or encrypted with TLS.
---

**Declaration**

```config
logmatic(token());
```

### Example: Using the logmatic() driver

To use the logmatic() destination, the only mandatory parameter is your
user token. The following example sends every log from the system()
source to your Logmatic.io account.

```config
log {
    source { system(); };
    destination { logmatic(token("<API-KEY-AS-PROVIDED-BY-LOGMATIC.IO>")); };
};
```

The following example uses TLS encryption. Before using it, download the
CA certificate of Logmatic.io and copy it to your hosts (for example,
into the /etc/ssl/certs/ directory.

```config
log {
    destination {
        logmatic(token("<API-KEY-AS-PROVIDED-BY-LOGMATIC.IO>") port(6514)
            tls(peer-verify(required-trusted) ca-dir('/etc/ssl/certs'))
        );
    };
};
```

The following example parses the access logs of an Apache webserver from
a file and sends them to Logmatic.io in JSON format.

```config
log {
    source { file("/var/log/apache2/access.log" flags(no-parse)); };
    parser { apache-accesslog-parser(); };
    destination {
        logmatic(token("<API-KEY-AS-PROVIDED-BY-LOGMATIC.IO>")
            tag(apache)
            template("$(format-json .apache.* timestamp=${ISODATE})"));
    };
}
```

To use the logmatic() driver, the scl.conf file must be included in your
syslog-ng OSE configuration:

```config
@include "scl.conf"
```

The logmatic() driver is actually a reusable configuration snippet
configured to send log messages using the tcp() driver using a template.
For details on using or writing such configuration snippets, see
[[Reusing configuration blocks]]. You can find the source of
this configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/logmatic/logmatic.conf).
