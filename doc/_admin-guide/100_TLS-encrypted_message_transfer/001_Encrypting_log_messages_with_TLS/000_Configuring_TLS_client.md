---
title: Configuring TLS on the syslog-ng clients
id: adm-tls-client-conf
---

## Purpose

Complete the following steps on every syslog-ng client host. Examples
are provided using both the legacy BSD-syslog protocol (using the
network() driver) and the new IETF-syslog protocol standard (using the
syslog() driver):

## Steps

1. Copy the CA certificate (for example, cacert.pem) of the Certificate
    Authority that issued the certificate of the syslog-ng server (or
    the self-signed certificate of the syslog-ng server) to the
    syslog-ng client hosts, for example, into the
    /opt/syslog-ng/etc/syslog-ng/ca.d directory.

    Issue the following command on the certificate: `openssl x509
    -noout -hash -in cacert.pem` The result is a hash (for example,
    6d2962a8), a series of alphanumeric characters based on the
    Distinguished Name of the certificate.

    Issue the following command to create a symbolic link to the
    certificate that uses the hash returned by the previous command and
    the **.0** suffix.

    `ln -s cacert.pem 6d2962a8.0`

2. Add a destination statement to the syslog-ng configuration file that
    uses the tls( ca-dir(path_to_ca_directory) ) option and specify
    the directory using the CA certificate. The destination must use the
    network() or the syslog() destination driver, and the IP address and
    port parameters of the driver must point to the syslog-ng server.

    Example: A destination statement using TLS

    The following destination encrypts the log messages using TLS and
    sends them to the 6514/TCP port of the syslog-ng server having the
    10.1.2.3 IP address.

    ```config
    destination demo_tls_destination {
        network("10.1.2.3" port(6514)
            transport("tls")
            tls( ca_dir("/opt/syslog-ng/etc/syslog-ng/ca.d"))
        );
    };
    ```

    A similar statement using the IETF-syslog protocol and thus the
    syslog() driver:

    ```config
    destination demo_tls_syslog_destination {
        syslog("10.1.2.3" port(6514)
                            transport("tls")
            tls(ca_dir("/opt/syslog-ng/etc/syslog-ng/ca.d"))
        );
    };
    ```

3. Include the destination created in Step 2 in a log statement.

{% include doc/admin-guide/warnings/tls-cert.md %}
