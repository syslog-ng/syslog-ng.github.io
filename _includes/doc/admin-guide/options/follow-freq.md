## follow-freq()

| Type:| number|
|Default:  | 1|

*Description:* Indicates that the source should be checked periodically.
This is useful for files which always indicate readability, even though
no new content were appended (e.g. regular file system files). If this value
is higher than zero, syslog-ng will not attempt to use kqueue or ivykis file change
notification methods on the file (poll(), epoll(), etc.), but checks whether
the file changed every time the follow-freq() interval (in seconds) has elapsed.\
Floating-point numbers (for example, **1.5**) can be used as well.

{% include doc/admin-guide/warnings/file-source-follow-warning.md %}
