## frac-digits()

|Type: |     number|
|Default:|   0|

*Description:* The syslog-ng application can store fractions of a second
in the timestamps according to the ISO8601 format. The frac-digits()
parameter specifies the number of digits stored. The digits storing the
fractions are padded by zeros if the original timestamp of the message
specifies only seconds. Fractions can always be stored for the time the
message was received.

**NOTE:** The syslog-ng OSE application can add the fractions to non-ISO8601
timestamps as well.
{: .notice--info}

**NOTE:** As syslog-ng OSE is precise up to the microsecond, when the
frac-digits() option is set to a value higher than 6, syslog-ng OSE will
truncate the fraction seconds in the timestamps after 6 digits.
{: .notice--info}
