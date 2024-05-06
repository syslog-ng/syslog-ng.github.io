The name of the source host where the message originates from.

- If the message traverses several hosts and the
    [[chain-hostnames()]] option is on, the first host
    in the chain is used.

- If the [[keep-hostname()]] option is disabled
    (**keep-hostname(no)**), the value of the {{ include.macro }} macro
    will be the DNS hostname of the host that sent the message to
    syslog-ng OSE (that is, the DNS hostname of the last hop). In this
    case the {{ include.macro }} and {{ include.macro }}_FROM macros will have the same
    value.

- If the [[keep-hostname()]] option is enabled
    (**keep-hostname(yes)**), the value of the {{ include.macro }} macro
    will be the hostname retrieved from the log message. That way the
    name of the original sender host can be used, even if there are log
    relays between the sender and the server.

    **NOTE:** The use-dns(), use-fqdn(), normalize-hostnames(), and
    dns-cache() options will have no effect if the keep-hostname()
    option is enabled (keep-hostname(yes)) and the message contains a
    hostname.
    {: .notice--info}

For details on using name resolution in syslog-ng OSE, see
[[Using name resolution in syslog-ng]].
