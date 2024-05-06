## port() or destport()

|  Type:|      number|
|Default:|  {{ page.destport | default: '601'}}|

*Description:* The port number to connect to. Note that the default port
numbers used by syslog-ng do not comply with the latest RFC which was
published after the release of syslog-ng 3.0.2, therefore the default
port numbers will change in the future releases.
