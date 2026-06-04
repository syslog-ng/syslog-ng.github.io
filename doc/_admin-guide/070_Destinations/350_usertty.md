---
title: 'usertty: Sending messages to a user terminal: usertty()
  destination'
short_title: usertty
id: adm-dest-usertty
description: >-
  This driver writes messages to the terminal of a logged-in user.
---

The usertty() driver has a single required argument, specifying a
username who should receive a copy of matching messages. Use the
asterisk **\*** to specify every user currently logged in to the system.

**Declaration**

```config
usertty(username);
```

The usertty() does not support templates, and has a single optional parameter.

## escaping()

| Accepted values: | `yes`, `no` |
| Default:         | `no`        |

*Description:* If this parameter is set to `yes`, {{ site.product.short_name }} escapes the message part of the
usertty() output using the default template-escaping rules.

### Example: Using the usertty() driver

```config
destination d_usertty { usertty("root" escaping(yes)); };
```
