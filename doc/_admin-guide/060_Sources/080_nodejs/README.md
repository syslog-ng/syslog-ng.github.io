---
title: 'nodejs: Receiving JSON messages from nodejs applications'
short_title: nodejs
id: adm-src-nodejs
description: >-
    Using the nodejs() driver, {{ site.product.short_name }} can receive application logs
    directly from nodejs applications that use the widespread
    Winston logging API. The
    {{ site.product.short_name }} application automatically adds the .nodejs.winston. prefix
    to the name of the fields the extracted from the message.
---

To use the nodejs() driver, the scl.conf file must be included in your
{{ site.product.short_name }} configuration:

```config
@include "scl.conf"
```

The nodejs() driver is actually a reusable configuration snippet
configured to receive log messages using the network() driver, and
process its JSON contents. For details on using or writing such
configuration snippets, see Reusing configuration blocks.
You can find the source of the nodejs configuration snippet on GitHub.

### Example: Using the nodejs() driver

The following example uses the default settings of the driver, listening
for messages on port 9003 of every IP address of the {{ site.product.short_name }} host.

```config
@include "scl.conf"

source apps { nodejs(); };
```

The following example listens only on IP address 192.168.1.1, port 9999.

```config
@include "scl.conf"

source apps {
    nodejs(
        localip(192.168.1.1)
        port(9999)
    )
};
```

**NOTE:** For details on the parameters of the nodejs() driver, see
nodejs() source options.
{: .notice--info}
