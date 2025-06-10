## follow-freq()

| Type:| number|
|Default:  | 1|

*Description:* This is useful for files that always indicate readability, even though
no new content has been appended (e.g., regular file system files).\
In pre-4.9 versions of {{ site.product.short_name }}, where follow-method() was not yet available,
this indicated that the source should be checked periodically. If this value is higher than zero,
{{ site.product.short_name }} will not attempt to use kqueue or ivykis file change notification
methods on the file (poll(), epoll(), etc.), but instead checks whether the file has changed every time the follow-freq()
interval (in seconds) has elapsed.\
In version 4.9 and later, this option only has an effect if follow-method() is set to `legacy` or `poll`,
 in which case it is used as in pre-4.9 versions. For any other follow-method() values, the value of this option is ignored.

Floating-point numbers (for example, **1.5**) can be used as well.

{% include doc/admin-guide/warnings/file-source-follow-warning.md %}
