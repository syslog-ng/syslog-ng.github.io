## disk-buffer()

*Description:* This option enables putting outgoing messages into the disk buffer of the destination to avoid message loss in case of a system failure on the destination side. It has the following suboptions:

### capacity-bytes()

|  Type:|      number (bytes)|
|  Default:|   1 MiB|

*Description:* This is a required option. The maximum size of the disk-buffer in bytes. The minimum value is 1048576 bytes. If you set a smaller value, the minimum value will be used automatically. It replaces the old log-disk-fifo-size() option.

In syslog-ng OSE version 4.2 and earlier, this option was called disk-buf-size().

### compaction()

|  Type:|      yes/no|
|  Default:|   no|

*Description:* If set to yes, syslog-ng OSE prunes the unused space in the LogMessage representation, making the disk queue size smaller at the cost of some CPU time. Setting the compaction() argument to yes is recommended when numerous name-value pairs are unset during processing, or when the same names are set multiple times.

**NOTE:** Simply unsetting these name-value pairs by using the unset() rewrite operation is not enough, as due to performance reasons that help when syslog-ng OSE is CPU bound, the internal representation of a LogMessage will not release the memory associated with these name-value pairs. In some cases, however, the size of this overhead becomes significant (the raw message size can grow up to four times its original size), which unnecessarily increases the disk queue file size. For these cases, the compaction will drop unset values, making the LogMessage representation smaller at the cost of some CPU time required to perform compaction.
{: .notice--info}

### dir()

|  Type:|      string|
|  Default:|   N/A|

*Description:* Defines the folder where the disk-buffer files are stored.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** When creating a new dir() option for a disk buffer, or modifying an existing one, make sure you delete the persist file.
{: .notice--warning}

syslog-ng OSE creates disk-buffer files based on the path recorded in the persist file. Therefore, if the persist file is not deleted after modifying the dir() option, then following a restart, syslog-ng OSE will look for or create disk-buffer files in their old location. To ensure that syslog-ng OSE uses the new dir() setting, the persist file must not contain any information about the destinations which the disk-buffer file in question belongs to.

### flow-control-window-bytes()

|  Type:|      number (bytes)|
|  Default:|   163840000|

*Description:* Use this option if the option reliable() is set to yes. This option contains the size of the messages in bytes that is used in the memory part of the disk buffer. It replaces the old log-fifo-size() option. It does not inherit the value of the global log-fifo-size() option, even if it is provided. Note that this option will be ignored if the option reliable() is set to no.

In syslog-ng OSE version 4.2 and earlier, this option was called mem-buf-size().

### flow-control-window-size()

|  Type:|      number(messages)|
|  Default:|   10000|

*Description:* Use this option if the option reliable() is set to no. This option contains the number of messages stored in overflow queue. It replaces the old log-fifo-size() option. It inherits the value of the global log-fifo-size() option if provided. If it is not provided, the default value is 10000 messages. Note that this option will be ignored if the option reliable() is set to yes.

In syslog-ng OSE version 4.2 and earlier, this option was called mem-buf-length().

### front-cache-size()

|  Type:|      number(messages)|
|  Default:|   1000|

*Description:* The number of messages stored in the output buffer of the destination. Note that if you change the value of this option and the disk-buffer already exists, the change will take effect when the disk-buffer becomes empty.

Options reliable() and capacity-bytes() are required options.

In syslog-ng OSE version 4.2 and earlier, this option was called qout-size().

### prealloc()

|  Type:|      yes/no|
|  Default:|   no|

*Description:* By default, syslog-ng OSE doesn’t reserve the disk space for the disk-buffer file, since in a properly configured and sized environment the disk-buffer is practically empty, so a large preallocated disk-buffer file is just a waste of disk space. But a preallocated buffer can prevent other data from using the intended buffer space (and elicit a warning from the OS if disk space is low), preventing message loss if the buffer is actually needed. To avoid this problem, when using syslog-ng OSE 4.0 or later, you can preallocate the space for your disk-buffer files by setting prealloc(yes). 

In addition to making sure that the required disk space is available when needed, preallocated disk-buffer files provide radically better (3-4x) performance as well: in case of an outage the amount of messages stored in the disk-buffer is continuously growing, and using large continuous files is faster, than constantly waiting on a file to change its size.

If you are running syslog-ng OSE on a dedicated host (always recommended for any high-volume settings), use prealloc(yes).

Available in syslog-ng OSE 4.0 and later.

### reliable()

|  Type:|      yes/no|
|  Default:|   no|

*Description:* If set to yes, syslog-ng OSE cannot lose logs in case of reload/restart, unreachable destination or syslog-ng OSE crash. This solution provides a slower, but reliable disk-buffer option. It is created and initialized at startup and gradually grows as new messages arrive. If set to no, the normal disk-buffer will be used. This provides a faster, but less reliable disk-buffer option.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** Hazard of data loss! If you change the value of reliable() option when there are messages in the disk-buffer, the messages stored in the disk-buffer will be lost.
{: .notice--warning}

### truncate-size-ratio()

|  Type:|      number((between 0 and 1))|
|  Default:|   1 (do not truncate)|

*Description:* Limits the truncation of the disk-buffer file. Truncating the disk-buffer file can slow down the disk IO operations, but it saves disk space. By default, syslog-ng OSE version 4.0 and later doesn’t truncate disk-buffer files by default (truncate-size-ratio(1)). Earlier versions freed the disk-space when at least 10% of the disk-buffer file could be freed (truncate-size-ratio(0.1)).

syslog-ng OSE only truncates the file if the possible disk gain is more than truncate-size-ratio() times capacity-bytes().

* Smaller values free disk space quicker.
* Larger ratios result in better performance.

If you want to avoid performance fluctuations:

* use truncate-size-ratio(1) (never truncate), or
* use prealloc(yes) to reserve the entire size of the disk-buffer on disk.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** It is not recommended to change truncate-size-ratio(). Only change its value if you understand the performance implications of doing so.
{: .notice--warning}

### Example: Examples for using disk-buffer()

In the following case reliable disk-buffer() is used.

```config
   destination d_demo {
        network(
            "127.0.0.1"
            port(3333)
            disk-buffer(
                flow-control-window-bytes(10000)
                capacity-bytes(2000000)
                reliable(yes)
                dir("/tmp/disk-buffer")
            )
        );
    };
```

In the following case normal disk-buffer() is used.

```config
   destination d_demo {
        network(
            "127.0.0.1"
            port(3333)
               disk-buffer(
                flow-control-window-size(10000)
                capacity-bytes(2000000)
                reliable(no)
                dir("/tmp/disk-buffer")
            )
        );
    };
```
