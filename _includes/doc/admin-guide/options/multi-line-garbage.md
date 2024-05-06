## multi-line-garbage()

|  Type: |     regular expression|
|Default:|   empty string|

*Description:* Use the [[multi-line-garbage()]] option when processing
multi-line messages that contain unneeded parts between the messages.
Specify a string or regular expression that matches the beginning of the
unneeded message parts. If the [[multi-line-garbage()]] option is set,
syslog-ng OSE ignores the lines between the line matching the
[[multi-line-garbage()]] and the next line matching [[multi-line-prefix()]]. See
also the [[multi-line-prefix()]] option.

When receiving multi-line messages from a source when the
[[multi-line-garbage()]] option is set, but no matching line is received
between two lines that match [[multi-line-prefix()]], syslog-ng OSE will
continue to process the incoming lines as a single message until a line
matching [[multi-line-garbage()]] is received.

To use the [[multi-line-garbage()]] option, set the [[multi-line-mode()]] option
to **prefix-garbage**.

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:** If the [[multi-line-garbage()]]
option is set, syslog-ng OSE discards lines between the line matching the [[multi-line-garbage()]] and the next line matching [[multi-line-prefix()]].
{: .notice--warning}