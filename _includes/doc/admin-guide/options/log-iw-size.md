## log-iw-size()

|  Type: | number|
|  Default:| {{ include.log_iw_size | default: "100" }} |

*Description:* The size of the initial source window, this value is used during
flow-control, applies only if flow-control() is enabled.
Note that when using disk-buffer(), the messages stored on disk are not included in the window size calculation.\
For details about flow-control and the effects of this parameter, see Managing incoming and outgoing messages with flow-control.

**NOTE:** If dynamic flow-control is disabled (which is the default behavior), the value of the log-iw-size() option cannot be lower than 100. If dynamic flow-control is enabled, you can decrease the value of the log-iw-size() option (to the minimum of 1).\
Make sure that log-iw-size() is larger than the value of log-fetch-limit().
{: .notice--info}
