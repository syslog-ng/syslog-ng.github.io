## keep-alive()

|  Type:|      yes or no|
  |Default:|   yes|

*Description:* Specifies whether connections to sources should be closed
when syslog-ng is forced to reload its configuration (upon the receipt
of a SIGHUP signal). Note that this applies to the server (source) side
of the syslog-ng connections, client-side (destination) connections are
always reopened after receiving a HUP signal unless the keep-alive
option is enabled for the destination.
