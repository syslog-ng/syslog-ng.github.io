---
title: Creating {{ site.product.short_name }} core files
id: adm-debug-core
description: >-
    When {{ site.product.short_name }} crashes for some reason, it can create a core file that
    contains important troubleshooting information. 
---

To enable core files, complete the following procedure:

## Steps

1. Core files are produced only if the maximum core file size ulimit is
    set to a high value in the init script of syslog-ng. Add the
    following line to the init script of syslog-ng:

    ```bash
    ulimit -c unlimited
    ```

2. Verify that {{ site.product.short_name }} has permissions to write the directory it is
    started from, for example, /opt/syslog-ng/sbin/.

3. If {{ site.product.short_name }} crashes, it will create a core file in the directory
    {{ site.product.short_name }} was started from.

4. To test that {{ site.product.short_name }} can create a core file, you can create a
    crash manually. For this, determine the PID of {{ site.product.short_name }} (for
    example, using the `ps -All | grep syslog-ng` command), then issue
    the following command: `kill -ABRT <syslog-ng pid>`

    This should create a core file in the current working directory.
