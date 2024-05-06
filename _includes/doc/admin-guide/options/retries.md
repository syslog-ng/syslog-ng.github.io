## retries()

|  Type:|      number (of attempts)|
|Default:|   3|

*Description:* If syslog-ng OSE cannot send a message, it will try again
until the number of attempts reaches retries().

If the number of attempts reaches retries(), syslog-ng OSE will wait for
time-reopen() time, then tries sending the message again.
