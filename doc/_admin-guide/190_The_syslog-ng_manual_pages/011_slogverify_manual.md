---
# NOTE: In case of manpages these have multiple purpose
#           - manid -> if presented, the page treated as a manpage, also represents the section number of the command in the manpage
#           - manname -> will be rendered as the name of the command followed by manid as the section number in the manpage
#           - title -> will be rendered as description / manual name. (the .TH macro’s 4th argument (the “manual name”).
#           - description -> will be rendered as a top NAME section in the manpage
#
title: The slogverify manual page
id: adm-man-slogver
manid: 1
manname: slogverify
description: >-
    slogverify --- Verifies cryptographically secured logs.
---

## SYNOPSIS

slogverify [options] [arguments]

## DESCRIPTION

The slogverify utility is used to verify the integrity of cryptographically secured logs and to decrypt log entries produced in a {{ site.product.short_name }} secure logging environment.

* Normal mode:
    `slogverify -k <host key file> -m <input MAC file> <input file> <output file> [buffers]`
* Iterative mode:
    `slogverify -i -p <previous host key> -r <previous MAC> -m <current MAC> <input file> <output file> [buffers]`

## ARGUMENTS

* input file

    An encrypted log file from the {{ site.product.short_name }} secure logging environment that is verified.
* output file

    The file that contains the plain text log entries after decryption and verification.
* buffers

    Optional number of input buffers. The number of buffers can be used for performance adjustments in case the log file to be verified is very large and cannot be processed at once. It is a positive number of log entries that can be held in memory during verification. The minimum number if 10 and the maximum number is 4294967295. If this argument is not supplied the default of 1000 is used.

## OPTIONS

* `--iterative` or `-i`

    Iterative mode. This is useful in case the log files are periodically copied from the system on which they where generated to central collector. As log rotation, i.e. overwriting log files in order to preserve space cannot be done in a secure logging environment, the iterative mode can be used instead. This works as follows: If a certain storage limit is reached the log file together with the host key and the MAC file is copied to new destination and the old file is deleted. The verification is then performed in iterations, i.e. separately for each file that was retrieved from the log host. For this to work, it is important to always retrieve the corresponding host key and MAC files. The process can be automated, for example by calling slogverify in iterative mode from a script.

* `--key-file` or `-k`

    The initial host key (`k0`). This option is used in normal mode only.

* `--mac-file` or `-m`

    The current MAC file used.

* `--prev-key-file` or `-p`

    The host key corresponding to the previous log file. This option can be used in iterative mode only. In theory, this can be initial host key (`k0`) but using this key might generate warnings, as the gap between the first log entry ever (log entry 0) and the first log entry of the current log file might be large.

* `--prev-mac-file` or `-r`

    The MAC file from the previous log file. This option can only be used in iterative mode.

* `--help` or `-h`

    Display a help message.

## FILES

`/usr/bin/slogverify`

`/etc/syslog-ng.conf`

## ADDITIONAL INFORMATION

* The syslog-ng.conf manual page
* The secure-logging manual page 