---
title: JSON parser
message: 'JSON content'
macro_content: '**{\"PROGRAM\":\"value1\",\"MESSAGE\":\"value2\"}** JSON'
id: adm-parser-json
description: >-
    JavaScript Object Notation (JSON) is a text-based open standard designed
    for human-readable data interchange. It is used primarily to transmit
    data between a server and web application, serving as an alternative to
    XML. It is described in [RFC 4627](https://tools.ietf.org/html/rfc4627).
    The syslog-ng OSE application can separate parts of incoming
    JSON-encoded log messages to name-value pairs. For details on using
    value-pairs in syslog-ng OSE see
    [[Structuring macros, metadata, and other value-pairs]].
---

You can refer to the separated parts of the JSON message using the key
of the JSON object as a macro. For example, if the JSON contains
{\"KEY1\":\"value1\",\"KEY2\":\"value2\"}, you can refer to the values
as **\${KEY1}** and **\${KEY2}**. If the JSON content is structured,
syslog-ng OSE converts it to dot-notation-format. For example, to access
the value of the following structure {\"KEY1\": {\"KEY2\": \"VALUE\"}},
use the **\${KEY1.KEY2}** macro.

{% include doc/admin-guide/warnings/macro-overwrite.md %}

**NOTE:** When using the json-parser(), syslog-ng OSE converts all elements
of the JSON object to name-value pairs. Any type information carried by
the incoming JSON object is preserved, and automatically propagated to
other syslog-ng OSE components (for example, a destination) if the
component supports types. Elements without a type are handled as
strings. JSON lists (arrays) are converted to lists, and can be
manipulated using the List manipulation template functions.
{: .notice--info}

Prior to version 4.0, syslog-ng OSE handled all data as string.

The JSON parser discards messages if they cannot be parsed as JSON
messages, therefore acting as a JSON-filter as well.

To create a JSON parser, define a parser that has the json-parser()
option. Defining the prefix and the marker are optional. By default, the
parser will process the \${MESSAGE} part of the log message. To process
other parts of a log message with the JSON parser, use the template()
option. You can also define the parser inline in the log path.

**Declaration**

```config
parser parser_name {
    json-parser(
        marker()
        prefix()
    );
};
```

### Example: Using a JSON parser

In the following example, the source is a JSON encoded log message. The
syslog parser is disabled, so that syslog-ng OSE does not parse the
message: **flags(no-parse)**. The json-parser inserts \".json.\" prefix
before all extracted name-value pairs. The destination is a file, that
uses the format-json template function. Every name-value pair that
begins with a dot (\".\") character will be written to the file
(dot-nv-pairs). The log line connects the source, the destination and
the parser.

```config
source s_json {
    network(port(21514) flags(no-parse));
};

destination d_json {
    file("/tmp/test.json"
        template("$(format-json --scope dot-nv-pairs)\n"));
};

parser p_json {
    json-parser (prefix(".json."));
};

log {
    source(s_json);
    parser(p_json);
    destination(d_json);
};
```

You can also define the parser inline in the log path.

```config
source s_json {
    network(port(21514) flags(no-parse));
};

destination d_json {
    file("/tmp/test.json"
        template("$(format-json --scope dot-nv-pairs)\n"));
};

log {
    source(s_json);
    parser {
        json-parser (prefix(".json."));
    };
    destination(d_json);
};
```
