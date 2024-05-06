---
title: Options of the XML parsers
id: adm-parser-xml-opt
---

## drop-invalid()

|Accepted values:   |   yes \| no|
|Default:   |  no|
|Mandatory:  | no|

*Description:* If set, messages with an invalid XML will be dropped entirely.

## exclude-tags()

| Accepted values:    | list of globs                     |
| Default:   | None                              |
|            | If not set, no filtering is done. |
| Mandatory: | no                                |

*Description:* The XML parser matches tags against the listed globs.
If there is a match, the given subtree of the XML will be omitted.

### Example: Using exclude-tags

```config
parser xml_parser {
    xml(
        template("$MSG")
        exclude-tags("tag1", "tag2", "inner*")
    );
};
```

From this XML input:

```xml
<tag1>Text1</tag1><tag2>Text2</tag2><tag3>Text3<innertag>TextInner</innertag></tag3>
```

The following output is generated:

```json
{"_xml":{"tag3":"Text3"}}
```

{% include doc/admin-guide/options/prefix.md %}

The prefix() option is optional and its default value is \".xml\".

## strip-whitespaces()

|Accepted values: |     yes \| no|
|Default: |    no|
|Mandatory: |  no|

*Description:* Strip the whitespaces from the XML text nodes before adding
them to the message.

### Example: Using strip-whitespaces

```config
parser xml_parser {
    xml(
        template("$MSG")
        strip-whitespaces(yes)
    );
};
```

From this XML input:

```xml
<tag1> Tag </tag1>
```

The following output is generated:

```json
{"_xml":{"tag1":"Tag"}}
```

{% include doc/admin-guide/options/template-macro.md %}
