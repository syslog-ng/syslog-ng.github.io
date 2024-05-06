---
title: syslog() Source/Destination Driver
description: >-
  The syslog() driver can be used to send and receive messages from the network
  using the standard IETF-syslog protocol.
id: dev-macos-mod-sup-syslog
---

### Important Information

Please keep in mind, that the syslog() driver using the standard IEFT-syslog protocol for sending and receiving messages. The IEFT protocol uses frames to separate the individual messages instead of a newline character, thus prototyping with tools such as Netcat might result in an invalid header error.&#x20;

> NOTE: \
> The syslog() driver can also receive/send the legacy BSD-syslog-formatted messages.\
> \
> The syslog driver also includes TCP messaging on a TLS-encrypted channel, however, this is tested and verified in a separate post dealing with TLS-encryption with syslog-ng [here](tls-encryption/).

### Status

| Protocol | Architecture | Source | Destination |
| :------: | :----------: | :----: | :---------: |
|    UDP   |      x86     |  Works |    Works    |
|    UDP   |      ARM     |  Works |    Works    |
|    TCP   |      x86     |  Works |    Works    |
|    TCP   |      ARM     |  Works |    Works    |

### How to test

#### Configuration Files Used

To test the syslog driver -- both source and destination drivers, we will run two instances of syslog-ng. One where we are transmitting data using the syslog destination driver that needs to be tested. And another that will listen for the data on the network pipeline established using the syslog source driver.

_**Destination Configuration File**_

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
        template("Message to TCP Destination using Syslog Driver")
    );
    example-msg-generator(
        num(20)
        freq(5)
        template("Message to UDP Destination using Syslog Driver")
    );
};

destination d_tcp { 
    syslog( "127.0.0.1" port(1999) transport(tcp) );
};

destination d_udp {
    syslog( "127.0.0.1" port(5060) transport(udp) );
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

(Note: For more information on how to do conditional destination routing and using template function, click [here](https://www.syslog-ng.com/technical-documents/doc/syslog-ng-open-source-edition/3.26/administration-guide/55#TOPIC-1431112).)

_**Source Configuration File**_

```config
@version: 3.31
@include "scl.conf"

options {
    stats-freq(10);
    time-reopen(10);
};

source s_syslog {
    syslog(ip(127.0.0.1) port(1999) transport("tcp"));
    syslog(ip(127.0.0.1) port(5060) transport("udp"));
};

destination console{
    file(/dev/stdout);
};

log {
    source(s_syslog);
    destination(console);
};
```

### **Proof**&#x20;

![Syslog driver tested on macOS (x86)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-09 at 3.43.27 PM.png>)

![Syslog driver tested on macOS (ARM)](<{{dev_img_folder}}/module-support/Screenshot 2021-06-09 at 3.49.45 PM.png>)
