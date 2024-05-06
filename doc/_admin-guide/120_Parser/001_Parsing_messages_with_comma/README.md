---
title: Parsing messages with comma-separated and similar values
short_title: CSV parser
id: adm-parser-csv
description: >-
    The syslog-ng OSE application can separate parts of log messages (that
    is, the contents of the ${MESSAGE} macro) at delimiter characters or
    strings to named fields (columns). One way to achieve this is to use a
    csv (comma-separated-values) parser (for other methods and
    possibilities, see the other sections of
    parser: Parse and segment structured messages).
    The parsed fields act as user-defined macros that can be
    referenced in message templates, file- and tablenames, and so on.
---

Parsers are similar to filters: they must be defined in the syslog-ng
OSE configuration file and used in the log statement. You can also
define the parser inline in the log path.

{% include doc/admin-guide/notes/parser-order.md %}

To create a csv-parser(), you have to define the columns of the message,
the separator characters or strings (also called delimiters, for
example, semicolon or tabulator), and optionally the characters that are
used to escape the delimiter characters (quote-pairs()).

**Declaration**

```config
parser <parser_name> {
    csv-parser(
        columns(column1, column2, ...)
        delimiters(chars("<delimiter_characters>"), strings("<delimiter_strings>"))
    );
};
```

Column names work like macros.

Names starting with a dot (for example, .example) are reserved for use
by syslog-ng OSE. If you use such a macro name as the name of a parsed
value, it will attempt to replace the original value of the macro (note
that only soft macros can be overwritten, see
[[Hard versus soft macros]].
To avoid such problems, use a prefix when naming the parsed values, for
example, prefix(my-parsed-data.)

In syslog-ng OSE version 4.5 and later versions, the `columns()` option can be omitted, and extract the values into matches ($1, $2, $3, etc.), which are available as the anonymous list $*. 

### Example: omission of the columns() option

```config
@version: current

log {
    source { tcp(port(2000) flags(no-parse)); };

    parser { csv-parser(delimiters(',') dialect(escape-backslash)); };
    destination { stdout(template("$ISODATE $*\n")); };
};
```

### Example: Segmenting hostnames separated with a dash

The following example separates hostnames like example-1 and example-2
into two parts.

```config
parser p_hostname_segmentation {
    csv-parser(columns("HOSTNAME.NAME", "HOSTNAME.ID")
    delimiters("-")
    flags(escape-none)
    template("${HOST}"));
};

destination d_file {
    file("/var/log/messages-${HOSTNAME.NAME:-examplehost}");
};

log {
    source(s_local);
    parser(p_hostname_segmentation);
    destination(d_file);
};
```

### Example: Parsing Apache log files

The following parser processes the log of Apache web servers and
separates them into different fields. Apache log messages can be
formatted like:

> "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %T %v"

Here is a sample message:

>192.168.1.1 - - [31/Dec/2007:00:17:10 +0100] "GET /cgi-bin/example.cgi HTTP/1.1" 200 2708 "-" "curl/7.15.5 (i4 >86-pc-linux-gnu) libcurl/7.15.5 OpenSSL/0.9.8c zlib/1.2.3 libidn/0.6.5" 2 example.mycompany

To parse such logs, the delimiter character is set to a single
whitespace (delimiters(\" \")). Whitespaces between quotes and brackets
are ignored (quote-pairs(\'\"\"\[\]\')).

```config
parser p_apache {
    csv-parser(
        columns("APACHE.CLIENT_IP", "APACHE.IDENT_NAME", "APACHE.USER_NAME",
        "APACHE.TIMESTAMP", "APACHE.REQUEST_URL", "APACHE.REQUEST_STATUS",
        "APACHE.CONTENT_LENGTH", "APACHE.REFERER", "APACHE.USER_AGENT",
        "APACHE.PROCESS_TIME", "APACHE.SERVER_NAME")
        flags(escape-double-char,strip-whitespace)
        delimiters(" ")
        quote-pairs('""[]')
    );
};
```

The results can be used for example, to separate log messages into
different files based on the APACHE.USER\_NAME field. If the field is
empty, the nouser name is assigned.

```config
log {
    source(s_local);
    parser(p_apache);
    destination(d_file);
};
destination d_file {
    file("/var/log/messages-${APACHE.USER_NAME:-nouser}");
};
```

### Example: Segmenting a part of a message

Multiple parsers can be used to split a part of an already parsed
message into further segments. The following example splits the
timestamp of a parsed Apache log message into separate fields.

```config
parser p_apache_timestamp {
    csv-parser(
        columns("APACHE.TIMESTAMP.DAY", "APACHE.TIMESTAMP.MONTH", "APACHE.TIMESTAMP.YEAR",
        "APACHE.TIMESTAMP.HOUR", "APACHE.TIMESTAMP.MIN", "APACHE.TIMESTAMP.SEC",
        "APACHE.TIMESTAMP.ZONE")
        delimiters("/: ")
        flags(escape-none)
        template("${APACHE.TIMESTAMP}")
    );
};
log {
    source(s_local);
    parser(p_apache);
    parser(p_apache_timestamp);
    destination(d_file);
};
```

### Further examples

For an example on using the greedy option, see
[[Example: Adding the end of the message to the last column|adm-parser-csv-opt#flags]].
