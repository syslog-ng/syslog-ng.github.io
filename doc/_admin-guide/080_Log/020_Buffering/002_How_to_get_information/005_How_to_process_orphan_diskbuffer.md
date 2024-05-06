---
title: How to process messages from an orphan disk-buffer file using a separate syslog-ng OSE instance
short_title: How to process messages from an orphan disk-buffer file
id: adm-log-diskbuff-process
description: >-
    This section describes how to read messages from an orphan disk-buffer
    file by using a separate syslog-ng Open Source Edition (syslog-ng OSE)
    process running parallel to the already running syslog-ng OSE instance.
---

## Orphan disk-buffer files

In certain situations (for example, after modifying the disk-buffer
configuration or losing the persist information), syslog-ng OSE creates
a new disk-buffer file instead of using the already existing one. In
these situations, the already existing disk-buffer file becomes a
so-called orphan disk-buffer file.

**NOTE:** The syslog-ng OSE application does not store messages in orphan
disk-buffer files or forward the messages stored in the disk-buffer
file.
{: .notice--info}

## Processing the messages from an orphan disk-buffer file by using a separate syslog-ng OSE instance

When syslog-ng OSE creates orphan disk-buffer files, you can start a
separate syslog-ng OSE instance parallel to the syslog-ng OSE instance
already running, and use the following resolution process to process the
messages in the orphan disk-buffer file.

