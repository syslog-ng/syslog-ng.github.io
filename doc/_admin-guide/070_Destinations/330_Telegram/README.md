---
title: 'Telegram: Sending messages to Telegram'
short_title: Telegram
id: adm-dest-telegram
description: >-
    The telegram() destination sends log messages to
    [Telegram](https://core.telegram.org/), which is a secure, cloud-based
    mobile and desktop messaging app.

    Note that this destination automatically uses the certificate store of
    the system (for details, see the [curl
    documentation](https://curl.haxx.se/docs/sslcerts.html)).
---

**Declaration**

```config
telegram(parameters);
```

You can use the proxy() option to configure the HTTP driver in all
HTTP-based destinations to use a specific HTTP proxy that is independent
from the proxy configured for the system.

### Example: Using the telegram() driver

The following example creates a telegram() destination.

```config
destination d_telegram {
    telegram(
        template("${MESSAGE}")
        throttle(1)
        parse-mode("markdown")
        disable-web-page-preview("true")
        bot-id("<bot id>")
        chat-id("<chat id>")
    );
};
```
