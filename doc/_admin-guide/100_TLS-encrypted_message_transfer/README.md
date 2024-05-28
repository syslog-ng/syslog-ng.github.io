---
title: TLS-encrypted message transfer
id: adm-tls
description: >-
    The {{ site.product.short_name }} application can send and receive log messages securely
    over the network using the Transport Layer Security (TLS) protocol using
    the network() and syslog() drivers.
---

## Secure logging using TLS

**NOTE:** This chapter describes how to use TLS encryption when using the
standard syslog protocols, that is, the network() and syslog() drivers,
for example, to forward log messages between two {{ site.product.short_name }} nodes, or to
send log data to {{ site.product.short_name }} Store Box or another log server. Other
destinations that support TLS-encryption are not discussed in this
chapter (for example, [[http())|adm-dest-http-nonjava]]).
{: .notice--info}

TLS uses certificates to authenticate and encrypt the communication, as
illustrated on the following figure:

### Figure 19: Certificate-based authentication

![]({{ adm_img_folder | append: 'fig-certificate-based-authentication01.png'}})

The client authenticates the server by requesting its certificate and
public key. Optionally, the server can also request a certificate from
the client, thus mutual authentication is also possible.

In order to use TLS encryption in {{ site.product.short_name }}, the following elements are
required:

- A certificate on the {{ site.product.short_name }} server that identifies the syslog-ng
    server.

- The certificate of the Certificate Authority that issued the
    certificate of the {{ site.product.short_name }} server (or the self-signed certificate
    of the {{ site.product.short_name }} server) must be available on the {{ site.product.short_name }} client.

When using mutual authentication to verify the identity of the clients,
the following elements are required:

- A certificate must be available on the {{ site.product.short_name }} client. This
    certificate identifies the {{ site.product.short_name }} client.

- The certificate of the Certificate Authority that issued the
    certificate of the {{ site.product.short_name }} client must be available on the
    {{ site.product.short_name }} server.

Mutual authentication ensures that the {{ site.product.short_name }} server accepts log
messages only from authorized clients.

For more information about configuring TLS communication in {{ site.product.short_name }},
see Encrypting log messages with TLS.
For more information about TLS-related error messages, see
Error messages.
