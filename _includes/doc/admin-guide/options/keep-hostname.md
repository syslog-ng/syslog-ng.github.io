## keep-hostname()

|  Type:|      yes or no|
  |Default:|   no|

*Description:* Enable or disable hostname rewriting.

- If enabled (**keep-hostname(yes)**), syslog-ng OSE assumes that the
    incoming log message was sent by the host specified in the HOST
    field of the message.

- If disabled (**keep-hostname(no)**), syslog-ng OSE rewrites the HOST
    field of the message, either to the IP address (if the use-dns()
    parameter is set to **no**), or to the hostname (if the use-dns()
    parameter is set to **yes** and the IP address can be resolved to a
    hostname) of the host sending the message to syslog-ng OSE. For
    details on using name resolution in syslog-ng OSE, see
    [[Using name resolution in syslog-ng]].

**NOTE:** If the log message does not contain a hostname in its HOST field,
syslog-ng OSE automatically adds a hostname to the message.
{: .notice--info}

- For messages received from the network, this hostname is the address
    of the host that sent the message (this means the address of the
    last hop if the message was transferred via a relay).

- For messages received from the local host, syslog-ng OSE adds the
    name of the host.

This option can be specified globally, and per-source as well. The local
setting of the source overrides the global option if available.

**NOTE:** When relaying messages, enable this option on the syslog-ng OSE
server and also on every relay, otherwise syslog-ng OSE will treat
incoming messages as if they were sent by the last relay.
{: .notice--info}