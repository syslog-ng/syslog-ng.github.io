---
title: system
description: >-
  Syslog-ng OSE can automatically collect the system-specific log messages of
  the host on a number of platforms using the system() driver.
id: dev-macos-system-drv
---

### Important Information

If the system() driver is included in the syslog-ng OSE configuration file, syslog-ng OSE automatically adds the following sources to the syslog-ng OSE configuration.\
\
It automatically links to the default logs destination of the given platform through a compatible driver. For example:&#x20;

<table data-header-hidden>
  <thead>
    <tr>
      <th width="282">Platform</th>
      <th>Message source</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Linux</td>
      <td>
        <code>unix-dgram("/dev/log");</code>
        <br>
        <code>file("/proc/kmsg" program-override("kernel") flags(kernel));</code>
      </td>
    </tr>
    <tr>
      <td>Solaris 8</td>
      <td>
        <code>sun-streams("/dev/log");</code>
      </td>
    </tr>
    <tr>
      <td>...</td>
      <td></td>
    </tr>
    <tr>
      <td>pre macOS 10.15 Catalina</td>
      <td>
        <code>file("/var/log/system.log" follow-freq(1));</code>
      </td>
    </tr>
    <tr>
      <td>macOS 10.15 Catalina and later</td>
      <td>
        <code>darwin-oslog();</code>
      </td>
    </tr>
  </tbody>
</table>

### Testing

```config
@version: 4.2
@include "scl.conf"

options {
    frac-digits(6);
};

source s_local0 {
    system();
};

source s_local1 {
     darwin-oslog()
};

source s_local2 {
    darwin-oslog-stream();
};

log {
    source(s_local0);
    # This one is the same as s_local0 actually
    #source(s_local1);
    # This one gives a live macOS OSLog stream that contains much, much more log events, like debug messages, and not persistent messages
    # Take care, can lead to huge system load!
    #source(s_local2);

    {
        file(
            "/var/log/messages"

            flags(no-multi-line syslog-protocol)
            flush-lines(1)
            flush-timeout(1)
        );
    };

     (flow-control);
};
```
