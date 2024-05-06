---
title: Slack destination options
id: adm-dest-slack-opt
---

The slack destination of syslog-ng OSE can directly post log messages
and notifications to Slack channels. The slack destination has the
following options.

## author-name()

|  Type: |     string or template|
|  Default:|   \'host: \${HOST} \| program: \${PROGRAM}(\${PID}) \| severity: \${PRIORITY}\'|

*Description:* The sender of the message as displayed in Slack. For
details, see the [author\_name option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

## author-link()

|  Type:   |   string or URL|
|  Default: |  None|

*Description:* A hyperlink for the sender of the message as displayed in
Slack. For details, see the [author\_link option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

## author-icon()

|  Type:   |   URL|
|  Default:|   None|

*Description:* A hyperlink for icon of the author to be displayed in
Slack. For details, see the [author\_icon option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/options/ca-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/options/cipher-suite.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

## colors()

|  Type:     | list of colors in hexadecimal format|
|  Default:  | \'\#512E5F,\#B03A2E,\#E74C3C,\#F39C12,\#F8C471,\#7DCEA0,\#5DADE2,\#85929E\'|

*Description:* The colors to be assigned to the messages of different
importance levels.

## color-chooser()

|  Type: |     integer or template|
|  Default: |  \'\${LEVEL\_NUM}\'|

*Description:* An integer that assigns a color to the message from the
list of colors set in the colors() option.

{% include doc/admin-guide/options/disk-buffer.md %}

## fallback()

|  Type:     | string or template|
|  Default: |  \'\${MSG} - host: \${HOST} \| program: \${PROGRAM}(\${PID}) \| severity: \${PRIORITY}\'|

*Description:* The plain-text summary of the Slack attachment. For
details, see the [fallback option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

## footer()

| Type:|      URL|
|  Default: |  string or template|

*Description:* The footer of the message. For details, see the [footer
option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

## footer-icon()

|  Type:     | URL|
|  Default: |  None|

*Description:* A hyperlink for an image. For details, see the
[footer\_icon option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

{% include doc/admin-guide/options/hook.md %}

## hook-url()

|  Type:    |  URL|
|  Default: |  None|

*Description:* The Webhook URL for the Incoming Webhook of your Slack
app. This URL must also include the authentication token that syslog-ng
OSE uses to authenticate to Slack. For example:
**https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX**

For details, see the [Slack documentation about Incoming
Webhooks](https://api.slack.com/incoming-webhooks).

## image-url()

|  Type:|      URL|
|  Default:|   None|

*Description:* A hyperlink for an image. For details, see the
[image_url option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/persist-name.md %}

## pretext()

|  Type:     | string or template|
|  Default:  | None|

*Description:* The text that appears above the attachment block. For
details, see the [pretext option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

{% include doc/admin-guide/options/retries.md %}

## ssl-version()

|  Type: |     string|
|  Default: |  None, uses the libcurl default|

*Description:* Specifies the permitted SSL/TLS version. Possible values:
sslv2, sslv3, tlsv1, tlsv1_0, tlsv1_1, tlsv1_2, tlsv1_3.

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/options/template-logformat.md %}

{% include doc/admin-guide/options/throttle.md %}

## thumb-url()

|  Type:|      URL|
|  Default:|   None|

*Description:* A hyperlink for a thumbnail image. For details, see the
[thumb\_url option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

## timeout()

|  Type:      |number \[seconds\]|
|  Default:   |0|

*Description:* The value (in seconds) to wait for an operation to
complete, and attempt to reconnect the server if exceeded. By default,
the timeout value is **0**, meaning that there is no timeout. Available
in version 3.11 and later.

## title()

|  Type:      string or template|
|  Default:   None|

*Description:* The message title in Slack. For details, see the [title
option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

## title-link()

|  Type:|      URL|
|  Default:|   None|

*Description:* A hyperlink for the message title in Slack. For details,
see the [title_link option in the Slack
documentation](https://api.slack.com/docs/message-attachments).

{% include doc/admin-guide/options/user-agent.md %}

{% include doc/admin-guide/options/use-system-cert-store.md %}

{% include doc/admin-guide/options/workers.md %}
