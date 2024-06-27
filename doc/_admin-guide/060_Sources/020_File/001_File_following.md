---
title: How content changes are followed in file() and wildcard-file() sources
short_title: How file sources are followed
id: adm-src-wild-follow
description:  >-
    The {{ site.product.short_name }} application can use various methods to detect changes
    in the followed [[file()|adm-src-file]] and wildcard-file() sources. Under the hood, two different change
    watchers operate: one for detecting changes in the followed directories and one for
    monitoring changes in the watched files.
---

The detection method for directory changes can be controlled via monitor-method(). If the method is `poll`, {{ site.product.short_name }} will set up an (ivykis) timer that periodically checks and compares the content of the given directory at the frequency specified by monitor-freq(). This periodic polling can be resource-intensive (mainly CPU), so selecting the proper value for monitor-freq() is important. This is not an issue on Linux, where you can use `inotify` for monitor-method(), which automatically notifies {{ site.product.short_name }} about changes with no significant resource usage impact.

**NOTE:** For macOS and FreeBSD, a `kqueue` based implementation will be available in the near future, offering similar performance to `inotify` on Linux. Stay tuned!
{: .notice--info}

Detecting file content changes involves more factors that can affect resource usage and overall performance. {{ site.product.short_name }} uses two main methods to monitor file content changes.

The first method is automatically selected if the follow-freq() option has a value greater than 0. It works like the directory monitoring `poll` monitor-method() and uses an (ivykis) timer with the frequency of follow-freq(). It tries to detect changes in the file content (as well as state, file deletion, and moves) each time the timer fires. Similar to directory change monitoring, this process can be resource-intensive, so you should find the proper setting to balance performance, resource usage, and fault tolerance (such as avoiding log message loss).

The second method is activated if the follow-freq() option is set to 0. It uses ivykis poll methods, sometimes resembling the poll method for directory change watching described above (with its performance penalties), but often working similarly to the `inotify` version (with seamless performance).

The following table shows which method is selected in different cases.

<table border="0" cellspacing="0" cellpadding="0" width="1397">
  <tr>
    <td width="99" class="right-edged-col">
      <p align="center">follow-freq()</p>
    </td>
    <td width="200" colspan="2" class="right-edged-col">
      <p align="center">file follow method</p>
    </td>
    <td width="151" class="right-edged-col">
      <p align="center">linux</p>
    </td>
    <td width="152" class="right-edged-col">
      <p align="center">macOS, FreeBSD</p>
    </td>
    <td width="153">
      <p align="center">Solaris</p>
    </td>
  </tr>
  <tr>
    <td width="99" rowspan="6" class="right-edged-col">
      <p align="center">0</p>
    </td>
    <td width="150" rowspan="6" class="right-edged-col">
      <p align="center">ivykis poll</p>
    </td>
    <td width="152" class="right-edged-col">
      <p align="center">port-timer, port</p>
    </td>
    <td width="151" class="right-edged-col">
      <p align="center">n.a.</p>
    </td>
    <td width="152" class="right-edged-col">
      <p align="center">n.a.</p>
    </td>
    <td width="153">
      <p align="center">should work<br>(not tested yet)</p>
    </td>
  </tr>
  <tr>
    <td width="152" class="right-edged-col">
      <p align="center">dev-poll</p>
    </td>
    <td width="151" class="right-edged-col">
      <p align="center">n.a.</p>
    </td>
    <td width="152" class="right-edged-col">
      <p align="center">n.a.</p>
    </td>
    <td width="153">
      <p align="center">should work<br>(not tested yet)</p>
    </td>
  </tr>
  <tr>
    <td width="152" class="right-edged-col">
      <p align="center">epoll-timer, epoll</p>
    </td>
    <td width="151" class="right-edged-col">
      <p align="center">does not work </p>
    </td>
    <td width="152" class="right-edged-col">
      <p align="center">n.a.</p>
    </td>
    <td width="153">
      <p align="center">should work<br>(not tested yet)</p>
    </td>
  </tr>
  <tr>
    <td width="152" class="right-edged-col">
      <p align="center">kqueue</p>
    </td>
    <td width="151" class="right-edged-col">
      <p align="center">n.a.</p>
    </td>
    <td width="152" class="right-edged-col">
      <p align="center">works</p>
    </td>
    <td width="153">
      <p align="center">n.a.</p>
    </td>
  </tr>
  <tr>
    <td width="152" class="right-edged-col">
      <p align="center">ppoll</p>
    </td>
    <td width="151" class="right-edged-col">
      <p align="center">works, but always signals readability</p>
    </td>
    <td width="152" class="right-edged-col">
      <p align="center">n.a.</p>
    </td>
    <td width="153">
      <p align="center">should work<br>(not tested yet)</p>
    </td>
  </tr>
  <tr>
    <td width="152" class="right-edged-col">
      <p align="center">poll</p>
    </td>
    <td width="151" class="right-edged-col">
      <p align="center">works, but always signals readability</p>
    </td>
    <td width="152" class="right-edged-col">
      <p align="center">works, but always signals readability</p>
    </td>
    <td width="153">
      <p align="center">works, but always signals readability</p>
    </td>
  </tr>
  <tr>
    <td width="99" rowspan="3" class="right-edged-col">
      <p align="center">&gt; 0</p>
    </td>
    <td width="150" colspan="2" rowspan="3" class="right-edged-col">
      <p align="center">syslog-ng poll<br>using ivykis timer with timer freq set to follow-freq() value</p>
    </td>
    <td width="151" rowspan="3" class="right-edged-col">
      <p align="center">works</p>
    </td>
    <td width="152" rowspan="3" class="right-edged-col">
      <p align="center">works</p>
    </td>
    <td width="153">
      <p align="center">works</p>
    </td>
  </tr>
