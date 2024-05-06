## client-id()

|Type:|       string|
|Default:|    syslog-ng-source-{topic option}|
|Required:|   no|

*Description:* The client-id() is used to identify the client to the
MQTT server, which stores session data for each client. The session data
can contains information regarding which message has been sent,
received. It is not possible to set the client-id() to an empty string.
To always start a new session see the cleansession() option.
