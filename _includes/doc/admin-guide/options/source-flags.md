## flags()

|Accepted values:| assume-utf8, empty-lines, expect-hostname, kernel, no-hostname, no-multi-line, no-parse, sanitize-utf8, store-legacy-msghdr, store-raw-message, syslog-protocol, threaded, validate-utf8, no-piggyback-errors|
|Default: |  empty set|

*Description:* Specifies the log parsing options of the source.

- *assume-utf8*: The assume-utf8 flag assumes that the incoming
    messages are UTF-8 encoded, but does not verify the encoding. If you
    explicitly want to validate the UTF-8 encoding of the incoming
    message, use the **validate-utf8** flag.

- *empty-lines*: Use the **empty-lines** flag to keep the empty lines
    of the messages. By default, {{ site.product.short_name }} removes empty lines
    automatically.

- *expect-hostname*: If the expect-hostname flag is enabled, syslog-ng
    OSE will assume that the log message contains a hostname and parse
    the message accordingly. This is the default behavior for TCP
    sources. Note that pipe sources use the no-hostname flag by default.

- *guess-timezone*: Attempt to guess the timezone of the message if
    this information is not available in the message. Works when the
    incoming message stream is close to real time, and the timezone
    information is missing from the timestamp.
- *ignore-aux-data*: This flag enables the source to ignore  auxiliary data.
- *kernel*: The kernel flag makes the source default to the LOG_KERN
    | LOG_NOTICE priority if not specified otherwise.

- *no-header*: The no-header flag triggers {{ site.product.short_name }} to parse only
    the `PRI` field of incoming messages, and put the rest of the message
    contents into ${MSG}.

    Its functionality is similar to that of the no-parse flag, except
    the no-header flag does not skip the `PRI` field.

    **NOTE:** Essentially, the no-header flag signals {{ site.product.short_name }} that the
    syslog header is not present (or does not adhere to the conventions
    / RFCs), so the entire message (except from the `PRI` field) is put
    into ${MSG}.
    {: .notice--info}

    Example: using the no-header flag with the syslog-parser() parser

    The following example illustrates using the no-header flag with the
    syslog-parser() parser:

    ```config
    parser p_syslog {
        syslog-parser(
        flags(no-header)
        );
    };
    ```

- *no-hostname*: Enable the no-hostname flag if the log message does
    not include the hostname of the sender host. That way {{ site.product.short_name }}
    assumes that the first part of the message header is `PROGRAM`
    instead of `HOST`. For example:

    ```config
    source s_dell {
        network(
            port(2000)
            flags(no-hostname)
        );
    };
    ```

- *no-multi-line*: The no-multi-line flag disables line-breaking in
    the messages: the entire message is converted to a single line. Note
    that this happens only if the underlying transport method actually
    supports multi-line messages. Currently the file() and pipe()
    drivers support multi-line messages.

- *no-parse*: By default, {{ site.product.short_name }} parses incoming messages as
    syslog messages. The no-parse flag completely disables syslog
    message parsing and processes the complete line as the message part
    of a syslog message. The {{ site.product.short_name }} application will generate a
    new syslog header (timestamp, host, and so on) automatically and put
    the entire incoming message into the `MESSAGE` part of the syslog
    message (available using the ${MESSAGE} macro). This flag is useful
    for parsing messages not complying to the syslog format.

    If you are using the flags(no-parse) option, then syslog message
    parsing is completely disabled, and the entire incoming message is
    treated as the ${MESSAGE} part of a syslog message. In this case,
    {{ site.product.short_name }} generates a new syslog header (timestamp, host, and so
    on) automatically. Note that even though flags(no-parse) disables
    message parsing, some flags can still be used, for example, the
    no-multi-line flag.

- *dont-store-legacy-msghdr*: By default, {{ site.product.short_name }} stores the
    original incoming header of the log message. This is useful if the
    original format of a non-syslog-compliant message must be retained
    ({{ site.product.short_name }} automatically corrects minor header errors, for example,
    adds a whitespace before msg in the following message: Jan 22
    10:06:11 host program:msg). If you do not want to store the original
    header of the message, enable the **dont-store-legacy-msghdr** flag.

- *sanitize-utf8*: When using the sanitize-utf8 flag, {{ site.product.short_name }}
    converts non-UTF-8 input to an escaped form, which is valid UTF-8.

- *store-raw-message*: Save the original message as received from the
    client in the ${RAWMSG} macro. You can forward this raw message in
    its original form to another {{ site.product.short_name }} node using the
    [[syslog-ng() destination|adm-dest-syslogng]], or to a SIEM system,
    ensuring that the SIEM can process it. Available only in 3.16 and later.

- *syslog-protocol*: The syslog-protocol flag specifies that incoming
    messages are expected to be formatted according to the new IETF
    syslog protocol standard (RFC-5424), but without the frame header.
    Note that this flag is not needed for the syslog driver, which
    handles only messages that have a frame header.

- *threaded*: The threaded flag enables multithreading for the
    destination. For details on multithreading, see
    Multithreading and scaling in {{ site.product.short_name }}.

    If a parsing or syntax error occurs, use `"threaded"` nested in quotation marks.

    ```config
    flags(
        validate-utf8
        "threaded"
        store-raw-message
    )
    ```
  

    **NOTE:** The file destination uses multiple threads only if the
    destination filename contains macros.
    {: .notice--info}

- *validate-utf8*: The validate-utf8 flag enables
    encoding-verification for messages formatted according to the new
    IETF syslog standard (for details, see
    IETF-syslog messages.
    If the BOM[^1] character is missing, but the message is otherwise UTF-8
    compliant, {{ site.product.short_name }} automatically adds the BOM character to the
    message.
- *no-piggyback-errors*: On failure, the original message will be left as it was before parsing, the value of `$MSGFORMAT` will be set to `syslog:error`, and a tag (see Tagging messages) will be placed on the message corresponding to the parser's failure.
- *piggyback-errors*: On failure, the old behaviour is used (clearing the entire message then syslog-ng will generate a new message in place of the old one describing the parser's error).

[^1]: The byte order mark (BOM) is a Unicode character used to signal the byte-order of the message text.
