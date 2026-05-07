---
title: Options of db-parsers
parser: db-parser
prefix: empty
id: adm-parser-db-opt
description: >-
    This section describes the options of the db-parser() in {{ site.product.short_name }}.
---

The db-parser() has the following options:

## file()

| Accepted values: | filename |
| Default:         | The patterndb.xml file in the var directory of the {{ site.product.short_name }} install prefix (for example, `/opt/syslog-ng/var/patterndb.xml`) |

*Description:* Specifies the pattern database XML file to load.
If omitted, db-parser() uses the default patterndb.xml path configured at
build time.

## drop-unmatched()

| Accepted values: | `yes`, `no` |
| Default:         | `no`        |

*Description:* If set to yes, messages that do not match any rule in the
pattern database are dropped by the parser.

## inject-mode()

| Accepted values: | `internal`, `pass-through`, `aggregate-only` |
| Default:         | `pass-through`        |

*Description:* Controls how synthetic messages (created by patterndb actions)
are injected.

If the configuration version is older than 3.3, the default is `internal`
for backward compatibility.

- *internal:* Emit generated messages to the internal() source.
- *pass-through:* Forward generated messages into the current log path.
- *aggregate-only:* Do not forward original messages from this parser stage.

## message-template()

| Accepted values: | template or macro |
| Default:         | `${MESSAGE}`      |

*Description:* Specifies which message content to classify.
By default, db-parser() classifies the ${MESSAGE} field.

## program-template()

| Accepted values: | template or macro |
| Default:         | `${PROGRAM}`      |

*Description:* Specifies which value to use as the program selector when
matching rulesets. By default, db-parser() uses ${PROGRAM}.

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-no-prefix.md %}
