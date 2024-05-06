---
title: Parsing dates and timestamps
id: adm-parser-date
description: >-
    The date parser can extract dates from non-syslog messages. It operates
    by default on the ${MESSAGE} part of the log message, but can operate
    on any template or field provided. The parsed date will be available as
    the sender date (that is, the ${S_DATE}, ${S_ISODATE}, ${S_MONTH},
    and so on, and related macros). (To store the parsed date as the
    received date, use the time-stamp(recvd) option.)
---

**NOTE:** Note that parsing will fail if the format string does not match
the entire template or field. Since by default syslog-ng Open Source
Edition (syslog-ng OSE) uses the \${MESSAGE} part of the log message,
parsing will fail, unless the log message contains only a date, but that
is unlikely, so practically you will have to segment the message (for
example, using a [[csv-parser()]].
You can also use date-parser() to parse dates received in
a JSON or key-value-formatted log message.
{: .notice--info}

**Declaration**

```config
parser parser_name {
    date-parser(
        format("<format-string-for-the-date>")
        template("<field-to-parse>'")
    );
};
```

### Example: Using the date-parser()

In the following example, syslog-ng OSE parses dates like
01/Jan/2016:13:05:05 PST from a field called MY\_DATE using the
following format string: format(\"%d/%b/%Y:%H:%M:%S %Z\") (how you
create this field from the incoming message is not shown in the
example). In the destination template every message will begin with the
timestamp in ISODATE format. Since the syslog parser is disabled,
syslog-ng OSE will include the entire original message (including the
original timestamp) in the \${MESSAGE} macro.

```config
source s_file {
    file("/tmp/input" flags(no-parse));
};

destination d_file {
    file(
        "/tmp/output"
        template("${S_ISODATE} ${MESSAGE}\n")
    );
};

log {
    source(s_file);
    parser { date-parser(format("%d/%b/%Y:%H:%M:%S %Z") template("${MY_DATE}")); };
    destination(d_file);
};
```

In the template option, you can use template functions to specify which
part of the message to parse with the format string. The following
example selects the first 24 characters of the \${MESSAGE} macro.

```config
date-parser(format("%d/%b/%Y:%H:%M:%S %Z") template("$(substr ${MESSAGE} 0 24)") );
```

In syslog-ng OSE version 3.23 and later, you can specify a
comma-separated list of formats to parse multiple date formats with a
single parser. For example:

```config
date-parser(format(
    "%FT%T.%f",
    "%F %T,%f",
    "%F %T"
));
```

If you need to modify or correct the timezone of the message after
parsing, see [[Rewrite the timezone of a message]].
