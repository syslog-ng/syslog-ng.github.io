---
title: Write your own custom destination in Java or Python
short_title: Custom destinations
id: adm-dest-custom
description: >-
    The {{ site.product.short_name }} application is open source, so if you have the
    necessary programming skills, you can extend it if its features are not
    adequate for your particular environment or needs. You can write
    destinations and other extensions to {{ site.product.short_name }} in C (the main
    language of {{ site.product.short_name }}), or using its language bindings, for example,
    Java or Python.
---

- For details on extending {{ site.product.short_name }} in Python, see
    [[python: writing custom Python destinations]].

- For details on extending {{ site.product.short_name }} in Java, see the Getting started with implementing Java destinations

**NOTE:** If you delete all Java destinations from your configuration and
reload {{ site.product.short_name }}, the JVM is not used anymore, but it is still running.
If you want to stop JVM, stop {{ site.product.short_name }} and then start {{ site.product.short_name }} again.
{: .notice--info}
