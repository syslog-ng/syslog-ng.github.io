## follow-always-reads()

|   Type:| `yes`, `no`|
|Default:| `no`|

*Description:* This option was introduced in {{ site.product.short_name }} version 4.11 and is useful only in some special cases
when the follow-method() `poll` (or `legacy` with follow-freq() > 0) option is used.
As the `poll` syslog-ng follow-method() has [[much better alternatives|adm-src-wild-follow]], we suggest not using it, but if you have to
for some reason, this option can force {{ site.product.short_name }} not to try to detect the changed state of the followed file
before reading from it, and instead read it continuously in every follow-freq() iteration, regardless of whether there is available data or not.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
This option might only be useful for files that do not support file seek operations, for example, `/dev/stdin`, which in earlier versions
simply signaled a seek operation error.
{: .notice--warning}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Setting this option to `yes` might lead to a blocking read operation, so never use it for regular files. Also, make sure there is always available
data to read in the probable blocking mode when {{ site.product.short_name }} exits; otherwise, a hang can occur during application shutdown.
{: .notice--warning}
