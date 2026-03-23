---
title: Limitations of the XML parsers
id: adm-parser-xml-lim
description: >-
    This section describes the limitations of the xml-parser() in {{ site.product.short_name }}.
---

The XML parser comes with certain limitations.

## Using the list-handling functionality with vector-like structures

The XML parser uses the list-handling functionality to handle lists in the XML. The list-handling functionality has limitations when handling name-value pairs or quoting in SDATA as described below. Note that you can disable the list-handling functionality if needed.

The list-handling functionality of the XML parser separates vector-like structures by a comma as separate entries. Using the following structure as an example:

```xml
<vector>
    <entry>value1</entry>
    <entry>value2</entry>
    ...
    <entry>valueN</entry>
</vector>
```

After parsing, the entries are separated by a comma. If an entry has a space or is separated by a comma, for example, `value 2` or `Doe,John` in the previous example, quoting is applied to the entry:

```xml
vector.entry = value1,"value 2","Doe,John",value3...valueN
```

Note that xmllint has the same behavior:

```bash
$ xmllint --xpath "/vector/entry/text()" test.xml
value1value2valueN%
```

## Using the list-handling functionality with name-value pairs

As every value in name-value pairs can be quoted, One Identity recommends that you access name-values as lists as follows:
* Use list-related template functions on the list created by the XML parser.
* Use type-hinting using the format-json template function as shown in the example below:

```xml
template("$(format-json --scope dot-nv-pairs LIST=list(${.xml.Event.EventData.Data}))\n")
```

## Using the list-handling functionality with SDATA

According to RFC5424, SDATA parameter values must be quoted with double-quote ('"') characters. If the value contains double-quotes, they must be escaped with a backslash (\) character.

Due to the list-handling functionality of the XML parser, parsed XML text contents are also quoted using double-quote ('"') characters. As parsed XML text content are part of the message, they are quoted when used as SDATA parameter values.

Using the following structure as an example:

```xml
<Event>
<Data>42</Data>
<Data>Testing testing</Data>
</Event>
```

The expected name-value pair is as follows:

```xml
Event.Data = 42,"Testing testing"
```

In SDATA, this is quoted as shown below:

```xml
[Event Data="42,\"Testing testing\""]
```

## Disabling the list-handling functionality

To disable the list-handling functionality, use the create_lists(`yes`/`no`) option as shown below. The default value is set to `yes`.

```xml
parser p_xml {
    xml(create_lists(no));
};
```

Note that if you disable the list-handling functionality, the XML parser cannot address each element of a vector-like structure individually. Using the following structure as an example:

```xml
<vector>
    <entry>value1</entry>
    <entry>value2</entry>
    ...
    <entry>valueN</entry>
</vector>
```

After parsing, the entries are not addressed individually. Instead, the text of the entries are concatenated:

```xml
vector.entry = "value1value2...valueN"
```

## CDATA

The XML parser does not support CDATA. CDATA inside the XML input is
ignored. This is true for the processing instructions as well.

## Inherited limitations

The XML parser is based on the glib XML subset parser, called
GMarkup parser, which is not a full-scale XML parser. It is intended to parse a simple markup format that is a subset of XML. Some limitations are inherited:

- Do not use the XML parser if you expect to interoperate with
    applications generating full-scale XML. Instead, use it for
    application data files, configuration files, log files, and so on,
    where you know your application will be the only one writing the
    file.

- The XML parser is not guaranteed to display an error message in the
    case of invalid XML. It may accept invalid XML. However, it does not
    accept XML input that is not well-formed (a condition that is weaker
    than requiring XML to be valid).

## No support for long keys

If the key is longer than 255 characters, {{ site.product.short_name }} drops the entry and
an error log is emitted. There is no chunking or any other way of
recovering data, not even partial data. The entry will be replaced by an
empty string.
