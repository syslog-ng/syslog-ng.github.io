---
title: Tagging messages
id: adm-log-filters-tagging
description: >-
    You can label the messages with custom tags. Tags are simple labels,
    identified by their names, which must be unique. 
---

Currently syslog-ng OSE can tag a message at two different places:

- at the source when the message is received, and

- when the message matches a pattern in the pattern database. For
    details on using the pattern database, see
    [[Using pattern databases]],
    for details on creating tags in the pattern database, see
    [[The syslog-ng pattern database format]].

- Tags can be also added and deleted using rewrite rules. For details,
    see [[Adding and deleting tags]].
    When syslog-ng receives a message, it automatically adds the
    .source.\<id\_of\_the\_source\_statement\> tag to the message. Use the
    tags() option of the source to add custom tags, and the tags() option of
    the filters to select only specific messages.

- Tagging messages and also filtering on the tags is very fast, much
    faster than other types of filters.

- Tags are available locally, that is, if you add tags to a message on
    the client, these tags will not be available on the server.

- To include the tags in the message, use the **\${TAGS}** macro in a
    template. Alternatively, if you are using the IETF-syslog message
    format, you can include the \${TAGS} macro in the .SDATA.meta part
    of the message. Note that the \${TAGS} macro is available only in
    syslog-ng OSE 3.1.1 and later.

For an example on tagging, see Example: Adding tags and filtering messages
with tags.
