## multi-line-mode()

| Type:  |  indented \| regexp|
|Default: |  empty string|

*Description:* Use the [[multi-line-mode()]] option when processing
multi-line messages. The syslog-ng OSE application provides the
following methods to process multi-line messages:

- The *indented* mode can process messages where each line that
    belongs to the previous line is indented by whitespace, and the
    message continues until the first non-indented line. For example,
    the Linux kernel (starting with version 3.5) uses this format for
    /dev/log, as well as several applications, like Apache Tomcat.

    Example: Processing indented multi-line messages

    ```config
    source s_tomcat {
        file("/var/log/tomcat/xxx.log" multi-line-mode(indented));
    };
    ```

- The *prefix-garbage* mode uses a string or regular expression (set
    in multi-line-prefix()) that matches the beginning of the log
    messages, ignores newline characters from the source until a line
    matches the regular expression again, and treats the lines between
    the matching lines as a single message. For details on using
    multi-line-mode(prefix-garbage), see the multi-line-prefix() and
    multi-line-garbage() options.

- The prefix-suffix mode uses a string or regular expression (set in
    multi-line-prefix()) that matches the beginning of the log messages,
    ignores newline characters from the source until a line matches the
    regular expression set in multi-line-suffix(), and treats the lines
    between multi-line-prefix() and multi-line-suffix() as a single
    message. Any other lines between the end of the message and the
    beginning of a new message (that is, a line that matches the
    multi-line-prefix() expression) are discarded. For details on using
    multi-line-mode(prefix-suffix), see the multi-line-prefix() and
    multi-line-suffix() options.

    The prefix-suffix mode is similar to the prefix-garbage mode, but it
    appends the garbage part to the message instead of discarding it.

{% include doc/admin-guide/examples/multi-line.md %}
