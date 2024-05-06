The FQDN of the host that sent the message to syslog-ng
as resolved by syslog-ng using DNS. If the message traverses several
hosts, this is the last host in the chain.

The syslog-ng OSE application uses the following procedure to determine
the value of the {{ include.macro }}_FROM macro:

1. The syslog-ng OSE application takes the IP address of the host
    sending the message.

2. If the use-dns() option is enabled, syslog-ng OSE attempts to
    resolve the IP address to a hostname. If it succeeds, the returned
    hostname will be the value of the {{ include.macro }}_FROM macro. This value
    will be the FQDN of the host if the use-fqdn() option is enabled,
    but only the hostname if use-fqdn() is disabled.

3. If the use-dns() option is disabled, or the address resolution
    fails, the \{ {{ include.macro }}_FROM\} macro will return the IP address of
    the sender host.

For details on using name resolution in syslog-ng OSE, see
[[Using name resolution in syslog-ng]].
