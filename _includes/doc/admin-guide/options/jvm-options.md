## jvm-options()

|  Type:|      list|
  |Default:|   N/A|

*Description:* Specify the Java Virtual Machine (JVM) settings of your
Java destination from [[the {{ site.product.short_name }} configuration file|adm-conf-file]].

For example:

```config
jvm-options("-Xss1M -XX:+TraceClassLoading")
```
