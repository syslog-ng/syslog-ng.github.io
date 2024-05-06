## prefix()

|Synopsis:| prefix()|

*Description:* Insert a prefix before the name part of the parsed
name-value pairs to help further processing. For example:

- To insert the my-parsed-data. prefix, use the
    **prefix(my-parsed-data.)** option.

- To refer to a particular data that has a prefix, use the prefix in
    the name of the macro, for example, **${my-parsed-data.name}**.

- If you forward the parsed messages using the IETF-syslog protocol,
    you can insert all the parsed data into the SDATA part of the
    message using the **prefix(.SDATA.my-parsed-data.)** option.

Names starting with a dot (for example, .example) are reserved for use
by syslog-ng OSE. If you use such a macro name as the name of a parsed
value, it will attempt to replace the original value of the macro (note
that only soft macros can be overwritten, see
[[Hard versus soft macros]].
To avoid such problems, use a prefix when naming the parsed values, for example, prefix(my-parsed-data.)
