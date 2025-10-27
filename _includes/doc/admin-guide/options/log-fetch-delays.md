## log-fetch-delay()

|Type:|     integer|
|Default:| `10000`|

*Description:* Sets the time {{ site.product.short_name }} waits between reading and sending log messages. The unit of this parameter is a fraction of a second, where `wait_time = 1 second / <defined value>`. For example, setting it to `1` results in approximately one log being read/sent per second, while `1000000` means a delay of only 1 microsecond between read/write attempts. The maximum value of this parameter is `1000000`.

**NOTE:** Increasing the value of this parameter (which reduces the delay time) can improve log feed performance, but it may also increase system load.
{: .notice--info}

{% include doc/admin-guide/options/deprecated-options.md old='fetch-delay' new='log-fetch-delay' %}

## log-fetch-retry-delay()

|Type:|     integer|
|Default:| `1`|

*Description:* Controls how many seconds {{ site.product.short_name }} remains idle before checking for new logs, in case no new logs were read during the previous check.

{% include doc/admin-guide/options/deprecated-options.md old='fetch-retry-delay' new='log-fetch-retry-delay' %}
