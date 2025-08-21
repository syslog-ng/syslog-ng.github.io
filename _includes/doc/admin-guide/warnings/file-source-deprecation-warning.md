![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
Currently, the file() source is maintained for compatibility, but for regular files — especially when using wildcards in the filename — it is recommended to use the wildcard-file() source, as it provides better long-term support and more configuration options. The only real use case for the legacy file() source is when you need to read kernel messages.
{: .notice--warning}
