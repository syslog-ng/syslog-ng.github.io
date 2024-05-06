## follow-freq()

| Type:| number|
|Default:  | 1|

*Description:* Indicates that the source should be checked periodically.
This is useful for files which always indicate readability, even though
no new lines were appended. If this value is higher than zero, syslog-ng
will not attempt to use poll() on the file, but checks whether the file
changed every time the follow-freq() interval (in seconds) has elapsed.
Floating-point numbers (for example, **1.5**.

