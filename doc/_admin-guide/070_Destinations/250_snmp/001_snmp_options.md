---
title: snmp() destination options
srv: 'SNMP server'
port: '162'
id: adm-dest-snmp-opt
---

This driver sends SNMP traps using the SNMP v2c or v3 protocol.

The snmp() destination has the following options:

## auth-algorithm()

|  Type:   |   SHA \| sha|
|  Default: |  SHA|

*Description:* The authentication method to use. Lowercase values (for
example, sha) can be used as well.

This option is used with the SNMPv3 protocol.

## auth-password()

|  Type:  |    string|
|Default: |  empty string|

*Description:* The password used for authentication. If the
auth-username() option is set but the auth-password() is empty,
syslog-ng OSE will try to authenticate with an empty password.

This option is used with the SNMPv3 protocol.

## auth-username()

|  Type:  |    string|
|  Default: |  empty string|

*Description:* The username used to authenticate on the SNMP server. If
this parameter is set, syslog-ng OSE will try to authenticate on the
SNMP server.

This option is used with the SNMPv3 protocol.

## community()

|  Type:  |    string|
|  Default:|   public|

*Description:* The community string used for SNMPv2c authentication.

This option is used with the SNMPv2c protocol.

## enc-algorithm()

|  Type: |     AES \| aes|
|  Default: |  AES|

*Description:* The encryption method used to encrypt the SNMP traffic.
Lowercase values (for example, aes) can be used as well.

This option is used with the SNMPv3 protocol.

## enc-password()

|  Type:    |  string|
|  Default:||

*Description:* The password used for the encryption. Encryption is used
only if the enc-password() is not empty.

This option is used with the SNMPv3 protocol.

## engine-id()

|  Type:  |    number (hexadecimal number)|
|Default:||

*Description:* The engine ID is a hexadecimal number at least 10 digits
long, starting with 0x. for example, 0xABABABABAB.

This option is a required parameter when using the SNMPv3 protocol.

{% include doc/admin-guide/options/host.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/port.md %}

## snmp-obj()

|Type:   |   \<oid\_of\_the\_object\>, \<type\_of\_the\_object\>, \<value\_of\_the\_object\>|
|Default:|   n/a|

*Description:* The snmp-obj() option can be used to create custom SNMP
trap elements. To create a trap element, specify the OID, type, and
value of the element in the snmp-obj() option. To send SNMP traps, at
least one snmp-obj() option must be defined. The snmp-obj() option
requires the following parameters. Note that syslog-ng OSE does not
validate the values of these elements.

- \<oid\_of\_the\_object\>: The object id of the SNMP object, for
    example, .1.3.6.1.4.1.18372.3.1.1.1.1.1.

- \<type\_of\_the\_object\>: The type of the object specified as an
    ASN.1 primitive. One of: Integer, Timeticks, Octetstring, Counter32,
    Ipaddress, Objectid. The type names are not case sensitive.

- \<value\_of\_the\_object\>: The value of the object as a string. The
    macros of syslog-ng OSE can be used to set these values, making it
    possible to transfer the content and other metadata from the the
    syslog message to the SNMP trap. Note that if the value of an
    Integer, Counter32 or Timeticks object is not a number (for example,
    is an empty string or other not-number string), syslog-ng OSE will
    automatically replace the value with 0. The values of other types of
    objects are not validated.

### Example: Defining SNMP objects

The following are SNMP object definitions:

```config
snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.3', 'Ipaddress', '192.168.1.1')
snmp-obj('.1.3.6.1.4.1.18372.3.1.1.1.1.2', 'Octetstring', '${MESSAGE}')
```

{% include doc/admin-guide/options/time-zone.md %}

## trap-obj()

|Type:    | \<oid\_of\_the\_object\>, \"Objectid\", \<value\_of\_the\_object\>|
|Default: |  n/a|

*Description:* The trap-obj() is a specialized version of the snmp-obj()
option that is used to identify the SNMP trap object. The type of the
trap object is always Objectid. The \<oid\_of\_the\_object\> and the
\<value\_of\_the\_object\> parameters are identical to the respective
parameters of the snmp-obj() option. For details on these parameters,
see [[snmp-obj()]].

**NOTE:** Using the trap-obj() object is equivalent to using the snmp-obj()
with the Objectid type.
{: .notice--info}

## version()

|Type:     | v2c\|v3|
|Default: |  v2c|

*Description:* Specifies which version of the SNMP protocol to use.

**NOTE:** The syslog-ng OSE application will accept any valid option for the
snmp() destination, but will only use the ones relevant to the selected
protocol version, any other option will be ignored. For example, if the
version(\"v2c\") engine-id(\"0xABABABABAB\") community(\"mycommunity\")
options are set, syslog-ng OSE will accept every option, but process
only the community() option, because engine-id() applies only to SNMPv3.
{: .notice--info}