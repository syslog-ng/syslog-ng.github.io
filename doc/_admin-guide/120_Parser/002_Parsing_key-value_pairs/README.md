---
title: Parsing key=value pairs
id: adm-parser-kv
description: >-
    The syslog-ng OSE application can separate a message consisting of
    whitespace or comma-separated key=value pairs (for example, Postfix log
    messages) into name-value pairs. You can also specify other separator
    character instead of the equal sign, for example, colon (:) to parse
    MySQL log messages. The syslog-ng OSE application automatically trims
    any leading or trailing whitespace characters from the keys and values,
    and also parses values that contain unquoted whitespace. For details on
    using value-pairs in syslog-ng OSE see
    Structuring macros, metadata, and other value-pairs.
---

You can refer to the separated parts of the message using the key of the
value as a macro. For example, if the message contains
KEY1=value1,KEY2=value2, you can refer to the values as **\${KEY1}** and
**\${KEY2}**.

**NOTE:** If a log message contains the same key multiple times (for
example, key1=value1, key2=value2, key1=value3, key3=value4,
key1=value5), then syslog-ng OSE stores only the last (rightmost) value
for the key. Using the previous example, syslog-ng OSE will store the
following pairs: key1=value5, key2=value2, key3=value4.
{: .notice--info}

{% include doc/admin-guide/warnings/macro-overwrite.md %}

The parser discards message sections that are not key=value pairs, even if they
appear between key=value pairs that can be parsed.

The names of the keys can contain only the following characters: numbers (0-9),
letters (a-z,A-Z), underscore (\_), dot (.), hyphen (-). Other special characters
are not permitted.

To parse key=value pairs, define a parser that has the kv-parser()
option. Defining the prefix is optional. By default, the parser will
process the \${MESSAGE} part of the log message. You can also define the
parser inline in the log path.

**Declaration**

```config
parser parser_name {
    kv-parser(
        prefix()
    );
};
```

### Example: Using a key=value parser

In the following example, the source is a log message consisting of
comma-separated key=value pairs, for example, a Postfix log message:

>Jun 20 12:05:12 mail.example.com <info> postfix/qmgr[35789]: EC2AC1947DA:  
>from=<me@example.com>, size=807, nrcpt=1(queue active)

The kv-parser inserts the \".kv.\" prefix before all extracted
name-value pairs. The destination is a file, that uses the format-json
template function. Every name-value pair that begins with a dot (\".\")
character will be written to the file (dot-nv-pairs). The log line
connects the source, the destination and the parser.

```config
source s_kv {
    network(port(21514));
};

destination d_json {
    file("/tmp/test.json"
        template("$(format-json --scope dot-nv-pairs)\n"));
};

parser p_kv {
    kv-parser (prefix(".kv."));
};

log {
    source(s_kv);
    parser(p_kv);
    destination(d_json);
};
```

You can also define the parser inline in the log path.

```config
source s_kv {
    network(port(21514));
};

destination d_json {
    file("/tmp/test.json"
        template("$(format-json --scope dot-nv-pairs)\n"));
};

log {
    source(s_kv);
    parser {
        kv-parser (prefix(".kv."));
    };
    destination(d_json);
};
```

You can set the separator character between the key and the value to
parse for example, key:value pairs, like MySQL logs:

>Mar  7 12:39:25 myhost MysqlClient[20824]: SYSTEM_USER:'oscar', MYSQL_USER:'my_oscar', CONNECTION_ID:23, >DB_SERVER:'127.0.0.1', DB:'--', QUERY:'USE test;'

```config
parser p_mysql {
    kv-parser(value-separator(":") prefix(".mysql."));
};
```
