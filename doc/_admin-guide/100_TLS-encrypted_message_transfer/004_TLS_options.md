---
title: TLS options
id: adm-tls-opt
description: >-
    The syslog-ng application can encrypt incoming and outgoing syslog
    message flows using TLS if you use the network() or syslog()
    drivers.
---

**NOTE:** The format of the TLS connections used by syslog-ng is similar to
using syslog-ng and stunnel, but the source IP information is not lost.
{: .notice--info}

To encrypt connections, use the **transport(\"tls\")** and **tls()**
options in the source and destination statements.

The tls() option can include the following settings:

## allow-compress()

|  Accepted values:|   yes \| no|
|  Default:  |         no|

*Description:* Enable on-the-wire compression in TLS communication. Note
that this option must be enabled both on the server and the client to
have any effect. Enabling compression can significantly reduce the
bandwidth required to transport the messages, but can slightly decrease
the performance of syslog-ng OSE, reducing the number of transferred
messages during a given period.

Available in version 3.19 and later.

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/options/cert-file.md %}

{% include doc/admin-guide/options/cipher-suite.md %}

## crl-dir()

|  Accepted values:  | Directory name|
|Default:           |none|

*Description:* Name of a directory that contains the Certificate
Revocation Lists for trusted CAs. Similarly to ca-dir() files, use the
32-bit hash of the name of the issuing CAs as filenames. The extension
of the files must be .r0.

## dhparam-file()

|  Accepted values:|   string (filename)|
|  Default:|           none|

