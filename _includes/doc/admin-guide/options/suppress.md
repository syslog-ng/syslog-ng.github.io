## suppress()

|Type: |     seconds|
|Default: |  0 (disabled)|

*Description:* If several identical log messages would be sent to the
destination without any other messages between the identical messages
(for example, an application repeated an error message ten times),
syslog-ng can suppress the repeated messages and send the message only
once, followed by the Last message repeated n times. message. The
parameter of this option specifies the number of seconds syslog-ng waits
for identical messages.
