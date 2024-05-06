---
title: Using filters as selector
id: adm-enrich-filters-selector
description: >-
    To better control to which log messages you add contextual data, you can
    use filters as selectors. In this case, the first column of the CSV
    database file must contain the name of a filter. For each message,
    syslog-ng OSE evaluates the filters in the order they appear in the
    database file. If a filter matches the message, syslog-ng OSE adds the
    name-value pair related to the filter.
---

For example, the database file can contain the entries. (For details on
the accepted CSV-format, see database())

```text
f_auth,domain,all
f_localhost,source,localhost
f_kern,domain,kernel
```

Note that syslog-ng OSE does not evaluate other filters after the first
match. For example, if you use the previous database file, and a message
matches both the f_auth and f_localhost filters, syslog-ng OSE adds
only the name-value pair of f_auth to the message.

To add multiple name-value pairs to a message, include a separate line
in the database for each name-value pair, for example:

```text
f_localhost,host-role,firewall
f_localhost,contact-person,"John Doe"
f_localhost,contact-email,johndoe@example.com
```

You can also add data to messages that do not have a matching selector
entry in the database using the default-selector() option.

You must store the filters you reference in a database in a separate
file. This file is similar to a syslog-ng OSE configuration file, but
must contain only a version string and filters (and optionally
comments). You can use the **syslog-ng \--syntax-only \<filename\>**
command to ensure that the file is valid. For example, the content of
such a file can be:

```config
@version: 3.38
filter f_localhost { host("mymachine.example.com") };
filter f_auth { facility(4) };
filter f_kern { facility(0) };
```

**Declaration**

```config
parser p_add_context_data_filter {
    add-contextual-data(
        selector(filters("filters.conf")),
        database("context-info-db.csv"),
        prefix(".metadata.")
    );
};
```

If you modify the database file, or the file that contains the filters,
you have to reload syslog-ng OSE for the changes to take effect. If
reloading syslog-ng OSE or the files fails for some reason, syslog-ng
OSE will keep using the last working version of the file.
