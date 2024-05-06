---
title: Using syslog()
description: We assume the same certificate set-up as outlined in the TLS-Encryption post.
id: dev-macos-mod-sup-using-syslog
---

### TLS-encryption using syslog() driver

#### Configuration Files Used

To test the TLS-encryption using syslog() driver, we will run two instances of syslog-ng. One where we are transmitting data using the public key. And another that will listen for the data on the TLS-encrypted network pipeline and decrypt the same.

_**Destination Configuration File (Client)**_

```config
@version: 3.31
@include "scl.conf"

options {
    stats-freq(10);
    time-reopen(10);
};

source custom
{
    example-msg-generator(
        num(20)
        freq(5)
        template("TLS Message")
    );
};

destination tls_destination {
    syslog(
        "0.0.0.0" port(1999)
        transport("tls")
        tls( 
            ca_dir("/usr/local/etc/ssl/clientSSL/ca.d")
            )
    );
};

log {
    source(custom);
    destination(tls_destination);
};
```

_**Source Configuration File (Server)**_

```config
@version: 3.31
@include "scl.conf"

options {
    stats-freq(10);
    time-reopen(10);
};

destination console{
    file(/dev/stdout);
};

source tls_source {
    syslog(
        ip(0.0.0.0) port(1999)
        transport("tls")
        tls(
            ca_dir("/usr/local/etc/ssl/ca.d")
            key-file("/usr/local/etc/ssl/key.d/privkey.pem")
            cert-file("/usr/local/etc/ssl/cert.d/cacert.pem")
            peer-verify(optional-untrusted)
        )
    );
};

log {
    source(tls_source);
    destination(console);
};
```

### Proof

![TLS-encryption tested on syslog() driver on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-07-06 at 4.01.08 PM.png>)

![TLS-encryption testing on the network() driver on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-07-15 at 1.13.41 AM.png>)
