### Example: Anonymizing IP addresses

The following example replaces every IPv4 address in the MESSAGE part
with its SHA-1 hash:

```config
rewrite pseudonymize_ip_addresses_in_message {subst ("((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))", "$(sha1 $0)", value("MESSAGE"));};
```
