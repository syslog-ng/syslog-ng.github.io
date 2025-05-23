---
title: Parsing enterprise-wide message model (EWMM) messages
short_title: EWWM message parser
id: adm-parser-ewmm
description: >-
    The ewmm-parser() can be used to parse messages sent by another
    {{ site.product.short_name }} host using the enterprise-wide message model (EWMM) format.
    Available in version 3.16 and later. Note that usually you do not have
    to use this parser directly, because the default-network-drivers()
    source automatically parses such messages.
---

**Declaration**

```config
parser parser_name {
    ewmm-parser();
};
```
