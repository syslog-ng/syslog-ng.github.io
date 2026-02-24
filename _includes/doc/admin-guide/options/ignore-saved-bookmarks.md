## ignore-saved-bookmarks()

|Type:|     boolean|
|Default:| no|

*Description:* By default, {{ site.product.short_name }} continues reading logs from the last remembered position (or offset, etc.) stored in its persist file after a restart or reload. If this option is set to `yes`, it will always start reading from either the beginning or the end of the available log list<!-- Intentionally no line and file ending, keep like that !!! -->