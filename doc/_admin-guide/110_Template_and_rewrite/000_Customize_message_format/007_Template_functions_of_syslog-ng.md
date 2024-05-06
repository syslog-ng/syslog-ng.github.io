---
title: Template functions of syslog-ng OSE
id: adm-temp-func
description: >-
    The following template functions are available in syslog-ng OSE.
---

## $(base64-encode)

|*Syntax:*|$(base64-encode argument)|

*Description:* You can use the base64-encode template function to
[base64-encode](https://tools.ietf.org/html/rfc4648) strings and macros.
The template function can receive multiple parameters (maximum 64). In
this case, syslog-ng OSE joins the parameters into a single string and
encodes this string. For example, \$(base64-encode string1 string2) is
equivalent to \$(base64-encode string1string2).

Available in syslog-ng OSE version 3.18 and later.

## $(basename)

|*Syntax:*|$(basename argument)|

*Description:* Returns the filename from an argument (for example, a
macro) that contains a filename with a path. For example, \$(basename
\"/var/log/messages.log\") returns messages.log. To extract the path,
use the dirname template function.

Available in syslog-ng OSE version 3.10 and later.

## $(dirname)

|*Syntax:*|$(dirname argument)|

*Description:* Returns the path (without the filename) from an argument
(for example, a macro) that contains a filename with a path. For
example, \$(dirname \"/var/log/messages.log\") returns /var/log path. To
extract the filename, use the basename template function.

Available in syslog-ng OSE version 3.10 and later.

## $(echo)

|*Syntax:*|$(echo argument)|

*Description:* Returns the value of its argument. Using \$(echo
\${HOST}) is equivalent to \${HOST}.

## $(env)

|*Syntax:*|$(env \<environment-variable\>)|

*Description:* Returns the value of the specified environment variable.
Available in syslog-ng OSE 3.5 and later.

## $(format-cef-extension)

syslog-ng OSE includes a template function (format-cef-extension) to
format name-value pairs as ArcSight Common Event Format extensions. Note
that the template function only formats the selected name-value pairs,
it does not provide any mapping. There is no special support for
creating the prefix part of a Common Event Format (CEF) message. Note
that the order of the elements is random. For details on the CEF
extension escaping rules format, see the [ArcSight Common Event
Format](https://kc.mcafee.com/resources/sites/MCAFEE/content/live/CORP_KNOWLEDGEBASE/78000/KB78712/en_US/CEF_White_Paper_20100722.pdf).

You can use the value-pairs that syslog-ng OSE stores about
the log message as CEF fields. Using value-pairs, you can:

- select which value-pairs to use as CEF fields,

- add custom value-pairs as CEF fields,

- rename value-pairs, and so on.

For details, see [[Structuring macros, metadata, and other value-pairs]].
Note that the syntax of format-\*
template functions is different from the syntax of value-pairs(): these
template functions use a syntax similar to command lines.

Using the format-cef-extension template function, has the following
prerequisites:

- Load the the cef module in your configuration:

    ```config
    @module cef
    ```

- Set the on-error global option to **drop-property**, otherwise if
    the name of a name-value pair includes an invalid character,
    syslog-ng OSE drops the entire message. (Key name in CEF extensions
    can contain only the A-Z, a-z and 0-9 characters.)

    ```config
    options {
        on-error("drop-property");
    };
    ```

- The log messages must be encoded in UTF-8. Use the encoding() option
    or the validate-utf8 flag in the message source.

### Example: Using the format-cef-extension template function

The following example selects every available information about the log
message, except for the date-related macros (R\_\* and S\_\*), selects
the .SDATA.meta.sequenceId macro, and defines a new value-pair called
MSGHDR that contains the program name and PID of the application that
sent the log message (since you will use the template-function in a
template, you must escape the double-quotes).

```config
$(format-cef-extension --scope syslog,all_macros,selected_macros \
    --exclude R_* --exclude S_* --key .SDATA.meta.sequenceId \
    --pair MSGHDR=\"$PROGRAM[$PID]: \")
```

The following example selects every value-pair that has a name beginning
with .cef., but removes the .cef. prefix from the key names.

```config
template("$(format-cef-extension --subkeys .cef.)\n")
```

The following example shows how to use this template function to store
log messages in CEF format:

```config
destination d_cef_extension {
    file("/var/log/messages.cef" template("${ISODATE} ${HOST} 
        $(format-cef-extension --scope selected_macros --scope nv_pairs)\n"));
};
```

## $(format-cim)

|*Syntax:*|$(format-cim)|

*Description:* Formats the message into [Splunk Common Information Model
(CIM)
format](http://docs.splunk.com/Documentation/CIM/latest/User/Overview).
Applications that can receive messages in CIM format include Kibana,
logstash, and Splunk. Applications that can be configured to log into
CIM format include nflog and the Suricata IDS engine.

```config
destination d_cim {
    network("192.168.1.1" template("$(format-cim)\n"));
};
```

You can find the exact source of this template function in the
[syslog-ng OSE GitHub
repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/cim/template.conf).

**NOTE:** To use the format-cim() template function, syslog-ng OSE must be
compiled with JSON support. To see if your syslog-ng OSE binary was
compiled with JSON support, execute the **syslog-ng \--version**
command.
{: .notice--info}

## $(format-ewmm)

|*Syntax:*|$(format-ewmm)|

*Description:* The format-ewmm template function converts the message
into the [[Enterprise-wide message model (EWMM)]]
format. Available in version 3.16 and later.

The following is a sample log message in EWMM format.

><13>1 2018-05-13T13:27:50.993+00:00 my-host @syslog-ng - - -
>{"MESSAGE":"<34>Oct 11 22:14:15 mymachine su: 'su root' failed for username on
>/dev/pts/8","HOST_FROM":"my-host","HOST":"my-host","FILE_NAME":"/tmp/in","._TAGS":".source.s_file"}

## $(format-flat-json)

|*Syntax:*|$(format-flat-json parameters)|

*Description:* The format-flat-json template function is identical to
the format-json template function, but nested JSON objects are flattened
in the output. If you have to forward your log messages in JSON format,
but the receiving application cannot handle nested JSON objects, use the
format-flat-json template function.

### Example: Flattened JSON output

The following example shows the difference between nested and flattened
JSON objects.

- The output of \$(format-json a.b.c=1) is a nested JSON object
    (whitespace added for better readability):

    ```json
    {
        "a": {
            "b": {
            "c": "1"
            }
        }
    }
    ```

- The output of \$(format-flat-json a.b.c=1) is a flattened JSON
    object (whitespace added for better readability):

    ```json
    {
    "a.b.c": "1"
    }
    ```

For details on formatting log messages into JSON format, see

## $(format-json)

|*Syntax:*|$(format-json parameters)|

*Description:* The format-json template function receives value-pairs as
parameters and converts them into JavaScript Object Notation (JSON)
format. Including the template function in a message template allows you
to store selected information about a log message (that is, its content,
macros, or other metadata) in JSON format. Note that the input log
message does not have to be in JSON format to use format-json, you can
reformat any incoming message as JSON.

You can use the value-pairs
that syslog-ng OSE stores about the log message as JSON fields. Using
value-pairs, you can:

- select which value-pairs to use as JSON fields,

- add custom value-pairs as JSON fields,

- rename value-pairs, and so on.

**NOTE:** Prior to version 4.0, syslog-ng OSE handled all data as strings,
and allowed the strings to be converted into other types of data that only
data formats of certain destinations supported.
In syslog-ng OSE 4.0 and later versions, each name-value pair is a
(name, type, value) triplet, and several components of syslog-ng OSE 4.0 support
this format. For details, see Specifying data types in value-pairs.
{: .notice--info}

For details, see Structuring macros, metadata, and other value-pairs.
Note that the syntax of format-json is different from the syntax of
value-pairs(): format-json uses a syntax similar to command lines.

### Example: Using the format-json template function

The following example selects every available information about the log
message, except for the date-related macros (R\_\* and S\_\*), selects
the .SDATA.meta.sequenceId macro, and defines a new value-pair called
MSGHDR that contains the program name and PID of the application that
sent the log message (since you will use the template-function in a
template, you must escape the double-quotes).

```config
$(format-json --scope syslog,all_macros,selected_macros \
    --exclude R_* --exclude S_* --key .SDATA.meta.sequenceId \
    --pair MSGHDR=\"$PROGRAM[$PID]: \")
```

The following example shows how to use this template function to store
log messages in JSON format:

```config
destination d_json {
    file("/var/log/messages.json" template("$(format-json --scope selected_macros --scope nv_pairs)\n"));
};
```

**NOTE:** In case of syslog-ng macros starting with a dot (for example,
\".SDATA.meta.sequenceID\") an empty key name is added at the top level
of the JSON structure. You can work around this by adding \--shift 1 as
a parameter to the template function.
{: .notice--info}

For example, in case of
\".SDATA.meta.sequenceID\", an empty key name is added at the top level
of the JSON structure:

```json
{"":
    {"SDATA" :
        {"meta" :
            {"sequenceID": "123"}
        }
    }
}
```

## $(format-welf)

This template function converts value-pairs into the WebTrends Enhanced
Log file Format (WELF). The WELF format is a list of
name=value elements. Note that the order of the elements is random. If
the value contains whitespace, it is enclosed in double-quotes, for
example, name=\"value\". For details on the WELF format, see
<https://www3.trustwave.com/support/kb/article.aspx?id=10899>.

To select which value-pairs to convert, use the command-line syntax of
the value-pairs() option. For details on selecting value-pairs, see
[[value-pairs()]].

### Example: Using the format-welf() template function

The following example selects every available information about the log
message, except for the date-related macros (R\_\* and S\_\*), selects
the .SDATA.meta.sequenceId macro, and defines a new value-pair called
MSGHDR that contains the program name and PID of the application that
sent the log message (since you will use the template-function in a
template, you must escape the double-quotes).

```config
$(format-welf --scope syslog,all_macros,selected_macros \
    --exclude R_* --exclude S_* --key .SDATA.meta.sequenceId \
    --pair MSGHDR=\"$PROGRAM[$PID]: \")
```

The following example shows how to use this template function to store
log messages in WELF format:

```config
destination d_welf {
    file("/var/log/messages.welf" template("$(format-welf --scope selected_macros --scope nv_pairs)\n"));
};
```

## $(geoip2)

|*Syntax:*|$(geoip2 --database \<path-to-geoip2-database-file\> [ --field "registered_country.names.ru" ] ${HOST})  |

*Description:* This template function extracts specific fields from the
mmdb database using the \--field parameter. If you omit this parameter,
it returns the 2-letter country code of any IPv4/IPv6 address or host.

**NOTE:** This template function is available only if syslog-ng OSE has been
compiled with geoip2 support. To enable it, use the **\--enable-geoip**
compiling option.
{: .notice--info}

To retrieve additional GeoIP information, see
[[Looking up GeoIP2 data from IP addresses]].
Starting with version 3.24, syslog-ng OSE tries to automatically detect
the location of the database. If that is successful, the database()
option is not mandatory.

## $(graphite-output)

|*Syntax:*|$(graphite-output parameters)|

*Description:* Available in syslog-ng OSE 3.6 and later (Originally
appeared in the syslog-ng OSE incubator for syslog-ng 3.5). This
template function converts value-pairs from the incoming message to the
Graphite plain text protocol format. It is ideal to use with the
messages generated by the [monitor-source
plugin](https://github.com/syslog-ng/syslog-ng-incubator/tree/master/modules/monitor-source/)
(currently available in the syslog-ng incubator project).

For details on selecting value-pairs in syslog-ng OSE and for
possibilities to specify which information to convert to Graphite plain
text protocol format, see [[Structuring macros, metadata, and other value-pairs]].
Note that the syntax of graphite-output is different from the syntax of value-pairs():
graphite-output uses a the command-line syntax used in the format-json
template function.

### Example: Using the graphite-output template function

The following configuration example shows, how to send value-pairs with
names starting with \"vmstat.\" to Graphite running on localhost, port
2003:

```config
destination d_graphite {
    network( host("localhost") port(2003) template("$(graphite-output --key vmstat.*)"));
};
```

## $(grep)

|*Syntax:*|$(grep condition value-to-select)|

*Description:* The grep template function can search a message context
when correlating messages (for example, when you use a
[[pattern database|adm-parser-db-patterndb]] or the
[[grouping-by parser|adm-cor-grouping-by]].
The context-lookup template function requires a condition (a filter or a string),
and returns a specific macro or template of the matching message (for
example, the \${MESSAGE} field of the message).

### Example: Using the grep template function

The following example selects the message of the context that has a
**username** name-value pair with the **root** value, and returns the
value of the auth\_method name-value pair.

```config
$(grep ("${username}" == "root") ${auth_method})
```

You can to specify multiple name-value pairs as parameters, separated
with commas. If multiple messages match the condition of grep, these
will be returned also separated by commas. This can be used for example,
to collect the email recipients from postfix messages.

## $(hash)

|*Syntax:*|$(\<method\> [opts] $arg1 $arg2 $arg3...)|
|*Options:*|--length N, -l N|

Truncate the hash to the first N characters.

*Description:* Calculates a hash of the string or macro received as
argument using the specified hashing method. If you specify multiple
arguments, effectively you receive the hash of the first argument salted
with the subsequent arguments.

\<method\> can be one of md5, md4, sha1, sha256, sha512 and \"hash\",
which is equivalent to md5. Macros are expected as arguments, and they
are concatenated without the use of additional characters.

This template function can be used for anonymizing sensitive parts of
the log message (for example, username) that were parsed out using
PatternDB before storing or forwarding the message. This way, the
ability of correlating messages along this value is retained.

Also, using this template, quasi-unique IDs can be generated for data,
using the \--length option. This way, IDs will be shorter than a regular
hash, but there is a very small possibility of them not being as unique
as a non-truncated hash.

**NOTE:** These template functions are available only if syslog-ng OSE has
been compiled with the \--enable-ssl compile option and the tfhash
module has been loaded.
{: .notice--info}

### Example: Using the $(hash) template function

The following example calculates the SHA1 hash of the hostname of the
message:

```config
$(sha1 $HOST)
```

The following example calculates the SHA256 hash of the hostname, using
the salted string to salt the result:

```config
$(sha1 $HOST salted)
```

To use shorter hashes, set the \--length:

```config
$(sha1 --length 6 $HOST)
```

To replace the hostname with its hash, use a rewrite rule:

```config
rewrite r_rewrite_hostname{set("$(sha1 $HOST)", value("HOST"));};
```

{% include doc/admin-guide/examples/anon-ip.md %}

## $(if)

|*Syntax:*|$(if (\<condition\>) \<true template\> \<false template\>)|

*Description:* Returns the value of the \<true template\> parameter if
the \<condition\> is true. If the \<condition\> is false, the value of
\<false template\> is returned.

### Example: Using pattern databases and the if template function

The following example returns violation if the username name-value pair
of a message is root, and system otherwise.

```config
$(if ("${username}" == "root") "violation" "system")
```

This can be used to set the class of a message in pattern database rules
based on the condition.

```config
<value name="username">$(if ("${username}" == "root") "violation" "system")</value>
```

Since template functions can be embedded into each other, it is possible
to use another template function as the template of the first one. For
example, the following expression returns root if the username is root,
admin if the username is joe, and normal user otherwise.

```config
<value name="username">
    $(if ("${username}" == "root")
        "root"
        $(if ("${username}" == "joe") "admin" "normal user"))</value>
```

## $(indent-multi-line)

|*Syntax:*|$(indent-multi-line parameter)|

*Description:* This template function makes it possible to write
multi-line log messages into a file. The first line is written like a
regular message, subsequent lines are indented with a tab, in compliance
with RFC822.

### Example: Using the indent-multi-line template function

The following example writes multi-line messages into a text file.

```config
destination d_file {
        file ("/var/log/messages"
                template("${ISODATE} ${HOST} $(indent-multi-line ${MESSAGE})\n") );
};
```

## $(ipv4-to-int)

|*Syntax:*|$(ipv4-to-int parameter)|

*Description:* Converts the specified IPv4 address to its numeric
representation. The numerical value of an IPv4 address is calculated by
treating the IP address as a 4-byte hexadecimal value. For example, the
192.168.1.1 address equals to: 192=C0, 168=A8, 1=01, 1=01, or C0A80101,
which is 3232235777 in decimal representation.

**NOTE:** This template function is available only if the convertfuncs
module has been loaded.
{: .notice--info}

## List manipulation

The list-\* template functions allow you to manipulate comma-separated
lists. Such lists represent a simple array type in syslog-ng OSE. Note
the following about formatting lists:

- Values are separated by commas, for example,
    \"item1\",\"item2\",\"item3\". The single-element list is an element
    without a comma.

- You can use shell-like quotation to embed commas, for example,
    \"item1\",\"ite\\,m2\",\"item3\".

- Empty values are skipped (except if they are quoted)

These template functions return a well-formed list, properly encoding
and quoting all elements. If a template function returns a single
element, all quotation is decoded and the value contains the literal
value.

Starting with syslog-ng OSE version 3.10, the following list-related
template functions are available. Certain functions allow you to
reference an element using its number: note that the list index starts
with zero, so the index of the first element is 0, the second element is
1, and so on.

### $(list-append)

|*Syntax:*|$(list-append ${list} ${name-value-pair1} ${name-value-pair2} ... )|

*Description:* Returns a list and appends the values of the specified
name-value pairs to the end of the list. You can also append elements to
an empty list, for example, \$(list-append \'\' \'element-to-add\')

### $(list-concat)

|*Syntax:*|$(list-concat ${name-value-pair1} ${name-value-pair2} ... )|

The commas between the parameters are optional.

*Description:* This template function creates (concatenates) a list of
the values it receives as parameter. The values can be single values
(for example, \${HOST}) or lists.

For example, the value of the \$(list-concat \${HOST}, \${PROGRAM},
\${PID}) is a comma-separated list.

You can concatenate existing lists into a single list using:

```config
$(list-concat ${list1} ${list2})
```

### $(list-count)

|*Syntax:*|$(list-count ${list} )|

*Description:* Returns the number of elements in the list.

### $(list-head)

|*Syntax:*|$(list-head ${list} )|

*Description:* Returns the first element of the list, unquoted.

### $(list-nth)

|*Syntax:*|$(list-nth \<index-number\> ${list} )|

*Description:* Returns the nth element of the list, unquoted. Note that
the list index starts with zero, so (list-nth 1 \${list} ) returns the
second element, and so on.

### $(list-tail)

|*Syntax:*|$(list-tail ${list} )|

*Description:* Returns the list without the first element. For example,
if the \${mylist} list contains the one, two, three elements, then
\$(list-tail \${mylist} ) returns two, three.

### $(list-slice)

|*Syntax:*|$(list-slice \<from\>:\<to\> ${list} )|

*Description:* Returns the specified subset of the list. Note that the
list index starts with zero, for example, \$(list-slice 1:2 \${list} )
returns the second and third element of the list, and so on.

You can omit the from or to index if you want to start the subset from
the beginning or end of the list, for example: 3: returns the list
starting with the 4th element, while :3 returns the first four elements.

Negative numbers select an element from the end of the list, for
example, -3: returns the last three element of the list.

## $(length)

|*Syntax:*|$(length "\<macro\>")|

*Description:* Returns the length of the macro in characters, for
example, the length of the message. For example, the following filter
selects messages that are shorter than 16 characters:

```config
f_short {
    match ('-', value ("$(if ($(length "${MESSAGE}") <= 16) "-" "+")"));
};
```

## $(lowercase)

|*Syntax:*|$(lowercase "\<macro\>")|

*Description:* Returns the lowercase version of the specified string or
macro. For example, the following example uses the lowercase version of
the hostname in a directory name:

```config
destination d_file {
    file ("/var/log/${MONTH}/${DAY}/$(lowercase "${HOST}")/messages");
};
```

Available in syslog-ng OSE 3.5 and later.

## Numerical operations

|*Syntax:*|$(\<operation\> "\<value1\>" "\<value2\>")|

*Description:* These template functions allow you to manipulate numbers,
that is, to perform addition (+), substraction (-), multiplication (\*),
division (/), and modulus (%). All of them require two numeric
arguments. The result is NaN (Not-a-Number) if the parameters are not
numbers, cannot be parsed, or if a division by zero would occur. For
example, to add the value of two macros, use the following template
function:

```config
$(+ "${<MACRO1>}" "${<MACRO2>}");
```

When you are correlating messages and a name-value pair contains
numerical values in the messages, you can calculate the lowest (min),
highest (max), total (sum), and mean (average) values. These
calculations process every message of the correlation context. For
details on message correlation, see Correlating log messages.
For example, if the messages of the context have a .myfields.load
name-value pair, you can find the highest load value using the following
template function.

```config
$(max ${.myfields.load})
```

## $(or)

|*Syntax:*|$(or \<macro1\> \<macro2\>)|

*Description:* This template function returns the first non-empty
argument.

## $(padding)

|*Syntax:*|$(padding \<macro\> \<width\> \<prepended-character-or-string\>)|

*Description:* This template function returns the value of its first
parameter (a string or macro), prepended with a string. This string is
\<width\> long, and repeats the character or string set in the third
parameter. If you use a single character, it is added \<width\> times.
If you use a string, it is repeated until its length reaches \<width\>.
The default padding character is \' \' (space). For example:

### Example: Using the padding template function

If the value of the \${MESSAGE} macro is mymessage, then the output of
the padding() template function is the following:

```config
$(padding ${MESSAGE} 10 X)
```

Output: XXXXXXXXXXmymessage

```config
$(padding ${MESSAGE} 10 foo)
```

Output: foofoofoofmymessage

## $(python)

|*Syntax:*|$(python \<name-of-the-python-method-to-use\> \<arguments-of-the-method\>)|

*Description:* This template function enables you to write a custom
template function in Python. You can define a Python block in your
syslog-ng OSE configuration file, define one or more Python functions in
it, and use the methods as template functions. If you use a Python
block, syslog-ng OSE embeds a Python interpreter to process the
messages.

The following points apply to using Python blocks in syslog-ng OSE in
general:

- Python parsers and template functions are available in syslog-ng OSE
    version 3.10 and later.

    Python destinations and sources are available in syslog-ng OSE
    version 3.18 and later.

- Supported Python versions: 2.7 and 3.4+ (if you are using pre-built
    binaries, check the dependencies of the package to find out which
    Python version it was compiled with).

- The Python block must be a top-level block in the syslog-ng OSE
    configuration file.

- If you store the Python code in a separate Python file and only
    include it in the syslog-ng OSE configuration file, make sure that
    the PYTHON\_PATH environment variable includes the path to the
    Python file, and export the PYTHON\_PATH environment variable. For
    example, if you start syslog-ng OSE manually from a terminal and you
    store your Python files in the /opt/syslog-ng/etc directory, use the
    following command: **export PYTHONPATH=/opt/syslog-ng/etc**.

    In production, when syslog-ng OSE starts on boot, you must configure
    your startup script to include the Python path. The exact method
    depends on your operating system. For recent Red Hat Enterprise
    Linux, Fedora, and CentOS distributions that use systemd, the
    systemctl command sources the /etc/sysconfig/syslog-ng file before
    starting syslog-ng OSE. (On openSUSE and SLES, /etc/sysconfig/syslog
    file.) Append the following line to the end of this file:
    **PYTHONPATH=\"\<path-to-your-python-file\>\"**, for example,
    **PYTHONPATH=\"/opt/syslog-ng/etc\"**.

- The Python object is initiated every time when syslog-ng OSE is
    started or reloaded.

{% include doc/admin-guide/warnings/python-reload.md %}  

- The Python block can contain multiple Python functions.

- Using Python code in syslog-ng OSE can significantly decrease the
    performance of syslog-ng OSE, especially if the Python code is slow.
    In general, the features of syslog-ng OSE are implemented in C, and
    are faster than implementations of the same or similar features in
    Python.

- Validate and lint the Python code before using it. The syslog-ng OSE
    application does not do any of this.

- Python error messages are available in the internal() source of
    syslog-ng OSE.

- You can access the name-value pairs of syslog-ng OSE directly
    through a message object or a dictionary.

- To help debugging and troubleshooting your Python code, you can send
    log messages to the internal() source of syslog-ng OSE. For details,
    see [[Logging from your Python code]].

The following points apply to Python parsers.

- The first argument in the definition of the Python function is the
    actual log message. This is implicitly passed to the function, you
    do not have to use it in the template function.

- The value of the template function is return value of the Python
    function.

**Declaration**

```config
python {
    def <name_of_the_python_function>(<log_message>, <optional_other_arguments>):
        # <your-python-code>
        return <value_of_the_template_function>
};

template <template-name> {
    template($(python <name_of_the_python_function>));
};
```

### Example: Writing template functions in Python

The following example creates a Python template function called
return\_message that returns the MESSAGE part of the log message.

```config
@version: 3.38

python {
    def return_message(log_message):
        return log_message['MESSAGE']
};

destination d_local {
    file("/tmp/logs.txt" template("[$(python return_message)]\n"));
};
```

The following example creates a Python template function called
resolve\_host that receives an IP address as an argument, and attempts
to resolve it into a hostname.

```config
@version: 3.38

python {
    import socket

    def resolve_host(log_message, hostname):
        try:
            return socket.gethostbyaddr(hostname)[0]
        except (socket.herror, socket.error):
            return 'unknown'
};

destination d_local {
    file("/tmp/logs.txt" template("${ISODATE} $(python resolve_host ${SOURCE_IP}) ${MESSAGE}\n"));
};
```

## $(replace-delimiter)

|*Syntax:*|$(replace-delimiter "\<old-delimiters\>" "\<new-delimiter\>" "\<macro\>")|

*Description:* Replaces the delimiter character with a new one. For
example, the following example replaces the tabulators (\\t) in the
message with semicolons (;):

```config
$(replace-delimiter "\t" ";" "${MESSAGE}")
```

Available in syslog-ng OSE 3.5 and later.

## $(sanitize)

|*Syntax:*|$(sanitize \<options\> "\<macro1\>" "\<macro2\> ...")|

*Description:* This file replaces the special characters in macro
values, for example, it can replace the slash (/) characters in a
filename with the underscore (\_) character. If you specify multiple
arguments, they will be concatenated using the / character, so they can
be used as separate directory levels when used in filenames.

The function has the following options:

- \--ctrl-chars or -c

- Filter control characters (characters that have an ASCII code of 32
    or lower). This option is used by default.

- \--invalid-chars \<characterlist\> or -i \<characterlist\>

- The list of characters to be replaced with underscores (\_). The
    default list contains the / character. The following example
    replaces the \\ and @ characters, so for example, fo\\o@bar becomes
    foobar:

    ```config
    $(sanitize -i @ $PROGRAM)
    ```

- \--no-ctrl-chars or -C

- Do not filter the control characters (characters that have an ASCII
    code of 32 or lower).

- \--replacement \<replacement-character\> or -r
    \<replacement-character\>

- The character used to replace invalid characters. By default, this
    is the underscore (\_). The following example replaces invalid
    characters with colons instead of underscores, so for example,
    foo/bar becomes foo;bar:

    ```config
    $(sanitize -r ; $PROGRAM)
    ```

### Example: Using the sanitize template function

The following example uses the sanitize function on two macros, and the
results are used as directory names in a file destination.

```config
file("/var/log/$(sanitize $HOST $PROGRAM)/messages");
```

This is equivalent to file(\"/var/log/\$HOST/\$PROGRAM/messages\");, but
any slashes in the values of the \$HOST and \$PROGRAM macros are
replaced with underscores.

## $(strip)

|*Syntax:*|$(strip "\<macro\>")|

*Description:* Deletes whitespaces from the beginning and the end of a
macro. You can specify multiple macros separated with whitespace in a
single template function, for example:

```config
$(strip "${MESSAGE}" "${PROGRAM}")
```

## $(substr)

|*Syntax:*|$(substr "\<argument\>" "\<offset\>" "\<length\>")|

*Description:* This function extracts a substring of a string.

- argument

- The string to extract the substring from, for example,
    \"\${MESSAGE}\"

- offset

- Specifies where the substring begins (in characters). 0 means to
    start from the beginning of the string, 5 means to skip the first 5
    characters of the string, and so on. Use negative numbers to specify
    where to start from the end of the string, for example, -1 means the
    last character, -5 means to start five characters before the end of
    the string.

- length

- (Optional parameter): The number of characters to extract. If not
    specified, the substring will be extracted from the offset to the
    end of the string. Use negative numbers to stop the substring before
    the end of the string, for example, -5 means the substring ends five
    characters before the end of the string.

### Example: Using the substr template function

Skip the first 15 characters of the message, and select the rest:

```config
$(substr "${MESSAGE}" "15");
```

Select characters 16-30 of the message (15 characters with offset 15):

```config
$(substr "${MESSAGE}" "15" "15");
```

Select the last 15 characters of the message:

```config
$(substr "${MESSAGE}" "-15");
```

A template that converts the message to RFC3164 (BSD-syslog) format and
truncates the messages to 1023 characters:

```config
template t_truncate_messages {
    template("$(substr \"<$PRI>$DATE $HOST $MSGHDR$MESSAGE\" \"0\" \"1023\")\n");
    template-escape(no);
};
```

## $(tag)

Available in syslog-ng OSE 4.6 and later versions.

*Syntax:*

```config
$(tag <name-of-the-tag> <value-if-set> <value-if-unset>)
```

*Desription:* Uppends bit-like tags to the messages.

- If the `value-if-set` and `value-if-unset` arguments are not defined, the `$(tag)` template function acts as a boolean and expands to `0` or `1`, depending on whether the message has the specified tag set.
- If the `value-if-set` and `value-if-unset` arguments are set, `$(tag)` returns a string: the second argument (`<value-if-set>`) if the message has a `<tag>` element, and the third argument (`<value-if-unset>`) if the message does not have a `<tag>` element.

## $(tags-head)

Available in syslog-ng OSE 4.7 and later versions.

*Syntax:*

```config
$(tags-head <name-of-first-tag> <name-of-second-tag> ... )
```

*Desription:* This template function accepts multiple tag names, and returns the first one that is set.

### Example: config using tags-head

```config
# resolves to "bar" if "bar" tag is set, but "foo" is not
template("$(tags-head foo bar baz)")
```

## uppercase

|*Syntax:*|$(uppercase "\<macro\>")|

*Description:* Returns the uppercase version of the specified string or
macro. For example, the following example uses the uppercase version of
the hostname in a directory name:

```config
destination d_file {
file ("/var/log/${MONTH}/${DAY}/$(uppercase "${HOST}")/messages");
};
```

Available in syslog-ng OSE 3.5 and later.

## $(url-decode)

|*Syntax:*|$(url-decode \<string-pr-macro-1\> \<string-pr-macro-2\> ... )|

*Description:* You can use the url-decode template function to decode
url-encoded strings and macros. For example, \$(url-decode %3C%3E)
yields \<\>. The url-decode can receive multiple parameters (maximum
64). In this case, each parameter is decoded separately, and simply
concatenated.

Available in syslog-ng OSE version 3.18 and later.

## $(url-encode)

|*Syntax:*|$(url-encode ${MESSAGE} )\n")|

*Description:* You can use the url-encode template function together
with the telegram() destination to send syslog messages to
[Telegram.](https://core.telegram.org/) The url-encode template function
escapes strings. All input characters that are not a-z, A-Z, 0-9, \'-\',
\'.\', \'\_\' or \'\~\' are converted to their \"URL escaped\" version.

Available in syslog-ng OSE version 3.18 and later. (In version
3.16-3.17, this template function was called urlencode.)

## $(uuid)

|*Syntax:*|$(uuid)|

*Description:* Generates a Universally Unique IDentifier (UUID) that
complies with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt). That way,
an UUID can be added to the message soon after it is received, so
messages stored in multiple destinations can be identified. For example,
when storing messages in a database and also in files, the UUID can be
used to find a particular message both in the database and the files.

To generate a UUID, you can use a rewrite rule to create a new
value-pair for the message.

### Example: Using Universally Unique Identifiers

The following example adds a value-pair called MESSAGE\_UUID to the
message using a rewrite rule and a template.

```config
rewrite r_add_uuid { set("$(uuid)" value("MESSAGE_UUID")); };

destination d_file {
    file ("/var/log/messages"
            template("$MESSAGE_UUID $ISODATE $HOST $MSG\n")
            template-escape(no)
    );
};

log { source(s_network);
        rewrite(r_add_uuid);
        destination(d_file);
};
```

**NOTE:** This template function is available only if the tfuuid module has
been loaded.
{: .notice--info}
