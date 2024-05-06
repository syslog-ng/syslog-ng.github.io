## max-connections()

|  Type:|      number|
|Default:|   {{ page.max_conn_default | default: "10" }}|

*Description:* Specifies the maximum number of simultaneous connections.

Note that the total number of connections the default-network-drivers()
source can use is 3*max-connections(), because this value applies to
the network(tcp), syslog(tcp), and syslog(tls) connections individually.
