---
title: Options of key=value parsers
parser: kv-parser
prefix: kv
id: adm-parser-kv-opt
---

The kv-parser has the following options.

## extract-stray-words-into()

|  Synopsis:   |extract-stray-words-into(\"\<name-value-pair\>\")|

*Description:* Specifies the name-value pair where syslog-ng OSE stores
any stray words that appear before or between the parsed key-value pairs
(mainly when the [[pair-separator()]]. If multiple
stray words appear in a message, then syslog-ng OSE stores them as a
comma-separated list. Note that the prefix() option does not affect the
name-value pair storing the stray words. Default value:**N/A**

### Example: Extracting stray words in key-value pairs

For example, consider the following message:

>VSYS=public; Slot=5/1; protocol=17; source-ip=10.116.214.221; source-port=50989; destination-ip=172.16.236.16; >destination-port=162;time=2016/02/18 16:00:07; interzone-emtn_s1_vpn-enodeb_om; inbound; policy=370;

This is a list of key-value pairs, where the value separator is **=**
and the pair separator is **;**. However, before the last key-value pair
(**policy=370**), there are two stray words:
**interzone-emtn\_s1\_vpn-enodeb\_om inbound**. If you want to store or
process these, specify a name-value pair to store them in the
extract-stray-words-into() option, for example,
**extract-stray-words-into(\"my-stray-words\")**. The value of
\${my-stray-words} for this message will be
**interzone-emtn\_s1\_vpn-enodeb\_om, inbound**

{% include doc/admin-guide/options/prefix.md %}

{% include doc/admin-guide/default-prefix.md %}

## pair-separator()

|  Synopsis:  | pair-separator(\"\<separator-string\>\")|

*Description:* Specifies the character or string that separates the
key-value pairs from each other. Default value: **,** .

For example, to parse key1=value1;key2=value2 pairs, use
**kv-parser(pair-separator(\";\"));** .

{% include doc/admin-guide/options/template-macro.md %}

## value-separator()

|Synopsis:   |value-separator(\"\<separator-character\>\")|

*Description:* Specifies the character that separates the keys from the
values. Default value: =.

For example, to parse key:value pairs, use
**kv-parser(value-separator(\":\"));**.
