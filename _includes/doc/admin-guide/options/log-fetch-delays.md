## log-fetch-delay()

|Type:|     integer|
|Default:| `10000`|

*Description:* Sets the time {{ site.product.short_name }} waits between reading and sending log messages. The dimension of this parameter is a fraction of a second, where `wait_time = 1 second / <defined value>`, so setting `1` would result that only about 1 log is sent in each second, and `1000000` means only 1 microsecond is the delay between read/write attempts. The maximum value of this parameter is `1000000`.

**NOTE:** Increasing the value of this parameter (which lowers delay time) can increase log feed performance, but at could increase system load.
{: .notice--info}

## log-fetch-retry-delay()

|Type:|     integer|
|Default:| `1`|

*Description:* Controls how many seconds {{ site.product.short_name }} spends idle before checking for new logs, in case no new logs were read the last time.
