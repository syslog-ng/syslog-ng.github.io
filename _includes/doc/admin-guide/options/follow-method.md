## follow-method()

|Accepted values:| auto \| legacy \| poll \| inotify \| system |
|Default: | legacy |

*Description:* This option is available in version 4.9 and higher and its value controls how {{ site.product.short_name }} will follow file changes.

- The `auto` mode, available {{ site.product.short_name }} version 4.11 and above, automatically selects the best available method on the given platform, see The auto file follow method for more details.
- The default `legacy` mode preserves the pre-4.9 version file follow-mode behavior of {{ site.product.short_name }}, which is based on the value of follow-freq().
- The `poll` value forces {{ site.product.short_name }} to poll for file changes at the interval specified by the monitor-freq() option, even if a more efficient method (such as `inotify` or `kqueue`) is available.
- If `inotify` is selected and supported by the platform, {{ site.product.short_name }} uses it to detect changes in source files. This is the most efficient and least resource-consuming option available on Linux for regular files.
- The `system` value uses system poll methods (via ivykis), such as `port-timer`, `port`, `dev_poll`, `epoll-timerfd`, `epoll`, `kqueue`, `ppoll`, `poll`, and `uring`. This is the most efficient and least resource-consuming option available for regular files on BSD-based systems like FreeBSD and macOS, where, by default, it automatically selects `kqueue`.

**NOTE:** Using `inotify` also requires setting monitor-method() to `inotify`.
{: .notice--info}

**NOTE:** The `uring` system poll method is an experimental feature and requires a version of {{ site.product.short_name }} built with the internal ivykis version (configure options `-DIVYKIS_SOURCE=internal` for CMake and `--with-ivykis=internal` for Autotools), as the default upstream version currently has no such support.
{: .notice--info}

{% include doc/admin-guide/warnings/file-source-follow-warning.md %}
