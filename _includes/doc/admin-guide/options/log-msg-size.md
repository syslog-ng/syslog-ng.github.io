## log-msg-size()

|Type:|      number (bytes)|
|Default:|   {{ page.log_msg_size_default | default: 'Use the global **log-msg-size()** option, which defaults to 65536 (64 KiB).' }}|

*Description:* Maximum length of an incoming message in bytes. This
length includes the entire message (the data structure and individual
fields). The maximal value that can be set is 268435456 bytes (256 MiB).

For messages using the IETF-syslog message format (RFC5424), the maximal
size of the value of an SDATA field is 64 KiB.

**NOTE:** In most cases, log-msg-size() does not need to be set higher than
10 MiB.
{: .notice--info}

For details on how encoding affects the size of the message, see
[[Message size and encoding]].

You can use human-readable units when setting configuration options. For
details, see [[Notes about the configuration syntax]].

Uses the value of the [[global option|adm-global-options]] if not specified.
