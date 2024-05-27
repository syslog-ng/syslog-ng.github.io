## close-on-input()

|  Type:  |    yes \| no|
| Default: |  yes|

*Description:* By default, {{ site.product.short_name }} closes destination sockets if
it receives any input from the socket (for example, a reply). If this
option is set to no, {{ site.product.short_name }} just ignores the input, but does not
close the socket.
