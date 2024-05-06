## time-zone()

|Type:     |name of the timezone, or the timezone offset|
|Default:||

*Description:* The default timezone for messages read from the source.
Applies only if no timezone is specified within the message itself.

The timezone can be specified by using the name, for example,
time-zone("Europe/Budapest")), or as the timezone offset in +/-HH:MM
format, for example, +01:00). On Linux and UNIX platforms, the valid
timezone names are listed under the /usr/share/zoneinfo directory.