</table>

A bit more detail about the notation in the platform columns and what they really mean:

`n.a.` - Means that the feature is not supported on the given platform by default, which has a significant impact on how the final ivykis poll method is selected. Ivykis tries to set up (at initialization time) the method to be used in the order enumerated in the table above. If an option is `n.a.` (determined at build time), then the next option will be used automatically. The first available option will be used, and if it does not work on the given platform (see `does not work` below), then {{ site.product.short_name }} will stop that file source with an error. This can be controlled using the `IV_EXCLUDE_POLL_METHOD` environment variable. Methods enumerated in it will be excluded from the ivykis initialization flow, and the next available (and not excluded) one will be used. The strings that can be used in `IV_EXCLUDE_POLL_METHOD` are `port-timer port dev_poll epoll-timerfd epoll kqueue ppoll poll` in the same order as in the table.\
e.g., on Linux you should use `IV_EXCLUDE_POLL_METHOD="epoll-timerfd epoll"` to force the usage of the `ppoll` method, as `port-timer port dev_poll` are not available, and `epoll-timerfd epoll` are not working currently. However, note that currently `ppoll` and `poll` are the only working options on Linux, and they are far from optimal, unlike on BSD-based systems like macOS, where the default `kqueue` is a perfect option to use.

  **NOTE:** We are planning to add an `inotify` or similar-based solution to ivykis that could perform similarly to `kqueue`. Stay tuned!
  {: .notice--info}

`works` - Means it is tested and works seamlessly (based on our tests).

`works, but always signals readability` - Means that the method is available on the given platform, but it is primarily designed for sockets, pipes, and similar uses, not for regular files. For regular files, it is always triggered (because regular files are always readable), behaving similarly to the `poll` method of directory monitoring with all of its disadvantages. Moreover, it could lead to even higher resource consumption (mainly CPU load) because follow-freq() does not control the frequency of the triggered internal file checks, which could occur hundreds or thousands of times per second.

`does not work` - Means that the method is available on the given platform but currently does not work as expected for various reasons.