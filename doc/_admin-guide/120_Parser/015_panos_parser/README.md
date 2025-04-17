---
title: 'panos-parser(): parsing PAN-OS log messages'
short_title: panos parser
id: adm-parser-panos
description: >-
    The PAN-OS (a short
    version of Palo Alto Networks Operating System) parser can parse log
    messages originating from Palo Alto Networks
    devices. Even though these messages completely comply to the RFC standards,
    their `MESSAGE` part is not a plain text. Instead, the `MESSAGE` part contains
    a data structure that requires additional parsing.
---

The panos-parser() of {{ site.product.short_name }}
solves this problem, and can separate PAN-OS log messages to name-value
pairs.

For details on using value-pairs in {{ site.product.short_name }}, see
Structuring macros, metadata, and other value-pairs.

## Prerequisites

- Version 3.29 of {{ site.product.short_name }} or later.

    **NOTE:** Most Linux distributions feature {{ site.product.short_name }} versions
    earlier than version 3.29. For up-to-date binaries, visit the {{ site.product.name }} installation packages page.
    {: .notice--info}

- PAN-OS log messages from Palo Alto Networks devices.

## Limitations

The panos-parser() only works on {{ site.product.short_name }} version 3.29 or later.

## Configuration

You can include the panos-parser() in your {{ site.product.short_name }} configuration
like this:

```config
parser p_parser{
    panos-parser();
};
```

To use this parser, the scl.conf file must be included in your {{ site.product.short_name }} configuration:

```config
@include "scl.conf"
```

The panos-parser() is a reusable configuration snippet configured to
parse Palo Alto Networks PAN-OS log messages. For details on using or
writing such configuration snippets, see
Reusing configuration blocks. You can find the source of the
PAN-OS configuration snippet on GitHub.
