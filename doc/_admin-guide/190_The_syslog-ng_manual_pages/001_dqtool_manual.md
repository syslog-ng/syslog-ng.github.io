---
# NOTE: In case of manpages these have multiple purpose
#           - manid -> if presented, the page treated as a manpage, also represents the section number of the command in the manpage
#           - manname -> will be rendered as the name of the command followed by manid as the section number in the manpage
#           - title -> will be rendered as description / manual name. (the .TH macro’s 4th argument (the “manual name”).
#           - description -> will be rendered as a top NAME section in the manpage
#
title: The dqtool tool manual page
app: dqtool
manid: 1
manname: dqtool
id: adm-man-dqtool
description: >-
    dqtool --- Display the contents of a disk-buffer file created with
    {{ site.product.short_name }}.
---

## SYNOPSIS

dqtool [command] [options]

## DESCRIPTION

{% include doc/admin-guide/manpages-intro.md %}

The dqtool application is a utility that can be used to display and
format the messages stored in a disk-buffer file.

## THE CAT COMMAND

```bash
cat [options] [file]
```

Use the cat command to display the log messages stored in the
disk-buffer (also called disk-queue) file, and also information from the
header of the disk queue file. The messages are printed to the standard
output (stdout), so it is possible to use grep and other tools to find
particular log messages, for example, **dqtool cat /var/log/messages.lgs
\|grep 192.168.1.1**.

The cat command has the following options:

- `--debug` or `-d`

    Print diagnostic and debugging messages to stderr.

- `--help` or `-h`

    Display a brief help message.

- `--template=<template>` or `-t`

    Format the messages using the specified template.

- `--verbose` or `-v`

    Print verbose messages to stderr.

- `--version` or `-V`

    Display version information.

### EXAMPLE:

```bash
./dqtool cat ../var/syslog-ng-00000.qf
```

The output looks like:
```config
>Disk-buffer state loaded;
>filename='../var/syslog-ng-00000.qf', qout_length='65', qbacklog_length='0', qoverflow_length='9205', qdisk_length='0'
>Mar  3 10:52:05 tristram localprg[1234]: seq: 0000011630, runid: 1267609923, stamp: 2010-03-03T10:52:05 PADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADD
>Mar  3 10:52:05 tristram localprg[1234]: seq: 0000011631, runid: 1267609923, stamp: 2010-03-03T10:52:05 PADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADD
```

## THE RELOCATE COMMAND

```config
relocate [options] [files]
```

Use the relocate command to move or rename disk-buffer (also called
disk-queue) files. Note that this option modifies the persist file. Stop
{{ site.product.short_name }} before using this command.

The relocate command has the following options:

- `--all` or `-a`

    Relocate every disk-buffer file that is listed in the {{ site.product.short_name }}
    persist file.

- `--new_path` or `-n`

    The directory where you want to move the disk-bufffer files. For
    example: /var/disk-buffers

- `--persist` or `-p`

    The path to the {{ site.product.short_name }} persist file. The relocate command
    automatically updates the entries of the disk-buffer files in the
    persist file.

### EXAMPLES:

Relocate a single queue file:

```bash
bin/dqtool relocate --new_path /tmp/dq --persist var/syslog-ng.persist /tmp/syslog-ng-00000.rqf
```

Relocate multiple queue files:

```bash
bin/dqtool relocate --new_path /tmp/dq --persist var/syslog-ng.persist /tmp/syslog-ng-00000.rqf /tmp/syslog-ng-00001.rqf
```

Relocate every queue file:

```bash
bin/dqtool relocate --new_path /tmp/dq --persist var/syslog-ng.persist --all
```

## FILES

dqtool

{% include doc/admin-guide/manpages-footnote.md %}
