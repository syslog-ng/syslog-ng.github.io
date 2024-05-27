---
title: Message format parsed by panos-parser()
id: adm-parser-panos-format
description: >-
    This section illustrates the most commonly used PAN-OS log format on the
    {{ site.product.name }} ({{ site.product.short_name }}) side.
---

For information about customizing log format on the PAN-OS side, see
the relevant section of the PAN-OS^®^ Administrator's Guide.

## Message format and log format

Using the panos-parser(), the parsed messages in {{ site.product.short_name }} have the
following general format:

>\<PRI\>\<TIMESTAMP\> \<HOST\> \<PALO-ALTO-fields-in-CSV-format\>

There are several \"types\" of log formats in Palo Alto Networks PAN-OS.
For example, the most commonly used SYSTEM type
has the following message format on the {{ site.product.short_name }} side after
parsing:

><12>Apr 14 16:48:54 paloalto.test.net 1,2020/04/14 16:48:54,unknown,SYSTEM,auth,0,2020/04/14 16:48:54,,auth-fail,,0,0,general,medium,failed authentication for user 'admin'. Reason: Invalid username/password. From: 10.0.10.55.,1718,0x0,0,0,0,0,,paloalto
