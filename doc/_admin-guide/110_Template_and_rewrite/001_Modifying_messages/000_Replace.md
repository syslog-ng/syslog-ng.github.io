---
title: Replacing message parts
id: adm-temp-replace
---

To replace a part of the log message, you have to:

- define a string or regular expression to find the text to replace

- define a string to replace the original text (macros can be used as
    well)

- select the field of the message that the rewrite rule should process

Substitution rules can operate on any soft macros, for example, MESSAGE,
PROGRAM, or any user-defined macros created using parsers. You can also
rewrite the structured-data fields of messages complying to the RFC5424
(IETF-syslog) message format.

{% include doc/admin-guide/notes/hard-macros.md %}

Substitution rules use the following syntax:

**Declaration**

```config
rewrite <name_of_the_rule> {
    subst(
        "<string or regular expression to find>",
        "<replacement string>", value(<field name>), flags()
    );
};
```

The type() and flags() options are optional. The type() specifies the
type of regular expression to use, while the flags() are the flags of
the regular expressions. For details on regular expressions, see
[[Regular expressions]].
A single substitution rule can include multiple substitutions that are
applied sequentially to the message. Note that rewriting rules must be
included in the log statement to have any effect.

**TIP:** For case-insensitive searches, add the **flags(ignore-case)**
option. To replace every occurrence of the string, add **flags(global)**
option. Note that the store-matches flag is automatically enabled in
rewrite rules.
{: .notice--info}

### Example: Using substitution rules

The following example replaces the IP in the text of the message with
the string IP-Address.

```config
rewrite r_rewrite_subst{
    subst("IP", "IP-Address", value("MESSAGE"));
};
```

To replace every occurrence, use:

```config
rewrite r_rewrite_subst{
    subst("IP", "IP-Address", value("MESSAGE"), flags("global"));
};
```

Multiple substitution rules are applied sequentially. The following
rules replace the first occurrence of the string IP with the string
IP-Addresses.

```config
rewrite r_rewrite_subst{
    subst("IP", "IP-Address", value("MESSAGE"));
    subst("Address", "Addresses", value("MESSAGE"));
};
```

{% include doc/admin-guide/examples/anon-ip.md %}
