## trim-large-messages()

|Accepted values:|      yes \| no|
|Default:| {{ page.trim_default | default: 'Use the global trim-large-messages() option, which defaults to no.' }}|

*Description:* Determines what syslog-ng OSE does with incoming log
messages that are received using the IETF-syslog protocol using the
syslog() driver, and are longer than the value of log-msg-size(). Other
drivers ignore the trim-large-messages() option.

- If set to **no**, syslog-ng OSE drops the incoming log message.

- If set to **yes**, syslog-ng OSE trims the incoming log message to
    the size set in log-msg-size(), and adds the trimmed tag to the
    message. The rest of the message is dropped. You can use the tag to
    filter on such messages.

    ```config
    filter f_trimmed {
        tags("trimmed");
    };
    ```

    If syslog-ng OSE trims a log message, it sends a debug-level log
    message to its internal() source.

    As a result of trimming, a parser could fail to parse the trimmed
    message. For example, a trimmed JSON or XML message will not be
    valid JSON or XML.

Available in syslog-ng OSE version 3.21 and later.

Uses the value of the [[global option]] if not specified.
