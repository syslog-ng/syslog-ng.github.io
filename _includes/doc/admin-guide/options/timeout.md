## timeout()

|  Type:|      number \[seconds\]|
|Default:| {{ page.timeout | default: '0' }}|

*Description:* The value (in seconds) to wait for an operation to
complete, and attempt to reconnect the server if exceeded. By default,
the timeout value is **0**, meaning that there is no timeout. Available
in version 3.11 and later.
