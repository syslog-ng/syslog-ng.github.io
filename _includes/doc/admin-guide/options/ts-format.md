## ts-format()

|  Type:|      rfc3164, bsd, rfc3339, iso|
| Default:   |rfc3164|

*Description:* Override the global timestamp format (set in the global
ts-format() parameter) for the specific destination. For details, see
[[ts-format()]].

**NOTE:** This option applies only to file and file-like destinations.
Destinations that use specific protocols (for example, network(), or
syslog()) ignore this option. For protocol-like destinations, use a
template locally in the destination, or use the
[[proto-template]] option.
{: .notice--info}
