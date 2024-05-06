---
title: network() Destination Driver
description: >-
  The network() destination driver can send syslog messages conforming to
  RFC3164 from the network using the TCP, TLS, and UDP networking protocols.
id: dev-macos-mod-sup-net-dest
---

## Status

| UDP | x86\_64 | Works |
| :-: | :-----: | :---: |
| UDP |   ARM   | Works |
| TCP | x86\_64 | Works |
| TCP |   ARM   | Works |

**Note**\
The network destination driver also includes TCP transmission on a TLS-encrypted channel, however, this is tested and verified in a separate post dealing with TLS-encryption with syslog-ng [here](tls-encryption/).

### How to Test

#### **Configuration Files Used**

To test the network destination driver, we will run two instances of syslog-ng. One where we are transmitting data using the network destination driver that needs to be tested. And another that will listen for the data on the network pipeline established. \
The network source driver used in the latter has been tested, click [here](network-source-driver) to read that.

_**Destination Config File**_

```config
#Detination 
@version: 3.31
@include "scl.conf"

options {
    stats-freq(10);
    time-reopen(10);
};

source custom
{
    example-msg-generator(
        num(1)
        template("Syslog-ng instance transmitting data is live.")
    );
    example-msg-generator(
        num(20)
        freq(5)
        template("Message to TCP Destination using Network Driver")
    );
    example-msg-generator(
        num(20)
        freq(5)
        template("Message to UDP Destination using Network Driver")
    );
};

destination d_tcp {
    network(
        "127.0.0.1"
        port(1999)
        transport(tcp)
    );
};

destination d_udp {
    network(
        "127.0.0.1"
        port(5060)
        transport(udp)
    );
};

destination console{
    file(/dev/stdout);
};

log {
    source(custom);
    if (message("TCP")) {  
        destination(d_tcp);
    } elif (message("UDP")) {
        destination(d_udp);
    } else {
        destination(console);
    };
};
```

_**Source Config File**_

```config
#Source
@version: 3.31
@include "scl.conf"

options {
    stats-freq(10);
    time-reopen(10);
};

source s_tcp {
    network(port(1999) transport("tcp"));
};

source s_udp {
    network(port(5060) transport("udp"));
};

destination console{
    file(/dev/stdout);
};

log {
    source(s_tcp);
    source(s_udp);
    destination(console);
};
```

(Note: For more information on how to do conditional destination routing and using template function, click [here](https://www.syslog-ng.com/technical-documents/doc/syslog-ng-open-source-edition/3.26/administration-guide/55#TOPIC-1431112).)

### Proof

![Network destination driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-08 at 3.13.33 PM.png>)

![Network destination driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-08 at 3.31.08 PM.png>)





