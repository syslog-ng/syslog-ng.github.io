---
title: Global options of {{ site.product.short_name }}
id: adm-global-options
description: >-
    The {{ site.product.short_name }} application has a number of global options governing DNS
    usage, the timestamp format used, and other general points. Each option
    may have parameters, similarly to driver specifications. 
---

To set global options, add an options statement to the {{ site.product.short_name }} configuration file
using the following syntax:

```config
options { option1(params); option2(params); ... };
```

### Example: Using global options

To disable domain name resolving, add the following line to the
{{ site.product.short_name }} configuration file:

```config
options { use-dns(no); };
```

For a detailed list of the available options, see
Global options.  
For important global options and recommendations on their use, see
Best practices and examples.
