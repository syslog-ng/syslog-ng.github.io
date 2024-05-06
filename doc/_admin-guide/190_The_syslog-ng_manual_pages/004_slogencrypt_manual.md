---
title: The slogencrypt manual page
id: adm-man-slogscr
---

## Name

`slogencrypt` --- Encrypts existing plain text log files using the syslog-ng OSE secure logging environment.

## Synopsis

```
slogencrypt [options] [arguments]
```

## Description

The `slogencrypt` utility encrypts plain text log files using an existing secure logging environment. Using this utility, log files obtained from a previous installation of syslog-ng or another logging system can be transferred to a secure logging environment. The order of the log entries is preserved. Encrypting plain text log files using an existing secure logging environment, requires the current encryption key to be supplied in order to preserve consistency.

### Example: a general call sequence

```
slogencrypt -k <key file> -m <MAC file> <new key file> <new MAC file> <plain text log> <output file> [counter]
```

## Arguments

* `<new key file>`

    The file that containa the new encryption key after successful encryption.

* `<new MAC file>`

    The file receiving the new message authentication code (MAC) of the secure encrypted destination after encryption. In case an existing file is supplied, new entries are appended.

* `<input log file>`

    The plain text log file that is encrypted using the secure logging environment.

* `<output log file>`

    The file that contains the encrypted log entries from the supplied plain text log file after encryption.

* `counter`

    The current log entry counter of the secure encrypted destination after encryption. This is required if the log entries to be encrypted are appended to an existing secure encrypted destination

## Options

* --key-file or -k

    The current host key from the system where the encryption is performed.

* --mac-file or -m

    The current MAC file from the system where the encryption is performed.

* --help or -h

    Display a help message.

## Files

`/usr/bin/slogencrypt`

`/etc/syslog-ng.conf`

## Additional Information

* The syslog-ng.conf manual page
* The syslog-ng manual page
