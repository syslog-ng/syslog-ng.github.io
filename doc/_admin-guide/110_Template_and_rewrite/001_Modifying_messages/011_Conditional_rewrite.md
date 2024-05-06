---
title: Conditional rewrites
id: adm-temp-cond-rewrite
description: >-
    Starting with 3.2, it is possible to apply a rewrite rule to a message
    only if certain conditions are met. The condition() option effectively
    embeds a filter expression into the rewrite rule: the message is
    modified only if the message passes the filter. If the condition is not
    met, the message is passed to the next element of the log path (that is,
    the element following the rewrite rule in the log statement, for
    example, the destination). Any filter expression normally used in
    filters can be used as a rewrite condition. Existing filter statements
    can be referenced using the filter() function within the condition. For
    details on filters, see Filters.  
---

**TIP:** Using conditions in rewrite rules can simplify your syslog-ng OSE
configuration file, as you do not need to create separate log paths to
modify certain messages.
{: .notice--info}

## Using conditional rewrite

The following procedure summarizes how conditional rewrite rules
(rewrite rules that have the condition() parameter set) work. The
following configuration snippet is used to illustrate the procedure:

```config
rewrite r_rewrite_set{
    set(
        "myhost",
        value("HOST")
        condition(program("myapplication"))
    );
};
log {
    source(s1);
    rewrite(r_rewrite_set);
    destination(d1);
};
```

To configure condtional rewrite

1. The log path receives a message from the source (s1).

2. The rewrite rule (r\_rewrite\_set) evaluates the condition. If the
    message matches the condition (the PROGRAM field of the message is
    \"myapplication\"), syslog-ng OSE rewrites the log message (sets the
    value of the HOST field to \"myhost\"), otherwise it is not
    modified.

3. The next element of the log path processes the message (d1).

### Example: Using conditional rewriting

The following example sets the HOST field of the message to myhost only
if the message was sent by the myapplication program.

```config
rewrite r_rewrite_set{set("myhost", value("HOST") condition(program("myapplication")));};
```

The following example is identical to the previous one, except that the
condition references an existing filter template.

```config
filter f_rewritefilter {program("myapplication");};
rewrite r_rewrite_set{set("myhost", value("HOST") condition(filter(f_rewritefilter)));};
```
