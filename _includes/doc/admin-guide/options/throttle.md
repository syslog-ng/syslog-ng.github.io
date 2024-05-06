## throttle()

|  Type:|      number|
|Default:| {{ page.throttle | default: '0' }}|

*Description:* Sets the maximum number of messages sent to the
destination per second. Use this output-rate-limiting functionality only
when using disk-buffer as well to avoid the risk of losing messages.
Specifying **0** or a lower value sets the output limit to unlimited.
