---
title: Collecting logs from chroot
id: adm-pract-chroot
---

## Purpose

To collect logs from a chroot using a syslog-ng client running on the
host, complete the following steps:

### Figure 23: Collecting logs from chroot

![]({{ adm_img_folder | append: 'fig-chroot01.png' }})

## Steps

1. Create a /dev directory within the chroot. The applications running
    in the chroot send their log messages here.

2. Create a local source in the configuration file of the syslog-ng
    application running outside the chroot. This source should point to
    the /dev/log file within the chroot (for example, to the
    /chroot/dev/log directory).

3. Include the source in a log statement.

    **NOTE:** You need to set up timezone information within your chroot as
    well. This usually means creating a symlink to /etc/localtime.
    {: .notice--info}
