---
title: Mutual authentication using TLS
id: adm-tls-mutual
description: >-
    This section describes how to configure mutual authentication between
    the syslog-ng server and the client. Configuring mutual authentication
    is similar to configuring TLS (for details, see
    Encrypting log messages with TLS), but the server verifies
    the identity of the client as well. Therefore, each
    client must have a certificate, and the server must have the certificate
    of the CA that issued the certificate of the clients. For the concepts
    of using TLS in syslog-ng, see Secure logging using TLS.
---

