---
title: Configuring TLS on the syslog-ng server
id: adm-tls-server-conf
---

## Purpose

Complete the following steps on the syslog-ng server:

## Steps

1. Create an X.509 certificate for the syslog-ng server.

    >**NOTE:** The subject_alt_name parameter (or the Common Name parameter
    >if the subject_alt_name parameter is empty) of the server\'s
    >certificate must contain the hostname or the IP address (as resolved
    >from the syslog-ng clients and relays) of the server (for example,
    >syslog-ng.example.com).
    >  
    >Alternatively, the Common Name or the subject_alt__name parameter
    >can contain a generic hostname, for example, *.example.com.
    >  
    >Note that if the Common Name of the certificate contains a generic
    >hostname, do not specify a specific hostname or an IP address in the
    >subject_alt_name parameter.
    >{: .notice--info}

2. Copy the certificate (for example, syslog-ng.cert) of the syslog-ng
    server to the syslog-ng server host, for example, into the
    /opt/syslog-ng/etc/syslog-ng/cert.d directory. The certificate must
    be a valid X.509 certificate in PEM format.

3. Copy the private key (for example, syslog-ng.key) matching the
    certificate of the syslog-ng server to the syslog-ng server host,
    for example, into the /opt/syslog-ng/etc/syslog-ng/key.d directory.
    The key must be in PEM format. If you want to use a
    password-protected key, see Password-protected keys.

4. Add a source statement to the syslog-ng configuration file that uses
    the tls( key-file(key_file_fullpathname)
    cert-file(cert_file_fullpathname) ) option and specify the key and
    certificate files. The source must use the source driver (network()
    or syslog()) matching the destination driver used by the syslog-ng
    client.

    Example: A source statement using TLS

    The following source receives log messages encrypted using TLS,
    arriving to the 1999/TCP port of any interface of the syslog-ng
    server.

    ```config
    source demo_tls_source {
        network(ip(0.0.0.0) port(1999)
            transport("tls")
            tls( 
                key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
            )
        );
    };
    ```

    A similar source for receiving messages using the IETF-syslog
    protocol:

    ```config
    source demo_tls_syslog_source {
        syslog(ip(0.0.0.0) port(1999)
        transport("tls")
        tls(
            key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
            cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
            )
        );
    };
    ```

5. Disable mutual authentication for the source by setting the
    following TLS option in the source statement:  

    ```config
    tls(peer-verify(optional-untrusted);)
    ```

    If you want to authenticate the clients, you have to configure
    mutual authentication. For details, see
    [[Mutual authentication using TLS]].
    For the details of the available tls() options, see
    [[TLS options]].

    Example: Disabling mutual authentication

    The following source receives log messages encrypted using TLS,
    arriving to the 1999/TCP port of any interface of the syslog-ng
    server. The identity of the syslog-ng client is not verified.

    ```config
    source demo_tls_source {
        network(
            ip(0.0.0.0) port(1999)
            transport("tls")
            tls(
                key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
                peer-verify(optional-untrusted)
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
                peer-verify(optional-untrusted)
            )
        );
    };
    ```

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
    Do not forget to update the certificate and key files when they expire.
    {: .notice--warning}
