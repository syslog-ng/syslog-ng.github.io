## client-lib-dir()

|  Type:|      string|
|Default:|   The syslog-ng OSE module directory: /opt/syslog-ng/lib/syslog-ng/java-modules/|

*Description:* The list of the paths where the required Java classes are
located. For example,
**class-path(\"/opt/syslog-ng/lib/syslog-ng/java-modules/:/opt/my-java-libraries/libs/\")**.
If you set this option multiple times in your syslog-ng OSE
configuration (for example, because you have multiple Java-based
destinations), syslog-ng OSE will merge every available paths to a
single list.
