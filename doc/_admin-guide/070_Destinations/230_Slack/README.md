---
title: 'slack: Sending alerts and notifications to a Slack channel'
short_title: slack
id: adm-dest-slack
description: >-
  The slack() destination driver sends messages to a
  [Slack](https://slack.com/) channel using the Slack Web API. For the
  list of available optional parameters, see
  [[Slack destination options]].
  This destination is available in version 3.19 and later.
---

**Declaration**

```config
destination d_slack {
  slack(
    hook-url("https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX")
  );
};
```

The driver allows you to modify nearly every field of the HTTP request.
For details, see the [Slack API
documentation](https://api.slack.com/docs/message-attachments).

You can use the proxy() option to configure the HTTP driver in all
HTTP-based destinations to use a specific HTTP proxy that is independent
from the proxy configured for the system.

By default, the throttle() option is set to 1, because Slack has a 1
message/second limit on Webhooks. It can allow more message in short
bursts, so you can set it to 0, if you only expect messages in a short
period of time. For details, see the [Web API rate limiting in the Slack
documentation](https://api.slack.com/docs/rate-limits).

To use this destination, the scl.conf file must be included in your
syslog-ng OSE configuration:

```config
@include "scl.conf"
```

The slack() driver is actually a reusable configuration snippet
configured to send log messages using the http() driver. For details on
using or writing such configuration snippets, see
[[Reusing configuration blocks]].  
You can find the source of this configuration snippet on
[GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/slack/slack.conf).

## Prerequisites

To send messages and notifications from syslog-ng OSE to Slack, you must
create a Slack app and a Webhook that syslog-ng OSE can use. For
details, see the [Slack
documentation](https://api.slack.com/incoming-webhooks).

### Example: Using the slack() driver

The following example sets the colors and the author of the message.

```config
@include "scl.conf"

destination d_slack1 {
  slack(
    hook-url("https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX")
    colors("#000000,#222222,#444444,#666666,#888888,#AAAAAA,#CCCCCC,#EEEEEE")
    color-chooser(7)
    author-name("syslog-ng BOT")
    author-link("https://www.syslog-ng.com/products/open-source-log-management")
    author-icon("https://raw.githubusercontent.com/MrAnno/vscode-syslog-ng/master/images/syslog-ng-icon.png")
  );
};
```
