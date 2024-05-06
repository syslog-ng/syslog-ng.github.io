---
title: Options of the mqtt() destination
srv: 'MQTT Broker'
id: adm-dest-mqtt-opt
---

The mqtt() destination has the following options.

Required options: address(), fallback-topic(), and topic().

## address()

|Type:|       string|
|Default:|    tcp://localhost:1883|
|Required: |  yes|

*Description:* Specifies the hostname or IP address, and the port number
of the MQTT broker to which syslog-ng OSE will send the log messages.

Syntax: \<protocol type\>://\<host\>:\<port\>

Supported protocol types: TCP, WS, SSL andWSS.

{% include doc/admin-guide/options/mqtt-client-id.md %}

{% include doc/admin-guide/options/mqtt-cleansession.md %}

## fallback-topic()

|Type:|      string|
|Default:|   N/A|

*Description:* Required option when using templates in the topic()
option.

If the resolved topic() template is not a valid topic, syslog-ng OSE
will use the fallback-topic() option to send messages.

**NOTE:** If instead of strings, you use actual templates (that is, a macro
like \${MESSAGE}, or a template function like \$(format-json)) in the
topic() option, configuring the fallback-topic() option is required.
{: .notice--info}

**TIP:** Occasionally, the reason why syslog-ng OSE cannot post messages to
the configured topic() is that the topic contains invalid characters
that originate from templates.
{: .notice--info}

{% include doc/admin-guide/options/http-proxy.md %}

{% include doc/admin-guide/options/mqtt-keep-alive.md %}

{% include doc/admin-guide/options/password.md %}

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/options/qos.md %}

## template()

|Type:|      string|
|Default:|   \$ISODATE \$HOST \$MSGHDR\$MSG|

*Description:* Specifies the message template that syslog-ng OSE sends
to the MQTT broker.

If you want to use macros in templates, see
[[Macros of syslog-ng OSE]].  

{% include doc/admin-guide/options/tls.md %}

{% include doc/admin-guide/options/mqtt-topic.md %}

{% include doc/admin-guide/options/username.md %}
