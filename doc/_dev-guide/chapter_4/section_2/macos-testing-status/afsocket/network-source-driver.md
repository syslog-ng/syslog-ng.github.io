---
title: network() Source Driver
description: >-
  The network() source driver can receive syslog messages conforming to RFC3164
  from the network using the TCP and UDP networking protocols. It belongs in the
  afsocket module.
id: dev-macos-mod-sup-net-src
---

### **Status**

| UDP | x86\_64 | Works |
| :-: | :-----: | :---: |
| UDP |   ARM   | Works |
| TCP | x86\_64 | Works |
| TCP |   ARM   | Works |

**Note**\
The network source driver also includes TCP source listening on a TLS-encrypted channel, however, this is tested and verified in a separate post dealing with TLS-encryption with syslog-ng [here](tls-encryption/).

### **How to Test**

**Configuration File Used**

We can set up our syslog-ng configuration, such that it is listening for TCP and UDP protocol messages on the specified ports.

```config
@version: 3.31
@include "scl.conf"

options {
    stats-freq(10);
};

source s_network_tcp {
    network(port(1999) transport("tcp"));
};

source s_network_udp {
    network(port(5060) transport("udp"));
};

destination console{
    file(/dev/stdout);
};

log {
    source(s_network_udp);
    source(s_network_tcp);
    destination(console);
};
```

**Test Functionality and Proof**

When we run syslog-ng with this configuration file, we will begin a server that listens on the respective ports. We can also use netcat, a tool built into macOS, to connect to the recently opened port from the client-side and test it by sending messages.

**Note:** By default, using the network driver will cause syslog-ng to listen on IPv4, which is why we have used the -4 flag with netcat to force IPv4. This can be skipped with TCP as it will try to connect on IPv6, determine this isn’t working, and retry with IPv4. But UDP being connectionless, cannot detect it should fall back to IPv4.

![Testing the network() source driver on macOS (x86)](/assets/images/test\_x86.png)

![Testing the network() source driver on macOS (ARM)](/assets/images/test\_arm.png)
