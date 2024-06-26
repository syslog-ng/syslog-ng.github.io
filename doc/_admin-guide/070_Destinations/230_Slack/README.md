---
title: 'slack: Sending alerts and notifications to a Slack channel'
short_title: slack
id: adm-dest-slack
description: >-
  The slack() destination driver sends messages to a
  Slack channel using the Slack Web API. For the
  list of available optional parameters, see
  Slack destination options.
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
For details, see the Slack API documentation.

You can use the proxy() option to configure the HTTP driver in all
HTTP-based destinations to use a specific HTTP proxy that is independent
from the proxy configured for the system.

By default, the throttle() option is set to 1, because Slack has a 1
message/second limit on Webhooks. It can allow more message in short
bursts, so you can set it to 0, if you only expect messages in a short
period of time. For details, see the Web API rate limiting in the Slack
documentation.

To use this destination, the scl.conf file must be included in your
{{ site.product.short_name }} configuration:

```config
@include "scl.conf"
```

The slack() driver is actually a reusable configuration snippet
configured to send log messages using the http() driver. For details on
using or writing such configuration snippets, see
Reusing configuration blocks.  
You can find the source of the Slack configuration snippet on GitHub.

## Prerequisites

To send messages and notifications from {{ site.product.short_name }} to Slack, you must
create a Slack app and a Webhook that {{ site.product.short_name }} can use. For
details, see the Slack webhook documentation.

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
