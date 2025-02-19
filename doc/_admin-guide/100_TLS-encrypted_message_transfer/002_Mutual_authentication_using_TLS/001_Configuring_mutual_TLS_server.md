---
title: Configuring {{ site.product.short_name }} servers with mutual authentication
id: adm-tls-server-conf-mutual
description: >-
    This chapter describes how to configure TLS on {{ site.product.short_name }} servers with mutual authentication
---

## Purpose

Complete the following steps on the {{ site.product.short_name }} server:

## Steps

1. Create an X.509 certificate for the {{ site.product.short_name }} server.

2. Copy the certificate (for example, syslog-ng.cert) and the
    matching private key (for example, syslog-ng.key) to the {{ site.product.short_name }}
    server host, for example, into the
    /opt/syslog-ng/etc/syslog-ng/cert.d directory. The certificate must
    be a valid X.509 certificate in PEM format. The key must be in PEM format.
    If you want to use a password-protected key, see Password-protected keys.

3. Copy the CA certificate (for example, cacert.pem) of the Certificate
    Authority that issued the certificate of the {{ site.product.short_name }} clients to
    the {{ site.product.short_name }} server host, for example, into the
    /opt/syslog-ng/etc/syslog-ng/ca.d directory.

    If you wish to use the ca-dir() option, instead of the ca-file(), in the
    {{ site.product.short_name }} configuration file (step 4.) then
    - issue the following command on the certificate:\
    `openssl x509 -noout -hash -in cacert.pem`\
    The result is a hash (for example,
    6d2962a8), a series of alphanumeric characters based on the
    Distinguished Name of the certificate.
    - issue the following command to create a symbolic link to the
    certificate that uses the hash returned by the previous command and
    the **.0** suffix:\
    `ln -s cacert.pem 6d2962a8.0`

4. Add a source statement to the {{ site.product.short_name }} configuration file that uses
    the tls( key-file(key_file_fullpathname)
    cert-file(cert_file_fullpathname) ) option and specify the key and
    certificate files. The source must use the source driver (network()
    or syslog()) matching the destination driver used by the {{ site.product.short_name }}
    client. Also specify the directory storing the certificate of the CA
    that issued the client's certificate.

    For the details of the available tls() options, see
    TLS options.

    Example: A source statement using TLS

    The following source receives log messages encrypted using TLS,
    arriving to the 1999/TCP port of any interface of the {{ site.product.short_name }}
    server.

    ```config
    source demo_tls_source {
        network(
            ip(0.0.0.0) port(1999)
            transport("tls")
            tls(
                key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
                ca-dir("/opt/syslog-ng/etc/syslog-ng/ca.d")
            )
        );
    };
    ```

    A similar source for receiving messages using the IETF-syslog
    protocol:

    ```config
    source demo_tls_syslog_source {
        syslog(
            ip(0.0.0.0) port(1999)
            transport("tls")
            tls(
                key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
                ca-dir("/opt/syslog-ng/etc/syslog-ng/ca.d")        
            )
        );
    };
    ```

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
    Do not forget to update the certificate and key files when they expire.
    {: .notice--warning}
