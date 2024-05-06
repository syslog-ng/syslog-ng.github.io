## ca-file()

|Type:|   File name|
|Default:|           empty|

*Description:* Optional. The name of a file that contains a set of
trusted CA certificates in PEM format. The syslog-ng OSE application
uses the CA certificates in this file to validate the certificate of the
peer.

Example format in configuration:

```config
ca-file("/etc/pki/tls/certs/ca-bundle.crt")
```

**NOTE:** The `ca-file()` option can be used together with the `ca-dir()`
option, and it is relevant when peer-verify() is set to other than no or
`optional-untrusted`.
{: .notice--info}

**NOTE:** During a TLS handshake, syslog-ng OSE automatically sets the
`certificate_authorities` field of the certificate request based on the `ca-file()`
and `ca-dir()` options.
{: .notice--info}