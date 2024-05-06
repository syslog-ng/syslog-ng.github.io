## ca-dir()

|Type:|   Directory name|
|Default:|           none|

*Description:* The name of a directory that contains a set of trusted CA
certificates in PEM format. The CA certificate files have to be named
after the 32-bit hash of the subject\'s name. This naming can be created
using the c\_rehash utility in openssl. For an example, see
[[Configuring TLS on the syslog-ng clients]].
The syslog-ng OSE application uses the CA
certificates in this directory to validate the certificate of the peer.

This option can be used together with the optional ca-file() option.

**NOTE:** During a TLS handshake, syslog-ng OSE automatically sets the
`certificate_authorities` field of the certificate request based on the `ca-file()`
and `ca-dir()` options.
{: .notice--info}