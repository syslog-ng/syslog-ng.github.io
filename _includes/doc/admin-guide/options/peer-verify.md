## peer-verify()

|Accepted values:|   optional-trusted \| optional-untrusted \| required-trusted \| required-untrusted \| yes \| no|
|Default:|           required-trusted|

*Description:* Verification method of the peer, the four possible values
is a combination of two properties of validation:

- Whether the peer is required to provide a certificate (required or
    optional prefix).

- Whether the certificate provided needs to be valid or not.

The following table summarizes the possible options and their results
depending on the certificate of the peer.

The remote peer has:

|||no certificate|invalid certificate|valid certificate|
|Local peer-verify() setting|optional-untrusted|   TLS-encryption |       TLS-encryption  | TLS-encryption|
||optional-trusted|   TLS-encryption |       rejected connection  | TLS-encryption|
||required-untrusted |       rejected connection         |TLS-encryption |TLS-encryption   |
||required-trusted |       rejected connection         |rejected connection |TLS-encryption   |

For untrusted certificates only the existence of the certificate is
checked, but it does not have to be valid --- syslog-ng accepts the
certificate even if it is expired, signed by an unknown CA, or its CN
and the name of the machine mismatches.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
When validating a certificate, the entire certificate chain must be valid,
including the CA certificate. If any certificate of the chain is invalid,
syslog-ng OSE will reject the connection.
{: .notice--warning}

Starting with syslog-ng OSE version 3.10, you can also use a simplified
configuration method for the peer-verify option, simply setting it to
**yes** or **no**. The following table summarizes the possible options
and their results depending on the certificate of the peer.

The remote peer has:

|||no certificate|invalid certificate|valid certificate|
|Local peer-verify() setting|no (optional-untrusted)|   TLS-encryption |       TLS-encryption  | TLS-encryption|
||yes (required-trusted) |       rejected connection         |rejected connection |TLS-encryption   |
