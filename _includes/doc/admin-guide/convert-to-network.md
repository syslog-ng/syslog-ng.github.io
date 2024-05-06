To replace your existing tcp(), tcp6(), udp(), udp6() {{ page.dors }}s with a
network() {{ page.dors }}, complete the following steps.

1. Replace the driver with **network**. For example, replace **udp(** with
    **network(**

2. Set the transport protocol.

    - If you used TLS-encryption, add the **transport("tls")**
        option, then continue with the next step.

    - If you used the tcp or tcp6 driver, add the
        **transport("tcp")** option.

    - If you used the udp or udp driver, add the
        **transport("udp")** option.

3. If you use IPv6 (that is, the udp6 or tcp6 driver), add the
    **ip-protocol(6)** option.

4. If you did not specify the port used in the old driver, check
    [[network() {{ page.dors }} options]]
    and verify that your clients send the messages to the default port of
    the transport protocol you use. Otherwise, set the appropriate port
    number in your {{ page.dors }} using the port() option.

5. All other options are identical. Test your configuration with the
    **syslog-ng --syntax-only** command.

    The following configuration shows a simple tcp {{ page.dors }}.

    ```config
    source {{ page.prefix }}_old_tcp {
        tcp(
            ip(127.0.0.1) port(1999)
            tls(
                peer-verify("required-trusted")
                key-file("/opt/syslog-ng/etc/syslog-ng/syslog-ng.key")
                cert-file('/opt/syslog-ng/etc/syslog-ng/syslog-ng.crt')
            )
        );
    };
    ```

    When replaced with the network() driver, it looks like this.

    ```config
    source {{ page.prefix }}_new_network_tcp {
        network(
            transport("tls")
            ip(127.0.0.1) port(1999)
            tls(
                peer-verify("required-trusted")
                key-file("/opt/syslog-ng/etc/syslog-ng/syslog-ng.key")
                cert-file('/opt/syslog-ng/etc/syslog-ng/syslog-ng.crt')
            )
        );
    };
    ```
