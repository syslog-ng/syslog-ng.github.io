---
title: Websense parser
parser: websense
id: adm-parser-websense
description: >-
    The Websense parser can parse the log messages of Websense Content
    Gateway (Raytheon&#124;Websense, now Forcepoint).  
---

{% include doc/admin-guide/parser-intro.md %}

The parser can parse messages in the following format:

>\<PRI\>\<DATE\> \<TIMEZONE\> \<IP-ADDRESS\> \<NAME=VALUE PAIRS\>

For example:

><159>Dec 19 10:48:57 EST 192.168.1.1 vendor=Websense product=Security product_version=7.7.0 action=permitted severity=1 category=153 user=- src_host=192.168.2.1 src_port=62189 dst_host=example.com dst_ip=192.168.3.1 dst_port=443 bytes_out=197 bytes_in=76 http_response=200 http_method=CONNECT http_content_type=- http_user_agent=Mozilla/5.0_(Windows;_U;_Windows_NT_6.1;_enUS;_rv:1.9.2.23)_Gecko/20110920_Firefox/3.6.23 http_proxy_status_code=200 reason=- disposition=1034 policy=- role=8 duration=0 url=https://example.com

If you find a message that the websense-parser() cannot properly parse,
[contact Support](https://www.syslog-ng.com/support/), so we can improve
the parser.

The syslog-ng OSE application sets the \${PROGRAM} field to Websense.

By default, the websense-specific fields are extracted into name-value
pairs prefixed with .websense. For example, the product\_version in the
previous message becomes \${.websense.product\_version}. You can change
the prefix using the **prefix** option of the parser.

**Declaration**

```config
@version: 3.38
@include "scl.conf"
log {
    source { network(flags(no-parse)); };
    parser { websense-parser(); };
    destination { ... };
};
```

Note that you have to disable message parsing in the source using the
**flags(no-parse)** option for the parser to work.

The websense-parser() is actually a reusable configuration snippet
configured to parse websense messages. For details on using or writing
such configuration snippets, see [[Reusing configuration blocks]].
You can find the source of this configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/websense/plugin.conf).

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-prefix.md %}
