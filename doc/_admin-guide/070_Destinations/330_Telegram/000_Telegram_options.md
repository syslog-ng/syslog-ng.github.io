---
title: telegram() destination options
id: adm-dest-telegram-opt
---

The telegram() destination has the following options:

## bot-id()

|Type:   |   number|
|Default:|   N/A|

*Description:* This is a required option. Specifies the token for the
bot necessary to access the Telegram HTTP API.

## chat-id()

|  Type: |     number|
|Default: |  N/A|

*Description:* This is a required option. Specifies the ID of the chat
of the telegram destination.

## disable_notification()

|  Type:    |  boolean|
|  Default: |  true \| false|

*Description:* Enables the telegram() destination to send silent
messages. By default, the disable_notification() value is false.

### Example: using the disable_notification() option with the telegram() destination

The following example illustrates how you can configure the
disable_notification()option to send silent messages to the telegram()
destination.

```config
destination {
  telegram(
    bot-id(...)
    chat-id(...) 
    disable_notification(true)
  ); 
};
```

## disable-web-page-preview()

|  Type:    |  boolean|
|  Default: |  true|

*Description:* Disables link previews for links in the message. By
default, the disable-web-page-preview value is true. From a security
point of view, One Identity recommends to leave it true, otherwise
malicious messages can trick the telegram destination to generate
traffic to any URL.

{% include doc/admin-guide/options/hook.md %}

## parse-mode()

|  Type:      |string|
|  Default:  | none|

*Description:* Formats the message in a markdown-style or HTML-style
formatting. By default, the parse-mode value is markdown, which means
that the message is formatted in markdown style.

## template()

|  Type:     | string|
|  Default:  | \${MESSAGE} \\\")

*Description:* Specifies the content of the message. The syslog-ng OSE
application will automatically encode the content of this option using
the url-encode() template function.

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/throttle.md %}
