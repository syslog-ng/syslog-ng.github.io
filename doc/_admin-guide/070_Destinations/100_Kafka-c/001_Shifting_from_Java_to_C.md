---
title: Shifting from Java implementation to C implementation
id: adm-dest-kafkac-shift
description: >-
    If you were using the Java implementation of the kafka destination and
    want to shift to its C implementation, the following changes to the
    configuration file and considerations are necessary.
---

- Unlike the old one, the new topic() option can not handle templates.
    It must be a string.

- The template() option has been renamed message().

- The kafka-bootstrap-servers() option has been renamed
    bootstrap-servers().

- The properties-file() is a Java properties file with options that
    are similar to, but not identical with, the options in the old, Java
    implementation's properties-file(). For more information, click here. TODO

- The sync-send() option has been deprecated. Remove it from the
    configuration file.

- The client_lib_dir() option has been deprecated. Remove it from
    the configuration file.

- The old implementation's option() option has been removed and
    replaced by the config() option, which has a different syntax.

For more information, see
[[Options of the kafka() destination&#8217;s C implementation|adm-dest-kafkac-opt]].
