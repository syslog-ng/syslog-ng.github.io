---
# NOTE: In case of manpages these have multiple purpose
#           - manid -> if presented, the page treated as a manpage, also represents the section number of the command in the manpage
#           - manname -> will be rendered as the name of the command followed by manid as the section number in the manpage
#           - title -> will be rendered as description / manual name. (the .TH macro’s 4th argument (the “manual name”).
#           - description -> will be rendered as a top NAME section in the manpage
#
title: The slogencrypt manual page
id: adm-man-slogscr
manid: 1
manname: slogencrypt
description: >-
    slogencrypt --- Encrypts existing plain text log files using the {{ site.product.short_name }} secure logging environment.
---

## SYNOPSIS

```
slogencrypt [options] [arguments]
```

## DESCRIPTION

The `slogencrypt` utility encrypts plain text log files using an existing secure logging environment. Using this utility, log files obtained from a previous installation of {{ site.product.short_name }} or another logging system can be transferred to a secure logging environment. The order of the log entries is preserved. Encrypting plain text log files using an existing secure logging environment, requires the current encryption key to be supplied in order to preserve consistency.

### EXAMPLE: A GENERAL CALL SEQUENCE

```
slogencrypt -k <key file> -m <MAC file> <new key file> <new MAC file> <plain text log> <output file> [counter]
```

## ARGUMENTS

`<new key file>`

    The file that containa the new encryption key after successful encryption.

`<new MAC file>`

    The file receiving the new message authentication code (MAC) of the secure encrypted destination after encryption. In case an existing file is supplied, new entries are appended.

`<input log file>`

    The plain text log file that is encrypted using the secure logging environment.

`<output log file>`

    The file that contains the encrypted log entries from the supplied plain text log file after encryption.

`counter`

    The current log entry counter of the secure encrypted destination after encryption. This is required if the log entries to be encrypted are appended to an existing secure encrypted destination

## OPTIONS

`--key-file` or `-k`

    The current host key from the system where the encryption is performed.

`--mac-file` or `-m`

    The current MAC file from the system where the encryption is performed.

`--help` or `-h`

    Display a help message.

## FILES

/opt/syslog-ng/bin/slogencrypt

/opt/syslog-ng/etc/syslog-ng.conf

## SEE ALSO

* The syslog-ng.conf manual page
* The {{ site.product.short_name }} manual page
