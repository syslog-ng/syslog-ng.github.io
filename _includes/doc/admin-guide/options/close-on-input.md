## close-on-input()

|  Type:  |    yes \| no|
| Default: |  yes|

*Description:* By default, syslog-ng OSE closes destination sockets if
it receives any input from the socket (for example, a reply). If this
option is set to no, syslog-ng OSE just ignores the input, but does not
close the socket.
