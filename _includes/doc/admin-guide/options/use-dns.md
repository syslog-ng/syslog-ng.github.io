## use-dns()

|Accepted values:|      yes, no, persist_only|
|Default:|   yes|

*Description:* Enable or disable DNS usage. The persist_only option
attempts to resolve hostnames locally from file (for example, from
/etc/hosts). The syslog-ng OSE application blocks on DNS queries, so
enabling DNS may lead to a Denial of Service attack. To prevent DoS,
protect your syslog-ng network endpoint with firewall rules, and make
sure that all hosts which may get to syslog-ng are resolvable. This
option can be specified globally, and per-source as well. The local
setting of the source overrides the global option if available.

**NOTE:** This option has no effect if the keep-hostname() option is enabled
(keep-hostname(yes)) and the message contains a hostname.
{: .notice--info}
