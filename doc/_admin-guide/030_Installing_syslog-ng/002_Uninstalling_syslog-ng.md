---
title: Uninstalling syslog-ng OSE
id: adm-inst-uninst
---

If you need to uninstall syslog-ng OSE for some reason, you have the
following options:

- *If you have installed syslog-ng OSE from a .deb package*: Execute
    the **dpkg -r syslog-ng** command to remove syslog-ng, or the **dpkg
    -P syslog-ng** command to remove syslog-ng OSE and the configuration
    files as well. Note that removing syslog-ng OSE does not restore the
    syslog daemon used before syslog-ng.

- *If you have installed syslog-ng OSE from an .rpm package*: Execute
    the **rpm -e syslog-ng** command to remove syslog-ng OSE. Note that
    removing syslog-ng OSE does not restore the syslog daemon used
    before syslog-ng OSE.

- *If you have compiled syslog-ng OSE from source*: Execute the **sudo
    make uninstall** command to remove syslog-ng OSE. Note that removing
    syslog-ng OSE does not restore the syslog daemon used before
    syslog-ng OSE.
