---
title: TLS-Encryption
description: >-
  The syslog-ng application can send and receive log messages securely over the
  network using the Transport Layer Security (TLS) protocol using the network()
  and syslog() drivers.
id: dev-macos-mod-sup-tls
---

### Status

|  Driver | Architecture | Source | Destination |
| :-----: | :----------: | :----: | :---------: |
| network |      x86     |  Works |    Works    |
| network |      ARM     |  Works |    Works    |
|  syslog |      x86     |  Works |    Works    |
|  syslog |      ARM     |  Works |    Works    |

### How to test

To test TLS-encrypted message transfer, we first need to set up an SSL certificate on the server end and share the public key to the encrypting channel, ie, the clients. This test is using non-mutual authentication. In other words, the clients use the server public key to encrypt the syslog-ng messages sent to the server but the server does not check the identity of the clients. In our test, of course, we will stimulate the server-client set-up by running two instances of syslog-ng.

On a mac system, the default configuration file is stored at `/usr/local/etc`. So we will navigate to this folder and make a folder named SSL to store all that's necessary for TLS encryption.&#x20;

Below are the steps I took to set up the source instance of syslog-ng. The following commands will generate both the CA certificate as well as the private key. Of course, your private key should always stay private and the public key (ca-key) is what we will hand out to clients.

{: .notice--info}
**Note:**
These instruction are pertaining to openssl, not LibreSSL which is the provided by macOS. You can check using the `openssl version` command.

If you need to have openssl@1.1 first in your PATH, run:\
`echo 'export PATH="/opt/homebrew/opt/openssl@1.1/bin:$PATH"' >> ~/.zshrc`

```shell
> cd /usr/local/etc
> mkdir ssl
> cd ssl
> mkdir cert.d
> mkdir key.d
> cd cert.d
> openssl req -new -x509 -out cacert.pem -days 1095 -nodes
#Fill in the information as required to get cacert.pem and privkey.pem
> mv privkey.pem ../key.d
```

Now, to set up the destination instance of syslog-ng. In a multi-machine set up, we would share the cacert.pem file with the client nodes so they can encrypt the messages accordingly. However, since we are stimulating both instances on the same machine, we will create a new folder named sslClient. The following steps will set up the client-side TLS needs.

We are basically sharing the public key of the certification with the client machines. We also view the hash of the certificate and create a symbolic link to the certificate.

```shell
> cd /usr/local/etc/ssl
> mkdir sslClient
> mkdir ca.d
> cp /usr/local/etc/ssl/cert.d/cacert.pem ./ca.d
> cd ca.d
> openssl x509 -noout -hash -in cacert.pem
e81fe100
> sudo ln -s ./cacert.pem e81fe100.0
```

Now that we have the certificate made, and the appropriate keys shared, we can test the TLS-encrypted messaging using [network()](using-network and [syslog()](using-syslog drivers.
