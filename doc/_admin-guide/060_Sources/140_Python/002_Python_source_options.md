---
title: python() and python-fetcher() source options
python_class: MyPythonSource
class_type: source
time_reopen: '1'
id: adm-src-python-opt
---

The python() and python-fetcher() drivers have the following options.

{% include doc/admin-guide/options/python-class.md %}

## fetch-no-data-delay()

|Type:|      integer (seconds)
|Default:  | -1 (disabled)|

*Description:* If the fetch method of a python-fetcher() source returns
with the LogFetcher.FETCH_NO_DATA constant, the source waits
fetch-no-data-delay() seconds before calling the fetch method again. If
you want to call the fetch method sooner, set the fetch-no-data-delay()
option to the number of seconds to wait before calling the fetch method.

{% include doc/admin-guide/options/source-flags.md %}

{% include doc/admin-guide/options/keep-hostname.md %}

{% include doc/admin-guide/options/log-iw-size.md %}

{% include doc/admin-guide/options/loaders.md %}

{% include doc/admin-guide/options/python-options.md %}

{% include doc/admin-guide/options/persist-name.md %}

{% include doc/admin-guide/notes/python-persist.md %}

{% include doc/admin-guide/options/tags.md %}

{% include doc/admin-guide/options/time-reopen.md %}

{% include doc/admin-guide/options/time-zone.md %}

![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
This option is available only when using Python 3.
{: .notice--warning}
