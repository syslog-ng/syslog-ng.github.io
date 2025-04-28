## follow-method()

|Accepted values:| legacy \| inotify \| poll \| system |
|Default: | legacy |

*Description:* This option is available in version 4.9 and higher and its value controls how {{ site.product.short_name }} will follow file changes.\
The default `legacy` mode preserves the pre-4.9 version file follow-mode behavior of {{ site.product.short_name }}, which is based on the value of follow-freq().\
The `poll` value forces {{ site.product.short_name }} to poll for file changes at the interval specified by the monitor-freq() option, even if a more efficient method (such as `inotify` or `kqueue`) is available.\
If `inotify` is selected and supported by the platform, {{ site.product.short_name }} uses it to detect changes in source files. This is the most efficient and least resource-consuming option available on Linux for regular files.\
The `system` value will use system poll methods (via ivykis) like `port-timer` `port` `dev_poll` `epoll-timerfd` `epoll` `kqueue` `ppoll` `poll` and `uring`. For more information about how to control the system polling methods used, see How content changes are followed in file() and wildcard-file() sources.

**NOTE:** Using `inotify` also requires setting monitor-method() to `inotify`.
{: .notice--info}

{% include doc/admin-guide/warnings/file-source-follow-warning.md %}
