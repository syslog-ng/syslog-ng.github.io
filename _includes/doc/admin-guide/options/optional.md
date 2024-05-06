## optional()

|Accepted values:|  yes or no|
|Default:||

*Description:* Instruct syslog-ng to ignore the error if a specific
source cannot be initialized. No other attempts to initialize the source
will be made until the configuration is reloaded. This option currently
applies to the pipe(), unix-dgram, and unix-stream drivers.
