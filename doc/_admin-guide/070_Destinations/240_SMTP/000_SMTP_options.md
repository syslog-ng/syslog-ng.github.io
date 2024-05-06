---
title: smtp() destination options
srv: SMTP server
port: '25'
id: adm-dest-smtp-opt
---

The smtp() sends email messages using SMTP, without needing external
applications. The smtp() destination has the following options:

{% include doc/admin-guide/options/batch-bytes.md %}

{% include doc/admin-guide/options/batch-lines.md %}

{% include doc/admin-guide/options/batch-timeout.md %}

## body()

|  Type:|      string|
|  Default:|   n/a|

*Description:* The BODY field of the email. You can also use macros in
the string. Use **\\n** to start a new line. For example:

```config
body("syslog-ng OSE received the following alert from $HOST:\n$MSG")
```

## bcc()

|  Type:|      string|
|  Default:|   n/a|

*Description:* The BCC recipient of the email (contents of the BCC
field). You can specify the email address, or the name and the email
address. Set the **bcc** option multiple times to send the email to
multiple recipients. For example: **bcc(\"admin@example.com\")** or
**bcc(\"Admin\" \"admin@example.com\")** or **\>bcc(\"Admin\"
\"admin@example.com\") bcc(\"Admin2\" \"admin2@example.com\")**

You can also use macros to set the value of this parameter.

## cc()

|  Type:|      string|
|Default:|  n/a|

*Description:* The CC recipient of the email (contents of the CC field).
You can specify the email address, or the name and the email address.
Set the **cc** option multiple times to send the email to multiple
recipients. For example: **cc(\"admin@example.com\")** or
**cc(\"Admin\" \"admin@example.com\")** or **cc(\"Admin\"
\"admin@example.com\") cc(\"Admin2\" \"admin2@example.com\"**

You can also use macros to set the value of this parameter.

{% include doc/admin-guide/options/disk-buffer.md %}

## from()

|  Type: |     string|
|  Default:|   n/a|

*Description:* The sender of the email (contents of the FROM field). You
can specify the email address, or the name and the email address. For
example:

```config
from("admin@example.com")
```

or

```config
from("Admin" "admin@example.com")
```

If you specify the from() option multiple times, the last value will be
used. Instead of the from() option, you can also use sender(), which is
just an alias of the from() option.

You can also use macros to set the value of this parameter.

## header()

|  Type:     | string|
|  Default: |  n/a|

*Description:* Adds an extra header to the email with the specified name
and content. The first parameter sets the name of the header, the second
one its value. The value of the header can contain macros. Set the
**header** option multiple times to add multiple headers. For example:

```config
header("X-Program", "$PROGRAM")
```

When using the header option, note the following points:

- Do not use the header() option to set the values of headers that
    have dedicated options. Use it only to add extra headers.

- If you set the same custom header multiple times, only the first
    will be added to the email, other occurrences will be ignored.

- It is not possible to set the DATE, Return-Path, Original-Recipient,
    Content-\*, MIME-\*, Resent-\*, Received headers.

{% include doc/admin-guide/options/hook.md %}

{% include doc/admin-guide/options/host.md %}

{% include doc/admin-guide/options/log-fifo-size.md %}

{% include doc/admin-guide/options/port.md %}

## reply-to()

|  Type: |     string|
|  Default: |  n/a|

*Description:* Replies of the recipient will be sent to this address
(contents of the REPLY-TO field). You can specify the email address, or
the name and the email address. Set the **reply-to()** option multiple
times to send the email to multiple recipients. For example:
**reply-to(\"admin@example.com\")** or **reply-to(\"Admin\"
\"admin@example.com\")** or **reply-to(\"Admin\"
\"admin@example.com\") reply-to(\"Admin2\" \"admin2@example.com\")**

You can also use macros to set the value of this parameter.

{% include doc/admin-guide/options/retries.md %}

## subject()

|  Type:  |    string|
|Default:|   n/a|

*Description:* The SUBJECT field of the email. You can also use macros.
For example:

```config
subject("[SYSLOG ALERT]: Critical error message received from $HOST")
```

If you specify the subject() option multiple times, the last value will
be used.

{% include doc/admin-guide/options/throttle.md %}

{% include doc/admin-guide/options/time-reopen.md %}

## to()

|  Type:     | string|
|  Default: |  localhost|

*Description:* The recipient of the email (contents of the TO field).
You can specify the email address, or the name and the email address.
Set the **to()** option multiple times to send the email to multiple
recipients. For example: **to(\"admin@example.com\")** or
**to(\"Admin\" \"admin@example.com\")** or **to(\"Admin\"
\"admin@example.com\") to(\"Admin2\" \"admin2@example.com\")**

You can also use macros to set the value of this parameter.
