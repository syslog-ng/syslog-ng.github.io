---
title: Prerequisites to using the mqtt() source
id: adm-src-mqtt-pre
---

Using the current implementation of the mqtt() source has the
following prerequisites:

- Installing the eclipse-paho-mqtt-c library.

    NOTE: The default package manager for some Linux operating systems
    contains the eclipse-paho-mqtt-c library, but depending on your OS,
    you may have to install the library manually. For more information
    about how you can download and install the eclipse-paho-mqtt-c
    library, see [Eclipse
    Paho](https://www.eclipse.org/paho/index.php?page=clients/c/index.php)
    on the Eclipse Foundation website.

- Having a broker entity in a functional MQTT system.

    **NOTE:** In your configuration, you will specify the broker entity of
    your MQTT system in the address() option of your mqtt() source.
    {: .notice--warning}
