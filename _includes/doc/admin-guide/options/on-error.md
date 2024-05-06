## on-error()

| Accepted values:  |drop-message \| drop-property \| fallback-to-string \| silently-drop-message \| silently-drop-property \| silently-fallback-to-string |
| Default:         | {{ page.on_error | default: 'Use the global setting (which defaults to drop-message)' }} |

*Description:* Controls what happens when type-casting fails and
syslog-ng OSE cannot convert some data to the specified type. By
default, syslog-ng OSE drops the entire message and logs the error.
Currently the value-pairs() option uses the settings of on-error().

- drop-message: Drop the entire message and log an error message to
    the internal() source. This is the default behavior of syslog-ng
    OSE.

- drop-property: Omit the affected property (macro, template, or
    internal() source.
    message-field) from the log message and log an error message to the

- fallback-to-string: Convert the property to string and log an error
    message to the internal() source.

- silently-drop-message: Drop the entire message silently, without
    logging the error.

- silently-drop-property: Omit the affected property (macro, template,
    or message-field) silently, without logging the error.

- silently-fallback-to-string: Convert the property to string
    silently, without logging the error.
