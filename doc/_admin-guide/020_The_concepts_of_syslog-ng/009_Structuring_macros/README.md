---
title: Structuring macros, metadata, and other value-pairs
id: adm-structuring-macros
description: >-
    Available in syslog-ng OSE 3.3 and later.

    The syslog-ng OSE application allows you to select and construct
    name-value pairs from any information already available about the log
    message, or extracted from the message itself.  
---

You can directly use this structured information, for example, in the following places:

- [[amqp() destination|adm-dest-amqp]]
- [[format-welf() template function|adm-temp-func#format-welf]]
- [[mongodb() destination|adm-dest-mongodb]]
- [[stomp() destination|adm-dest-stomp]] destination
- or in other destinations using the [[format-json() template function|adm-temp-func#format-json]].

When using value-pairs, there are three ways to specify which
information (that is, macros or other name-value pairs) to include in
the selection.

- Select groups of macros using the scope() parameter, and optionally remove
    certain macros from the group using the exclude() parameter.

- List specific macros to include using the key() parameter.

- Define new name-value pairs to include using the pair() parameter.

These parameters are detailed in [[value-pairs()|adm-spec-value-pairs]] chapter.
