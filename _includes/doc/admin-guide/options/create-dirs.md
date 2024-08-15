## create-dirs()

|Accepted values: |  yes or no|
|Default: |  no|

*Description:* Enable creating non-existing directories when creating
files or socket files.

**NOTE:** If syslog-ng cannot create the pipe, it aborts and produces an error. This could be caused by the lack of a write permission, or missing directory. The latter of the two can be fixed by using the `create-dirs(yes)` option.
{: .notice--info}