## format()

|Synopsis:|   format(string)|
|Default:|  `syslog`  |

*Description:* This option specifies the default message parsing format used by {{ site.product.short_name }}.
Plugins can define their own format parsers; if a plugin does not provide one, the default `syslog` format parser is used.

You can also define and explicitly use a custom parser separately, for example, in Python. For more information, see syslog parser.