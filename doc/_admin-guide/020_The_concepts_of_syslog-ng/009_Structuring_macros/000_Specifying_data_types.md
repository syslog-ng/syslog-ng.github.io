---
title: Specifying data types in value-pairs
id: adm-spec-value-pairs
description: >-
    By default, syslog-ng OSE handles every data as strings. However,
    certain destinations and data formats (for example, SQL, MongoDB, JSON ,
    AMQP) support other types of data as well, for example, numbers or
    dates. The syslog-ng OSE application allows you to specify the data type
    in templates (this is also called type-hinting). If the destination
    driver supports data types, it converts the incoming data to the
    specified data type. For example, this allows you to store integer
    numbers as numbers in MongoDB, instead of strings.
---

From syslog-ng OSE version 4.0 onwards, name-value pairs are now
triplets (name, type, value). Typing support is available for several
other components, for example, json-parser() and the \$(format-json)
template function. For more information, see [[Components supported by
data types]].

![]({{ site.baseurl}}/assets/images/caution.png)
**CAUTION:** Hazard of data loss!  
If syslog-ng OSE cannot convert the data into the specified type, an error occurs,
and syslog-ng OSE drops the message by default. To change how syslog-ng OSE handles
data-conversion errors, see [[on-error()]].
{: .notice--danger}

To use type-hinting, enclose the macro or template containing the data
with the type: **\<datatype\>(\"\<macro\>\")**, for example:
**int(\"\$PID\")**.

Currently the mongodb() destination and the format-json template
function supports data types.

## Example: Using type-hinting

The following example stores the MESSAGE, PID, DATE, and PROGRAM fields
of a log message in a MongoDB database. The DATE and PID parts are
stored as numbers instead of strings.  

```config
mongodb(
    value-pairs(
        pair("date", datetime("$UNIXTIME"))
        pair("pid", int64("$PID"))
        pair("program", "$PROGRAM"))
        pair("message", "$MESSAGE"))
    )
);
```

Use the following example to format the same fields into JSON.

`$(format-json date=datetime("$UNIXTIME") pid=int64("$PID") program="$PROGRAM" message="$MESSAGE")`

Use the following example to format the MESSAGE field as a JSON list.

`$$(format-json message=list($MESSAGE))`

The syslog-ng OSE application currently supports the following data-types.

- boolean: Converts the data to a boolean value. Anything that begins
    with a t or 1 is converted to true, anything that begins with an f
    or 0 is converted to false.

- datetime: Use it only with UNIX timestamps, anything else will
    likely result in an error. This means that currently you can use
    only the \$UNIXTIME macro for this purpose.

- double: A floating-point number.

- literal: The data as a literal string, without adding any quotes or
    escape characters.

- int or int32: 32-bit integer.

- int64: 64-bit integer.

- string: The data is a string.

- list: The data is a list of strings.

- JSON: The data is a JSON snippet.

- null: The type of the data is undefined.

## Components supported by data types

The following components support data types from syslog-ng OSE 4.0 and
onwards:

**NOTE:** Component types not listed below process data as string.
{: .notice--info}

- Numeric operators in filter expression comparisons are now
    type-aware. The exact comparison depends on the types associated
    with the values compared. For more information, see Comparing macro
    values in filters.

### json-parser() and the format-json template function

For more information, see [[JSON parser]] and
[[Template functions of syslog-ng OSE]].

syslog-ng OSE converts all elements in a JSON object to name-value
pairs, when using json-parser(). Any type related data present in
the original JSON is retained. This data is propagated automatically
to any other component that supports type, for example a
destination.

Elements without type data are handled as strings.

JSON lists (arrays) are converted to syslog-ng OSE lists, and can be
manipulated using the [[list-append]]
template functions.  

### set() and groupset() rewrite rules

The type of the field can be set. Type-casting can be executed using
the set() and groupset() template functions, to properly promote the
type information.

For more information, see [[Creating custom SDATA fields]] and
[[Setting multiple message fields to specific values]].  

### db-parser()

db-parser() rules can pair types with values using the type attribute.  

#### Example: Using the type attribute

`<value name="foobar" type="integer">$PID</value>`

The integer is a type-cast that couples \$foobar with an integer
type. The internal parsers of db-parser() (for example, @NUMBER@)
automatically couple type information to the parsed name-value
pair. For more information, see [[Using pattern databases]].

### add-contextual-data()  

Name-value pairs that are populated using add-contextual-data() propagate type
information, similarly to db-parser().

### map-value-pairs()

map-value-pairs() propagates type information.

### SQL type support

Columns with specific type information are stored with this
information kept intact. For more information, see [[sql() destination options]].

### Template type support

Templates can be cast explicitly to a specific type. Templates also
propagate type information from macros, template functions, and
values in the template string.

### python() typing

Python components (sources, destinations, parsers, and template
functions) support all data types, except for json().

### On-disk serialized formats (that is, disk buffer)

syslog-ng OSE Version 4.0 and newer versions are backwards
compatible with messages serialized with earlier versions, and the
format is compatible for downgrades. Therefore, even if a newer
version of syslog-ng OSE serialized a message, older versions and
associated tools are able to read it, however, in this case the type
information is lost.

{% include doc/admin-guide/options/value-pairs.md %}
