## retries()

|  Type:|      number (of attempts)|
|Default:|   3|

*Description:* If {{ site.product.short_name }} cannot send a message, it will try again
until the number of attempts reaches retries().

If the number of attempts reaches retries(), {{ site.product.short_name }} will wait for
time-reopen() time, then tries sending the message again.
