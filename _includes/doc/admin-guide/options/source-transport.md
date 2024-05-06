## transport()

|  Type:|      udp, tcp, tls, proxied-tcp, proxied-tls, proxied-tls-passthrough, text-with-nuls|
  |Default:|   tcp|

*Description:* Specifies the protocol used to receive messages from the
source.

For detailed information about how syslog-ng OSE supports the
proxied-tcp, the proxied-tls, and the proxied-tls-passthrough
parameters, see [[Proxy Protocol support]].
text-with-nuls: Allows embedded **NUL** characters in the message from a
TCP source, that is, syslog-ng OSE will not delimiter the incoming
messages on **NUL** characters, only on **newline** characters (contrary
to tcp transport, which splits the incoming log on **newline**
characters and **NUL** characters).

**NOTE:** The syslog-ng OSE application does not support embedded **NUL**
characters everywhere, so it is recommended that you also use
flags(no-multi-line) that causes **NUL** characters to be replaced by
space.
{: .notice--info}

{% include doc/admin-guide/warnings/udp-buffer.md %}
