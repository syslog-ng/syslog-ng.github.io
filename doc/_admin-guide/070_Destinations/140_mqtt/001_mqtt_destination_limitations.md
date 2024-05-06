---
title: Limitations to using the mqtt() destination
id: adm-dest-mqtt-lim
---

Using the mqtt() destination of syslog-ng OSE has the following
limitations:

- You can only use the mqtt() destination with syslog-ng OSE version
    3.33 or higher.

- You cannot use the mqtt() destination without installing the the
    eclipse-paho-mqtt-c library.

    For more information about how you can download and install the
    eclipse-paho-mqtt-c library, see [Eclipse
    Paho](https://www.eclipse.org/paho/index.php?page=clients/c/index.php)
    on the Eclipse Foundation website.

- The current implementation of the mqtt() destination supports
    versions 3.1 and 3.1.1 of the MQTT protocol.
