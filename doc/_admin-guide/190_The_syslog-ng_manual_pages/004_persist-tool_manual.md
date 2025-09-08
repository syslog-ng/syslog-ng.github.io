---
# NOTE: In case of manpages these have multiple purpose
#           - manid -> if presented, the page treated as a manpage, also represents the section number of the command in the manpage
#           - manname -> will be rendered as the name of the command followed by manid as the section number in the manpage
#           - title -> will be rendered as description / manual name. (the .TH macro’s 4th argument (the “manual name”).
#           - description -> will be rendered as a top NAME section in the manpage
#
title: The persist-tool manual page
id: adm-man-persist-tool
manid: 1
manname: persist-tool
description: >-
    persist-tool - {{ site.product.short_name }} configuration file
---

## SYNOPSIS

persist-tool [command] [options]

## DESCRIPTION

This manual page is only an abstract.

The persist-tool application is a utility that can be used to dump the content of the persist file, and manipulate its content.

![]({{ site.baseurl}}/assets/images/caution.png)
**CAUTION:** Persist-tool is a special tool for syslog-ng experts. Do use the tool unless you know exactly what you are doing. Misconfiguring it will result in irrecoverable damage to the persist file, without any warning.
{: .notice--danger}

Limitations:
* The persist-state functions can be used only with `SLP4` or newer persist files. Older persist files are not supported.
* Wildcard characters are not supported in file and directory names.

## THE DUMP COMMAND

dump [options] [persist_file]

Use the `dump` command to print the current content of the persist file in JSON format to the console.

The `dump` command has the following options:
* `--help` or `-?`

    Display a brief help message.

    For example:

    ```config
        persist-tool dump /opt/syslog-ng/var/syslog-ng persist
    ```

    A valid output is the following:

    ```config
    run_id = { "value": "00 00 00 00 0C 00 00 00 " }
    host_id = { "value": "00 00 00 00 5F 49 2F 01 " }
    ```

## THE ADD COMMAND

add [options] [input_file]

Use the `add` command to add or modify a specified state-entry in the persist file. The state-entry should be in the same format as the `dump` command displays it. If the given state-entry already exists, it will be updated. Otherwise, a new value will be added. If the given persist state is invalid, it will be skipped.

To use the `add` command: use `persist-tool dump` to print the content of the current persist file, and redirect it to a file. Edit the content of this file. Use `persist-tool` add with this file to modify the persist.

The `add` command has the following options:
* `--help` or `-?`

    Display a brief help message.
* `--output-dir=<directory>` or `-o`

    Required parameter. The directory where the persist file is located at. The name of the persist file stored in this directory must be syslog-ng.persist.
* `--persist-name=<filename>` or `-p`

    Optional parameter. The name of the persist file to generate. Default value: syslog-ng.persist.

    For example:

    ``` shell
    /opt/syslog-ng/bin/persist-tool add dump_persist -o .
    ```

    A valid output is the following:

    ```config
    log_reader_curpos(Application)      OK
    affile_sd_curpos(/var/aaa.txt)        OK
    ```

    An invalid output is the following:

    ```config
    log_reader_curpos(Application)      OK
    wrong
    FAILED (error: Invalid entry syntax)
    affile_sd_curpos(/var/aaa.txt)        OK
    ```

## FILES

/opt/syslog-ng/bin/persist-tool

## SEE ALSO

`syslog-ng.conf`(5)

{% include doc/admin-guide/manpages-footnote.md %}