>![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
>Before starting a separate syslog-ng OSE instance to process the messages
>from the orphan disk-buffer file, consider the following:
>  
>- During the resolution process, a separate syslog-ng OSE
>    instance will be started with its temporary files beside
>    the syslog-ng OSE instance already running.
>  
>- An incorrect startup command and incorrect configurations  
>    may cause issues for the syslog-ng OSE instance already
>    running.
>  
>- The disk-buffer file stores processed log messages in the  
>    format in which they would have been sent out to the
>    destination.
>  
>- The disk-buffer file doesn\'t store information about the  
>    destination.
>  
{: .notice--warning}

To process the messages from an orphan disk-buffer file using a separate
syslog-ng OSE instance,

1. Identify the orphan disk-buffer files and make a record of them. For
    more information, see
    [[How to get information about disk-buffer files]].

    It is important to know the type of the disk-buffer file.
    Disk-buffer file types can be normal (.qf) or reliable (.rqf).

    In the examples during this process, the
    /opt/syslog-ng/var/syslog-ng-00005.rqf orphan reliable disk-buffer
    file is used.

2. Determine the destination of the logs. The content of the
    disk-buffer may help you determine the logs\' destination. For more
    information, see
    [[How to get information about disk-buffer files]].

    In the examples during this process, the destination 10.21.10.20 is
    used with the standard network() port 514.

3. Create a directory for the temporary instance. In the examples
    during this process, the /tmp/qdisk directory is used.

    ```bash
    mkdir /tmp/qdisk
    ```

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
    Make sure that there is sufficient disk space in the directory. The minimum
    recommended disk space in the directory is equal to the size of the orphan
    disk-buffer file.
    {: .notice--warning}

    If you want to use a different temporary directory (that is, other
    than /tmp/qdisk), create a symbolic link between /tmp/qdisk and the
    temporary directory you want to use with ln -s /path/to/tempdir
    /tmp/qdisk. This will allow you to use the commands in this
    resolution process.

    If you will not use a different temporary directory, use the
    /tmp/qdisk temporary directory in the example commands and file
    names.

4. Create the configuration file /tmp/qdisk/qdisk.conf for the
    temporary instance with the following content.

    Example: creating the /tmp/qdisk/qdisk.conf configuration file for
    the temporary instance

    ```config
    @version:7.0
    @include "scl.conf"

    options {
        keep-hostname(yes);
        keep-timestamp(yes);
    };

    destination d_destination {
    #    ADD YOUR DESTINATION HERE

    };

    log {
        destination(d_destination);
    };
    ```

5. Add your destination statement with disk-buffer() to the
    configuration file. You can copy the destination statement from your
    running syslog-ng OSE configuration.

    ![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
    Add the dir() option and set the disk-buffer file\'s destination directory
    to the temporary directory (that is, /tmp/qdisk) in your destination statement.
    {: .notice--warning}

    Example: adding the destination statement with disk-buffer() to the
    configuration file

    ```config
    network("10.21.10.20"
        disk-buffer(
            disk-buf-size(1048576)
            reliable(yes)
            dir(/tmp/qdisk/)
    );
    ```

6. Start the temporary syslog-ng OSE instance in the foreground.

    ```bash
    syslog-ng -Fe -f /tmp/qdisk/qdisk.conf -R /tmp/qdisk/qdisk.persist -c /tmp/qdisk/qdisk.ctl
    ```

    The syslog-ng OSE application will log to the console, so you will
    see any potential error that may occur during startup.

    The following example output displays that an empty disk-buffer file
    has been created and the connection to the remote destination has
    been established.

    Example: output displaying newly created empty disk-buffer file and
    connection established to remote destination

    >Follow-mode file source not found, deferring open; filename='/no_such_file_or.dir'  
    >Reliable disk-buffer state saved; filename='/tmp/qdisk/syslog-ng-00000.rqf', qdisk_length='0'  
    >No server license found, running in client mode;  
    >syslog-ng starting up; version='7.0.20', cfg-fingerprint='eaa03b9efb88b87d7c1b0ce7efd042ed8ac0c013',  >cfg-nonce-ndx='0', cfg-signature='c0327a7f7e6418ce0399a75089377dfb662bb072'
    >FIPS information; FIPS-mode='disabled'  
    >Syslog connection established; fd='7', server='AF_INET(10.21.10.20:514)', local='AF_INET(0.0.0.0:0)'

7. To stop syslog-ng OSE, press CTRL+C.

8. Overwrite the empty disk-buffer file with the orphan disk-buffer
    file.

    ```bash
    mv /opt/syslog-ng/var/syslog-ng-00005.rqf /tmp/qdisk/syslog-ng-00000.rqf
    ```

9. Start syslog-ng OSE using the command used in Start the temporary
    syslog-ng OSE instance in the foreground step.

    ```bash
    syslog-ng -Fe -f /tmp/qdisk/qdisk.conf -R /tmp/qdisk/qdisk.persist -c /tmp/qdisk/qdisk.ctl
    ```

10. Open another terminal and check the progress by using one of the
    following methods.

    - Checking the number of stored logs in the disk-buffer (that is,
        the last number from the output).

    ```bash
    /opt/syslog-ng/sbin/syslog-ng-ctl stats -c /tmp/qdisk/qdisk.ctl | grep 'dst.*queued'
    ```

    - Checking the status of the disk-buffer file.

    ```bash
    dqtool info /tmp/qdisk/syslog-ng-00000.rqf
    ```

    An empty disk-buffer file will look similar to this:

    Example: empty disk-buffer file status message

    When checking the status of the disk-buffer files, the terminal
    will display a similar status message for an empty disk-buffer
    file:

    >Reliable disk-buffer state loaded; filename='/tmp/qdisk/syslog-ng-00000.rqf', queue_length='0', size='0'

11. Press CTRL+C to stop syslog-ng OSE.

12. Check the state of the orphan disk-buffer file. For more
    information, see
    [[How to get information about disk-buffer files]].

13. If you have more than one orphan disk-buffer file, repeat the steps
    following the syslog-ng OSE stop (that is,
    the steps beginning from overwriting the empty disk-buffer file with
    the orphan disk-buffer file) for each orphan disk-buffer file.

14. Remove the temporary directory.

    Example: command for removing the temporary directory

    The following command removes the /mp/qdisk temporary directory:

```bash
rm -rf /tmp/qdisk
```
