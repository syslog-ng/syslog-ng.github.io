## cert-file()

|  Accepted values:|   Filename|
|  Default: |          none|

*Description:* Name of a file, that contains an X.509 certificate (or a
certificate chain) in PEM format, suitable as a TLS certificate,
matching the private key set in the key-file() option. The syslog-ng OSE
application uses this certificate to authenticate the syslog-ng OSE
client on the destination server. If the file contains a certificate
chain, the file must begin with the certificate of the host, followed by
the CA certificate that signed the certificate of the host, and any
other signing CAs in order.