*Description:* Specifies a file containing Diffie-Hellman parameters,
generated using the openssl dhparam utility. Note that syslog-ng OSE
supports only DH parameter files in the PEM format. If you do not set
this parameter, [syslog-ng OSE uses the 2048-bit MODP Group, as
described in RFC 3526](https://www.ietf.org/rfc/rfc3526.txt).

## ecdh-curve-list()

|Accepted values:   |string \[colon-separated list\]|
|Default:|           none|

*Description:* A colon-separated list that specifies the curves that are
permitted in the connection when using Elliptic Curve Cryptography
(ECC).

This option is only available when syslog-ng is compiled with OpenSSL
version 1.0.2 or later. In the case of older versions, prime256v1 (NIST
P-256) is used.

The following example curves work for all versions of OpenSSL that are
equal to or later than version 1.0.2:

```config
ecdh-curve-list("prime256v1:secp384r1")
```

## tls-options-sigalgs

|  Accepted values:|   string \[colon-separated list\]|
|  Default: |          none|

*Description:* A colon-separated list that specifies the supported
signature algorithms associated with client authentication for TLSv1.2
and higher, for example, **RSA-PSS+SHA256:ed25519**.

For servers, the value is used in the

> signature_algorithms

field of a

> CertificateRequest

message.

For clients, it is used to determine which signature algorithm to use
with the client certificate.

{% include doc/admin-guide/options/key-file.md %}

## keylog-file()

|  Accepted values:|   Filename|
|  Default:         |  N/A|

*Description:* This option enables saving TLS secrets (decryption keys)
for a given source or destination, which can be used to decrypt data
with, for example, Wireshark. The given path and name of a file will be
used to save these secrets.

This option is only available with the following drivers:

- network

- syslog

- tcp

- tcp6

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Using keylog-file() makes TLS connections less secure by writing secret key
materials into the given file. This option should only be enabled for debugging
purposes and should be disabled after that. It is also recommended to delete
the file after the debugging session is over.
{: .notice--warning}

## ocsp-stapling-verify()

|  Accepted values:|   yes, no|
|  Default:         |  no |

This option is available in syslog-ng OSE 4.0 and later versions.

*Description:* In case the OCSP stapling verification is enabled, syslog-ng OSE requests the server to return its OCSP status. This status response is verified by syslog-ng OSE using the trust store configured by the ca-file(), ca-dir(), or the pkcs12-file() options.

**NOTE:** RFC 6961 multi-stapling and TLS 1.3-provided multiple responses are currently not validated, only the peer certificate is verified.
{: .notice--info}

### Example: OCSP stapling verification

```config
destination {

    network("example.com" transport(tls)
        tls(
            pkcs12-file("/path/to/test.p12")
            peer-verify(yes)
            ocsp-stapling-verify(yes)
        )
    );
};
```

## openssl-conf-cmds()

This option is available in syslog-ng OSE 4.0 and later versions.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
openssl-conf-cmds() always has the highest priority. It overrides any other option found in the tls() section.
{: .notice--warning}

OpenSSL offers an alternative and software-independent configuration mechanism through the SSL_CONF_cmd interface for configuring the various SSL_CTX and SSL options.

The order of operations within openssl-conf-cmds() affects the order of execution. The commands are executed in top-down order. If the same option occurs multiple times, the last executed option takes effect. This is also true for options that can be set multiple ways (for example, cipher suites or protocols).

### Example: OpenSSL command configuration

```config
tls(
        ca-dir("/etc/ca.d")
        key-file("/etc/cert.d/serverkey.pem")
        cert-file("/etc/cert.d/servercert.pem")
        peer-verify(yes)

        openssl-conf-cmds(
            # For system wide available cipher suites use: /usr/bin/openssl ciphers -v
            # For formatting rules see: https://www.openssl.org/docs/man1.1.1/man3/SSL_CONF_cmd.html
            "CipherString" => "ECDHE-RSA-AES128-SHA",                                   # TLSv1.2 and bellow
            "CipherSuites" => "TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384",    # TLSv1.3+ (OpenSSl 1.1.1+)

            "Options" => "PrioritizeChaCha",
            "Protocol" => "-ALL,TLSv1.3",
        )
    )
```

{% include doc/admin-guide/options/peer-verify.md %}

## pkcs12-file()

|  Accepted values:  | Filename|
|  Default:          | none|

*Description:* The name of a PKCS \#12 file that contains an unencrypted
private key, an X.509 certificate, and an optional set of trusted CA
certificates.

If this option is used in the configuration, the value of key-file() and
cert-file() will be omitted.

You can use the ca-dir() option together with pkcs12-file(). However,
this is optional because the PKCS \#12 file may contain CA certificates
as well.

Passphrase is currently not supported.

### Example: Using pkcs12-file()

In the following example, the first command creates a single PKCS \#12
file from the private key, X.509 certificate, and CA certificate files.
Then, the second half of the example uses the same PKCS \#12 file in the
syslog-ng configuration.

```bash
openssl pkcs12 -export -inkey server.key -in server.crt -certfile ca.crt -out server.p12
```

### Example configuration

```config
source s_tls {
    syslog(
        transport(tls)
        tls(
            pkcs12-file("/path/to/server.p12")
            ca-dir("/path/to/cadir") # optional
            peer-verify(yes)
        )
    );
};
```

## sni()

|Accepted values:|   yes \| no|
|Default: |          no|

*Description:* When set to yes in a destination that uses TLS
encryption, this option enables [Server Name
Indication](https://tools.ietf.org/html/rfc6066#page-6) (also called
Server Name Identification, SNI). The syslog-ng OSE sends the hostname
or the IP address set in the destination to the server during the TLS
handshake.

Available in syslog-ng OSE 3.24 and newer.

### Example: Using Server Name Indication

The following destination sends the hostname of its destination during
the TLS handshake.

```config
destination demo_tls_destination_with_sni {
    network(
          "logserver.example.com" port(6514)
        transport("tls")
        tls(
            ca_dir("/etc/syslog-ng/ca.d")
            key-file("/etc/syslog-ng/cert.d/clientkey.pem")
            cert-file("/etc/syslog-ng/cert.d/clientcert.pem")
            sni(yes)
        )
    );
};
```

## ssl-options()

| Accepted values:|   comma-separated list of the following options: `no-sslv2`, `no-sslv3`, `no-tlsv1`, `no-tlsv11`, `no-tlsv12`, `no-tlsv13`, `none`, `ignore-hostname-mismatch`, `ignore-validity-period`|
|Default:  |         `no-sslv2`|

This option is available in syslog-ng OSE 3.7 and newer.

*Description:* Sets the specified options of the SSL/TLS protocols.
Currently, you can use it to disable specific protocol versions. Note
that disabling a newer protocol version (for example, TLSv1.1) does not
automatically disable older versions of the same protocol (for example,
TLSv1.0). For example, use the following option to permit using only
TLSv1.1 or newer:

```config
ssl-options(no-sslv2, no-sslv3, no-tlsv1)
```

Using ssl-options(none) means that syslog-ng OSE does not specify any
restrictions on the protocol used. However, in this case, the underlying
OpenSSL library can restrict the available protocols, for example,
certain OpenSSL versions automatically disable SSLv2.

By specifying `ignore-hostname-mismatch`, the subject name of a certificate can be ignored during the validation process. This means that syslog-ng OSE checks only if the certificate itself is trusted by the current set of trust anchors (for example trusted CAs), and ignores the mismatch between the targeted hostname and the certificate subject. `ignore-hostname-mismatch` is available in syslog-ng OSE 4.4 and newer versions.

By specifying `ignore-validity-period`, the validity periods of a certificate can be ignored during the certificate validation process. `ignore-validity-period` is available in syslog-ng OSE 4.5 and newer.

### Example: Using ssl-options

The following destination explicitly disables SSL and TLSv1.0

```config
destination demo_tls_destination {
    network(
          "172.16.177.147" port(6514)
        transport("tls")
        tls(
            ca_dir("/etc/syslog-ng/ca.d")
            key-file("/etc/syslog-ng/cert.d/clientkey.pem")
            cert-file("/etc/syslog-ng/cert.d/clientcert.pem")
            ssl-options(no-sslv2, no-sslv3, no-tlsv1)
        )
    );
};
```

## ssl-version()

|Type:|   string|
|Default: |          None, uses the libcurl default|

Available in syslog-ng OSE 4.5 and later versions.

*Description:* This option specifies the allowed SSL/TLS version. The available values are the following: `sslv2`, `sslv3`, `tlsv1`, `tlsv1_0`, `tlsv1_1`, `tlsv1_2`, `tlsv1_3`.

## trusted-dn()

|  Accepted values:  | list of accepted distinguished names|
|  Default:          | none|

*Description:* To accept connections only from hosts using certain
certificates signed by the trusted CAs, list the distinguished names of
the accepted certificates in this parameter. For example, using
trusted-dn(\"\*, O=Example Inc, ST=Some-State, C=\*\") will accept only
certificates issued for the Example Inc organization in Some-State
state.

## trusted-keys()

|  Accepted values:|   list of accepted SHA-1 fingerprints|
|  Default:         |  none|

*Description:* To accept connections only from hosts using certain
certificates having specific SHA-1 fingerprints, list the fingerprints
of the accepted certificates in this parameter.  
For example,

```config
trusted-keys(\"SHA1:00:EF:ED:A4:CE:00:D1:14:A4:AB:43:00:EF:00:91:85:FF:89:28:8F\",
\"SHA1:0C:42:00:3E:B2:60:36:64:00:E2:83:F0:80:46:AD:00:A8:9D:00:15\").
```

To find the fingerprint of a certificate, you can use the following
command: **openssl x509 -in \<certificate-filename\> -sha1 -noout
-fingerprint**

>**NOTE:** When using the trusted-keys() and trusted-dn() parameters,
>note the following:  
>  
>- First, the trusted-keys() parameter is checked. If the fingerprint  
>    of the peer is listed, the certificate validation is performed.  
>  
>- If the fingerprint of the peer is not listed in the trusted-keys()  
>    parameter, the trusted-dn() parameter is checked. If the DN of the  
>    peer is not listed in the trusted-dn() parameter, the authentication  
>    of the peer fails and the connection is closed.  
{: .notice--info}
