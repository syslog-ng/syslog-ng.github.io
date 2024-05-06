---
title: Discord destination options
batch_timeout: 'none'
throttle: '5'
id: adm-dest-discord-opt
---

The discord() destination of syslog-ng OSE can directly post log
messages to web services using the HTTP protocol. The discord()
destination has the following options.

## avatar-url()

|  Type:|      URL|
|Default:|   N/A|

*Description:* A hyperlink for icon of the author to be displayed in
Discord. For details, see the avatar_url option in the [Discord
documentation](https://discord.com/developers/docs/intro).

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/http-batch.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/http-batch.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

{% include doc/admin-guide/http-batch.md %}

{% include doc/admin-guide/options/ca-dir.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

{% include doc/admin-guide/options/cert-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

{% include doc/admin-guide/options/cipher-suite.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

{% include doc/admin-guide/options/disk-buffer.md %}

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/key-file.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/examples/http.md %}

## max-msg-length()

|  Type:|      Number|
|Default:|   2000|

*Description:* Removes every character above the set limit. For details,
see the content option in the [Discord
documentation](https://discord.com/developers/docs/resources/webhook#webhook-object-jsonform-params).

{% include doc/admin-guide/options/peer-verify.md %}

{% include doc/admin-guide/tls-block.md %}

{% include doc/admin-guide/dedicated-tls-options.md %}

{% include doc/admin-guide/options/persist-name.md %}

## proxy()

| Type:    | The proxy server address, in proxy(\"PROXY_IP:PORT\") format. |
||For example, proxy(\"http://myproxy:3128\")                    |
| Default: | None         |

*Description:* You can use the proxy() option to configure the HTTP driver in all
HTTP-based destinations to use a specific HTTP proxy that is independent
from the proxy configured for the system.

Alternatively, you can leave the HTTP as-is, in which case the driver
leaves the default http_proxy and https_proxy environment variables
unmodified.

**NOTE:** Configuring the proxy() option overwrites the default http\_proxy
and https_proxy environment variables.
{: .notice--info}

### Example: the proxy() option in configuration

The following example illustrates including the proxy() option in your
configuration.

```config
destination {
  http( url("SYSLOG_SERVER_IP:PORT") proxy("PROXY_IP:PORT") method("POST"));
};
```

{% include doc/admin-guide/options/response-action.md %}

{% include doc/admin-guide/options/retries.md %}

{% include doc/admin-guide/options/template-logformat.md %}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Hazard of data loss! Make sure to include a fallback value, as if the template
gets resolved to an empty string, Discord rejects the message.
{: .notice--danger}

{% include doc/admin-guide/options/throttle.md %}

For more information, see [Discord: Rate Limits](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit).

{% include doc/admin-guide/options/timeout.md %}

## tts()

|  Type:|      true \| false|
|Default:|   false|

*Description:* Enables TTS (Text-To-Speech) mode. For more information,
see the tts option in the [Discord
documentation](https://discord.com/developers/docs/resources/webhook#webhook-object-jsonform-params).

## url()

|  Type:|      URL|
|Default:|   N/A|

*Description:* The webhook URL of the Discord server/channel. For more
information, see [Discord: Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

{% include doc/admin-guide/options/user-agent.md %}

## username()

|  Type:|      string|
|Default:|   N/A|

*Description:* Overrides the default username of the webhook. For
details, see the username option in the [Discord
documentation](https://discord.com/developers/docs/]resources/webhook#webhook-object-jsonform-params).

{% include doc/admin-guide/options/use-system-cert-store.md %}

{% include doc/admin-guide/options/workers.md %}
