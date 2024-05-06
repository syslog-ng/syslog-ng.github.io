---
title: 'snmp: Sending SNMP traps'
short_title: snmp
id: adm-dest-snmp
description: >-
    The snmp() driver sends SNMP traps using the Simple Network Management
    Protocol version 2c or version 3. Incoming log messages can be converted
    to SNMP traps, as the fields of the SNMP messages can be customized
    using syslog-ng OSE macros.

    The snmp() driver is available in syslog-ng OSE version 3.22 and later.
---

**NOTE:** The snmp destination driver currently supports sending SNMP traps
only using the UDP transport protocol.

The snmp() driver requires the host(), trap-obj(), and snmp-obj()
options to be set, as well as the engine-id() and version() options when
using the SNMPv3 protocol. For the list of available optional
parameters, see [[snmp() destination options]].

**Declaration**

```config
destination d_snmp {snmp(host() trap-obj() snmp-obj() ...);};
```

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
If syslog-ng OSE cannot resolve the destination hostname during startup,
it will try to resolve the hostname again when the next message to be
sent as an SNMP trap is received. However, if this name resolution fails,
the trap will be dropped.
{: .notice--warning}

**NOTE:** The snmp() destination driver does not generate MARK signals
itself, but can receive and forward MARK signals.
{: .notice--info}

### Example: Using the snmp() destination driver

The following example defines an SNMP destination that uses the SNMPv2c
protocol.

```config
destination d_snmpv2c{
    snmp(
        version('v2c')
        host('192.168.1.1')
        trap-obj('.1.3.6.1.6.3.1.1.4.1.0', 'Objectid', '.1.3.6.1.4.1.18372.3.1.1.1.2.1')
        snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.1.0', 'Octetstring', 'Test SNMP trap')
        snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.2.0', 'Octetstring', 'admin')
        snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.3.0', 'Ipaddress', '192.168.1.1')
        );
};
```

The following example defines an SNMP destination that uses the SNMPv3
protocol and uses macros to fill the values of the SNMP objects.

```config
destination d_snmpv3{
    snmp(
        version('v3')
        host('192.168.1.1')
        port(162)
        engine-id('0xdeadbeefde')
        auth-username('myusername')
        auth-password('password')
        enc-algorithm('AES')
        enc-password('password')
        trap-obj('.1.3.6.1.6.3.1.1.4.1.0', 'Objectid', '.1.3.6.1.4.1.18372.3.1.1.1.2.1')
        snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.1', 'Octetstring', '${MESSAGE}')
        snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.2', 'Octetstring', 'admin')
        snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.3', 'Ipaddress', '${SOURCEIP}')
        );
};
```
