---
title: loggly() destination options
token: 'Customer Token'
provider: 'Loggly.'
id: adm-dest-loggly-opt
description: >-
    This section describes the options of the loggly() destination in {{ site.product.short_name }}.
---

The loggly() destination has the following options. You can also set
other options of the underlying tcp() driver (for example, port number
or TLS-encryption).

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/tls.md %}

{% include doc/admin-guide/options/token.md %}

{% include doc/admin-guide/options/destination-transport.md %}
