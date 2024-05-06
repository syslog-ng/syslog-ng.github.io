---
title: 'panos-parser(): parsing PAN-OS log messages'
short_title: panos-parser()
id: adm-parser-panos
description: >-
    The [PAN-OS](https://docs.paloaltonetworks.com/pan-os.html) (a short
    version of Palo Alto Networks Operating System) parser can parse log
    messages originating from [Palo Alto Networks](https://www.paloaltonetworks.com/)
    devices. Even though these messages completely comply to the RFC standards,
    their MESSAGE part is not a plain text. Instead, the MESSAGE part contains
    a data structure that requires additional parsing.
---

The panos-parser() of syslog-ng Open Source Edition (syslog-ng OSE)
solves this problem, and can separate PAN-OS log messages to name-value
pairs.

For details on using value-pairs in syslog-ng OSE, see
[[Structuring macros, metadata, and other value-pairs]].

## Prerequisites

- Version 3.29 of syslog-ng OSE or later.

    **NOTE:** Most Linux distributions feature syslog-ng OSE versions
    earlier than version 3.29. For up-to-date binaries, visit [the
    syslog-ng third-party binaries
    page](https://www.syslog-ng.com/products/open-source-log-management/3rd-party-binaries.aspx).
    {: .notice--info}

- PAN-OS log messages from Palo Alto Networks devices.

## Limitations

The panos-parser() only works on syslog-ng OSE version 3.29 or later.

## Configuration

You can include the panos-parser() in your syslog-ng OSE configuration
like this:

```config
parser p_parser{
    panos-parser();
};
```

To use this parser, the scl.conf file must be included in your syslog-ng
OSE configuration:

```config
@include "scl.conf"
```

The panos-parser() is a reusable configuration snippet configured to
parse Palo Alto Networks PAN-OS log messages. For details on using or
writing such configuration snippets, see
[[Reusing configuration blocks]]. You can find the source of 
this configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/paloalto/panos.conf).
