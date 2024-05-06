## pad-size()

|Type: |     number|
|Default:|  0|

*Description:* Specifies input padding. Some operating systems (such as
HP-UX) pad all messages to block boundary. This option can be used to
specify the block size. The syslog-ng OSE application will pad reads
from the associated device to the number of bytes set in pad-size().
Mostly used on HP-UX where /dev/log is a named pipe and every write is
padded to 2048 bytes. If pad-size() was given and the incoming message
does not fit into pad-size(), syslog-ng will not read anymore from this
pipe and displays the following error message:

>Padding was set, and couldn't read enough bytes
