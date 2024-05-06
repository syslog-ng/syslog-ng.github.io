---
title: Options of the mqtt() source
srv: 'MQTT broker'
id: adm-src-mqtt-opt
---

The mqtt() source has the following options.

Required options: address(), fallback-topic(), and topic().

## address()

|  Type:|       string|
  |Default:|    tcp://localhost:1883|
|Required: |  yes|

*Description:* Specifies the hostname or IP address, and the port number
of the MQTT broker from which syslog-ng OSE will receive the log messages.

Syntax: \<protocol type\>://\<host\>:\<port\>

{% include doc/admin-guide/options/mqtt-client-id.md %}

{% include doc/admin-guide/options/mqtt-cleansession.md %}

{% include doc/admin-guide/options/http-proxy.md %}

{% include doc/admin-guide/options/mqtt-keep-alive.md %}

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/options/qos.md %}

{% include doc/admin-guide/options/tls.md %}

The following options are relevant for the mqtt() tls() block: ca-dir(),
ca-file(), cert-file(), cipher-suite(), key-file(), peer-verify(),
ssl-version(), use-system-cert-store().

{% include doc/admin-guide/options/mqtt-topic.md %}

{% include doc/admin-guide/options/username.md %}
