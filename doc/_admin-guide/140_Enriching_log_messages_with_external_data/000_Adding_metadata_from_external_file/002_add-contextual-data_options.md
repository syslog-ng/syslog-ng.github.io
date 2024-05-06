---
title: Options of add-contextual-data()
id: adm-enrich-add-contextual-data-opt
---

The add-contextual-data() has the following options.

## Required options

The following options are required: selector(), database().

## database()

|Accepted value:|      \<path-to-file\>.csv|
|Default:||

*Description:* Specifies the path to the CSV file, for example,
/opt/syslog-ng/my-csv-database.csv. The extension of the file must be
.csv, and can include Windows-style (CRLF) or UNIX-style (LF)
linebreaks. You can use absolute path, or relative to the syslog-ng OSE
binary.

## default-selector()

*Description:* Specifies the ID of the entry (line) that is corresponds
to log messages that do not have a selector that matches an entry in the
database. For example, if you add name-value pairs from the database
based on the hostname from the log message (selector(\"\${HOST}\")),
then you can include a line for unknown hosts in the database, and set
default-selector() to the ID of the line for unknown hosts. In the CSV
file:

```text
unknown-hostname,host-role,unknown
```

In the syslog-ng OSE configuration file:

```config
add-contextual-data(
    selector("$HOST")
    database("context-info-db.csv")
    default-selector("unknown-hostname")
);
```

## ignore-case()

|Accepted values:| yes \| no |
|Default:    |no|

*Description:* Specifies if selectors are handled as case insensitive.
If you set the ignore-case() option to **yes**, selectors are handled as
case insensitive.

## prefix()

*Description:* Insert a prefix before the name part of the added
name-value pairs (including the pairs added by the default-selector())
to help further processing.

## selector()

*Description:* Specifies the string or macro that syslog-ng OSE
evaluates for each message, and if its value matches the ID of an entry
in the database, syslog-ng OSE adds the name-value pair of every
matching database entry to the log message. You can use the following in
the selector() option.

- Strings

- A single macro (for example, selector(\"\${HOST}\"))

- To use filters as selectors, see
    [[Using filters as selector]].
- To use shell-style globbing (wildcards) in selectors, see
    [[Shell-style globbing in the selector]].

- Using templates as selectors is not supported.
