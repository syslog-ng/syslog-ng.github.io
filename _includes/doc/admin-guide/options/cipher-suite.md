## cipher-suite()

|  Accepted values: |  Name of a cipher, or a colon-separated list|
|  Default:          | Depends on the OpenSSL version that syslog-ng OSE uses|

*Description:* Specifies the cipher, hash, and key-exchange algorithms
used for the encryption, for example, ECDHE-ECDSA-AES256-SHA384. The
list of available algorithms depends on the version of OpenSSL used to
compile syslog-ng OSE. To specify multiple ciphers, separate the cipher
names with a colon, and enclose the list between double-quotes, for
example:

```config
cipher-suite("ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384")
```

For a list of available algorithms, execute the `openssl ciphers -v`
command. The first column of the output contains the name of the
algorithms to use in the cipher-suite() option, the second column
specifies which encryption protocol uses the algorithm (for example,
TLSv1.2). That way, the cipher-suite() also determines the encryption
protocol used in the connection: to disable SSLv3, use an algorithm that
is available only in TLSv1.2, and that both the client and the server
supports. You can also specify the encryption protocols using
[[ssl-options()]].

You can also use the following command to automatically list only
ciphers permitted in a specific encryption protocol, for example,
TLSv1.2:

```bash
echo "cipher-suite(\"$(openssl ciphers -v | grep TLSv1.2 | awk '{print $1}' | xargs echo -n | sed 's/ /:/g' | sed -e 's/:$//')\")"
```

Note that starting with version 3.10, when syslog-ng OSE receives
TLS-encrypted connections, the order of ciphers set on the syslog-ng OSE
server takes precedence over the client settings.
