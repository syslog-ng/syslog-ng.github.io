---
title: tags()
id: adm-log-filters-tags
---

*Synopsis:* tag

*Description:* Select messages labeled with the specified tag. Every
message automatically has the tag of its source in
.source.\<id\_of\_the\_source\_statement\> format. This option is
available only in syslog-ng 3.1 and later.

## Example: Adding tags and filtering messages with tags

```config
source s_tcp {
    network(ip(192.168.1.1) port(1514) tags("tcp", "router"));
};
```

Use the **tags()** option of the filters to select only specific
messages:

```config
filter f_tcp {
    tags(".source.s_tcp");
};

filter f_router {
    tags("router");
};
```

**NOTE:** The syslog-ng OSE application automatically adds the class of the
message as a tag using the .classifier.\<message-class\> format. For
example, messages classified as \"system\" receive the
.classifier.system tag. Use the **tags()** filter function to select
messages of a specific class.
{: .notice--info}

```config
filter f_tag_filter {tags(".classifier.system");};
```
