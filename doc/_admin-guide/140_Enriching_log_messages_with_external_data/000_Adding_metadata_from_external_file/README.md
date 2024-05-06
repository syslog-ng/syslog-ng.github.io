---
title: Adding metadata from an external file
id: adm-enrich-meta-ext
description: >-
    In syslog-ng OSE version 3.8 and later, you can use an external database
    file to add additional metadata to your log messages. For example, you
    can create a database (or export it from an existing tool) that contains
    a list of hostnames or IP addresses, and the department of your
    organization that the host belongs to, the role of the host (mailserver,
    webserver, and so on), or similar contextual information.
---

The database file is a simple text file in comma-separated value (CSV)
format, where each line contains the following information:

- A selector or ID that appears in the log messages, for example, the
    hostname. To use shell-style globbing (wildcards) in selectors, see
    [[Shell-style globbing in the selector]].
    You can also reference the name of a filter that matches
    the messages, see [[Using filters as selector]].

- The name of the name-value pair that syslog-ng OSE adds to matching
    log messages.

- The value of the name-value pairs. Starting with syslog-ng OSE
    version 3.22, the value of the name-value pair can be a template or
    a template function, for example, \"selector3,name,\$(echo
    \$HOST\_FROM)\";

For example, the following csv-file contains three lines identified with
the IP address, and adds the host-role field to the log message.

```text
192.168.1.1,host-role,webserver
192.168.2.1,host-role,firewall
192.168.3.1,host-role,mailserver
```

## The database file

The database file must comply with the [RFC4180 CSV format](https://tools.ietf.org/html/rfc4180),
with the following exceptions and limitations:

- The values of the CSV-file cannot contain line-breaks

To add multiple name-value pairs to a message, include a separate line
in the database for each name-value pair, for example:

```text
192.168.1.1,host-role,webserver
192.168.1.1,contact-person,"John Doe"
192.168.1.1,contact-email,johndoe@example.com
```

Technically, add-contextual-data() is a parser in syslog-ng OSE so you
have to define it as a parser object.

**Declaration**

```config
parser p_add_context_data {
    add-contextual-data(
        selector("${HOST}"),
        database("context-info-db.csv"),
    );
};
```

You can also add data to messages that do not have a matching selector
entry in the database using the **default-selector()** option.

If you modify the database file, you have to reload syslog-ng OSE for
the changes to take effect. If reloading syslog-ng OSE or the database
file fails for some reason, syslog-ng OSE will keep using the last
working database file.

### Example: Adding metadata from a CSV file

The following example defines uses a CSV database to add the role of the
host based on its IP address, and prefixes the added name-value pairs
with .metadata. The destination includes a template that simply appends
the added name-value pairs to the end of the log message.

```config
@include "scl.conf"

source s_network {
    network(port(5555));
};

destination d_local {
    file("/tmp/test-msgs.log"
    template("$MSG Additional metadata:[${.metadata.host-role}]")};

parser p_add_context_data {
    add-contextual-data(selector("$SOURCEIP"), database("context-info-db.csv"), default-selector("unknown"), prefix(".metadata."));
};

log {
    source(s_network);
    parser(p_add_context_data);
    destination(d_local);
};
```

```text
192.168.1.1,host-role,webserver
192.168.2.1,host-role,firewall
192.168.3.1,host-role,mailserver
unknown,host-role,unknown
```
