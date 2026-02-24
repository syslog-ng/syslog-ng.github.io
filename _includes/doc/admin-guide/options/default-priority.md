## default-level()

This is just an alias of default-priority().

## default-priority()

| Type:|  priority string |
|  Default: | {{ page.priority_default | default: '' }} |

*Description:* This option defines the default level value if the `PRIORITY` entry does not exist in the msg received from the {{ page.src | default: 'file' }} source.
For example, `default-priority(warning)`.

## default-severity()

This is just an alias of default-priority().
