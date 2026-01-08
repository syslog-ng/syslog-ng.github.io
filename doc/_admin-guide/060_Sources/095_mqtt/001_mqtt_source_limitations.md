---
title: Limitations to using the mqtt() source
id: adm-src-mqtt-lim
description: >-
    In this chapter you can read about the limitations of the mqtt() source in {{ site.product.short_name }}.
---

Using the mqtt() source of {{ site.product.short_name }} has the following limitations:

- You can only use the mqtt() source with {{ site.product.short_name }} version 3.35
    or higher.

- You cannot use the mqtt() source without installing the the
    eclipse-paho-mqtt-c library.

- For more information about how you can download and install the
    eclipse-paho-mqtt-c library, see [Eclipse
    Paho](https://www.eclipse.org/paho/index.php?page=clients/c/index.php)
    on the Eclipse Foundation website.

- The current implementation of the mqtt() source supports versions
    3.1 and 3.1.1 of the MQTT protocol
