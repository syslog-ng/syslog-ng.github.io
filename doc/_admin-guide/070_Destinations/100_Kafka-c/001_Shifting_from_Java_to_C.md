---
title: Shifting from Java implementation to C implementation
id: adm-dest-kafkac-shift
description: >-
    If you were using the Java implementation of the kafka destination and
    want to shift to its C implementation, the following changes to the
    configuration file and considerations are necessary.
---

- `kafka()` and `kafka-c()` is now interchangable as the first one is just an alias of the latter

- Unlike the old one, the new topic() option can not handle templates.
    It must be a string.

- The template() option has been renamed message().

- The kafka-bootstrap-servers() option has been renamed
    bootstrap-servers().

- The properties-file() was replaced with the config() option which is similiar but not identical to the properties-file() option.

- The sync-send() option has been deprecated. Remove it from the
    configuration file.

- The client_lib_dir() option has been deprecated. Remove it from
    the configuration file.

- The old implementation's option() option has been removed and
    replaced by the config() option, which has a different syntax.

For more information, see
[[Options of the kafka() destination&#8217;s C implementation|adm-dest-kafkac-opt]].
