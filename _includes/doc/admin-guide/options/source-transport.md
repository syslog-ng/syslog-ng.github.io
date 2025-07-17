## transport()

|Type:   | `auto`, `proxied-tcp`, `proxied-tls`, `proxied-tls-passthrough`, `tcp`, `text-with-nuls`, `tls`, `udp`|
|Default:|   `tcp`|

**Description:** This option specifies the protocol used to receive messages from the source.

* `auto`: Available in {{ site.product.short_name }} 4.10 and later versions. In 4.9 and later versions the new `transport(auto)` option of the syslog() source allows you to support all TCP-based variants with a single source driver. In {{ site.product.short_name }} there numerous transport options and protocols. RFC3164 describes the legacy or BSD syslog protocol, while RFC5424 refers to the more recent syslog protocol. RFC5424 formatted messages normally come with framing or octet counting (RFC6587), where messages are prefixed with the length of the message. Furthermore, some software use RFC5424 message formatting, but without octet counting. In versions prior to {{ site.product.short_name }} 4.9, this many variants meant that that if you wanted to receive logs from RFC3164, and RFC5424 with or without octet counting, you had to configure three different ports on syslog-ng to parse them correctly. In {{ site.product.short_name }} 4.9 and later versions, The new `transport(auto)` option of syslog-ng allows you collect all of these variants using a single port, even the RFC3164 formatting variant with octet counting.

### Example: configuring syslog() source with transport(auto)

```config
source s_auto {
  syslog(port(514) transport(auto));
};
destination d_auto {
  file("/var/log/auto.txt");
};
log {
  source(s_auto); destination(d_auto);
};
```

* `proxied-tcp`, `proxied-tls`, `proxied-tls-passthrough`: Refers to the HAProxy Proxy Protocol. For more information, see Proxy Protocol support.
* `text-with-nuls`: Allows embedded `NUL` characters in the message from a TCP source, that is, {{ site.product.short_name }} will not delimiter the incoming messages on `NUL` characters, only on `newline` characters (contrary to tcp transport, which splits the incoming log on `newline` characters and `NUL` characters).

**NOTE:** The {{ site.product.short_name }} application does not support embedded **NUL**
characters everywhere, so it is recommended that you also use
flags(no-multi-line) that causes **NUL** characters to be replaced by
space.
{: .notice--info}

{% include doc/admin-guide/warnings/udp-buffer.md %}
